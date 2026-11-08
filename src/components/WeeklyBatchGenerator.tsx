import React, { useState } from 'react';
import { Sparkles, Layers, BookOpen, MapPin, Heart, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { ContentPiece, ContentCategoryId } from '../types/content';
import { OFFICIAL_CATEGORIES } from '../data/categories';
import { INITIAL_WEEKLY_BATCH } from '../data/initialBatch';

interface WeeklyBatchGeneratorProps {
  onBatchGenerated: (newPieces: ContentPiece[]) => void;
  onGoToQc: () => void;
}

export const WeeklyBatchGenerator: React.FC<WeeklyBatchGeneratorProps> = ({
  onBatchGenerated,
  onGoToQc,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<ContentCategoryId[]>([
    'A', 'B', 'C', 'D', 'E', 'F', 'G'
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepName, setCurrentStepName] = useState('');
  const [weekLabel, setWeekLabel] = useState('Semana 02 — Campanha Novo Começo');

  const toggleCategory = (id: ContentCategoryId) => {
    if (selectedCategories.includes(id)) {
      if (selectedCategories.length === 1) return; // keep at least 1
      setSelectedCategories(selectedCategories.filter((c) => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setProgress(5);
    setCurrentStepName('Inicializando diretrizes editoriais e parâmetros de marca...');

    // Progress pipeline
    const steps = [
      { p: 18, name: 'Criando 10 artes educativas (Chaves do Conhecimento & Cuidando do Meu Lar)...' },
      { p: 42, name: 'Estruturando 5 carrosséis multilâminas com checklists de vistoria e locação...' },
      { p: 64, name: 'Produzindo 5 artes inspiracionais com fotografia arquitetônica hiper-realista...' },
      { p: 85, name: 'Gerando 5 conteúdos regionais exclusivos para Augustinópolis e Bico do Papagaio...' },
      { p: 95, name: 'Desenhando 5 stories interativos com enquetes e caixas de perguntas...' },
      { p: 100, name: 'Aplicando logos oficiais e gerando fila de Controle de Qualidade (QC)...' },
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 380));
      setProgress(step.p);
      setCurrentStepName(step.name);
    }

    // Generate fresh set based on initial batch with updated IDs and fresh timestamp
    const timestamp = Date.now();
    const freshPieces: ContentPiece[] = INITIAL_WEEKLY_BATCH.map((p, idx) => ({
      ...p,
      id: `cb-batch2-${idx + 1}-${timestamp.toString().slice(-4)}`,
      status: idx % 6 === 0 ? 'pending_qc' : 'approved',
      suggestedDate: idx % 2 === 0 ? 'Semana 2 · ' + p.suggestedDate : p.suggestedDate,
      qc: {
        ...p.qc,
        reviewedAt: 'Gerado automaticamente via Studio Engine',
      },
    }));

    onBatchGenerated(freshPieces);
    setIsGenerating(false);
  };

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto overflow-y-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#004719]/40 border border-[#087B18]/50 text-xs font-mono text-[#C9FF24]">
          <span>ORQUESTRADOR DE CONTEÚDO SEMANAL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Produção Automática Semanal (30 Peças)
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Gere com um clique o pacote completo de publicação publicitária e educativa para o Instagram da{' '}
          <strong className="text-white">CHAVES DO BICO</strong>, com fotos hiper-realistas, logos oficiais aplicadas,
          legendas formatadas e hashtags regionais.
        </p>
      </div>

      {/* Production Distribution Breakdown (The Mandatory 30 Items) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-xl bg-[#004719]/20 border border-[#087B18]/40 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#42D900] tracking-wider uppercase block mb-1">
              Educativas
            </span>
            <span className="text-3xl font-extrabold text-white font-mono">10</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2">Feed vertical (1080x1350)</span>
        </div>

        <div className="p-4 rounded-xl bg-[#004719]/20 border border-[#087B18]/40 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#C9FF24] tracking-wider uppercase block mb-1">
              Carrosséis
            </span>
            <span className="text-3xl font-extrabold text-white font-mono">5</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2">Multilâminas educativas</span>
        </div>

        <div className="p-4 rounded-xl bg-[#004719]/20 border border-[#087B18]/40 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#42D900] tracking-wider uppercase block mb-1">
              Inspiracionais
            </span>
            <span className="text-3xl font-extrabold text-white font-mono">5</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2">Arquitetura e bem-estar</span>
        </div>

        <div className="p-4 rounded-xl bg-[#004719]/20 border border-[#087B18]/40 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#C9FF24] tracking-wider uppercase block mb-1">
              Regionais
            </span>
            <span className="text-3xl font-extrabold text-white font-mono">5</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2">Augustinópolis & Bico</span>
        </div>

        <div className="p-4 rounded-xl bg-[#004719]/20 border border-[#087B18]/40 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#42D900] tracking-wider uppercase block mb-1">
              Stories
            </span>
            <span className="text-3xl font-extrabold text-white font-mono">5</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2">Enquetes e Caixas (1080x1920)</span>
        </div>
      </div>

      {/* Campaign Settings & Editorials Selector */}
      <div className="p-6 rounded-2xl bg-[#070D09] border border-[#087B18]/40 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
              Identificação da Campanha / Semana
            </label>
            <input
              type="text"
              value={weekLabel}
              onChange={(e) => setWeekLabel(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-[#040A06] border border-[#087B18]/50 rounded-xl text-white focus:outline-none focus:border-[#C9FF24]"
              placeholder="ex: Semana 02 — Campanha Seu Novo Começo"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
              Direção Fotográfica & Iluminação
            </label>
            <div className="px-3.5 py-2 rounded-xl bg-[#040A06] border border-[#087B18]/50 text-xs text-slate-300 flex items-center justify-between">
              <span>Luz natural cinematográfica · Minimalismo moderno</span>
              <span className="text-[10px] text-[#C9FF24] font-mono">PADRÃO AGÊNCIA</span>
            </div>
          </div>
        </div>

        {/* Categories selector */}
        <div>
          <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
            Editorias Oficiais Selecionadas para o Lote:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {OFFICIAL_CATEGORIES.map((cat) => {
              const isChecked = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    isChecked
                      ? 'bg-[#004719]/40 border-[#42D900] text-white shadow-sm'
                      : 'bg-[#051008] border-slate-800 text-slate-400 hover:border-[#087B18]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                      isChecked
                        ? 'bg-[#42D900] border-[#42D900] text-black font-bold text-xs'
                        : 'border-slate-700 bg-transparent'
                    }`}
                  >
                    {isChecked && '✓'}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-200">
                      {cat.id}. {cat.name}
                    </span>
                    <span className="block text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {cat.shortDesc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress or Trigger Area */}
        {isGenerating ? (
          <div className="p-6 rounded-xl bg-[#040905] border border-[#087B18]/50 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#C9FF24] font-bold font-mono">
                GERANDO PACOTE SEMANAL... {progress}%
              </span>
              <span className="text-slate-400 font-mono">30 ITENS EM PROCESSAMENTO</span>
            </div>
            <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-[#087B18]/40">
              <div
                className="h-full bg-gradient-to-r from-[#087B18] via-[#42D900] to-[#C9FF24] transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-300 font-sans italic">{currentStepName}</p>
          </div>
        ) : (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Pronto para gerar as 30 peças com aplicação das logos oficiais e legendas completas.
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onGoToQc}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#004719]/40 hover:bg-[#004719] border border-[#087B18]/50 transition-colors"
              >
                Ver Fila Atual de QC
              </button>

              <button
                onClick={handleStartGeneration}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-[#051408] bg-[#C9FF24] hover:bg-[#b8eb1f] transition-all shadow-md hover:shadow-[#C9FF24]/20"
              >
                <Sparkles className="w-4 h-4 fill-[#051408]" />
                <span>Gerar Lote de 30 Peças</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
