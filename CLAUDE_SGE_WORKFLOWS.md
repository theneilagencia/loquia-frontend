# Workflows Claude e SGE Implementados

## Resumo

Implementei workflows completos para geração de feeds e intenções otimizados para **Claude AI** e **SGE (Search Generative Experience)**.

---

## Workflows Criados

### 1. Generate Feeds - Claude
**Endpoint:** `/api/workflows/generate-feeds-claude`

**Otimizações específicas para Claude:**
- Respostas detalhadas e bem estruturadas
- Contexto rico e informações completas
- Tom conversacional mas profissional
- Citações e fontes quando relevante
- Formato markdown bem organizado

**Estrutura do feed:**
```json
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
```

---

### 2. Generate Feeds - SGE
**Endpoint:** `/api/workflows/generate-feeds-sge`

**Otimizações específicas para SGE:**
- Informações estruturadas e fáceis de escanear
- Dados factuais e verificáveis
- Schema markup compatível (schema.org)
- Respostas diretas e objetivas
- Rich snippets e featured snippets
- Informações de negócio local (NAP)
- Avaliações e reviews
- Horários de funcionamento
- Métodos de pagamento aceitos

**Estrutura do feed (Schema.org):**
```json
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
  "offers": [...],
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [...]
  }
}
```

---

### 3. Generate Intents - All Platforms
**Endpoint:** `/api/workflows/generate-intents-all`

**Suporta 4 plataformas:**
- OpenAI (ChatGPT)
- Perplexity AI
- Claude AI
- SGE (Google)

**Otimizações por plataforma:**

#### OpenAI
- Perguntas conversacionais naturais
- Contexto de uso prático
- Tom amigável e acessível
- Exemplos de aplicação
- Perguntas que começam com "Como", "Qual", "Onde"

#### Perplexity
- Perguntas de pesquisa e descoberta
- Queries informacionais
- Comparações e análises
- Perguntas que começam com "Quais são", "Como escolher", "Diferenças entre"
- Foco em informação factual

#### Claude
- Perguntas detalhadas e bem contextualizadas
- Cenários específicos de uso
- Perguntas que requerem análise profunda
- Tom profissional mas conversacional
- Perguntas que começam com "Explique", "Analise", "Compare"

#### SGE
- Perguntas de busca local
- Queries transacionais
- Perguntas com intenção de compra
- Perguntas sobre "perto de mim", "melhor", "preço"
- Foco em resultados acionáveis

**Estrutura das intenções:**
```json
{
  "platform": "claude",
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
```

---

## Interface Atualizada

### Página de Feeds (`/feeds`)

**Novos botões de geração:**
- 🤖 OpenAI (preto)
- 🔮 Perplexity (preto)
- 🧠 Claude (roxo)
- ⚡ SGE (azul)

**Novos filtros:**
- Todos
- OpenAI
- Perplexity
- Claude
- SGE

**Funcionalidades:**
- Geração individual por plataforma
- Visualização de feeds
- Download em JSON
- Exclusão de feeds
- Contadores por plataforma

---

## Como Usar

### 1. Gerar Feeds

1. Acesse `/feeds`
2. Clique no botão da plataforma desejada:
   - 🤖 OpenAI
   - 🔮 Perplexity
   - 🧠 Claude
   - ⚡ SGE
3. Aguarde a geração (10-30 segundos)
4. O feed aparecerá na lista

### 2. Gerar Intenções

1. Acesse `/intent`
2. Selecione a plataforma no dropdown:
   - OpenAI
   - Perplexity
   - Claude
   - SGE
3. Clique em "Gerar Intenções com IA"
4. Aguarde a geração (15-45 segundos)
5. As intenções aparecerão na lista

### 3. Visualizar e Baixar

- **Ver**: Clique em "Ver" para visualizar o feed completo
- **Baixar**: Clique em "Baixar" para fazer download do JSON
- **Excluir**: Clique em "Excluir" para remover o feed

---

## Diferenças entre Plataformas

### OpenAI vs Perplexity
- **OpenAI**: Foco em conversação e uso prático
- **Perplexity**: Foco em pesquisa e informação factual

### Claude vs OpenAI
- **Claude**: Respostas mais detalhadas e contextualizadas
- **OpenAI**: Respostas mais diretas e práticas

### SGE vs Outros
- **SGE**: Único que usa Schema.org e foco em SEO
- **Outros**: Foco em conversação e recomendação

---

## Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **OpenAI API** - Geração de conteúdo com GPT-4o-mini
- **Supabase** - Armazenamento de feeds
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização

---

## Próximos Passos (Opcional)

### 1. Integração Real com APIs
Conectar com APIs reais de cada plataforma:
- Claude API (Anthropic)
- Google Search Console API (para SGE)

### 2. Validação de Feeds
Implementar validação automática:
- Schema.org validator para SGE
- Testes de qualidade para Claude

### 3. A/B Testing
Testar diferentes versões de feeds:
- Comparar performance entre plataformas
- Otimizar baseado em resultados reais

### 4. Analytics por Plataforma
Rastrear métricas específicas:
- Quantas vezes cada feed foi consultado
- Taxa de conversão por plataforma
- Queries mais comuns

---

## Suporte

Se precisar de ajuda:
- Documentação do OpenAI: https://platform.openai.com/docs
- Schema.org: https://schema.org
- Claude API: https://docs.anthropic.com

---

## Conclusão

Agora o sistema Loquia suporta **4 plataformas de IA** com workflows otimizados para cada uma:
- ✅ OpenAI
- ✅ Perplexity
- ✅ Claude
- ✅ SGE

Cada plataforma tem suas próprias otimizações e estruturas de dados, maximizando a chance de recomendação em cada contexto específico.
