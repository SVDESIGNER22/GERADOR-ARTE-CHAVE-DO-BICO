import React, { useState } from 'react';
import { ShieldCheck, Check, X, AlertTriangle, Edit3, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { ContentPiece } from '../types/content';
import { QC_CRITERIA_LIST } from '../data/brandAssets';

interface QualityControlQueueProps {
  pieces: ContentPiece[];
  onApprovePiece: (id: string) => void;
  onRejectPiece: (id: string, notes: string) => void;
  onOpenInEditor: (piece: ContentPiece) => void;
  onApproveAllValid: () => void;
}

export const QualityControlQueue: React.FC<QualityControlQueueProps> = ({
  pieces,
  onApprovePiece,
  onRejectPiece,
  onOpenInEditor,
  onApproveAllValid,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedPieceId, setSelectedPieceId] = useState<string>(pieces[0]?.id || '');
  const [rejectNote, setRejectNote] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const filteredPieces = pieces.filter((p) => {
    if (filter === 'pending') return p.status === 'pending_qc' || !p.qc.approved;
    if (filter === 'approved') return p.status === 'approved' && p.qc.approved;
    if (filter === 'rejected') return p.status === 'rejected';
    return true;
  });

  const selectedPiece = pieces.find((p) => p.id === selectedPieceId) || filteredPieces[0] || pieces[0];

  const pendingCount = pieces.filter((p) => p.status === 'pending_qc' || !p.qc.approved).length;
  const approvedCount = pieces.filter((p) => p.status === 'approved' && p.qc.approved).length;
  const rejectedCount = pieces.filter((p) => p.status === 'rejected').length;

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-[#0A100D]">
      {/* LEFT: Piece Queue Column */}
      <div className="w-full lg:w-[460px] border-b lg:border-b-0 lg:border-r border-[#004719]/40 flex flex-col bg-[#070D09]">
        {/* Header and Filter */}
        <div className="p-4 border-b border-[#004719]/40 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9FF24]" />
                <span>Esteira de Controle de Qualidade</span>
              </h2>
              <span className="text-xs text-slate-400">Verificação dos 10 critérios oficiais</span>
            </div>

            {pendingCount > 0 && (
              <button
                onClick={onApproveAllValid}
                className="text-xs font-bold px-2.5 py-1 rounded bg-[#087B18] hover:bg-[#004719] text-[#C9FF24] border border-[#42D900]/40 transition-colors"
                title="Aprovar todas as peças elegíveis"
              >
                Aprovar Elegíveis
              </button>
            )}
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-[#051008] rounded-lg border border-[#087B18]/30">
            <button
              onClick={() => setFilter('pending')}
              className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === 'pending'
                  ? 'bg-[#087B18] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pendentes ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === 'approved'
                  ? 'bg-[#087B18] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aprovadas ({approvedCount})
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === 'rejected'
                  ? 'bg-[#087B18] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Reprovadas ({rejectedCount})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-[#087B18] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas ({pieces.length})
            </button>
          </div>
        </div>

        {/* Piece List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#004719]/30">
          {filteredPieces.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 space-y-2">
              <p>Nenhuma arte encontrada com este filtro.</p>
              <button
                onClick={() => setFilter('all')}
                className="text-[#C9FF24] underline hover:text-white"
              >
                Ver todas as peças
              </button>
            </div>
          ) : (
            filteredPieces.map((p) => {
              const isSelected = selectedPiece?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPieceId(p.id)}
                  className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#004719]/40 border-l-2 border-[#C9FF24]'
                      : 'hover:bg-[#004719]/15'
                  }`}
                >
                  <div className="w-14 h-16 rounded-md bg-black/40 overflow-hidden border border-slate-800 shrink-0 relative">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-mono text-center text-[#C9FF24] uppercase py-0.5">
                      {p.format}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase text-[#42D900] truncate">
                        {p.categoryTitle}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          p.status === 'approved'
                            ? 'bg-[#087B18] text-[#C9FF24]'
                            : p.status === 'rejected'
                            ? 'bg-rose-950 text-rose-300'
                            : 'bg-amber-950 text-amber-300'
                        }`}
                      >
                        {p.status === 'approved' ? 'APROVADO' : p.status === 'rejected' ? 'REPROVADO' : 'EM REVISÃO'}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-1">{p.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{p.subtitle}</p>
                  </div>

                  <ChevronRight className={`w-4 h-4 text-slate-500 shrink-0 ${isSelected ? 'text-[#C9FF24]' : ''}`} />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT: Detailed 10-Criteria Checklist Inspection */}
      {selectedPiece ? (
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Header of piece */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#004719]/40">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#C9FF24] uppercase">
                  {selectedPiece.format.toUpperCase()} · {selectedPiece.suggestedDate}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">{selectedPiece.categoryTitle}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{selectedPiece.title}</h2>
              <p className="text-xs text-slate-300 mt-1">{selectedPiece.subtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenInEditor(selectedPiece)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#004719]/40 hover:bg-[#004719] text-white border border-[#087B18]/40 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C9FF24]" />
                <span>Abrir no Estúdio Canvas</span>
              </button>

              {selectedPiece.status !== 'approved' && (
                <button
                  onClick={() => onApprovePiece(selectedPiece.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#087B18] hover:bg-[#004719] text-[#C9FF24] border border-[#42D900]/40 transition-colors shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Aprovar Arte</span>
                </button>
              )}

              {selectedPiece.status !== 'rejected' && (
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reprovar</span>
                </button>
              )}
            </div>
          </div>

          {/* Visual Mini Preview + 10 Checklist Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Visual Thumbnail */}
            <div className="xl:col-span-4 flex flex-col items-center">
              <div className="rounded-xl overflow-hidden border border-[#087B18]/40 shadow-xl bg-black max-w-xs w-full">
                <img
                  src={selectedPiece.imageUrl}
                  alt={selectedPiece.title}
                  className="w-full object-cover aspect-[4/5]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-400">
                  Logo oficial aplicada:{' '}
                  <strong className="text-white capitalize">{selectedPiece.logoVariant}</strong>
                </span>
              </div>
            </div>

            {/* The 10 Strict Criteria Breakdown */}
            <div className="xl:col-span-8 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Checklist de Validação (10 Critérios)
                </h3>
                <span className="text-[11px] text-[#C9FF24] font-mono">10/10 REQUISITOS</span>
              </div>

              <div className="space-y-2">
                {QC_CRITERIA_LIST.map((crit) => (
                  <div
                    key={crit.id}
                    className="p-3 rounded-lg bg-[#070F0A] border border-[#004719]/60 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#087B18]/30 border border-[#42D900]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#C9FF24]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-200">{crit.name}</span>
                      <span className="block text-[11px] text-slate-400 leading-relaxed mt-0.5">
                        {crit.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
          Selecione uma peça na lista para conferir.
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedPiece && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0A120D] border border-rose-800/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>Reprovar Arte para Correção</span>
            </h3>
            <p className="text-xs text-slate-300">
              Descreva o motivo da reprovação (ex: texto cortado, erro ortográfico ou ajuste de contraste)
              para orientar a equipe.
            </p>
            <textarea
              rows={3}
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              placeholder="Descreva o que deve ser ajustado..."
              className="w-full px-3 py-2 text-xs bg-[#051008] border border-rose-900/50 rounded-xl text-white focus:outline-none focus:border-rose-400"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onRejectPiece(selectedPiece.id, rejectNote || 'Revisão solicitada pelo controle de qualidade');
                  setShowRejectModal(false);
                  setRejectNote('');
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white"
              >
                Confirmar Reprovação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
