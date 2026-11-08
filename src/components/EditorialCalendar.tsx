import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight, Eye, Copy, Check } from 'lucide-react';
import { ContentPiece } from '../types/content';

interface EditorialCalendarProps {
  pieces: ContentPiece[];
  onSelectPiece: (piece: ContentPiece) => void;
}

const DAYS_OF_WEEK = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
];

export const EditorialCalendar: React.FC<EditorialCalendarProps> = ({
  pieces,
  onSelectPiece,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (piece: ContentPiece, e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(`${piece.caption}\n\n${piece.hashtags.join(' ')}`);
    setCopiedId(piece.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto overflow-y-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#004719]/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#004719]/40 border border-[#087B18]/50 text-xs font-mono text-[#C9FF24] mb-2">
            <span>GRADE DE PUBLICAÇÃO INSTAGRAM</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Calendário Editorial Semanal
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Distribuição estratégica de postagens nos horários nobres de engajamento imobiliário.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#087B18]" />
            <span>Feed / Carrossel</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#42D900]" />
            <span>Stories Interativos</span>
          </span>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {DAYS_OF_WEEK.map((day) => {
          const dayPieces = pieces.filter((p) =>
            p.suggestedDate.toLowerCase().includes(day.toLowerCase().split('-')[0])
          );

          return (
            <div
              key={day}
              className="rounded-xl bg-[#070E09] border border-[#004719]/60 flex flex-col min-h-[380px]"
            >
              {/* Day Header */}
              <div className="p-3 border-b border-[#004719]/60 bg-[#040A06] rounded-t-xl">
                <span className="block text-xs font-bold text-white tracking-wide truncate">
                  {day.split('-')[0]}
                </span>
                <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                  {dayPieces.length} {dayPieces.length === 1 ? 'post' : 'posts'}
                </span>
              </div>

              {/* Day Posts List */}
              <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                {dayPieces.length === 0 ? (
                  <div className="h-full flex items-center justify-center p-4 text-center text-[11px] text-slate-600">
                    Sem post agendado
                  </div>
                ) : (
                  dayPieces.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onSelectPiece(p)}
                      className="group p-2.5 rounded-lg bg-[#004719]/15 hover:bg-[#004719]/40 border border-[#087B18]/30 cursor-pointer transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-[#C9FF24] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {p.suggestedTime || '11:00'}
                        </span>
                        <span className="font-mono uppercase text-slate-400 text-[9px] bg-black/40 px-1 py-0.2 rounded">
                          {p.format}
                        </span>
                      </div>

                      <div className="w-full aspect-[4/3] rounded overflow-hidden bg-black relative">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <h5 className="text-[11px] font-bold text-white line-clamp-2 leading-tight">
                        {p.title}
                      </h5>

                      <div className="flex items-center justify-between pt-1 border-t border-[#004719]/40 text-[10px]">
                        <span className="text-[#42D900] truncate max-w-[90px]">
                          {p.categoryTitle.split(' ')[0]}
                        </span>
                        <button
                          onClick={(e) => handleCopy(p, e)}
                          className="text-slate-400 hover:text-white"
                          title="Copiar legenda"
                        >
                          {copiedId === p.id ? (
                            <Check className="w-3 h-3 text-[#C9FF24]" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
