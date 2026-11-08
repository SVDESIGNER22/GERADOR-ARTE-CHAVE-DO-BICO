import React, { useState } from 'react';
import { Download, Filter, Eye, Copy, Check, Sparkles, FolderArchive, Layers } from 'lucide-react';
import JSZip from 'jszip';
import { ContentPiece, ContentFormat } from '../types/content';
import { exportPieceAsBlob } from '../utils/canvasRenderer';

interface GalleryApprovedProps {
  pieces: ContentPiece[];
  onSelectPiece: (piece: ContentPiece) => void;
}

export const GalleryApproved: React.FC<GalleryApprovedProps> = ({
  pieces,
  onSelectPiece,
}) => {
  const [formatFilter, setFormatFilter] = useState<'all' | ContentFormat>('all');
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const approvedPieces = pieces.filter((p) => p.status === 'approved' && p.qc.approved);

  const displayedPieces = approvedPieces.filter((p) => {
    if (formatFilter === 'all') return true;
    return p.format === formatFilter;
  });

  const handleCopyCaption = async (p: ContentPiece, e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(`${p.caption}\n\n${p.hashtags.join(' ')}`);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadSingle = async (p: ContentPiece, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const blob = await exportPieceAsBlob(p, 0);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ChavesDoBico_${p.id}_${p.format}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download single piece:', err);
    }
  };

  const handleDownloadAllZip = async () => {
    if (approvedPieces.length === 0) return;
    setIsZipping(true);
    setZipProgress(0);

    try {
      const zip = new JSZip();
      const folderFeed = zip.folder('01_Feed_Educativo_e_Inspiracional');
      const folderCarrossel = zip.folder('02_Carrosseis');
      const folderStories = zip.folder('03_Stories_Interativos');
      const folderLegendas = zip.folder('04_Legendas_e_Textos');

      let captionsReport = `# CHAVES DO BICO — PACOTE DE CONTEÚDO SEMANAL\n`;
      captionsReport += `Assinatura Oficial: "Seu novo começo tem um endereço."\n`;
      captionsReport += `Região: Augustinópolis e Bico do Papagaio (Tocantins)\n`;
      captionsReport += `Total de Peças: ${approvedPieces.length}\n\n`;
      captionsReport += `====================================================\n\n`;

      for (let i = 0; i < approvedPieces.length; i++) {
        const piece = approvedPieces[i];
        setZipProgress(Math.round(((i + 1) / approvedPieces.length) * 100));

        // Export primary slide
        const blob = await exportPieceAsBlob(piece, 0);

        if (piece.format === 'carousel' && piece.carouselSlides && piece.carouselSlides.length > 1) {
          // Add all slides for carousel
          const subCarouselFolder = folderCarrossel?.folder(piece.id);
          subCarouselFolder?.file(`${piece.id}_slide01.png`, blob);

          for (let s = 1; s < piece.carouselSlides.length; s++) {
            const slideBlob = await exportPieceAsBlob(piece, s);
            subCarouselFolder?.file(`${piece.id}_slide0${s + 1}.png`, slideBlob);
          }
        } else if (piece.format === 'story') {
          folderStories?.file(`${piece.id}_story.png`, blob);
        } else {
          folderFeed?.file(`${piece.id}_feed.png`, blob);
        }

        // Add to text report
        captionsReport += `[ARTE ${i + 1}] ${piece.id} - ${piece.title}\n`;
        captionsReport += `Editoria: ${piece.categoryTitle}\n`;
        captionsReport += `Formato: ${piece.format.toUpperCase()} (${piece.format === 'story' ? '1080x1920' : '1080x1350'})\n`;
        captionsReport += `Data sugerida: ${piece.suggestedDate} às ${piece.suggestedTime || '11:00'}\n\n`;
        captionsReport += `LEGENDA:\n${piece.caption}\n\n`;
        captionsReport += `HASHTAGS:\n${piece.hashtags.join(' ')}\n\n`;
        captionsReport += `----------------------------------------------------\n\n`;
      }

      folderLegendas?.file('Legendas_e_Cronograma_Semanal.txt', captionsReport);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ChavesDoBico_PacoteSemanal_30Artes_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('ZIP generation error:', err);
    } finally {
      setIsZipping(false);
      setZipProgress(0);
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto overflow-y-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#004719]/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#004719]/40 border border-[#087B18]/50 text-xs font-mono text-[#C9FF24] mb-2">
            <span>PORTFÓLIO APROVADO</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Galeria de Artes Aprovadas ({approvedPieces.length})
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Artes prontas para publicação no padrão 1080x1350 e 1080x1920 com exportação em lote.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadAllZip}
            disabled={isZipping || approvedPieces.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#C9FF24] hover:bg-[#b8eb1f] text-[#051408] transition-all shadow-sm"
          >
            <FolderArchive className="w-4 h-4" />
            <span>
              {isZipping ? `Gerando ZIP (${zipProgress}%)...` : `Baixar Pacote Completo (ZIP)`}
            </span>
          </button>
        </div>
      </div>

      {/* Segmented Format Filter */}
      <div className="flex items-center gap-1.5 p-1 bg-[#051008] rounded-xl border border-[#087B18]/30 max-w-md">
        <button
          onClick={() => setFormatFilter('all')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            formatFilter === 'all'
              ? 'bg-[#087B18] text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Todos ({approvedPieces.length})
        </button>
        <button
          onClick={() => setFormatFilter('feed')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            formatFilter === 'feed'
              ? 'bg-[#087B18] text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Feed (1080x1350)
        </button>
        <button
          onClick={() => setFormatFilter('carousel')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            formatFilter === 'carousel'
              ? 'bg-[#087B18] text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Carrosséis
        </button>
        <button
          onClick={() => setFormatFilter('story')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            formatFilter === 'story'
              ? 'bg-[#087B18] text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Stories (1080x1920)
        </button>
      </div>

      {/* Visual Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedPieces.map((piece) => (
          <div
            key={piece.id}
            onClick={() => onSelectPiece(piece)}
            className="group rounded-2xl bg-[#070E09] border border-[#004719]/60 hover:border-[#42D900]/50 overflow-hidden cursor-pointer transition-all flex flex-col shadow-lg"
          >
            {/* Visual Thumbnail */}
            <div className="relative w-full aspect-[4/5] bg-black overflow-hidden">
              <img
                src={piece.imageUrl}
                alt={piece.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Format & Category Tag */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px]">
                <span className="font-mono uppercase font-bold bg-black/80 backdrop-blur-sm text-[#C9FF24] px-2 py-0.5 rounded">
                  {piece.format}
                </span>
                <span className="font-mono text-white/80 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded">
                  {piece.suggestedDate.split(' ')[0]}
                </span>
              </div>

              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                <button
                  onClick={(e) => handleDownloadSingle(piece, e)}
                  className="p-2 rounded-full bg-[#087B18] hover:bg-[#004719] text-[#C9FF24] border border-[#42D900]/40 transition-colors"
                  title="Baixar PNG em alta resolução"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleCopyCaption(piece, e)}
                  className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
                  title="Copiar legenda"
                >
                  {copiedId === piece.id ? (
                    <Check className="w-4 h-4 text-[#C9FF24]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#42D900] uppercase block truncate">
                  {piece.categoryTitle}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                  {piece.title}
                </h4>
              </div>

              <div className="pt-2 border-t border-[#004719]/40 flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate max-w-[140px]">
                  Logo: <strong className="text-slate-300 capitalize">{piece.logoVariant}</strong>
                </span>
                <span className="text-[#C9FF24] font-medium group-hover:underline">Editar ›</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
