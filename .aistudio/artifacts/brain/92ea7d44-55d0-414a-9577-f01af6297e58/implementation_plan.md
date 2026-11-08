# CHAVES DO BICO — AI Creative Studio

Plataforma profissional de criação de conteúdo publicitário e educativo imobiliário para a marca **CHAVES DO BICO** (Augustinópolis e região do Bico do Papagaio), estruturada com padrão de agência premium, motor de geração de imagens por inteligência artificial com acervo editorial de alta fidelidade, aplicação rigorosa dos ativos oficiais da marca, fluxo semanal automatizado de 30 peças e controle de qualidade em 10 critérios.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> As preferências fundamentais de arquitetura e direção de arte foram consolidadas com base nas respostas fornecidas:

- **Motor de Imagens Híbrido**: Geração inteligente via `@google/genai` (Gemini 3.8 Flash para engenharia de prompts fotográficos e copy, e modelo de imagem server-side) integrada a um acervo editorial de segurança de altíssima resolução com arquiteturas modernas, interiores de alto padrão e paisagens residenciais da região. Isso garante que a produção semanal de 30 peças nunca seja interrompida por indisponibilidade de cota.
- **Produção Semanal em Lote (30 peças)**: Orquestração automática que divide exatamente o pacote solicitado:
  - 10 artes educativas (Feed vertical 1080x1350)
  - 5 carrosséis com 3 a 5 lâminas por carrossel (1080x1350)
  - 5 artes inspiracionais (Feed 1080x1350)
  - 5 conteúdos regionais focados em Augustinópolis e cidades do Bico (1080x1350)
  - 5 stories interativos com enquetes e caixas de perguntas simuladas (1080x1920)
