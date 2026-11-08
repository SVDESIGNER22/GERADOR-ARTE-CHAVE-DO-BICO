import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { ContentPiece } from './types/content';
import { INITIAL_WEEKLY_BATCH } from './data/initialBatch';
import { TopNav, StudioTab } from './components/TopNav';
import { Dashboard } from './components/Dashboard';
import { StudioCanvas } from './components/StudioCanvas';
import { WeeklyBatchGenerator } from './components/WeeklyBatchGenerator';
import { QualityControlQueue } from './components/QualityControlQueue';
import { EditorialCalendar } from './components/EditorialCalendar';
import { GalleryApproved } from './components/GalleryApproved';
import { BrandAssetsLibrary } from './components/BrandAssetsLibrary';
import { CaptionBank } from './components/CaptionBank';
import { exportPieceAsBlob } from './utils/canvasRenderer';

const STORAGE_KEY = 'chaves_do_bico_pieces_v1';

export default function App() {
  const [pieces, setPieces] = useState<ContentPiece[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    return INITIAL_WEEKLY_BATCH;
  });

  const [selectedPiece, setSelectedPiece] = useState<ContentPiece>(pieces[0] || INITIAL_WEEKLY_BATCH[0]);
  const [activeTab, setActiveTab] = useState<StudioTab>('dashboard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pieces));
    } catch (e) {
      console.warn('Could not write to localStorage:', e);
    }
  }, [pieces]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleUpdatePiece = (updated: ContentPiece) => {
    setPieces((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedPiece(updated);
  };

  const handleApprovePiece = (id: string) => {
    setPieces((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: 'approved',
            qc: {
              ...p.qc,
              approved: true,
              reviewedAt: 'Aprovado via QC Studio',
            },
          };
        }
        return p;
      })
    );
    if (selectedPiece.id === id) {
      setSelectedPiece((prev) => ({
        ...prev,
        status: 'approved',
        qc: {
          ...prev.qc,
          approved: true,
          reviewedAt: 'Aprovado via QC Studio',
        },
      }));
    }
    showToast('Arte aprovada com sucesso no Controle de Qualidade!');
  };

  const handleRejectPiece = (id: string, notes: string) => {
    setPieces((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: 'rejected',
            qc: {
              ...p.qc,
              approved: false,
              notes,
              reviewedAt: 'Revisão solicitada pelo QC',
            },
          };
        }
        return p;
      })
    );
    if (selectedPiece.id === id) {
      setSelectedPiece((prev) => ({
        ...prev,
        status: 'rejected',
        qc: {
          ...prev.qc,
          approved: false,
          notes,
          reviewedAt: 'Revisão solicitada pelo QC',
        },
      }));
    }
    showToast('Arte enviada para revisão.');
  };

  const handleApproveAllValid = () => {
    setPieces((prev) =>
      prev.map((p) => ({
        ...p,
        status: 'approved',
        qc: {
          ...p.qc,
          approved: true,
          reviewedAt: 'Aprovação em lote dos 10 critérios',
        },
      }))
    );
    showToast('Todas as peças foram aprovadas no Controle de Qualidade!');
  };

  const handleBatchGenerated = (newPieces: ContentPiece[]) => {
    setPieces(newPieces);
    setSelectedPiece(newPieces[0]);
    setActiveTab('qc');
    showToast('Novo lote semanal de 30 peças gerado com sucesso!');
  };

  const handleQuickExportZip = async () => {
    showToast('Iniciando empacotamento das 30 artes em alta resolução...');
    try {
      const zip = new JSZip();
      const folderFeed = zip.folder('01_Feed_Educativo');
      const folderCarrossel = zip.folder('02_Carrosseis');
      const folderStories = zip.folder('03_Stories');
      const folderLegendas = zip.folder('04_Legendas');

      let captionsDoc = `# CHAVES DO BICO — EXPORTAÇÃO COMPLETA DE CONTEÚDO\n`;
      captionsDoc += `Assinatura Oficial: "Seu novo começo tem um endereço."\n`;
      captionsDoc += `Total: ${pieces.length} peças publicitárias e educativas\n\n`;

      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const blob = await exportPieceAsBlob(piece, 0);

        if (piece.format === 'carousel' && piece.carouselSlides && piece.carouselSlides.length > 1) {
          const subF = folderCarrossel?.folder(piece.id);
          subF?.file(`${piece.id}_slide01.png`, blob);
          for (let s = 1; s < piece.carouselSlides.length; s++) {
            const slideBlob = await exportPieceAsBlob(piece, s);
            subF?.file(`${piece.id}_slide0${s + 1}.png`, slideBlob);
          }
        } else if (piece.format === 'story') {
          folderStories?.file(`${piece.id}_story.png`, blob);
        } else {
          folderFeed?.file(`${piece.id}_feed.png`, blob);
        }

        captionsDoc += `[ARTE ${i + 1}] ${piece.title}\n`;
        captionsDoc += `Editoria: ${piece.categoryTitle}\n`;
        captionsDoc += `Data: ${piece.suggestedDate} às ${piece.suggestedTime || '11:00'}\n\n`;
        captionsDoc += `${piece.caption}\n\n${piece.hashtags.join(' ')}\n\n`;
        captionsDoc += `--------------------------------------------------\n\n`;
      }

      folderLegendas?.file('Legendas_e_Hashtags.txt', captionsDoc);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ChavesDoBico_PacoteSemanal_30Artes_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Download do pacote ZIP concluído!');
    } catch (err) {
      console.error('ZIP generation error:', err);
      showToast('Erro ao gerar arquivo ZIP.');
    }
  };

  const approvedCount = pieces.filter((p) => p.status === 'approved' && p.qc.approved).length;

  return (
    <div className="min-h-screen bg-[#070D09] text-slate-100 flex flex-col antialiased">
      {/* Strict 3-Zone Top Navigation */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        approvedCount={approvedCount}
        totalCount={pieces.length}
        onQuickGenerate={() => setActiveTab('batch')}
        onQuickExportZip={handleQuickExportZip}
      />

      {/* Main Content Router */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'dashboard' && (
          <Dashboard
            pieces={pieces}
            setActiveTab={setActiveTab}
            onSelectPiece={(p) => {
              setSelectedPiece(p);
              setActiveTab('studio');
            }}
            onQuickGenerate={() => setActiveTab('batch')}
            onQuickExportZip={handleQuickExportZip}
          />
        )}

        {activeTab === 'batch' && (
          <WeeklyBatchGenerator
            onBatchGenerated={handleBatchGenerated}
            onGoToQc={() => setActiveTab('qc')}
          />
        )}

        {activeTab === 'studio' && (
          <StudioCanvas
            piece={selectedPiece}
            onUpdatePiece={handleUpdatePiece}
            onApprovePiece={handleApprovePiece}
            onRejectPiece={handleRejectPiece}
            allPieces={pieces}
            onSelectPiece={setSelectedPiece}
          />
        )}

        {activeTab === 'qc' && (
          <QualityControlQueue
            pieces={pieces}
            onApprovePiece={handleApprovePiece}
            onRejectPiece={handleRejectPiece}
            onOpenInEditor={(p) => {
              setSelectedPiece(p);
              setActiveTab('studio');
            }}
            onApproveAllValid={handleApproveAllValid}
          />
        )}

        {activeTab === 'calendar' && (
          <EditorialCalendar
            pieces={pieces}
            onSelectPiece={(p) => {
              setSelectedPiece(p);
              setActiveTab('studio');
            }}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryApproved
            pieces={pieces}
            onSelectPiece={(p) => {
              setSelectedPiece(p);
              setActiveTab('studio');
            }}
          />
        )}

        {activeTab === 'brand' && <BrandAssetsLibrary />}

        {activeTab === 'captions' && (
          <CaptionBank
            pieces={pieces}
            onSelectPiece={(p) => {
              setSelectedPiece(p);
              setActiveTab('studio');
            }}
          />
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#004719] text-[#C9FF24] border border-[#42D900]/50 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
