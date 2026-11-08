import React, { useState } from 'react';
import { Copy, Check, Search, Filter, MessageSquare } from 'lucide-react';
import { ContentPiece } from '../types/content';

interface CaptionBankProps {
  pieces: ContentPiece[];
  onSelectPiece: (piece: ContentPiece) => void;
}

export const CaptionBank: React.FC<CaptionBankProps> = ({ pieces, onSelectPiece }) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPieces = pieces.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.categoryTitle.toLowerCase().includes(term) ||
      p.caption.toLowerCase().includes(term)
    );
  });

  const handleCopy = async (p: ContentPiece) => {
    const fullText = `${p.caption}\n\n${p.hashtags.join(' ')}`;
    await navigator.clipboard.writeText(fullText);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto overflow-y-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#004719]/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#004719]/40 border border-[#087B18]/50 text-xs font-mono text-[#C9FF24] mb-2">
            <span>BANCO DE COPYWRITING & HASHTAGS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Legendas para Instagram ({pieces.length})
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Textos calibrados em português brasileiro com storytelling imobiliário, ganchos e hashtags oficiais.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por tema ou palavra..."
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#051008] border border-[#087B18]/50 rounded-xl text-white focus:outline-none focus:border-[#C9FF24]"
          />
        </div>
      </div>

      {/* Captions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPieces.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl bg-[#070E09] border border-[#004719]/60 hover:border-[#42D900]/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-[#C9FF24] uppercase font-bold truncate max-w-[200px]">
                  {p.categoryTitle}
                </span>
                <span className="font-mono text-slate-400 uppercase text-[10px] bg-black/40 px-2 py-0.5 rounded">
                  {p.format} · {p.suggestedDate}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white">{p.title}</h4>

              {/* Caption Content Box */}
              <div className="p-3.5 rounded-xl bg-[#040A06] border border-[#087B18]/30 max-h-48 overflow-y-auto text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-wrap select-text">
                {p.caption}
                {'\n\n'}
                <span className="text-[#42D900] font-mono text-[11px]">
                  {p.hashtags.join(' ')}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#004719]/40 flex items-center justify-between">
              <button
                onClick={() => onSelectPiece(p)}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Abrir no Estúdio Canvas
              </button>

              <button
                onClick={() => handleCopy(p)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#004719]/50 hover:bg-[#004719] text-white border border-[#087B18]/40 transition-colors"
              >
                {copiedId === p.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C9FF24]" />
                    <span className="text-[#C9FF24]">Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copiar Legenda</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
