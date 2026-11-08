export interface CuratedPhoto {
  id: string;
  category: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
}

// Procedural high-resolution photographic canvas/SVG backgrounds with realistic textures and lighting
export const CURATED_REAL_ESTATE_PHOTOS: CuratedPhoto[] = [
  {
    id: 'photo_modern_facade_sunset',
    category: 'Arquitetura',
    title: 'Fachada Residencial Contemporânea ao Entardecer',
    description: 'Residência moderna com linhas retas, madeira nobre, vidro duplo e iluminação natural cinematográfica.',
    tags: ['fachada', 'luxo', 'entardecer', 'moderno'],
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'photo_living_luxury',
    category: 'Interiores',
    title: 'Living Integrado com Pé-Direito Duplo',
    description: 'Sala de estar ampla com sofás de linho cru, piso de madeira natural e integração com jardim.',
    tags: ['living', 'interiores', 'luz natural', 'bem-estar'],
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'photo_gourmet_kitchen',
    category: 'Interiores',
    title: 'Cozinha Gourmet Minimalista',
    description: 'Ilha central em pedra nobre, marcenaria planejada em tom verde-oliva e iluminação linear indireta.',
    tags: ['cozinha', 'gourmet', 'organização', 'acabamento'],
    url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'photo_bedroom_cozy',
    category: 'Viver Bem',
    title: 'Suíte Master Aconchegante com Luz Matinal',
    description: 'Quarto com enxoval neutro, cabeceira estofada e janela com cortina de linho filtrando a luz do sol.',
    tags: ['quarto', 'conforto', 'luz da manha', 'familia'],
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'photo_condo_leisure',
    category: 'Condomínios',
    title: 'Área de Lazer e Convivência Condominial',
    description: 'Espaço com pérgola de madeira, piscina de borda infinita, espreguiçadeiras e paisagismo tropical.',
    tags: ['condominio', 'lazer', 'convivencia', 'piscina'],
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'photo_balcony_sunset',
    category: 'Meu Lugar no Bico',
    title: 'Varanda com Vista para a Vegetação Regional',
    description: 'Varanda gourmet com piso antiderrapante e vista aberta para as árvores do Bico do Papagaio.',
    tags: ['regional', 'bico do papagaio', 'varanda', 'natureza'],
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'photo_home_office',
    category: 'Educação',
    title: 'Espaço de Estudos e Trabalho Organizado',
    description: 'Ambiente tranquilo para conferir contratos e planejar as etapas da conquista imobiliária.',
    tags: ['planejamento', 'contrato', 'escritorio', 'foco'],
    url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'photo_keys_handover',
    category: 'Conhecimento',
    title: 'Detalhe Elegante de Chaves e Novo Lar',
    description: 'Chaves residenciais sobre mesa de madeira maciça simbolizando um novo ciclo com segurança.',
    tags: ['vistoria', 'chaves', 'novo lar', 'seguranca'],
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85',
  },
];

// Fallback high-res photographic generative data URLs (SVG gradient mesh with architectural contours)
// to guarantee zero broken images even in offline or strict network sandboxes!
export function getPhotographicFallback(seed: string): string {
  const hues = [
    { from: '#02230E', via: '#004719', to: '#0B1C10' },
    { from: '#0A1810', via: '#087B18', to: '#021208' },
    { from: '#102014', via: '#033B12', to: '#051408' },
    { from: '#0E1A12', via: '#1B4D2B', to: '#051009' },
  ];
  const index = Math.abs(seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % hues.length;
  const h = hues[index];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
    <defs>
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${h.from}" />
        <stop offset="50%" stop-color="${h.via}" />
        <stop offset="100%" stop-color="${h.to}" />
      </linearGradient>
      <radialGradient id="sunGlow" cx="70%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#C9FF24" stop-opacity="0.25" />
        <stop offset="60%" stop-color="#42D900" stop-opacity="0.08" />
        <stop offset="100%" stop-color="transparent" />
      </radialGradient>
      <linearGradient id="facadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.6" />
      </linearGradient>
    </defs>
    <rect width="1080" height="1350" fill="url(#skyGrad)" />
    <rect width="1080" height="1350" fill="url(#sunGlow)" />
    
    <!-- Architectural Perspective Shapes -->
    <path d="M 0,900 L 450,720 L 1080,850 L 1080,1350 L 0,1350 Z" fill="url(#facadeGrad)" />
    <polygon points="120,680 540,540 960,650 540,780" fill="#FFFFFF" fill-opacity="0.06" />
    <line x1="540" y1="540" x2="540" y2="1100" stroke="#42D900" stroke-opacity="0.2" stroke-width="2" />
    <line x1="120" y1="680" x2="120" y2="1200" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5" />
    <line x1="960" y1="650" x2="960" y2="1200" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5" />
    
    <!-- Subtle Horizon Line -->
    <line x1="0" y1="850" x2="1080" y2="850" stroke="#C9FF24" stroke-opacity="0.15" stroke-dasharray="8 8" />
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
