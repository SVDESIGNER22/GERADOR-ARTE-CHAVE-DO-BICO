export interface BrandLogo {
  id: 'circular' | 'glossy' | 'modern' | 'keyvisual';
  name: string;
  badge: string;
  src: string;
  description: string;
  recommendedUse: string;
  idealBackground: 'dark' | 'light' | 'photo';
}

export const BRAND_COLORS = [
  { name: 'Verde-escuro', hex: '#004719', rgb: '0, 71, 25', role: 'Fundo solene, contrastes nobres e bases de carrossel' },
  { name: 'Verde institucional', hex: '#087B18', rgb: '8, 123, 24', role: 'Identidade principal, botões e barras de navegação' },
  { name: 'Verde-limão', hex: '#42D900', rgb: '66, 217, 0', role: 'Destaques vibrantes, linhas de apoio e marcadores visuais' },
  { name: 'Verde luminoso', hex: '#C9FF24', rgb: '201, 255, 36', role: 'Realces de máxima visibilidade, botões CTA e detalhes' },
  { name: 'Branco puro', hex: '#FFFFFF', rgb: '255, 255, 255', role: 'Tipografia primária, ícones de leitura e molduras limpas' },
];

export const BRAND_LOGOS: BrandLogo[] = [
  {
    id: 'circular',
    name: 'Logo Circular de Imóveis',
    badge: 'Selo Oficial',
    src: '/assets/aistudio/Logo_Circular_de_Im_veis_e_Aluguel_cef08c79.png',
    description: 'Selo esférico com moldura glossy em verde e dourado, pin de mapa e horizonte residencial.',
    recommendedUse: 'Perfeito para fotos de capa de carrossel, stories centrais e selo de garantia visual.',
    idealBackground: 'photo',
  },
  {
    id: 'glossy',
    name: 'Emblema Verde Glossy',
    badge: 'Assinatura Quadrada',
    src: '/assets/aistudio/Logo_Chave_do_Bico_em_Verde_Glossy_ed25a0f8.png',
    description: 'Emblema com bordas arredondadas, ícone da casa/sol e tipografia Chave do Bico em relevo 3D.',
    recommendedUse: 'Canto superior direito ou esquerdo em feeds verticais e lâminas internas de carrossel.',
    idealBackground: 'dark',
  },
  {
    id: 'modern',
    name: 'Logo Verde Moderno com Subtítulo',
    badge: 'Editorial Clean',
    src: '/assets/aistudio/Logo_verde_moderno_Chave_do_Bico_6223ec15.png',
    description: 'Composição limpa com o ícone verde, tipografia forte e o subtítulo "IMÓVEIS · ALUGUEL · COMPRA · VENDA".',
    recommendedUse: 'Topo ou rodapé de peças com bastante área de respiro e conteúdo educativo.',
    idealBackground: 'light',
  },
  {
    id: 'keyvisual',
    name: 'Banner Institucional Augustinópolis',
    badge: 'Key Visual Regional',
    src: '/assets/aistudio/Encontre_Seu_Im_vel_Ideal_71003390.png',
    description: 'Arte horizontal completa com chamada para Augustinópolis e região e ícones de serviços.',
    recommendedUse: 'Banners horizontais, cabeçalhos de campanhas institucionais e posts regionais panorâmicos.',
    idealBackground: 'photo',
  },
];

export const BRAND_TAGLINE = 'Seu novo começo tem um endereço.';
export const BRAND_REGION = 'Augustinópolis e região do Bico do Papagaio (TO)';

export const QC_CRITERIA_LIST = [
  {
    id: 'brandFidelity',
    name: '1. Fidelidade à Identidade Visual',
    desc: 'Uso rigoroso da paleta oficial (#004719, #087B18, #42D900, #C9FF24, #FFFFFF) e presença equilibrada do verde.',
  },
  {
    id: 'logoIntegrity',
    name: '2. Integridade da Logo',
    desc: 'Uso do arquivo oficial inalterado, proporções exatas preservadas, sem distorção e com área de respiro livre.',
  },
  {
    id: 'ptBrSpelling',
    name: '3. Ortografia em Português (PT-BR)',
    desc: 'Revisão gramatical completa, acentuação perfeita, pontuação editorial correta e concordância impecável.',
  },
  {
    id: 'legibility',
    name: '4. Legibilidade e Contraste',
    desc: 'Contraste mínimo WCAG AA (4.5:1), tipografia clara, textos legíveis mesmo em telas de smartphones pequenos.',
  },
  {
    id: 'photoQuality',
    name: '5. Qualidade Fotográfica',
    desc: 'Fotografia hiper-realista, iluminação natural cinematográfica, sem ruídos ou texturas plastificadas.',
  },
  {
    id: 'composition',
    name: '6. Composição e Equilíbrio',
    desc: 'Layout estruturado, hierarquia clara entre título e suporte, peso visual harmônico e respiros generosos.',
  },
  {
    id: 'noDeformedElements',
    name: '7. Ausência de Deformações',
    desc: 'Sem anomalias de IA, linhas arquitetônicas retas, mãos/janelas perfeitas e perspectiva correta.',
  },
  {
    id: 'noInventedData',
    name: '8. Ausência de Informações Inventadas',
    desc: 'Zero preços fictícios, zero imóveis fictícios anunciados como disponíveis e fidelidade ao posicionamento.',
  },
  {
    id: 'noVisualPollution',
    name: '9. Ausência de Poluição Visual',
    desc: 'Minimalismo editorial, sem excesso de brilhos, sem pílulas decorativas inúteis e sem sombras pesadas.',
  },
  {
    id: 'formatFitness',
    name: '10. Adequação ao Formato Oficial',
    desc: 'Resolução e enquadramento exato: Feed (1080x1350), Story (1080x1920) e Carrossel sem cortes indesejados.',
  },
];
