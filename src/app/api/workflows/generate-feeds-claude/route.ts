import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { catalogItems, companyInfo } = body;

    if (!catalogItems || catalogItems.length === 0) {
      return NextResponse.json(
        { error: "Nenhum item no catálogo fornecido" },
        { status: 400 }
      );
    }

    // Prompt otimizado para Claude
    const prompt = `Você é um especialista em otimização de conteúdo para Claude AI (Anthropic).

Claude AI valoriza:
- Respostas detalhadas e bem estruturadas
- Contexto rico e informações completas
- Tom conversacional mas profissional
- Citações e fontes quando relevante
- Formato markdown bem organizado

INFORMAÇÕES DA EMPRESA:
${JSON.stringify(companyInfo, null, 2)}

CATÁLOGO DE PRODUTOS/SERVIÇOS:
${JSON.stringify(catalogItems, null, 2)}

TAREFA:
Gere um feed JSON otimizado para Claude AI que maximize a chance da empresa ser recomendada quando usuários fizerem perguntas relacionadas.

O feed deve incluir:
1. Descrição detalhada da empresa
2. Lista completa de produtos/serviços com:
   - Nome
   - Descrição rica em contexto
   - Casos de uso específicos
   - Diferenciais competitivos
   - Preço (se disponível)
3. Palavras-chave semânticas
4. Perguntas frequentes com respostas completas
5. Casos de sucesso ou depoimentos

FORMATO DE SAÍDA (JSON):
{
  "company": {
    "name": "Nome da empresa",
    "description": "Descrição detalhada",
    "website": "URL",
    "contact": "Contato"
  },
  "products": [
    {
      "name": "Nome do produto",
      "description": "Descrição rica",
      "use_cases": ["caso 1", "caso 2"],
      "differentials": ["diferencial 1", "diferencial 2"],
      "price": "Preço ou faixa",
      "category": "Categoria"
    }
  ],
  "keywords": ["palavra1", "palavra2"],
  "faqs": [
    {
      "question": "Pergunta",
      "answer": "Resposta completa"
    }
  ],
  "testimonials": [
    {
      "client": "Nome do cliente",
      "feedback": "Depoimento",
      "result": "Resultado obtido"
    }
  ]
}

Retorne APENAS o JSON, sem texto adicional.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em otimização de conteúdo para Claude AI.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("Nenhum conteúdo gerado");
    }

    // Extrair JSON da resposta
    let feedData;
    try {
      // Tentar parsear diretamente
      feedData = JSON.parse(content);
    } catch {
      // Se falhar, tentar extrair JSON de markdown
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        feedData = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error("Não foi possível extrair JSON da resposta");
      }
    }

    return NextResponse.json({
      success: true,
      feed: feedData,
      platform: "claude",
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Erro ao gerar feed para Claude:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao gerar feed" },
      { status: 500 }
    );
  }
}
