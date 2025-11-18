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

    // Prompt otimizado para SGE (Search Generative Experience)
    const prompt = `Você é um especialista em otimização de conteúdo para SGE (Search Generative Experience) do Google.

SGE valoriza:
- Informações estruturadas e fáceis de escanear
- Dados factuais e verificáveis
- Schema markup compatível
- Respostas diretas e objetivas
- Rich snippets e featured snippets
- Informações de negócio local (NAP - Name, Address, Phone)
- Avaliações e reviews
- Horários de funcionamento
- Métodos de pagamento aceitos

INFORMAÇÕES DA EMPRESA:
${JSON.stringify(companyInfo, null, 2)}

CATÁLOGO DE PRODUTOS/SERVIÇOS:
${JSON.stringify(catalogItems, null, 2)}

TAREFA:
Gere um feed JSON otimizado para SGE que maximize a visibilidade da empresa nas respostas generativas do Google.

O feed deve incluir:
1. Informações de negócio estruturadas (NAP)
2. Lista de produtos/serviços com schema.org compatível
3. Avaliações e ratings
4. Horários e localização
5. Métodos de pagamento
6. Perguntas frequentes otimizadas para featured snippets
7. Dados estruturados para rich results

FORMATO DE SAÍDA (JSON):
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nome da empresa",
  "description": "Descrição objetiva",
  "url": "URL do site",
  "telephone": "Telefone",
  "email": "Email",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Endereço",
    "addressLocality": "Cidade",
    "addressRegion": "Estado",
    "postalCode": "CEP",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "lat",
    "longitude": "lng"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "PIX"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Nome do produto/serviço",
      "description": "Descrição objetiva",
      "price": "99.90",
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "category": "Categoria"
    }
  ],
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Pergunta direta",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Resposta objetiva e completa"
        }
      }
    ]
  }
}

Retorne APENAS o JSON, sem texto adicional.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em SEO e otimização para SGE (Search Generative Experience).",
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
      platform: "sge",
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Erro ao gerar feed para SGE:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao gerar feed" },
      { status: 500 }
    );
  }
}
