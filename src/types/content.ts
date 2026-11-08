export type ContentCategoryId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export type ContentFormat = 'feed' | 'carousel' | 'story';

export type LogoVariant = 'circular' | 'glossy' | 'modern' | 'keyvisual';

export type LogoPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-center' | 'bottom-right';

export type CanvasThemeStyle = 'editorial-dark' | 'clean-white' | 'cinematic-green' | 'glass-luxury';

export interface CarouselSlide {
  slideNumber: number;
  title: string;
  body: string;
  imageUrl?: string;
}

export interface QCChecklist {
  brandFidelity: boolean;
  logoIntegrity: boolean;
  ptBrSpelling: boolean;
  legibility: boolean;
  photoQuality: boolean;
  composition: boolean;
  noDeformedElements: boolean;
  noInventedData: boolean;
  noVisualPollution: boolean;
  formatFitness: boolean;
  notes?: string;
  reviewedAt?: string;
  approved: boolean;
}

export interface ContentPiece {
  id: string;
  categoryId: ContentCategoryId;
  categoryTitle: string;
  format: ContentFormat;
  title: string;
  subtitle: string;
  body?: string;
  imageUrl: string;
  visualPrompt: string;
  carouselSlides?: CarouselSlide[];
  activeSlideIndex?: number;
  caption: string;
  hashtags: string[];
  suggestedDate: string;
  suggestedTime?: string;
  status: 'draft' | 'pending_qc' | 'approved' | 'rejected';
  qc: QCChecklist;
  logoVariant: LogoVariant;
  logoPosition: LogoPosition;
  themeStyle: CanvasThemeStyle;
  badgeText?: string;
  weekNumber?: number;
  isAiGenerated?: boolean;
}

export interface CategoryDefinition {
  id: ContentCategoryId;
  code: string;
  name: string;
  shortDesc: string;
  topics: string[];
  suggestedFormat: ContentFormat;
  accentColor: string;
  iconName: string;
}

export interface WeeklyProductionSummary {
  weekId: string;
  startDate: string;
  totalPieces: number;
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
  breakdown: {
    educativas: number;
    carrosseis: number;
    inspiracionais: number;
    regionais: number;
    stories: number;
  };
}
