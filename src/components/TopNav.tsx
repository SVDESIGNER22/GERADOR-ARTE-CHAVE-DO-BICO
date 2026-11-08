import React from 'react';
import { Sparkles, Download, Layers } from 'lucide-react';

export type StudioTab =
  | 'dashboard'
  | 'batch'
  | 'studio'
  | 'qc'
  | 'calendar'
  | 'gallery'
  | 'brand'
  | 'captions';

interface TopNavProps {
  activeTab: StudioTab;
  setActiveTab: (tab: StudioTab) => void;
  approvedCount: number;
  totalCount: number;
  onQuickGenerate: () => void;
  onQuickExportZip: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  approvedCount,
  totalCount,
  onQuickGenerate,
  onQuickExportZip,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#070D09]/95 backdrop-blur-md border-b border-[#004719]/60 px-6 py-3.5 flex items-center justify-between gap-8">
      {/* Zone 1: Single text element wordmark with brand emblem */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('dashboard');
          }}
          className="flex items-center gap-2.5 group"
        >
          <img
            src="/assets/aistudio/Logo_Circular_de_Im_veis_e_Aluguel_cef08c79.png"
            alt="Chaves do Bico"
            className="w-8 h-8 rounded-full border border-[#42D900]/40 group-hover:scale-105 transition-transform"
          />
          <span className="text-base font-extrabold tracking-tight text-white whitespace-nowrap font-brand">
            CHAVES DO BICO <span className="text-[#C9FF24] font-medium text-xs ml-1 tracking-widest uppercase">Creative Studio</span>
          </span>
        </a>
      </div>

      {/* Zone 2: Clean single-line navigation tabs */}
      <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold tracking-wide uppercase text-slate-400">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'dashboard' ? 'text-[#C9FF24] border-b-2 border-[#C9FF24]' : 'hover:text-white'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('batch')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'batch' ? 'text-[#C9FF24] border-b-2 border-[#C9FF24]' : 'hover:text-white'
          }`}
        >
          Produção Semanal (30)
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'studio' ? 'text-[#C9FF24] border-b-2 border-[#C9FF24]' : 'hover:text-white'
          }`}
        >
          Estúdio Canvas
        </button>
        <button
          onClick={() => setActiveTab('qc')}
          className={`transition-colors whitespace-nowrap py-1 flex items-center gap-1.5 ${
            activeTab === 'qc' ? 'text-[#C9FF24] border-b-2 border-[#C9FF24]' : 'hover:text-white'
          }`}
        >
          Fila de QC
          {approvedCount < totalCount && (
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-[#087B18] text-white rounded">
              {totalCount - approvedCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'calendar' ? 'text-[#C9FF24] border-b-2 border-[#C9FF24]' : 'hover:text-white'
          }`}
        >
          Calendário
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'gallery' ? 'text-[#C9FF24] border-b-2 border-[#C9FF24]' : 'hover:text-white'
          }`}
        >
          Galeria ({approvedCount})
        </button>
        <button
          onClick={() => setActiveTab('brand')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'brand' ? 'text-[#C9FF24] border-b-2 border-[#C9FF24]' : 'hover:text-white'
          }`}
        >
          Brand Assets
        </button>
        <button
          onClick={() => setActiveTab('captions')}
          className={`transition-colors whitespace-nowrap py-1 ${
            activeTab === 'captions' ? 'text-[#C9FF24] border-b-2 border-[#C9FF24]' : 'hover:text-white'
          }`}
        >
          Legendas
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onQuickExportZip}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#004719]/50 hover:bg-[#004719] border border-[#087B18]/40 rounded-lg transition-colors whitespace-nowrap"
          title="Exportar pacote semanal em ZIP"
        >
          <Download className="w-3.5 h-3.5 text-[#C9FF24]" />
          <span>Exportar ZIP</span>
        </button>
        <button
          onClick={onQuickGenerate}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-[#051408] bg-[#C9FF24] hover:bg-[#b8eb1f] rounded-lg transition-all shadow-sm hover:shadow-[#C9FF24]/20 hover:shadow-md whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 fill-[#051408]" />
          <span>Novo Lote Semanal</span>
        </button>
      </div>
    </header>
  );
};
