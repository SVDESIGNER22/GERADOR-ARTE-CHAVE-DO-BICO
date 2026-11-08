import React from 'react';
import {
  Sparkles,
  Layers,
  ShieldCheck,
  Calendar,
  FolderArchive,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ContentPiece } from '../types/content';
import { OFFICIAL_CATEGORIES } from '../data/categories';
import { BRAND_TAGLINE } from '../data/brandAssets';
import { StudioTab } from './TopNav';

interface DashboardProps {
  pieces: ContentPiece[];
  setActiveTab: (tab: StudioTab) => void;
  onSelectPiece: (piece: ContentPiece) => void;
  onQuickGenerate: () => void;
  onQuickExportZip: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  pieces,
  setActiveTab,
  onSelectPiece,
  onQuickGenerate,
  onQuickExportZip,
}) => {
  const totalCount = pieces.length;
  const approvedCount = pieces.filter((p) => p.status === 'approved' && p.qc.approved).length;
  const pendingCount = pieces.filter((p) => p.status === 'pending_qc' || !p.qc.approved).length;

  const countByFormat = {
    educativas: pieces.filter((p) => p.format === 'feed' && p.categoryId !== 'E' && p.categoryId !== 'F').length,
    carrosseis: pieces.filter((p) => p.format === 'carousel').length,
    inspiracionais: pieces.filter((p) => p.categoryId === 'E').length,
    regionais: pieces.filter((p) => p.categoryId === 'F').length,
    stories: pieces.filter((p) => p.format === 'story').length,
  };

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto overflow-y-auto space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-[#003814] via-[#05260F] to-[#04170A] border border-[#087B18]/50 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#004719]/60 border border-[#42D900]/40 text-xs font-mono text-[#C9FF24]">
            <span>ESTÚDIO CRIATIVO IMOBILIÁRIO</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Chaves do Bico <span className="text-[#C9FF24]">AI Creative Studio</span>
          </h1>

          <p className="text-sm text-slate-200 leading-relaxed">
            Plataforma oficial de criação e automação visual para Augustinópolis e região do Bico do Papagaio.
            Produção de 30 peças semanais com identidade consistente, fotografia hiper-realista e legendas completas.
          </p>

          <p className="text-xs text-[#C9FF24] italic font-serif-display pt-1">
            "{BRAND_TAGLINE}"
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onQuickGenerate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C9FF24] hover:bg-[#b8eb1f] text-[#051408] transition-all shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 fill-[#051408]" />
              <span>Gerar Novo Lote Semanal (30)</span>
            </button>

            <button
              onClick={() => setActiveTab('studio')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#004719]/50 hover:bg-[#004719] text-white border border-[#087B18]/50 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#42D900]" />
              <span>Abrir Estúdio Canvas</span>
            </button>

            <button
              onClick={onQuickExportZip}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#004719]/30 hover:bg-[#004719]/70 text-slate-200 border border-[#087B18]/40 transition-colors"
            >
              <FolderArchive className="w-3.5 h-3.5 text-[#C9FF24]" />
              <span>Exportar ZIP Completo</span>
            </button>
          </div>
        </div>

        {/* Decorative Circular Logo Emblem Background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 opacity-25 pointer-events-none hidden md:block">
          <img
            src="/assets/aistudio/Logo_Circular_de_Im_veis_e_Aluguel_cef08c79.png"
            alt="Emblema"
            className="w-96 h-96 object-contain"
          />
        </div>
      </div>

      {/* Production KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Weekly Goal */}
        <div className="p-5 rounded-2xl bg-[#070E09] border border-[#004719]/60 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Meta Semanal</span>
            <span className="font-mono text-[#C9FF24]">30/30 PEÇAS</span>
          </div>
          <div className="my-3">
            <span className="text-3xl font-extrabold text-white font-mono">{totalCount}</span>
            <span className="text-xs text-slate-400 ml-2">geradas</span>
          </div>
          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C9FF24]"
              style={{ width: `${Math.min(100, (totalCount / 30) * 100)}%` }}
            />
          </div>
        </div>

        {/* KPI 2: Approved in QC */}
        <div className="p-5 rounded-2xl bg-[#070E09] border border-[#004719]/60 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Aprovadas no QC</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#42D900]" />
          </div>
          <div className="my-3">
            <span className="text-3xl font-extrabold text-[#C9FF24] font-mono">{approvedCount}</span>
            <span className="text-xs text-slate-400 ml-2">de {totalCount} peças</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Taxa de aprovação: {totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0}%
          </div>
        </div>

        {/* KPI 3: Pending QC */}
        <div className="p-5 rounded-2xl bg-[#070E09] border border-[#004719]/60 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Aguardando Revisão</span>
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="my-3">
            <span className="text-3xl font-extrabold text-amber-300 font-mono">{pendingCount}</span>
            <span className="text-xs text-slate-400 ml-2">peças</span>
          </div>
          <button
            onClick={() => setActiveTab('qc')}
            className="text-[11px] text-[#C9FF24] font-medium hover:underline text-left"
          >
            Abrir esteira de QC ›
          </button>
        </div>

        {/* KPI 4: Formats Ready */}
        <div className="p-5 rounded-2xl bg-[#070E09] border border-[#004719]/60 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Formatos Oficiais</span>
            <Clock className="w-3.5 h-3.5 text-[#C9FF24]" />
          </div>
          <div className="my-2 space-y-1 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Feed vertical:</span>
              <strong className="font-mono text-white">1080x1350</strong>
            </div>
            <div className="flex justify-between">
              <span>Stories:</span>
              <strong className="font-mono text-white">1080x1920</strong>
            </div>
            <div className="flex justify-between">
              <span>Carrosséis:</span>
              <strong className="font-mono text-white">Multilâminas</strong>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">PNG 300 DPI / 100% RGB</div>
        </div>
      </div>

      {/* Format Breakdown & Category Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* The 5 Format Clusters */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#070E09] border border-[#004719]/60 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Distribuição por Tipo de Publicação
            </h3>
            <span className="text-xs text-slate-400">Pacote Semanal</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">10 Artes Educativas (Conhecimento & Cuidado com o Lar)</span>
                <span className="font-mono text-[#C9FF24]">{countByFormat.educativas} / 10</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#087B18]"
                  style={{ width: `${(countByFormat.educativas / 10) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">5 Carrosséis Educativos Multilâminas</span>
                <span className="font-mono text-[#C9FF24]">{countByFormat.carrosseis} / 5</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#42D900]"
                  style={{ width: `${(countByFormat.carrosseis / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">5 Artes Inspiracionais & Viver Bem</span>
                <span className="font-mono text-[#C9FF24]">{countByFormat.inspiracionais} / 5</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C9FF24]"
                  style={{ width: `${(countByFormat.inspiracionais / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">5 Conteúdos Regionais (Augustinópolis & Bico)</span>
                <span className="font-mono text-[#C9FF24]">{countByFormat.regionais} / 5</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#087B18]"
                  style={{ width: `${(countByFormat.regionais / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">5 Stories Interativos (Enquetes & Caixas)</span>
                <span className="font-mono text-[#C9FF24]">{countByFormat.stories} / 5</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#42D900]"
                  style={{ width: `${(countByFormat.stories / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* The 7 Official Categories List */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#070E09] border border-[#004719]/60 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              As 7 Editorias da Marca
            </h3>
            <span className="text-xs text-slate-400">A a G</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {OFFICIAL_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="p-2.5 rounded-xl bg-[#040A06] border border-[#004719]/40 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white block">
                    {cat.id}. {cat.name}
                  </span>
                  <span className="text-[10px] text-slate-400 line-clamp-1">{cat.shortDesc}</span>
                </div>
                <span className="font-mono text-[10px] text-[#C9FF24] uppercase shrink-0">
                  {cat.suggestedFormat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Pieces Carousel / Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Destaques da Produção Semanal
          </h3>
          <button
            onClick={() => setActiveTab('gallery')}
            className="text-xs font-semibold text-[#C9FF24] hover:underline flex items-center gap-1"
          >
            <span>Ver todas as 30 peças</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {pieces.slice(0, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectPiece(p);
                setActiveTab('studio');
              }}
              className="group rounded-2xl bg-[#070E09] border border-[#004719]/60 hover:border-[#42D900] overflow-hidden cursor-pointer transition-all flex flex-col shadow-md"
            >
              <div className="w-full aspect-[4/5] bg-black overflow-hidden relative">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 font-mono text-[9px] uppercase font-bold bg-black/80 text-[#C9FF24] px-2 py-0.5 rounded">
                  {p.format}
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-[#42D900] uppercase block truncate">
                  {p.categoryTitle}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{p.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
