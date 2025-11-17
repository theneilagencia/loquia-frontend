import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: NextRequest) {
  try {
    // Verificar autenticação
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Verificar se há intenções no intent_graph
    const { data: intents, error: intentError } = await supabase
      .from("intent_graph")
      .select("*")
      .eq("tenant_id", user.id);

    if (intentError) {
      return NextResponse.json({ error: intentError.message }, { status: 500 });
    }

    if (!intents || intents.length === 0) {
      return NextResponse.json(
        { error: "Você precisa gerar intenções primeiro" },
        { status: 400 }
      );
    }

    // Executar o workflow Python
    console.log(`[Workflow] Iniciando geração de feeds para tenant: ${user.id}`);
    
    const scriptPath = "/home/ubuntu/commerce_feed_generator.py";
    const command = `GEMINI_API_KEY="${process.env.GEMINI_API_KEY}" python3 ${scriptPath} "${user.id}"`;
    
    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout: 300000, // 5 minutos
        maxBuffer: 10 * 1024 * 1024, // 10MB
      });

      console.log("[Workflow] stdout:", stdout);
      if (stderr) {
        console.log("[Workflow] stderr:", stderr);
      }

      // Verificar se feeds foram criados
      const { data: newFeeds, error: checkError } = await supabase
        .from("feeds")
        .select("*")
        .eq("tenant_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (checkError) {
        console.error("[Workflow] Erro ao verificar feeds:", checkError);
      }

      return NextResponse.json({
        success: true,
        message: "Feeds gerados com sucesso!",
        intentsCount: intents.length,
        feedsCreated: newFeeds?.length || 0,
        output: stdout.substring(0, 500), // Primeiros 500 caracteres
      });
    } catch (execError: any) {
      console.error("[Workflow] Erro na execução:", execError);
      
      return NextResponse.json({
        error: "Erro ao executar workflow",
        details: execError.message,
        stderr: execError.stderr?.substring(0, 500),
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error("[Workflow] Erro geral:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
