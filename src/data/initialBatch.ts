import { ContentPiece } from '../types/content';
import { CURATED_REAL_ESTATE_PHOTOS, getPhotographicFallback } from './curatedPhotography';

function getPhoto(index: number, seed: string): string {
  const photo = CURATED_REAL_ESTATE_PHOTOS[index % CURATED_REAL_ESTATE_PHOTOS.length];
  return photo ? photo.url : getPhotographicFallback(seed);
}

export const INITIAL_WEEKLY_BATCH: ContentPiece[] = [
  // ==========================================
  // 1. 10 ARTES EDUCATIVAS (FEED 1080x1350)
  // ==========================================
  {
    id: 'cb-edu-01',
    categoryId: 'A',
    categoryTitle: 'CHAVES DO CONHECIMENTO',
    format: 'feed',
    title: 'O que observar antes de assinar o aluguel',
    subtitle: 'Itens essenciais de infraestrutura e documentação para uma escolha tranquila.',
    body: 'Verifique pressão de água, quadro de disjuntores, vedação de janelas e histórico de manutenção.',
    imageUrl: getPhoto(0, 'edu01'),
    visualPrompt: 'High-end Brazilian residential entrance, clean architectural lines, natural morning light, elegant wooden door, 8k quality',
    caption: `Antes de pegar as chaves do seu novo endereço, uma análise atenta evita qualquer surpresa na rotina.

Confira sempre a pressão da água em todos os pontos, o estado geral dos disjuntores elétricos, o alinhamento das esquadrias e a vedação contra chuvas fortes. Além disso, leia cada cláusula contratual com clareza.

Aqui na Chaves do Bico, intermediamos com transparência e segurança jurídica para que locador e locatário tenham total tranquilidade.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#AluguelSeguro', '#EducacaoImobiliaria', '#Augustinopolis', '#BicoDoPapagaio', '#SeuNovoComeco'],
    suggestedDate: 'Segunda-feira',
    suggestedTime: '08:30',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'GUIA PRÁTICO',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
      reviewedAt: 'Hoje, 09:15',
      notes: 'Arte 100% em conformidade com as diretrizes da marca.',
    },
  },
  {
    id: 'cb-edu-02',
    categoryId: 'A',
    categoryTitle: 'CHAVES DO CONHECIMENTO',
    format: 'feed',
    title: 'Como funciona a vistoria de entrada',
    subtitle: 'O documento que protege o seu patrimônio do início ao fim da locação.',
    body: 'Registros fotográficos minuciosos garantem que você receba e entregue o imóvel com justiça.',
    imageUrl: getPhoto(7, 'edu02'),
    visualPrompt: 'Keys on a warm solid oak table next to a clean architectural contract blueprint, soft lighting, 8k',
    caption: `A vistoria de entrada é o documento mais importante no início de uma locação.

Ela detalha o estado exato de pintura, pisos, torneiras, trincos e instalações. Quando tudo é documentado com fotografias e laudo técnico, você tem a garantia de devolver o imóvel nas mesmas condições, sem custos indevidos.

Na Chaves do Bico, a vistoria é levada a sério com padrão técnico e imparcialidade.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#VistoriaImobiliaria', '#LocacaoSegura', '#ContratosImobiliarios', '#Augustinopolis'],
    suggestedDate: 'Terça-feira',
    suggestedTime: '11:45',
    status: 'approved',
    logoVariant: 'glossy',
    logoPosition: 'top-right',
    themeStyle: 'editorial-dark',
    badgeText: 'SEGURANÇA JURÍDICA',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
      reviewedAt: 'Hoje, 10:20',
    },
  },
  {
    id: 'cb-edu-03',
    categoryId: 'B',
    categoryTitle: 'CUIDANDO DO MEU LAR',
    format: 'feed',
    title: 'Conservação de pisos e revestimentos',
    subtitle: 'Dicas práticas para manter o brilho e a durabilidade dos acabamentos.',
    body: 'Evite produtos abrasivos e utilize feltros sob os pés dos móveis para preservar o piso.',
    imageUrl: getPhoto(1, 'edu03'),
    visualPrompt: 'Luxury living room with polished light concrete and wooden floors, minimalist interior design, natural sunlight, 8k',
    caption: `Pequenos hábitos diários mantêm os pisos do seu imóvel impecáveis por anos.

Colocar protetores de feltro nos pés de cadeiras e mesas, evitar produtos corrosivos ou com excesso de cloro em porcelanatos e limpar respingos imediatamente são cuidados simples que preservam o acabamento e valorizam o ambiente.

Cuidar do espaço onde você vive é valorizar a sua própria história.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#CuidandoDoMeuLar', '#Conservacao', '#DicasDeCasa', '#BemEstar', '#Augustinopolis'],
    suggestedDate: 'Quarta-feira',
    suggestedTime: '17:00',
    status: 'approved',
    logoVariant: 'modern',
    logoPosition: 'top-left',
    themeStyle: 'clean-white',
    badgeText: 'MANUTENÇÃO',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
      reviewedAt: 'Hoje, 11:00',
    },
  },
  {
    id: 'cb-edu-04',
    categoryId: 'B',
    categoryTitle: 'CUIDANDO DO MEU LAR',
    format: 'feed',
    title: 'Prevenção de infiltrações e mofo',
    subtitle: 'Como a ventilação cruzada protege a saúde da família e a estrutura predial.',
    body: 'Abra janelas diariamente nas primeiras horas da manhã para renovar o ar e manter paredes secas.',
    imageUrl: getPhoto(3, 'edu04'),
    visualPrompt: 'Airy serene bedroom with large open glass windows, gentle breeze in linen curtains, natural morning light, 8k',
    caption: `No clima do Bico do Papagaio, a umidade pode surgir rapidamente se os ambientes ficarem fechados por longos períodos.

Pratique a ventilação cruzada abrindo janelas e portas em lados opostos por pelo menos 30 minutos pela manhã. Além de manter paredes livres de umidade e mofo, o ar renovado traz mais disposição e bem-estar para toda a família.

Dica Chaves do Bico para o seu lar.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#DicasParaCasa', '#SaudeNoLar', '#CuidandoDoMeuLar', '#Tocantins'],
    suggestedDate: 'Quinta-feira',
    suggestedTime: '09:00',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'DICA DE OURO',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
      reviewedAt: 'Ontem',
    },
  },
  {
    id: 'cb-edu-05',
    categoryId: 'C',
    categoryTitle: 'RELACIONAMENTO IMOBILIÁRIO',
    format: 'feed',
    title: 'A importância de acordos documentados',
    subtitle: 'Por que mensagens informais nunca devem substituir um aditivo contratual.',
    body: 'Qualquer ajuste em prazos ou benfeitorias deve constar por escrito para segurança de ambos.',
    imageUrl: getPhoto(6, 'edu05'),
    visualPrompt: 'Organized modern wooden office desk with fountain pen, documents, minimalist laptop and indoor green plant, soft daylight, 8k',
    caption: `Em qualquer relação de locação, a clareza é a base da tranquilidade.

Se você e o proprietário combinarem uma melhoria no imóvel, carência de aluguel ou mudança de prazo, formalize sempre por escrito através de um termo aditivo ou e-mail registrado. Acordos claros evitam ruídos e mantêm uma convivência harmoniosa durante todo o contrato.

A Chaves do Bico cuida da mediação para que tudo flua com respeito e segurança.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#RelacionamentoImobiliario', '#SegurancaJuridica', '#AluguelComRespeito', '#Augustinopolis'],
    suggestedDate: 'Sexta-feira',
    suggestedTime: '14:30',
    status: 'approved',
    logoVariant: 'glossy',
    logoPosition: 'top-right',
    themeStyle: 'editorial-dark',
    badgeText: 'BOAS PRÁTICAS',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
      reviewedAt: 'Hoje, 12:10',
    },
  },
  {
    id: 'cb-edu-06',
    categoryId: 'G',
    categoryTitle: 'EDUCAÇÃO IMOBILIÁRIA',
    format: 'feed',
    title: 'Caução x Fiador: entenda as diferenças',
    subtitle: 'Conheça as modalidades de garantia locatícia mais utilizadas e suas características.',
    body: 'A caução oferece praticidade em depósito; o fiador exige patrimônio imobiliário comprovado.',
    imageUrl: getPhoto(7, 'edu06'),
    visualPrompt: 'Warm luxury architectural interior with geometric shadows and minimalist modern aesthetic, 8k',
    caption: `Qual é a melhor garantia para o seu momento financeiro?

• Caução: depósito em conta vinculada conforme previsto na Lei do Inquilinato, devolvido com rendimentos ao fim da locação se tudo estiver em dia.
• Fiador: terceiro que assume a responsabilidade solidária, necessitando de imóvel quitado em seu nome.

Compreender essas opções permite planejar a mudança com antecedência e sem frustrações.

Fale com nossa equipe e tire suas dúvidas.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#GarantiaLocaticia', '#EducacaoImobiliaria', '#AluguelAugustinopolis', '#BicoDoPapagaio'],
    suggestedDate: 'Sábado',
    suggestedTime: '10:00',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'DIREITO IMOBILIÁRIO',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
      reviewedAt: 'Hoje',
    },
  },
  {
    id: 'cb-edu-07',
    categoryId: 'B',
    categoryTitle: 'CUIDANDO DO MEU LAR',
    format: 'feed',
    title: 'Cuidados com a rede elétrica e hidráulica',
    subtitle: 'Como prevenir vazamentos silenciosos e sobrecargas no quadro de energia.',
    body: 'Testes simples no hidrômetro e no disjuntor diferencial evitam desperdício e aumentam a segurança.',
    imageUrl: getPhoto(2, 'edu07'),
    visualPrompt: 'Architectural kitchen island with brass faucet and modern minimalist backsplash, soft diffused light, 8k',
    caption: `Vazamentos ocultos podem elevar a conta de água sem que você perceba.

Antes de dormir, feche todas as torneiras e anote os números do hidrômetro. Se pela manhã o marcador tiver avançado, pode haver um vazamento na descarga ou tubulação embutida. Na parte elétrica, nunca sobrecarregue adaptadores de tomada ('benjamins').

Atenção e cuidado preventivo protegem o seu bolso e o seu imóvel.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#EconomiaDomestica', '#CuidadosComACasa', '#ManutencaoPreventiva', '#BicoDoPapagaio'],
    suggestedDate: 'Domingo',
    suggestedTime: '16:00',
    status: 'approved',
    logoVariant: 'modern',
    logoPosition: 'top-left',
    themeStyle: 'clean-white',
    badgeText: 'ECONOMIA',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
      reviewedAt: 'Ontem',
    },
  },
  {
    id: 'cb-edu-08',
    categoryId: 'A',
    categoryTitle: 'CHAVES DO CONHECIMENTO',
    format: 'feed',
    title: 'Direitos e deveres do locatário',
    subtitle: 'O equilíbrio previsto na Lei 8.245 que assegura uma locação justa e amigável.',
    body: 'O inquilino tem direito a receber o imóvel em condições plenas de uso e deve zelar pela sua conservação.',
    imageUrl: getPhoto(1, 'edu08'),
    visualPrompt: 'Contemporary interior with large floor to ceiling glass windows, green courtyard view, high ceiling, 8k',
    caption: `A Lei do Inquilinato estabelece com precisão os direitos e deveres de ambas as partes.

É direito do inquilino receber o imóvel em perfeito estado de habitabilidade, com reparos estruturais sob responsabilidade do locador. Por sua vez, manutenções decorrentes do uso diário e o pagamento pontual são compromissos essenciais do locatário.

Com informação e respeito mútuo, a locação se torna uma parceria de sucesso.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#LeiDoInquilinato', '#DireitoImobiliario', '#LocacaoSegura', '#Augustinopolis'],
    suggestedDate: 'Segunda-feira',
    suggestedTime: '12:30',
    status: 'pending_qc',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'LEGISLAÇÃO',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: false,
      notes: 'Aguardando validação final de contraste na tipografia inferior.',
    },
  },
  {
    id: 'cb-edu-09',
    categoryId: 'G',
    categoryTitle: 'EDUCAÇÃO IMOBILIÁRIA',
    format: 'feed',
    title: 'Documentos necessários para comprar um imóvel',
    subtitle: 'Checklist inicial das certidões e certidões negativas que garantem tranquilidade.',
    body: 'Matrícula atualizada, certidões negativas de débito e certidões dos distribuidores cíveis e fiscais.',
    imageUrl: getPhoto(0, 'edu09'),
    visualPrompt: 'Architectural residential facade in warm Brazilian evening light, clean manicured lawn, modern lines, 8k',
    caption: `A compra de um imóvel é um dos passos mais importantes da sua vida financeira.

Antes de qualquer pagamento, exija a certidão de ônus e matrícula atualizada no Cartório de Registro de Imóveis, certidão negativa de débitos de IPTU na prefeitura e certidões dos vendedores.

Nossa equipe acompanha cada detalhe para que sua conquista seja celebrada sem receios.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#CompraDeImovel', '#DocumentacaoImobiliaria', '#InvestimentoSeguro', '#Augustinopolis'],
    suggestedDate: 'Quarta-feira',
    suggestedTime: '15:15',
    status: 'approved',
    logoVariant: 'glossy',
    logoPosition: 'top-right',
    themeStyle: 'editorial-dark',
    badgeText: 'COMPRA E VENDA',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-edu-10',
    categoryId: 'B',
    categoryTitle: 'CUIDANDO DO MEU LAR',
    format: 'feed',
    title: 'Checklist para a entrega das chaves',
    subtitle: 'Tudo o que você precisa conferir para finalizar sua locação com nota 10.',
    body: 'Pintura na cor original, reparo de pequenos furos, limpeza completa e quitação de contas de consumo.',
    imageUrl: getPhoto(7, 'edu10'),
    visualPrompt: 'Hand holding a silver house key in front of a modern warm wooden doorway, warm rim light, professional photo, 8k',
    caption: `Encerrar um contrato de locação com tranquilidade depende de um bom checklist de encerramento.

Revise a cor e o padrão da tinta indicado na vistoria de entrada, tampe furos de quadros com massa corrida, limpe vidros e ralos e solicite o desligamento ou transferência de titularidade de energia e água com os comprovantes em mãos.

Transparência do primeiro ao último dia.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#EntregaDeImovel', '#LocacaoTransparente', '#VistoriaFinal', '#Augustinopolis'],
    suggestedDate: 'Sexta-feira',
    suggestedTime: '18:00',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'CHECKLIST',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },

  // ==========================================
  // 2. 5 CARROSSÉIS EDUCATIVOS (1080x1350 por lâmina)
  // ==========================================
  {
    id: 'cb-car-01',
    categoryId: 'A',
    categoryTitle: 'CHAVES DO CONHECIMENTO',
    format: 'carousel',
    title: 'Guia definitivo da vistoria de imóveis',
    subtitle: 'Passo a passo com 4 lâminas para você nunca mais ter dores de cabeça.',
    body: 'Arraste para o lado e conheça cada detalhe a ser conferido antes de assinar.',
    imageUrl: getPhoto(0, 'car01'),
    visualPrompt: 'Architectural modern entrance facade with lush tropical garden, natural cinematic lighting, 8k',
    activeSlideIndex: 0,
    carouselSlides: [
      {
        slideNumber: 1,
        title: 'Guia definitivo da vistoria de imóveis',
        body: 'O que você precisa registrar minuciosamente antes de assinar o laudo de entrada.',
      },
      {
        slideNumber: 2,
        title: '01. Esquadrias e Fechaduras',
        body: 'Abra e feche todas as portas e janelas. Teste as chaves em ambos os lados e observe o alinhamento das trincas.',
      },
      {
        slideNumber: 3,
        title: '02. Elétrica e Tomadas',
        body: 'Teste cada tomada com um carregador. Verifique interruptores, soquetes de lâmpadas e o estado do quadro geral.',
      },
      {
        slideNumber: 4,
        title: '03. Hidráulica e Ralos',
        body: 'Deixe torneiras abertas por 1 minuto, observe o escoamento nos ralos e confira se há gotejamento sob pias.',
      },
    ],
    caption: `Arraste para o lado e salve este guia antes da sua próxima visita técnica! 📲

A vistoria não é uma formalidade burocrática: ela é a sua maior garantia jurídica e patrimonial. Documentar cada detalhe com fotos datadas e anotações técnicas assegura uma locação justa do primeiro ao último dia.

Compartilhe com quem vai mudar de imóvel em breve em Augustinópolis e região!

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#CarrosselImobiliario', '#VistoriaTecnica', '#AluguelAugustinopolis', '#DicasDeAluguel'],
    suggestedDate: 'Terça-feira',
    suggestedTime: '19:30',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'CARROSSEL PRÁTICO',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-car-02',
    categoryId: 'G',
    categoryTitle: 'EDUCAÇÃO IMOBILIÁRIA',
    format: 'carousel',
    title: '4 passos para alugar com segurança no Bico',
    subtitle: 'Do planejamento orçamentário à entrega definitiva das chaves.',
    body: 'Como estruturar sua mudança sem riscos e com suporte especializado.',
    imageUrl: getPhoto(1, 'car02'),
    visualPrompt: 'Spacious modern living room with warm afternoon glow, minimalist furniture, 8k',
    activeSlideIndex: 0,
    carouselSlides: [
      {
        slideNumber: 1,
        title: '4 passos para alugar com segurança',
        body: 'Um roteiro objetivo para você encontrar o espaço perfeito para a sua família.',
      },
      {
        slideNumber: 2,
        title: 'Passo 1: Defina o Orçamento Total',
        body: 'Some ao aluguel os custos previstos de energia, água, IPTU e taxa condominial para não comprometer a renda.',
      },
      {
        slideNumber: 3,
        title: 'Passo 2: Escolha a Localização Ideal',
        body: 'Avalie a rotina da família: proximidade de escolas, farmácias, supermercados e vias de acesso em Augustinópolis.',
      },
      {
        slideNumber: 4,
        title: 'Passo 3: Documentação sem Burocracia',
        body: 'Organize comprovantes de renda e identificação previamente para agilizar a análise cadastral.',
      },
    ],
    caption: `Mudar de imóvel deve ser um momento de entusiasmo, nunca de estresse.

Seguindo esses 4 passos, você garante que o novo endereço combine perfeitamente com as finanças e com a rotina de quem você ama.

Tem dúvidas sobre o processo? Conte com a equipe Chaves do Bico para te guiar.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#EducacaoImobiliaria', '#AluguelFacil', '#AugustinopolisTO', '#BicoDoPapagaio'],
    suggestedDate: 'Quarta-feira',
    suggestedTime: '12:00',
    status: 'approved',
    logoVariant: 'glossy',
    logoPosition: 'top-right',
    themeStyle: 'editorial-dark',
    badgeText: 'PASSO A PASSO',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-car-03',
    categoryId: 'B',
    categoryTitle: 'CUIDANDO DO MEU LAR',
    format: 'carousel',
    title: 'Manual anti-infiltração para épocas de chuva',
    subtitle: 'Proteja tetos, paredes e rodapés das tempestades tropicais da região.',
    body: 'Medidas preventivas antes do período chuvoso preservam a estrutura do imóvel.',
    imageUrl: getPhoto(5, 'car03'),
    visualPrompt: 'Modern balcony with clean architectural overhang and potted tropical plants, overcast dramatic sky, 8k',
    activeSlideIndex: 0,
    carouselSlides: [
      {
        slideNumber: 1,
        title: 'Manual anti-infiltração no período chuvoso',
        body: 'Como preparar o imóvel e agir antes que a umidade cause transtornos.',
      },
      {
        slideNumber: 2,
        title: '01. Calhas e Rufos',
        body: 'Mantenha calhas desobstruídas de folhas e galhos para evitar transbordamento para o forro.',
      },
      {
        slideNumber: 3,
        title: '02. Vedação de Janelas e Portas',
        body: 'Verifique se as borrachas e o silicone de vedação externa continuam flexíveis e bem aderidos.',
      },
      {
        slideNumber: 4,
        title: '03. Aviso Rápido à Imobiliária',
        body: 'Ao notar qualquer mancha escura no teto, fotografe e avise imediatamente para reparo na cobertura.',
      },
    ],
    caption: `No norte do Tocantins, as chuvas intensas exigem atenção redobrada com calhas, rufos e ralos.

A manutenção preventiva custa muito menos do que reparar uma parede infiltrada e garante que o seu lar continue seco e confortável.

Salve este carrossel e revise sua casa antes das próximas chuvas!

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#CuidandoDoLar', '#Prevencao', '#DicasImobiliarias', '#BicoDoPapagaio'],
    suggestedDate: 'Quinta-feira',
    suggestedTime: '18:30',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'PREVENÇÃO',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-car-04',
    categoryId: 'C',
    categoryTitle: 'RELACIONAMENTO IMOBILIÁRIO',
    format: 'carousel',
    title: 'Boa convivência entre locador e locatário',
    subtitle: 'Os 3 pilares de uma relação transparente, respeitosa e de longo prazo.',
    body: 'Comunicação direta, compromissos em dia e mediação especializada.',
    imageUrl: getPhoto(6, 'car04'),
    visualPrompt: 'Warm contemporary living space with clean daylight and architectural wooden furniture, 8k',
    activeSlideIndex: 0,
    carouselSlides: [
      {
        slideNumber: 1,
        title: 'Os 3 pilares da boa convivência na locação',
        body: 'Como manter um relacionamento tranquilo e respeitoso durante todo o contrato.',
      },
      {
        slideNumber: 2,
        title: 'Pilar 1: Comunicação Clara e Respeitosa',
        body: 'Sempre que houver necessidade de manutenção, descreva o problema com clareza e envie fotos detalhadas.',
      },
      {
        slideNumber: 3,
        title: 'Pilar 2: Pontualidade e Transparência',
        body: 'Honrar os compromissos contratuais mantém as portas abertas e constrói um histórico exemplar.',
      },
      {
        slideNumber: 4,
        title: 'Pilar 3: Mediação Profissional',
        body: 'Conte com a intermediação da Chaves do Bico para orientar e resolver qualquer demanda com equilíbrio.',
      },
    ],
    caption: `Um bom relacionamento entre proprietário e inquilino é a receita para uma locação tranquila e proveitosa para todos.

Quando ambas as partes agem com clareza, empatia e cumprem o acordado, a moradia se torna leve e sem desgastes.

Aqui na Chaves do Bico, trabalhamos como ponte de confiança entre pessoas.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#Relacionamento', '#ConfiancaImobiliaria', '#Augustinopolis', '#BicoDoPapagaio'],
    suggestedDate: 'Sexta-feira',
    suggestedTime: '13:00',
    status: 'approved',
    logoVariant: 'modern',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'CONVIVÊNCIA',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-car-05',
    categoryId: 'E',
    categoryTitle: 'VIVER BEM',
    format: 'carousel',
    title: 'Como organizar os cômodos após a mudança',
    subtitle: 'Cronograma prático para desempacotar caixas sem cansaço e sem caos.',
    body: 'Ordem de prioridade para começar a desfrutar do novo lar no primeiro fim de semana.',
    imageUrl: getPhoto(2, 'car05'),
    visualPrompt: 'Minimalist modern kitchen and dining room with warm wood and marble, peaceful ambient lighting, 8k',
    activeSlideIndex: 0,
    carouselSlides: [
      {
        slideNumber: 1,
        title: 'Organização prática pós-mudança',
        body: 'O cronograma ideal para desempacotar com calma e transformar o imóvel em lar.',
      },
      {
        slideNumber: 2,
        title: 'Dia 1: Quarto e Banheiro Primeiro',
        body: 'Monte as camas e abasteça o banheiro essencial para garantir uma noite de sono revigorante no primeiro dia.',
      },
      {
        slideNumber: 3,
        title: 'Dia 2: Cozinha Funcional',
        body: 'Ligue a geladeira, organize copos, pratos e talheres de uso diário antes dos itens decorativos.',
      },
      {
        slideNumber: 4,
        title: 'Dia 3: Sala e Detalhes Afetivos',
        body: 'Posicione os sofás, conecte a internet e decore com objetos que tragam memórias felizes para a casa.',
      },
    ],
    caption: `A melhor sensação de uma mudança é quando a última caixa é guardada e o espaço ganha o cheiro de lar.

Com um roteiro simples de prioridades, sua família evita a sobrecarga e já aproveita os primeiros dias com conforto e paz de espírito.

Pronto para dar o próximo passo? Conheça as oportunidades na região de Augustinópolis com a Chaves do Bico.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#ViverBem', '#OrganizacaoNoLar', '#MudancaTranquila', '#Augustinopolis'],
    suggestedDate: 'Sábado',
    suggestedTime: '11:00',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'BEM-ESTAR',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },

  // ==========================================
  // 3. 5 ARTES INSPIRACIONAIS (FEED 1080x1350)
  // ==========================================
  {
    id: 'cb-insp-01',
    categoryId: 'E',
    categoryTitle: 'VIVER BEM',
    format: 'feed',
    title: 'Seu novo começo tem um endereço',
    subtitle: 'A casa certa não é apenas metros quadrados; é o cenário dos seus melhores dias.',
    body: 'Espaços que inspiram acolhimento, conversas longas e memórias inesquecíveis.',
    imageUrl: getPhoto(0, 'insp01'),
    visualPrompt: 'Architectural luxury modern home in Brazil with glowing warm interior and reflection pool, dusk lighting, 8k',
    caption: `Mudar é mais do que trocar de chave: é inaugurar novos planos, acolher quem amamos e construir lembranças que duram a vida toda.

Em cada bairro e em cada detalhe, existe um lugar que combina com a sua história.

A Chaves do Bico está aqui para ajudar você a encontrá-lo.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#SeuNovoComeco', '#InspiracaoImobiliaria', '#Augustinopolis', '#BicoDoPapagaio'],
    suggestedDate: 'Segunda-feira',
    suggestedTime: '07:30',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'MANIFESTO DA MARCA',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-insp-02',
    categoryId: 'E',
    categoryTitle: 'VIVER BEM',
    format: 'feed',
    title: 'A luz natural transforma a atmosfera da casa',
    subtitle: 'Ambientes integrados e iluminados despertam sensações diárias de amplitude e paz.',
    body: 'Priorize imóveis com boa ventilação e janelas amplas para valorizar sua rotina.',
    imageUrl: getPhoto(1, 'insp02'),
    visualPrompt: 'Minimalist high-ceiling living room with pure morning sunlight filtering through architectural sheer blinds, 8k',
    caption: `A luz natural é o elemento mais sofisticado de qualquer projeto arquitetônico.

Ela altera a percepção do espaço, aquece os tons dos acabamentos e convida a família a compartilhar os melhores momentos do dia com leveza.

Observe a orientação solar do seu futuro imóvel antes de decidir.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#ArquiteturaResidencial', '#LuzNatural', '#BemEstar', '#Augustinopolis'],
    suggestedDate: 'Terça-feira',
    suggestedTime: '08:00',
    status: 'approved',
    logoVariant: 'glossy',
    logoPosition: 'top-right',
    themeStyle: 'editorial-dark',
    badgeText: 'DESIGN & VIDA',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-insp-03',
    categoryId: 'E',
    categoryTitle: 'VIVER BEM',
    format: 'feed',
    title: 'Onde o domingo realmente descansa',
    subtitle: 'Criar cantos de descompressão faz de qualquer residência um verdadeiro refúgio.',
    body: 'Uma poltrona confortável, uma planta bem cuidada e a tranquilidade de estar no seu lugar.',
    imageUrl: getPhoto(3, 'insp03'),
    visualPrompt: 'Cozy modern bedroom corner with green potted ficus lyrata, linen armchair and warm wood floor, soft sunlight, 8k',
    caption: `Quando você chega em casa e sente que o mundo lá fora pode esperar, você sabe que escolheu o endereço certo.

O conforto não está no exagero, mas na harmonia entre as suas necessidades e o espaço que você habita.

Valorize o seu tempo e o seu refúgio.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#ViverBem', '#RefugioUrbano', '#QualidadeDeVida', '#BicoDoPapagaio'],
    suggestedDate: 'Domingo',
    suggestedTime: '09:00',
    status: 'approved',
    logoVariant: 'modern',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'REFÚGIO',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-insp-04',
    categoryId: 'E',
    categoryTitle: 'VIVER BEM',
    format: 'feed',
    title: 'A cozinha como coração dos encontros',
    subtitle: 'Espaços funcionais e acolhedores aproximam conversas e celebram refeições.',
    body: 'Planeje sua casa pensando nas pessoas que irão enchê-la de sorrisos.',
    imageUrl: getPhoto(2, 'insp04'),
    visualPrompt: 'Modern warm kitchen island with natural marble, sleek wooden cabinets and pendant lights, 8k',
    caption: `Muito mais do que preparar receitas: a cozinha é onde as melhores histórias da família começam.

Uma ilha gourmet espaçosa, boa circulação e iluminação acolhedora convidam todo mundo a participar da conversa enquanto o jantar fica pronto.

Encontre o espaço ideal para os seus encontros com a Chaves do Bico.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#CozinhaGourmet', '#CasaEFamilia', '#AugustinopolisTO', '#ImoveisNoBico'],
    suggestedDate: 'Quinta-feira',
    suggestedTime: '19:00',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'ENCONTROS',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-insp-05',
    categoryId: 'E',
    categoryTitle: 'VIVER BEM',
    format: 'feed',
    title: 'Tranquilidade para quem você mais ama',
    subtitle: 'A segurança de um bairro acolhedor e de um contrato bem estruturado.',
    body: 'Paz de espírito é saber que você e sua família estão amparados no lugar certo.',
    imageUrl: getPhoto(4, 'insp05'),
    visualPrompt: 'Modern quiet residential neighborhood in Brazil with green landscaping and safe wide sidewalks at dusk, 8k',
    caption: `Morar bem é ter a certeza de que seus filhos podem crescer com tranquilidade, espaço e liberdade.

Quando a intermediação imobiliária é feita com seriedade e respeito aos contratos, a sua única preocupação é aproveitar a vida no novo lar.

Chaves do Bico: compromisso com a sua tranquilidade.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#SegurancaResidencial', '#Familia', '#MorarBem', '#Augustinopolis'],
    suggestedDate: 'Sexta-feira',
    suggestedTime: '17:30',
    status: 'approved',
    logoVariant: 'glossy',
    logoPosition: 'top-right',
    themeStyle: 'editorial-dark',
    badgeText: 'SEGURANÇA',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },

  // ==========================================
  // 4. 5 CONTEÚDOS REGIONAIS (FEED 1080x1350)
  // ==========================================
  {
    id: 'cb-reg-01',
    categoryId: 'F',
    categoryTitle: 'MEU LUGAR NO BICO',
    format: 'feed',
    title: 'Augustinópolis: O polo de oportunidades do Bico',
    subtitle: 'Educação, saúde e comércio forte consolidam a cidade como referência no Tocantins.',
    body: 'Por que cada vez mais famílias e profissionais escolhem Augustinópolis para construir sua história.',
    imageUrl: getPhoto(5, 'reg01'),
    visualPrompt: 'Elevated panorama view of a growing vibrant Brazilian city with green surrounding vegetation and blue sky, 8k',
    caption: `Augustinópolis é sinônimo de dinamismo e acolhimento no norte do Tocantins.

Com universidades, polo médico em expansão e um comércio regional pujante, a cidade atrai profissionais, estudantes e famílias que buscam qualidade de vida e proximidade de serviços essenciais.

Seja para alugar, comprar ou investir, este é o momento de fincar raízes aqui.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#Augustinopolis', '#BicoDoPapagaio', '#Tocantins', '#DesenvolvimentoRegional', '#SeuNovoComeco'],
    suggestedDate: 'Segunda-feira',
    suggestedTime: '10:30',
    status: 'approved',
    logoVariant: 'keyvisual',
    logoPosition: 'bottom-center',
    themeStyle: 'editorial-dark',
    badgeText: 'VALORIZAÇÃO REGIONAL',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-reg-02',
    categoryId: 'F',
    categoryTitle: 'MEU LUGAR NO BICO',
    format: 'feed',
    title: 'Como escolher o bairro certo para a rotina da família',
    subtitle: 'Fatores geográficos que fazem toda a diferença no tempo de deslocamento diário.',
    body: 'Avalie a distância para escolas, hospitais e principais avenidas de acesso.',
    imageUrl: getPhoto(0, 'reg02'),
    visualPrompt: 'Clean modern townhouse facade in a calm upscale residential street, lush green trees, 8k',
    caption: `O melhor bairro não é o mesmo para todo mundo: ele é aquele que resolve o seu dia a dia.

Para famílias com crianças, a proximidade com escolas e áreas abertas economiza preciosos minutos no trânsito. Para quem trabalha no comércio central, morar perto das vias de fluxo traz agilidade.

Conheça as particularidades de cada região de Augustinópolis com quem entende do território local.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#BairrosAugustinopolis', '#EscolhaCerta', '#LocalizacaoEstrategica', '#BicoDoPapagaio'],
    suggestedDate: 'Terça-feira',
    suggestedTime: '16:00',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'PLANEJAMENTO URBANO',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-reg-03',
    categoryId: 'F',
    categoryTitle: 'MEU LUGAR NO BICO',
    format: 'feed',
    title: 'O estilo de vida acolhedor do Bico do Papagaio',
    subtitle: 'A combinação rara entre crescimento urbano e a tranquilidade do interior tocantinense.',
    body: 'Onde o calor humano e os laços comunitários fazem de cada vizinho um amigo.',
    imageUrl: getPhoto(4, 'reg03'),
    visualPrompt: 'Inviting residential courtyard with warm wood pergolas, lush tropical landscaping and golden sunset light, 8k',
    caption: `Quem vive no Bico do Papagaio sabe: aqui o tempo corre em um compasso mais humano.

As manhãs com clima de comunidade, o comércio onde as pessoas te chamam pelo nome e as tardes de prosa na calçada fazem da nossa região um lugar único para criar raízes.

Orgulho de fazer parte do desenvolvimento de Augustinópolis e cidades vizinhas.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#MeuLugarNoBico', '#CulturaRegional', '#Tocantins', '#QualidadeDeVida'],
    suggestedDate: 'Quarta-feira',
    suggestedTime: '18:15',
    status: 'approved',
    logoVariant: 'modern',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'ESTILO DE VIDA',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-reg-04',
    categoryId: 'F',
    categoryTitle: 'MEU LUGAR NO BICO',
    format: 'feed',
    title: 'Morar perto de tudo faz a vida render mais',
    subtitle: 'A conveniência de fazer tarefas cotidianas a pé ou em poucos minutos de carro.',
    body: 'Mais tempo para relaxar com a família e menos tempo perdido em deslocamentos.',
    imageUrl: getPhoto(1, 'reg04'),
    visualPrompt: 'Modern apartment balcony looking towards a clean sunny avenue with green sidewalks, 8k',
    caption: `Quanto vale poder levar as crianças ao colégio, passar na farmácia e voltar para almoçar em casa sem enfrentar congestionamentos?

Essa é uma das grandes vantagens de viver em cidades bem estruturadas como Augustinópolis. O seu tempo é preservado para o que de fato importa.

Descubra opções bem localizadas no nosso portfólio.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#Mobilidade', '#VidaPratica', '#AugustinopolisTO', '#BicoDoPapagaio'],
    suggestedDate: 'Quinta-feira',
    suggestedTime: '11:30',
    status: 'approved',
    logoVariant: 'glossy',
    logoPosition: 'top-right',
    themeStyle: 'editorial-dark',
    badgeText: 'CONVENIÊNCIA',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-reg-05',
    categoryId: 'F',
    categoryTitle: 'MEU LUGAR NO BICO',
    format: 'feed',
    title: 'Por que o Bico do Papagaio atrai novos moradores',
    subtitle: 'Localização geográfica privilegiada na divisa de três estados e polo educacional.',
    body: 'Conexão direta com o Tocantins, Maranhão e Pará impulsiona a demanda imobiliária.',
    imageUrl: getPhoto(5, 'reg05'),
    visualPrompt: 'Cinematic sunset landscape with modern residential terrace overlooking natural trees and glowing horizon, 8k',
    caption: `A posição geográfica do Bico do Papagaio coloca nossa região no centro das conexões entre Tocantins, Pará e Maranhão.

Essa proximidade estratégica, somada aos centros de formação superior e serviços especializados, consolida Augustinópolis como uma cidade de acolhimento e oportunidades crescentes.

Seja bem-vindo a este novo capítulo.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#Oportunidade', '#InvestimentoImobiliario', '#Augustinopolis', '#BicoDoPapagaio'],
    suggestedDate: 'Sábado',
    suggestedTime: '17:00',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-left',
    themeStyle: 'editorial-dark',
    badgeText: 'OPORTUNIDADE',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },

  // ==========================================
  // 5. 5 STORIES INTERATIVOS (1080x1920)
  // ==========================================
  {
    id: 'cb-sto-01',
    categoryId: 'D',
    categoryTitle: 'CONDOMÍNIOS E CONVIVÊNCIA',
    format: 'story',
    title: 'Enquete: Você conhece o regimento interno?',
    subtitle: 'Enquete interativa para engajamento nos stories do Instagram.',
    body: 'Toque para responder: [ ] Sim, já li com atenção  [ ] Sei apenas o básico',
    imageUrl: getPhoto(4, 'sto01'),
    visualPrompt: 'Vertical architectural story background of modern condominium leisure space, lush greenery, clean sunlit lines, 8k',
    caption: `Enquete rápida para os nossos seguidores! 🗳️

O regimento interno do condomínio é o melhor amigo da harmonia entre vizinhos. Ele define horários de silêncio, uso do salão de festas e circulação de pets.

Você já leu as regras do seu prédio ou condomínio? Compartilhe sua resposta!

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#StoriesInterativo', '#EnqueteInstagram', '#RegrasDeConvivencia', '#Augustinopolis'],
    suggestedDate: 'Segunda-feira',
    suggestedTime: '11:00',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-center',
    themeStyle: 'editorial-dark',
    badgeText: 'ENQUETE DO DIA',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-sto-02',
    categoryId: 'A',
    categoryTitle: 'CHAVES DO CONHECIMENTO',
    format: 'story',
    title: 'Caixa de Perguntas: Dúvidas sobre Aluguel?',
    subtitle: 'Story interativo com caixa de perguntas para tirar dúvidas de contratos e vistorias.',
    body: 'Mande sua pergunta na caixinha! Nossa equipe jurídica e imobiliária responde hoje.',
    imageUrl: getPhoto(7, 'sto02'),
    visualPrompt: 'Vertical interior story shot of clean wooden table, modern key set, warm morning rays, high resolution, 8k',
    caption: `Caixinha de perguntas aberta nos stories! 💬

Qual é a sua maior dúvida sobre contrato, caução, fiador ou vistoria de entrada? Deixe sua pergunta aqui e receba orientações de especialistas imobiliários de Augustinópolis.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#TireSuasDuvidas', '#CaixaDePerguntas', '#AluguelAugustinopolis', '#BicoDoPapagaio'],
    suggestedDate: 'Terça-feira',
    suggestedTime: '14:00',
    status: 'approved',
    logoVariant: 'glossy',
    logoPosition: 'top-center',
    themeStyle: 'editorial-dark',
    badgeText: 'PERGUNTAS & RESPOSTAS',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-sto-03',
    categoryId: 'B',
    categoryTitle: 'CUIDANDO DO MEU LAR',
    format: 'story',
    title: 'Quiz Rápido: De quem é a obrigação?',
    subtitle: 'Vazamento estrutural na laje do imóvel alugado: quem deve arcar com o conserto?',
    body: 'Opção A: Proprietário (locador) | Opção B: Inquilino (locatário)',
    imageUrl: getPhoto(1, 'sto03'),
    visualPrompt: 'Vertical architectural story perspective of modern living room ceiling with clean recessed lighting, 8k',
    caption: `Hora de testar seus conhecimentos sobre o mercado imobiliário! 🧠

Resposta correta: Opção A — Manutenções estruturais e desgastes prévios são responsabilidade legal do proprietário. Ao locatário cabem os reparos decorrentes do uso diário.

Gostou do quiz? Ative as notificações para mais conteúdos educativos!

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#QuizImobiliario', '#EducacaoNoBico', '#LeiDoInquilinato', '#Augustinopolis'],
    suggestedDate: 'Quarta-feira',
    suggestedTime: '15:30',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-center',
    themeStyle: 'editorial-dark',
    badgeText: 'QUIZ INTERATIVO',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-sto-04',
    categoryId: 'F',
    categoryTitle: 'MEU LUGAR NO BICO',
    format: 'story',
    title: 'Enquete: O que não pode faltar no seu bairro?',
    subtitle: 'Engajamento regional para descobrir as prioridades dos moradores de Augustinópolis.',
    body: 'Votação: [ ] Silêncio e tranquilidade  [ ] Perto de supermercado e comércio',
    imageUrl: getPhoto(0, 'sto04'),
    visualPrompt: 'Vertical architectural facade with green grass and warm street lighting at twilight, 8k',
    caption: `Qual é o seu critério número 1 na hora de escolher um bairro? 🏡

Você prefere a paz de ruas arborizadas e estritamente residenciais ou a conveniência de fazer tudo a pé no comércio central? Vote na enquete e veja o que a maioria dos moradores de Augustinópolis prefere!

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#EnqueteStories', '#BairrosAugustinopolis', '#MorarNoBico', '#Tocantins'],
    suggestedDate: 'Quinta-feira',
    suggestedTime: '16:45',
    status: 'approved',
    logoVariant: 'circular',
    logoPosition: 'top-center',
    themeStyle: 'editorial-dark',
    badgeText: 'PESQUISA REGIONAL',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
  {
    id: 'cb-sto-05',
    categoryId: 'E',
    categoryTitle: 'VIVER BEM',
    format: 'story',
    title: 'Termômetro do Fim de Semana: Planos para o lar?',
    subtitle: 'Engajamento leve de sexta-feira com slider de reação e inspiração para o fim de semana.',
    body: 'Arraste a chama: Quem aí vai aproveitar o sábado para organizar o novo cantinho?',
    imageUrl: getPhoto(3, 'sto05'),
    visualPrompt: 'Vertical bedroom story view with serene natural sunlight, white linens, warm architectural wood accents, 8k',
    caption: `Sextou com planos para deixar a casa ainda mais aconchegante? ✨

Seja organizando a estante, testando uma nova receita na cozinha ou simplesmente descansando sem pressa: aproveite o seu lar neste fim de semana.

Seu novo começo tem um endereço.`,
    hashtags: ['#ChavesDoBico', '#SextouNoLar', '#BemEstar', '#CasaEAconchego', '#AugustinopolisTO'],
    suggestedDate: 'Sexta-feira',
    suggestedTime: '17:00',
    status: 'approved',
    logoVariant: 'modern',
    logoPosition: 'top-center',
    themeStyle: 'editorial-dark',
    badgeText: 'SEXTA NO LAR',
    weekNumber: 1,
    qc: {
      brandFidelity: true,
      logoIntegrity: true,
      ptBrSpelling: true,
      legibility: true,
      photoQuality: true,
      composition: true,
      noDeformedElements: true,
      noInventedData: true,
      noVisualPollution: true,
      formatFitness: true,
      approved: true,
    },
  },
];
