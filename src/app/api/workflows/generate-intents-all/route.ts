import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { catalogItems, companyInfo, platform } = body;

    if (!catalogItems || catalogItems.length === 0) {
      return NextResponse.json(
        { error: "Nenhum item no catálogo fornecido" },
        { status: 400 }
      );
    }

    if (!platform || !["openai", "perplexity", "claude", "sge"].includes(platform)) {
      return NextResponse.json(
        { error: "Plataforma inválida. Use: openai, perplexity, claude ou sge" },
        { status: 400 }
      );
    }

    // Prompts específicos por plataforma
    const platformPrompts = {
      openai: `OpenAI (ChatGPT) valoriza:
- Perguntas conversacionais naturais
- Contexto de uso prático
- Tom amigável e acessível
- Exemplos de aplicação
- Perguntas que começam com "Como", "Qual", "Onde"`,
      
      perplexity: `Perplexity AI valoriza:
- Perguntas de pesquisa e descoberta
- Queries informacionais
- Comparações e análises
- Perguntas que começam com "Quais são", "Como escolher", "Diferenças entre"
- Foco em informação factual`,
      
      claude: `Claude AI valoriza:
- Perguntas detalhadas e bem contextualizadas
- Cenários específicos de uso
- Perguntas que requerem análise profunda
- Tom profissional mas conversacional
- Perguntas que começam com "Explique", "Analise", "Compare"`,
      
      sge: `SGE (Search Generative Experience) valoriza:
- Perguntas de busca local
- Queries transacionais
- Perguntas com intenção de compra
- Perguntas sobre "perto de mim", "melhor", "preço"
- Foco em resultados acionáveis`
    };

    const prompt = `Você é um especialista em intenção de busca e comportamento de usuários em IAs generativas.

PLATAFORMA: ${platform.toUpperCase()}
${platformPrompts[platform as keyof typeof platformPrompts]}

INFORMAÇÕES DA EMPRESA:
${JSON.stringify(companyInfo, null, 2)}

CATÁLOGO DE PRODUTOS/SERVIÇOS:
${JSON.stringify(catalogItems, null, 2)}

TAREFA:
Gere 20 intenções de busca (perguntas que usuários reais fariam) otimizadas para ${platform.toUpperCase()} que, quando feitas, deveriam fazer a IA recomendar esta empresa.

Cada intenção deve incluir:
1. A pergunta exata que o usuário faria
2. Categoria da intenção (informacional, transacional, navegacional)
3. Palavras-chave principais
4. Score de relevância (0-100)
5. Resposta ideal que a IA deveria dar (mencionando a empresa)

FORMATO DE SAÍDA (JSON):
{
  "platform": "${platform}",
  "intents": [
    {
      "query": "Pergunta exata do usuário",
      "category": "informational|transactional|navigational",
      "keywords": ["palavra1", "palavra2", "palavra3"],
      "relevance_score": 95,
      "ideal_response": "Resposta que menciona a empresa e seus produtos/serviços de forma natural"
    }
  ]
}

IMPORTANTE:
- As perguntas devem ser REAIS e NATURAIS
- Variar o tipo de pergunta (curtas, longas, específicas, gerais)
- Incluir perguntas com diferentes níveis de especificidade
- Focar em problemas que a empresa resolve
- Usar linguagem brasileira natural

Retorne APENAS o JSON, sem texto adicional.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em intenção de busca para ${platform.toUpperCase()}.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 4000,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("Nenhum conteúdo gerado");
    }

    // Extrair JSON da resposta
    let intentsData;
    try {
      // Tentar parsear diretamente
      intentsData = JSON.parse(content);
    } catch {
      // Se falhar, tentar extrair JSON de markdown
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        intentsData = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error("Não foi possível extrair JSON da resposta");
      }
    }

    return NextResponse.json({
      success: true,
      intents: intentsData.intents,
      platform: platform,
      count: intentsData.intents.length,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Erro ao gerar intenções:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao gerar intenções" },
      { status: 500 }
    );
  }
}