- **Identidade Visual Inegociável**: Utilização direta dos 4 arquivos oficiais enviados (`Logo_Circular_de_Im_veis_e_Aluguel_cef08c79.png`, `Logo_Chave_do_Bico_em_Verde_Glossy_ed25a0f8.png`, `Encontre_Seu_Im_vel_Ideal_71003390.png` e `Logo_verde_moderno_Chave_do_Bico_6223ec15.png`). As logos nunca são redesenhadas nem distorcidas, aplicando-se sobreposições em alta definição com áreas de respiro calculadas.
- **Estética Editorial Imobiliária Sofisticada**: Tipografia nobre com `Plus Jakarta Sans` e `Cinzel`/`Playfair` para títulos de prestígio, paleta oficial (#004719, #087B18, #42D900, #C9FF24, #FFFFFF) e selos translúcidos de acabamento vidrado (*glassmorphism*) sem poluição visual.

---

## 1. Overview & Core Concept

- **O que a plataforma faz**: É um estúdio publicitário imobiliário completo onde corretores, gestores de marketing e a diretoria da CHAVES DO BICO podem disparar a produção semanal de 30 peças prontas para o Instagram, revisar cada arte em uma esteira de Controle de Qualidade (QC), personalizar textos/posicionamento de logos e exportar as imagens em alta resolução (PNG 1080x1350 e 1080x1920) junto com legendas completas e hashtags calibradas.
- **Público-alvo**: Gestores da CHAVES DO BICO, equipe de marketing imobiliário, designers e social media da imobiliária em Augustinópolis/TO.
- **Proposta de Valor**: Eliminar o gargalo da produção semanal sem sacrificar a sofisticação da marca, garantindo 100% de consistência visual, ausência de alucinações (como imóveis falsos ou preços inventados) e acabamento digno de grandes agências de publicidade.

---

## 2. User Experience & Visual Design

### Fluxos Principais do Usuário

1. **Dashboard & Planejador Semanal**: Visualização rápida da meta semanal (30/30), distribuição pelas 7 editorias e status de aprovação. Botão de ação primária: *"Gerar Novo Pacote Semanal"*.
2. **Gerador em Lote Inteligente**: Configuração do lote semanal com seleção de categorias prioritárias, estilo fotográfico (Cinematográfico, Luz Natural Dourada, Minimalista Editorial) e disparo do pipeline assíncrono com barra de progresso em tempo real.
3. **Fila de Controle de Qualidade (QC)**: Interface dedicada onde cada peça é avaliada contra os 10 critérios oficiais. O usuário pode aprovar com 1 clique, solicitar regeneração de imagem/texto ou ajustar no editor.
4. **Estúdio de Criação & Edição Interativa**:
   - Canvas em tempo real (HTML5 Canvas com exportação em resolução nativa 1080x1350 e 1080x1920).
   - Seletor da logo oficial: Circular, Emblema Glossy, Assinatura Verde Moderna ou Key Visual Institucional.
   - Posição da logo (superior esquerdo/direito, inferior central, cabeçalho de lâmina) com margens de segurança invioláveis.
   - Editor de textos, títulos, subtítulos, selo de categoria e rodapé com a assinatura oficial: *"Seu novo começo tem um endereço."*
   - Navegação lâmina por lâmina para formatos de Carrossel.
5. **Calendário Editorial & Banco de Legendas**: Agendamento de postagens de segunda a domingo, botão de cópia de legenda com 1 clique, hashtags segmentadas e tags de formato.
6. **Biblioteca de Marcas & Exportação**: Download de imagens individuais em PNG cristalino, exportação de lote semanal compactado (ZIP) e visualização do manual da marca.

### Identidade Visual & Diretrizes de Design

- **Canvas e Cores**:
  - Fundo principal: Ardósia profunda sofisticada (`#0A100D` e `#111C15`) para destacar as fotografias e o verde da marca, com modo claro limpo e profissional.
  - Verde-escuro institucional: `#004719`
  - Verde institucional: `#087B18`
  - Verde-limão vivo: `#42D900`
  - Verde luminoso: `#C9FF24` (reservado estritamente para realces pontuais e botões de ação)
  - Branco puro: `#FFFFFF`
- **Tipografia**:
  - Títulos e Destaques: `Plus Jakarta Sans` (pesos 600 e 800) e `Playfair Display` para toques editoriais de prestígio.
  - Corpo de texto e legendas: `DM Sans` / `Plus Jakarta Sans` (14px–16px, excelente legibilidade móvel).
  - Metadados e datas: `font-mono tabular-nums` para alinhamento impecável.
- **Zero-Pill & Anti-Slop**:
  - Sem tags ou pílulas coloridas artificiais sobre o conteúdo. Metadados apresentados com divisores tipográficos limpos (`·`, `/`).
  - Sem textos inventando dados de bairros, preços de aluguel ou propriedades falsas.
  - Selos translúcidos elegantes com vidro escurecido suave (`backdrop-blur-md bg-black/40 border border-white/10`) garantindo contraste acima de 4.5:1 sobre qualquer foto.

---

## 3. As 7 Editorias Estratégicas de Conteúdo

Todas as peças geradas são rigorosamente enquadradas nas editorias definidas pela marca:

| Editoria | Foco Temático | Formatos Típicos |
| :--- | :--- | :--- |
| **A. CHAVES DO CONHECIMENTO** | Vistoria, caução, fiador, interpretação de contratos, direitos e deveres de locador/locatário | Carrossel Educativo & Feed Vertical |
| **B. CUIDANDO DO MEU LAR** | Conservação predial, prevenção de infiltrações e mofo, organização, hidráulica/elétrica | Feed Vertical & Stories de Dicas |
| **C. RELACIONAMENTO IMOBILIÁRIO** | Diálogo proprietário-inquilino, boas práticas de administração, resolução amigável | Feed Vertical & Carrossel |
| **D. CONDOMÍNIOS E CONVIVÊNCIA** | Regras de convivência, papel do síndico, uso de áreas comuns, respeito sonoro | Stories Interativos & Feed |
| **E. VIVER BEM** | Decoração afetiva, iluminação, bem-estar na nova casa, segurança residencial | Artes Inspiracionais & Carrossel |
| **F. MEU LUGAR NO BICO** | Augustinópolis e cidades vizinhas do Tocantins, valorização da vida no Bico do Papagaio | Conteúdo Regional & Stories |
| **G. EDUCAÇÃO IMOBILIÁRIA** | Financiamento, compra e venda consciente, documentação cartorária, negociação | Carrossel Passo a Passo & Feed |

---

## 4. Arquitetura Técnica & Estrutura de Dados

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CHAVES DO BICO STUDIO                         │
├────────────────────────────────────────────────────────────────────────┤
│  Top Bar: [CHAVES DO BICO Wordmark] ─ [Navegação de Módulos] ─ [Novo Lote]│
├───────────────────┬────────────────────────────────────────────────────┤
│  Sidebar          │  Área Principal de Trabalho                        │
│  · Dashboard      │  ┌───────────────────────────────────────────────┐ │
│  · Gerador Lote   │  │ Modos:                                        │ │
│  · Estúdio Canvas │  │ 1. Visão Geral da Semana (30 peças)           │ │
│  · Esteira de QC  │  │ 2. Canvas Interativo (1080x1350 / 1080x1920)  │ │
│  · Calendário     │  │ 3. Checklist de Controle de Qualidade         │ │
│  · Galeria        │  │ 4. Calendário Editorial com Filtro Editorias  │ │
│  · Brand Assets   │  └───────────────────────────────────────────────┘ │
├───────────────────┴────────────────────────────────────────────────────┤
│  Serviços Backend (Express + tsx em server.ts):                        │
│  · POST /api/generate-image  -> Gemini Imagen / Curated Studio Engine │
│  · POST /api/generate-copy   -> Gemini 3.8 Flash (Textos e Legendas)  │
│  · POST /api/batch-weekly    -> Orquestrador do Lote de 30 Peças      │
└────────────────────────────────────────────────────────────────────────┘
```

### Componentes Principais

1. **`server.ts`**: Servidor Express com rotas de API seguras para o SDK `@google/genai` utilizando `GEMINI_API_KEY`, garantindo geração de prompts de alta fidelidade e textos em português brasileiro formal e acolhedor.
2. **`StudioCanvas.tsx`**: Motor gráfico baseado em HTML5 Canvas de alta resolução com suporte a renderização offscreen em 1080x1350 e 1080x1920, posicionamento preciso das logos oficiais sem distorção e exportação para Blob PNG.
3. **`WeeklyBatchGenerator.tsx`**: Orquestrador do pacote de 30 peças com seletor de editorias, distribuição equilibrada e barra de geração progressiva.
4. **`QualityControlQueue.tsx`**: Painel de conferência com os 10 itens de validação obrigatórios antes do status "Aprovado".
5. **`EditorialCalendar.tsx`**: Grade semanal de publicação com distribuição por dias, horários nobres de engajamento no Instagram e filtros de categoria.
6. **`BrandAssetsLibrary.tsx`**: Visualização e download dos 4 ativos oficiais em alta resolução, paleta de cores hexadecimal com cópia rápida e guia de tom de voz.
7. **`Storage & State Manager`**: Armazenamento reativo no cliente (`localStorage` com persistência segura das campanhas geradas, status de aprovação e notas de revisão).

---

## 5. Plano de Implementação em Fases

- **Fase 1: Configuração Full-Stack & Identidade**:
  - Configurar servidor `server.ts` com Vite middleware e rotas `/api/*`.
  - Atualizar `metadata.json` e `<head>` do `index.html` com branding oficial.
  - Carregar ativos locais dos logotipos oficiais em `/public/assets/aistudio/`.
- **Fase 2: Motor Gráfico Canvas & Templates Editoriais**:
  - Implementar renderer em resolução 1080x1350 e 1080x1920 com diagramação tipográfica refinada.
  - Incorporar sobreposição das 4 variações da logo com margens de respiro oficiais.
- **Fase 3: Motor de Geração IA & Banco de Conteúdo**:
  - Implementar geração de prompts e copys publicitárias imobiliárias via Gemini 3.8 Flash.
  - Integrar geração de imagens de arquitetura e fotografia imobiliária realista com fallback editorial integrado.
- **Fase 4: Painel Administrativo, QC & Exportação**:
  - Construir Dashboard com KPIs e gerador semanal de 30 itens.
  - Desenvolver esteira de Controle de Qualidade (QC) em 10 critérios.
  - Criar calendário editorial e exportador em lote (PNG individual e pacote compactado).
- **Fase 5: Verificação & Polimento**:
  - Testes de renderização gráfica, validação de ortografia em português, compilação TypeScript e checagem de contraste visual.
