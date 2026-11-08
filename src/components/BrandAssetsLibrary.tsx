import React, { useState } from 'react';
import { Download, Copy, Check, ShieldAlert, Award, FileCheck } from 'lucide-react';
import { BRAND_LOGOS, BRAND_COLORS, BRAND_TAGLINE, BRAND_REGION } from '../data/brandAssets';

export const BrandAssetsLibrary: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto overflow-y-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#004719]/40 border border-[#087B18]/50 text-xs font-mono text-[#C9FF24]">
          <span>MANUAL DE MARCA & ATIVOS OFICIAIS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Identidade Visual & Biblioteca de Logos
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Repositório permanente dos ativos oficiais da <strong className="text-white">CHAVES DO BICO</strong>.
          Regras inegociáveis de preservação da assinatura institucional e padronização cromática.
        </p>
      </div>

      {/* Official Tagline Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#004719]/60 via-[#087B18]/40 to-[#004719]/60 border border-[#42D900]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-[#C9FF24] uppercase font-bold tracking-widest block mb-1">
            Assinatura Oficial da Marca
          </span>
          <h2 className="text-xl sm:text-2xl font-serif-display italic font-semibold text-white">
            "{BRAND_TAGLINE}"
          </h2>
          <span className="text-xs text-slate-300 mt-1 block">
            Plataforma de divulgação e intermediação de imóveis · {BRAND_REGION}
          </span>
        </div>
        <div className="px-4 py-2 rounded-xl bg-black/40 border border-[#C9FF24]/30 text-xs font-mono text-[#C9FF24] shrink-0">
          USO OBRIGATÓRIO EM RODAPÉS
        </div>
      </div>

      {/* The 4 Official Logo Files */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Arquivos Oficiais da Logo (Nunca Modificar)
          </h3>
          <span className="text-xs text-slate-400">PNG Transparente de Alta Resolução</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BRAND_LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="p-5 rounded-2xl bg-[#070E09] border border-[#004719]/60 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-full h-44 rounded-xl bg-[#040A06] border border-[#087B18]/30 flex items-center justify-center p-4 relative group">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-[#C9FF24] border border-[#42D900]/30">
                    {logo.badge}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{logo.name}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{logo.description}</p>
                  <p className="text-[11px] text-[#42D900] mt-2 italic">
                    Uso recomendado: {logo.recommendedUse}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#004719]/40 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">Ativo Permanente</span>
                <a
                  href={logo.src}
                  download={`ChavesDoBico_${logo.id}.png`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#004719]/50 hover:bg-[#004719] text-[#C9FF24] border border-[#087B18]/40 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Original</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Color Palette */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Paleta Cromática Oficial
          </h3>
          <span className="text-xs text-slate-400">Clique para copiar o valor HEX</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {BRAND_COLORS.map((col) => (
            <button
              key={col.hex}
              onClick={() => handleCopyHex(col.hex)}
              className="group p-3.5 rounded-xl bg-[#070E09] border border-[#004719]/60 hover:border-[#42D900] text-left transition-all space-y-3"
            >
              <div
                className="w-full h-16 rounded-lg border border-white/10 shadow-inner flex items-end justify-end p-2"
                style={{ backgroundColor: col.hex }}
              >
                {copiedHex === col.hex && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black text-[#C9FF24]">
                    Copiado!
                  </span>
                )}
              </div>
              <div>
                <span className="block text-xs font-bold text-white">{col.name}</span>
                <span className="block text-xs font-mono text-[#C9FF24] group-hover:underline">
                  {col.hex}
                </span>
                <span className="block text-[10px] text-slate-400 mt-1 line-clamp-2">
                  {col.role}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Non-Negotiable Brand Rules (Directive Checklist) */}
      <div className="p-6 rounded-2xl bg-[#080F0B] border border-[#004719] space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#C9FF24]" />
          <span>Regras Inegociáveis de Publicidade da Marca</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-black/30 border border-[#087B18]/30 flex items-start gap-2.5">
            <span className="text-[#C9FF24] font-bold text-sm">✕</span>
            <span><strong>Nunca redesenhar a logo:</strong> Use exclusivamente os arquivos originais fornecidos.</span>
          </div>
          <div className="p-3 rounded-lg bg-black/30 border border-[#087B18]/30 flex items-start gap-2.5">
            <span className="text-[#C9FF24] font-bold text-sm">✕</span>
            <span><strong>Nunca modificar a tipografia da marca:</strong> Não altere proporções ou famílias tipográficas da assinatura.</span>
          </div>
          <div className="p-3 rounded-lg bg-black/30 border border-[#087B18]/30 flex items-start gap-2.5">
            <span className="text-[#C9FF24] font-bold text-sm">✕</span>
            <span><strong>Nunca gerar logo por IA:</strong> O motor de IA é restrito estritamente a cenários fotográficos e arquitetura.</span>
          </div>
          <div className="p-3 rounded-lg bg-black/30 border border-[#087B18]/30 flex items-start gap-2.5">
            <span className="text-[#C9FF24] font-bold text-sm">✕</span>
            <span><strong>Não divulgar preços em artes institucionais:</strong> O posicionamento foca em credibilidade e segurança.</span>
          </div>
          <div className="p-3 rounded-lg bg-black/30 border border-[#087B18]/30 flex items-start gap-2.5">
            <span className="text-[#C9FF24] font-bold text-sm">✓</span>
            <span><strong>Áreas de respiro obrigatórias:</strong> Mantenha margem mínima de 80px entre a logo e os limites do canvas.</span>
          </div>
          <div className="p-3 rounded-lg bg-black/30 border border-[#087B18]/30 flex items-start gap-2.5">
            <span className="text-[#C9FF24] font-bold text-sm">✓</span>
            <span><strong>Zero dados fictícios:</strong> Não inventar bairros, características de propriedades ou depoimentos forjados.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
