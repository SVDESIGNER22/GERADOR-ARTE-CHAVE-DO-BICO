import React, { useRef, useEffect, useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  ShieldCheck,
  RefreshCw,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText
} from 'lucide-react';
import { ContentPiece, LogoVariant, LogoPosition } from '../types/content';
import { BRAND_LOGOS, BRAND_TAGLINE } from '../data/brandAssets';
import { CURATED_REAL_ESTATE_PHOTOS } from '../data/curatedPhotography';
import { renderPieceToCanvas, exportPieceAsBlob } from '../utils/canvasRenderer';

interface StudioCanvasProps {
  piece: ContentPiece;
  onUpdatePiece: (updated: ContentPiece) => void;
  onApprovePiece: (id: string) => void;
  onRejectPiece: (id: string, notes: string) => void;
  allPieces: ContentPiece[];
  onSelectPiece: (piece: ContentPiece) => void;
}

export const StudioCanvas: React.FC<StudioCanvasProps> = ({
  piece,
  onUpdatePiece,
  onApprovePiece,
  onRejectPiece,
  allPieces,
  onSelectPiece,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingAiImage, setIsGeneratingAiImage] = useState(false);
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Redraw canvas whenever piece properties or active slide change
  useEffect(() => {
    if (canvasRef.current) {
      renderPieceToCanvas(canvasRef.current, piece, activeSlide).catch((err) => {
        console.error('Canvas render error:', err);
      });
    }
  }, [piece, activeSlide]);

  const handleCopyCaption = async () => {
    const textToCopy = `${piece.caption}\n\n${piece.hashtags.join(' ')}`;
    await navigator.clipboard.writeText(textToCopy);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleDownloadPng = async () => {
    setIsExporting(true);
    try {
      const blob = await exportPieceAsBlob(piece, activeSlide);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const filename = `ChavesDoBico_${piece.id}_slide${activeSlide + 1}_${piece.format}.png`;
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed:', e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleRegenerateImageWithAi = async () => {
    setIsGeneratingAiImage(true);
    setAiError(null);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: piece.visualPrompt,
          aspectRatio: piece.format === 'story' ? '9:16' : '3:4',
        }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        onUpdatePiece({
          ...piece,
          imageUrl: data.imageUrl,
          isAiGenerated: true,
        });
      } else if (data.fallback) {
        // Fallback photo rotation
        const randomPhoto =
          CURATED_REAL_ESTATE_PHOTOS[
            Math.floor(Math.random() * CURATED_REAL_ESTATE_PHOTOS.length)
          ];
        onUpdatePiece({
          ...piece,
          imageUrl: randomPhoto.url,
          isAiGenerated: false,
        });
      }
    } catch (err: any) {
      setAiError('Serviço de IA ocupado. Imagem mantida.');
    } finally {
      setIsGeneratingAiImage(false);
    }
  };

  const totalSlides = piece.carouselSlides?.length || 1;
  const currentIndex = allPieces.findIndex((p) => p.id === piece.id);
  const prevPiece = currentIndex > 0 ? allPieces[currentIndex - 1] : null;
  const nextPiece = currentIndex < allPieces.length - 1 ? allPieces[currentIndex + 1] : null;

  return (
    <div className="flex-1 flex flex-col xl:flex-row h-full overflow-hidden bg-[#0A100D]">
      {/* LEFT: Interactive Canvas Viewport */}
      <div className="flex-1 flex flex-col border-b xl:border-b-0 xl:border-r border-[#004719]/40 bg-[#060B08] p-4 lg:p-6 overflow-y-auto">
        {/* Navigation & Format Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#004719]/40 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#C9FF24] uppercase font-bold tracking-wider">
              {piece.format.toUpperCase()} · {piece.format === 'story' ? '1080x1920' : '1080x1350'}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 truncate max-w-xs">{piece.categoryTitle}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled={!prevPiece}
              onClick={() => prevPiece && onSelectPiece(prevPiece)}
              className="p-1.5 rounded bg-[#004719]/40 hover:bg-[#004719] text-slate-300 disabled:opacity-30 disabled:hover:bg-[#004719]/40 transition-colors"
              title="Peça anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs px-2 text-slate-400">
              {currentIndex + 1} de {allPieces.length}
            </span>
            <button
              disabled={!nextPiece}
              onClick={() => nextPiece && onSelectPiece(nextPiece)}
              className="p-1.5 rounded bg-[#004719]/40 hover:bg-[#004719] text-slate-300 disabled:opacity-30 disabled:hover:bg-[#004719]/40 transition-colors"
              title="Próxima peça"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The High-Resolution Canvas Preview Container */}
        <div className="flex-1 flex items-center justify-center min-h-[460px] py-2 relative">
          <div className="relative shadow-2xl rounded-xl overflow-hidden border border-[#087B18]/30 max-h-[72vh] flex items-center justify-center bg-black/60">
            <canvas
              ref={canvasRef}
              className={`object-contain block ${
                piece.format === 'story'
                  ? 'max-h-[68vh] aspect-[9/16]'
                  : 'max-h-[68vh] aspect-[4/5]'
              }`}
              style={{ width: 'auto', height: '100%' }}
            />

            {/* Loading / Generating Overlay */}
            {isGeneratingAiImage && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-center p-6">
                <RefreshCw className="w-8 h-8 text-[#C9FF24] animate-spin" />
                <p className="text-sm font-semibold text-white">Gerando Fotografia com Inteligência Artificial...</p>
                <p className="text-xs text-slate-400">Arquitetura hiper-realista e iluminação natural cinematográfica</p>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Slide Switcher (if applicable) */}
        {piece.format === 'carousel' && piece.carouselSlides && (
          <div className="mt-4 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#004719]/30 border border-[#087B18]/30">
            <span className="text-xs font-semibold text-slate-300 mr-2">Lâminas do Carrossel:</span>
            {piece.carouselSlides.map((slide, idx) => (
              <button
                key={slide.slideNumber}
                onClick={() => setActiveSlide(idx)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  activeSlide === idx
                    ? 'bg-[#C9FF24] text-[#051408] shadow-sm'
                    : 'bg-[#087B18]/40 hover:bg-[#087B18] text-slate-300'
                }`}
              >
                0{slide.slideNumber}
              </button>
            ))}
          </div>
        )}

        {/* Quick Action Bar Under Canvas */}
        <div className="mt-4 pt-3 border-t border-[#004719]/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerateImageWithAi}
              disabled={isGeneratingAiImage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#004719]/60 hover:bg-[#004719] text-slate-200 border border-[#087B18]/40 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9FF24]" />
              <span>Regenerar Foto com IA</span>
            </button>

            <button
              onClick={() => setIsPhotoPickerOpen(!isPhotoPickerOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#004719]/40 hover:bg-[#004719] text-slate-200 border border-[#087B18]/30 transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#42D900]" />
              <span>Acervo Editorial</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCaption}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#004719]/60 hover:bg-[#004719] text-slate-200 border border-[#087B18]/40 transition-colors"
            >
              {copiedCaption ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C9FF24]" />
                  <span className="text-[#C9FF24]">Legenda Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Legenda</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#C9FF24] hover:bg-[#b8eb1f] text-[#051408] transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Renderizando...' : 'Baixar PNG (1080px)'}</span>
            </button>
          </div>
        </div>

        {/* Photo Picker Drawer */}
        {isPhotoPickerOpen && (
          <div className="mt-4 p-4 rounded-xl bg-[#07130A] border border-[#087B18]/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Acervo de Fotografia Imobiliária de Alta Resolução
              </span>
              <button
                onClick={() => setIsPhotoPickerOpen(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Fechar
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-48 overflow-y-auto pr-1">
              {CURATED_REAL_ESTATE_PHOTOS.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    onUpdatePiece({
                      ...piece,
                      imageUrl: photo.url,
                      isAiGenerated: false,
                    });
                    setIsPhotoPickerOpen(false);
                  }}
                  className={`group relative rounded-lg overflow-hidden border transition-all aspect-[4/3] ${
                    piece.imageUrl === photo.url
                      ? 'border-[#C9FF24] ring-2 ring-[#C9FF24]/30'
                      : 'border-slate-800 hover:border-[#42D900]'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] text-white font-medium line-clamp-1">
                      {photo.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: Editorial Controls, Typography & Brand Rules Inspector */}
      <div className="w-full xl:w-[420px] bg-[#070D09] p-5 overflow-y-auto space-y-5">
        {/* QC Status Card */}
        <div className="p-4 rounded-xl bg-[#004719]/20 border border-[#087B18]/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Controle de Qualidade (QC)
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                piece.status === 'approved'
                  ? 'bg-[#087B18] text-[#C9FF24]'
                  : piece.status === 'rejected'
                  ? 'bg-rose-950 text-rose-300'
                  : 'bg-amber-950 text-amber-300'
              }`}
            >
              {piece.status === 'approved'
                ? '✓ APROVADO'
                : piece.status === 'rejected'
                ? '✕ REPROVADO'
                : 'PENDENTE DE QC'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {piece.qc.notes ||
              'Esta peça deve respeitar os 10 critérios oficiais da marca antes de ser aprovada para postagem.'}
          </p>

          <div className="flex items-center gap-2">
            {piece.status !== 'approved' && (
              <button
                onClick={() => onApprovePiece(piece.id)}
                className="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold bg-[#087B18] hover:bg-[#004719] text-[#C9FF24] border border-[#42D900]/40 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Aprovar Peça</span>
              </button>
            )}
            {piece.status !== 'rejected' && (
              <button
                onClick={() => onRejectPiece(piece.id, 'Ajustar contraste e alinhamento do texto')}
                className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition-colors"
              >
                Solicitar Revisão
              </button>
            )}
          </div>
        </div>

        {/* Logo Selection & Margins (Never Redrawn, Strictly Official File) */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-white uppercase tracking-wider">
            Versão da Logo Oficial
          </label>
          <p className="text-xs text-slate-400 leading-normal">
            Selecione uma das 4 logos oficiais inalteradas com respiro automático.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {BRAND_LOGOS.map((logo) => (
              <button
                key={logo.id}
                onClick={() => onUpdatePiece({ ...piece, logoVariant: logo.id as LogoVariant })}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  piece.logoVariant === logo.id
                    ? 'border-[#C9FF24] bg-[#004719]/40 ring-1 ring-[#C9FF24]/40'
                    : 'border-slate-800 bg-[#004719]/10 hover:border-[#087B18]'
                }`}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="w-8 h-8 object-contain shrink-0 rounded bg-black/40 p-0.5"
                />
                <div className="overflow-hidden">
                  <span className="block text-xs font-bold text-slate-200 truncate">
                    {logo.badge}
                  </span>
                  <span className="block text-[10px] text-slate-400 truncate">
                    {logo.id}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2">
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
              Posição da Assinatura:
            </label>
            <div className="flex items-center gap-1.5 bg-[#004719]/20 p-1 rounded-lg border border-[#087B18]/30">
              {(
                [
                  { id: 'top-left', label: 'Superior E.' },
                  { id: 'top-right', label: 'Superior D.' },
                  { id: 'top-center', label: 'Central Topo' },
                  { id: 'bottom-center', label: 'Inferior C.' },
                ] as const
              ).map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => onUpdatePiece({ ...piece, logoPosition: pos.id })}
                  className={`flex-1 py-1 text-[11px] font-medium rounded transition-colors ${
                    piece.logoPosition === pos.id
                      ? 'bg-[#087B18] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-Time Typography Editor */}
        <div className="space-y-3 pt-2 border-t border-[#004719]/40">
          <label className="block text-xs font-bold text-white uppercase tracking-wider">
            Tipografia & Textos da Arte
          </label>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">
              Selo / Kicker Superior:
            </label>
            <input
              type="text"
              value={piece.badgeText || ''}
              onChange={(e) => onUpdatePiece({ ...piece, badgeText: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-[#051008] border border-[#087B18]/40 rounded-lg text-white focus:outline-none focus:border-[#C9FF24]"
              placeholder="ex: GUIA PRÁTICO"
            />
          </div>

          {/* If Carousel, edit active slide */}
          {piece.format === 'carousel' && piece.carouselSlides && piece.carouselSlides[activeSlide] ? (
            <>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Título da Lâmina 0{activeSlide + 1}:
                </label>
                <input
                  type="text"
                  value={piece.carouselSlides[activeSlide].title}
                  onChange={(e) => {
                    const newSlides = [...piece.carouselSlides!];
                    newSlides[activeSlide] = {
                      ...newSlides[activeSlide],
                      title: e.target.value,
                    };
                    onUpdatePiece({ ...piece, carouselSlides: newSlides });
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-[#051008] border border-[#087B18]/40 rounded-lg text-white font-bold focus:outline-none focus:border-[#C9FF24]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Corpo da Lâmina 0{activeSlide + 1}:
                </label>
                <textarea
                  rows={3}
                  value={piece.carouselSlides[activeSlide].body}
                  onChange={(e) => {
                    const newSlides = [...piece.carouselSlides!];
                    newSlides[activeSlide] = {
                      ...newSlides[activeSlide],
                      body: e.target.value,
                    };
                    onUpdatePiece({ ...piece, carouselSlides: newSlides });
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-[#051008] border border-[#087B18]/40 rounded-lg text-white focus:outline-none focus:border-[#C9FF24]"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Título Principal:
                </label>
                <input
                  type="text"
                  value={piece.title}
                  onChange={(e) => onUpdatePiece({ ...piece, title: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#051008] border border-[#087B18]/40 rounded-lg text-white font-bold focus:outline-none focus:border-[#C9FF24]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Subtítulo Editorial:
                </label>
                <textarea
                  rows={2}
                  value={piece.subtitle}
                  onChange={(e) => onUpdatePiece({ ...piece, subtitle: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#051008] border border-[#087B18]/40 rounded-lg text-white focus:outline-none focus:border-[#C9FF24]"
                />
              </div>
            </>
          )}

          {/* Official Tagline Assurance */}
          <div className="p-3 rounded-lg bg-[#004719]/15 border border-[#42D900]/20 flex items-start gap-2 text-[11px] text-slate-400">
            <span className="text-[#C9FF24] font-bold">Assinatura:</span>
            <span className="italic font-serif-display text-slate-300">"{BRAND_TAGLINE}"</span>
          </div>
        </div>

        {/* Instagram Copy & Caption Preview */}
        <div className="space-y-2 pt-2 border-t border-[#004719]/40">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white uppercase tracking-wider">
              Legenda do Instagram
            </label>
            <button
              onClick={handleCopyCaption}
              className="text-[11px] font-semibold text-[#C9FF24] hover:underline"
            >
              {copiedCaption ? 'Copiada!' : 'Copiar Texto'}
            </button>
          </div>
          <div className="p-3 rounded-lg bg-[#051008] border border-[#087B18]/30 max-h-40 overflow-y-auto text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-wrap select-text">
            {piece.caption}
            {'\n\n'}
            <span className="text-[#42D900]">{piece.hashtags.join(' ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
