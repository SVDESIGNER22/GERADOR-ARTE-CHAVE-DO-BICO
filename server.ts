import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '20mb' }));

// Shared Google GenAI client (server-side only)
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey && apiKey.length > 5),
    brand: 'Chaves do Bico — AI Creative Studio',
    version: '1.0.0',
  });
});

// Endpoint to generate copy & editorial text using Gemini 3.8 Flash
app.post('/api/generate-copy', async (req: Request, res: Response) => {
  try {
    const { categoryTitle, topic, format, customBrief } = req.body;

    if (!ai) {
      return res.status(200).json({
        fallback: true,
        message: 'Chave GEMINI_API_KEY não configurada no servidor. Usando gerador editorial integrado.',
      });
    }

    const prompt = `Você é o diretor de redação publicitária e social media sênior da CHAVES DO BICO, imobiliária e plataforma de intermediação e divulgação de imóveis em Augustinópolis e região do Bico do Papagaio (Tocantins).
Assinatura oficial da marca: "Seu novo começo tem um endereço."

REGRAS ESTRITAS:
1. NUNCA invente imóveis específicos disponíveis, nunca invente preços de aluguel ou venda, nem características ou dados falsos de segurança.
2. Foco total em conteúdo educativo, inspiracional, cuidados com o lar e valorização regional do Bico do Papagaio.
3. Tom de voz: Sofisticado, acolhedor, profissional, editorial, impecável em português brasileiro (PT-BR).

DADOS DA SOLICITAÇÃO:
- Editoria: ${categoryTitle || 'CHAVES DO CONHECIMENTO'}
- Tópico: ${topic || 'Como escolher o imóvel ideal com segurança'}
- Formato: ${format || 'Feed vertical (1080x1350)'}
- Detalhes complementares: ${customBrief || 'Padrão imobiliário de excelência'}

Gere um JSON estrito contendo:
{
  "title": "Título publicitário curto e impactante (máx 6 palavras)",
  "subtitle": "Subtítulo complementar editorial claro (máx 12 palavras)",
  "body": "Texto curto para arte visual (máx 20 palavras)",
  "caption": "Legenda completa formatada para Instagram, com gancho inicial, 2 a 3 parágrafos educativos, chamada para ação sutil (ex: 'Compartilhe com quem está buscando um novo endereço no Bico do Papagaio') e encerramento com a assinatura oficial 'Seu novo começo tem um endereço.'",
  "hashtags": ["#ChavesDoBico", "#ImoveisAugustinopolis", "#BicoDoPapagaio", "#AluguelSeguro", "#EducacaoImobiliaria", "#SeuNovoComeco"],
  "visualPrompt": "Prompt descritivo em inglês para geração de fotografia arquitetônica hiper-realista (modern Brazilian architecture, natural golden hour lighting, clean minimalist interior/facade, high aesthetic, editorial photograph, 8k commercial quality, no text, no watermarks, no people in weird poses)",
  "carouselSlides": [
    {
      "slideNumber": 1,
      "title": "Capa do Carrossel",
      "body": "Gancho inicial impactante"
    },
    {
      "slideNumber": 2,
      "title": "Passo 1",
      "body": "Explicação prática e direta"
    },
    {
      "slideNumber": 3,
      "title": "Passo 2",
      "body": "Dica indispensável"
    },
    {
      "slideNumber": 4,
      "title": "Conclusão",
      "body": "Resumo e convite para salvar o post"
    }
  ]
}

Responda APENAS o JSON puro sem blocos markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating copy:', error);
    return res.status(500).json({ error: error.message || 'Falha ao gerar texto com IA' });
  }
});

// Endpoint to generate architectural / real-estate photography using Imagen / Gemini
app.post('/api/generate-image', async (req: Request, res: Response) => {
  try {
    const { prompt, aspectRatio = '3:4' } = req.body;

    if (!ai) {
      return res.status(200).json({
        fallback: true,
        message: 'GEMINI_API_KEY não configurada no servidor. Usando fotografia do acervo editorial.',
      });
    }

    // Call gemini-3.1-flash-lite-image server-side
    const cleanPrompt = `${prompt || 'High-end modern luxury residence in Brazil, cinematic warm natural lighting, tropical lush greenery, architectural photography, minimalist concrete and warm wood accents, 8k'}. Clean architectural shot, high resolution, no text, no logos, no distortion, no watermarks.`;

    // Map requested ratio to valid standard ratios
    let validRatio: '1:1' | '3:4' | '4:3' | '9:16' | '16:9' = '3:4';
    if (aspectRatio === '9:16' || aspectRatio === 'story') validRatio = '9:16';
    if (aspectRatio === '1:1') validRatio = '1:1';
    if (aspectRatio === '16:9') validRatio = '16:9';

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [
          {
            text: cleanPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: validRatio,
        },
      },
    });

    let imageUrl = '';
    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType ?? 'image/png';
        imageUrl = `data:${mime};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (imageUrl) {
      return res.json({ imageUrl, prompt: cleanPrompt });
    }

    return res.status(200).json({
      fallback: true,
      message: 'Geração de imagem retornou sem dados binários. Usando acervo editorial.',
    });
  } catch (error: any) {
    console.warn('Image generation error, fallback enabled:', error.message);
    return res.status(200).json({
      fallback: true,
      error: error.message,
      message: 'API em modo fallback seguro.',
    });
  }
});

// Vite Middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CHAVES DO BICO STUDIO] Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
