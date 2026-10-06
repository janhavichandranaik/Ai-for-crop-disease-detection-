import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Beaker,
  Sprout,
  Droplets,
  CloudSun,
  Volume2,
  VolumeX,
  Share2,
  Printer,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  Sparkles,
  Ban,
  Activity,
  Flame,
  FileText,
} from 'lucide-react';
import { DiagnosisResult } from '../types/crop';
import { TRANSLATIONS, Language } from '../utils/translations';

interface DiagnosisViewProps {
  diagnosis: DiagnosisResult;
  language?: Language;
  onAskAgronomist: (initialPrompt?: string) => void;
  onNewScan: () => void;
}

export const DiagnosisView: React.FC<DiagnosisViewProps> = ({
  diagnosis,
  language = 'en',
  onAskAgronomist,
  onNewScan,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [activeTab, setActiveTab] = useState<'overview' | 'fertilizer' | 'treatments' | 'weather'>('overview');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Audio Speech Synthesis for Farmers in Field
  const speakDiagnosis = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `Diagnosis report for ${diagnosis.cropName}. Condition: ${
      diagnosis.diseaseName
    }. ${diagnosis.summaryDiagnosis}. Fertilizer advice: ${
      diagnosis.fertilizerAdvisory?.summary || ''
    }. Immediate action: ${diagnosis.immediateActions?.[0] || ''}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (language === 'kn') utterance.lang = 'kn-IN';
    else if (language === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const getSeverityBadge = (severity: string) => {
    if (severity.toLowerCase().includes('critical') || severity.toLowerCase().includes('severe')) {
      return 'bg-red-500/20 text-red-300 border-red-500/40';
    }
    if (severity.toLowerCase().includes('moderate')) {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
    if (severity.toLowerCase().includes('mild')) {
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
    }
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  };

  const getHealthStatusBadge = (status: string) => {
    if (status.toLowerCase().includes('healthy')) {
      return 'bg-emerald-500 text-stone-950 font-bold';
    }
    if (status.toLowerCase().includes('diseased')) {
      return 'bg-red-500 text-white font-bold';
    }
    if (status.toLowerCase().includes('pest')) {
      return 'bg-amber-500 text-stone-950 font-bold';
    }
    return 'bg-blue-500 text-white font-bold';
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-stone-100">
      {/* Top Header Card */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 border border-stone-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-5">
            {diagnosis.imageUrl && (
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-stone-700 shadow-md shrink-0 bg-stone-950">
                <img
                  src={diagnosis.imageUrl}
                  alt={diagnosis.diseaseName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1.5 py-0.5 rounded text-stone-300 font-mono">
                  {diagnosis.confidenceScore}% conf
                </span>
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs px-2.5 py-1 rounded-full ${getHealthStatusBadge(diagnosis.healthStatus)}`}>
                  {diagnosis.healthStatus}
                </span>
                <span className="text-xs bg-stone-800 text-stone-300 px-2.5 py-1 rounded-full border border-stone-700">
                  {diagnosis.cropName} {diagnosis.cropVarietyOrType ? `(${diagnosis.cropVarietyOrType})` : ''}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full border ${getSeverityBadge(diagnosis.severity)}`}>
                  Severity: {diagnosis.severity} ({diagnosis.severityPercentageEstimate}% tissue)
                </span>
              </div>

              {/* Main Disease Name */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {diagnosis.diseaseName}
              </h1>

              {diagnosis.scientificName && (
                <p className="text-sm italic text-emerald-400 font-serif mt-0.5">
                  Pathogen: {diagnosis.scientificName} • {diagnosis.pathogenType}
                </p>
              )}

              <p className="text-xs text-stone-400 mt-2 max-w-2xl leading-relaxed">
                {diagnosis.summaryDiagnosis}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-col items-center gap-2.5 w-full md:w-auto shrink-0">
            {/* Microphone Voice Clarification Button */}
            <button
              onClick={() => {
                const prompt =
                  language === 'kn'
                    ? `${diagnosis.diseaseName} ರೋಗದ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ವಿವರಣೆ ಮತ್ತು ಔಷಧಿ ಸಿಂಪಡಣೆ ಬಗ್ಗೆ ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟಪಡಿಸಿ.`
                    : language === 'hi'
                    ? `${diagnosis.diseaseName} रोग के बारे में विस्तृत जानकारी और दवा की मात्रा स्पष्ट करें।`
                    : `Please clarify the cause, severity, and exact fertilizer application for ${diagnosis.diseaseName}.`;
                onAskAgronomist(prompt);
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all active:scale-95"
              title="Speak with microphone or get disease clarification"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>
                {language === 'kn'
                  ? '🎙️ ರೋಗದ ಸ್ಪಷ್ಟತೆ ಕೇಳಿ (ಮೈಕ್)'
                  : language === 'hi'
                  ? '🎙️ रोग पर स्पष्टीकरण पूछें (माइक)'
                  : '🎙️ Voice Clarification (Mic)'}
              </span>
            </button>

            <button
              onClick={speakDiagnosis}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isSpeaking
                  ? 'bg-amber-500 text-stone-950 border-amber-400 animate-pulse'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
              }`}
              title="Read diagnosis aloud"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>{isSpeaking ? t.stopVoice : t.listenVoice}</span>
            </button>

            <button
              onClick={() => onAskAgronomist()}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>{t.askAgronomistBtn}</span>
            </button>

            <button
              onClick={onNewScan}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 text-xs transition-colors text-center"
            >
              {t.scanAnother}
            </button>
          </div>
        </div>

        {/* Diagnostic Vital Badges Bar */}
        <div className="mt-6 pt-5 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
          <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800/60">
            <span className="text-[10px] text-stone-400 block uppercase font-medium">{t.contagionRisk}</span>
            <span className="text-sm font-bold text-stone-200 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              {diagnosis.contagionRisk}
            </span>
          </div>

          <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800/60">
            <span className="text-[10px] text-stone-400 block uppercase font-medium">{t.harvestLossRisk}</span>
            <span className="text-sm font-bold text-red-300 block truncate mt-0.5">
              {diagnosis.yieldRiskIfUntreated || 'Significant without care'}
            </span>
          </div>

          <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800/60">
            <span className="text-[10px] text-stone-400 block uppercase font-medium">{t.recoveryOutlook}</span>
            <span className="text-sm font-bold text-emerald-300 block mt-0.5">
              {diagnosis.recoveryOutlook || 'Good with timely intervention'}
            </span>
          </div>

          <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800/60">
            <span className="text-[10px] text-stone-400 block uppercase font-medium">{t.reinspectIn}</span>
            <span className="text-sm font-bold text-stone-200 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              {diagnosis.recommendedFollowUpDays} Days
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-emerald-600 text-stone-950 shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <FileText className="w-4 h-4" />
          {t.diseaseDescriptionTitle}
        </button>

        <button
          onClick={() => setActiveTab('fertilizer')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'fertilizer'
              ? 'bg-emerald-600 text-stone-950 shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <Sprout className="w-4 h-4" />
          {t.fertilizerPrescriptionTitle}
        </button>

        <button
          onClick={() => setActiveTab('treatments')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'treatments'
              ? 'bg-emerald-600 text-stone-950 shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <Beaker className="w-4 h-4" />
          {t.treatmentPlansTitle}
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'weather'
              ? 'bg-emerald-600 text-stone-950 shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <CloudSun className="w-4 h-4" />
          {t.weatherImpactTitle}
        </button>
      </div>

      {/* TAB CONTENT 1: Disease Description & Symptoms */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Deep Disease Description Card */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2.5 mb-3 text-emerald-400">
              <Info className="w-5 h-5" />
              <h3 className="text-base font-bold text-stone-100">About {diagnosis.diseaseName}</h3>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed whitespace-pre-line">
              {diagnosis.diseaseDescription ||
                `${diagnosis.diseaseName} is caused by ${diagnosis.scientificName || 'a plant pathogen'}. It primarily targets foliage, leading to cellular breakdown, reduced photosynthetic efficiency, and progressive leaf chlorosis.`}
            </p>

            {/* Affected Plant Anatomy */}
            {diagnosis.keyAffectedParts?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-stone-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-stone-400">Affected Plant Tissues:</span>
                {diagnosis.keyAffectedParts.map((part, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-stone-950 text-stone-300 px-3 py-1 rounded-lg border border-stone-700/80 font-medium"
                  >
                    🌱 {part}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Morphological Visual Symptoms Grid */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-stone-100 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Observed Symptoms on this Leaf
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {diagnosis.visualSymptoms?.map((symptom, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950/70 border border-stone-800 p-3.5 rounded-xl flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-stone-200 font-medium leading-snug">{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency 24-48h Actions */}
          <div className="bg-amber-950/30 border border-amber-800/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-amber-200 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Immediate Field Actions (Next 24 to 48 Hours)
            </h3>
            <ul className="space-y-2.5">
              {diagnosis.immediateActions?.map((action, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-stone-200">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: Fertilizer & Plant Nutrition Prescription */}
      {activeTab === 'fertilizer' && (
        <div className="space-y-6">
          {/* Summary Strategy */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2.5 mb-2 text-emerald-400">
              <Sprout className="w-5 h-5" />
              <h3 className="text-base font-bold text-stone-100">Nutrition & Immunity Strategy</h3>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              {diagnosis.fertilizerAdvisory?.summary ||
                'Balancing soil and foliar nutrition is critical to strengthening plant epidermal cell walls and stimulating systemic acquired resistance against invading pathogens.'}
            </p>
          </div>

          {/* Recommended Fertilizers Cards */}
          <div>
            <h4 className="text-sm font-bold text-stone-200 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Recommended Fertilizers to Apply
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diagnosis.fertilizerAdvisory?.recommendedFertilizers?.map((fert, idx) => (
                <div
                  key={idx}
                  className="bg-stone-900/90 border border-stone-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h5 className="text-sm font-bold text-white">{fert.name}</h5>
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {fert.category}
                      </span>
                    </div>

                    {fert.npkOrComposition && (
                      <div className="inline-block text-[11px] font-mono bg-stone-950 px-2 py-0.5 rounded text-amber-300 border border-stone-800 mb-2">
                        Formula: {fert.npkOrComposition}
                      </div>
                    )}

                    <p className="text-xs text-stone-300 leading-relaxed mb-3">
                      <strong className="text-emerald-400">Why it helps: </strong>
                      {fert.benefitForThisDisease}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-800 text-[11px] grid grid-cols-2 gap-2 text-stone-400 bg-stone-950/50 p-2.5 rounded-xl">
                    <div>
                      <span className="block text-stone-500 font-semibold text-[9px] uppercase">Dosage Rate</span>
                      <span className="text-stone-200 font-medium">{fert.dosageAndRate}</span>
                    </div>
                    <div>
                      <span className="block text-stone-500 font-semibold text-[9px] uppercase">Application</span>
                      <span className="text-stone-200 font-medium">{fert.applicationMethod}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DANGER: Fertilizers to AVOID */}
          {diagnosis.fertilizerAdvisory?.fertilizersToAvoid?.length > 0 && (
            <div className="bg-red-950/30 border border-red-800/60 rounded-2xl p-6 shadow-xl">
              <h4 className="text-sm font-bold text-red-300 mb-3 flex items-center gap-2">
                <Ban className="w-5 h-5 text-red-400" />
                CRITICAL WARNING: Fertilizers to AVOID Right Now
              </h4>
              <p className="text-xs text-stone-300 mb-4">
                Applying the wrong fertilizer during active pathogen infection can exacerbate cell wall thinning or trigger runaway spore colonization:
              </p>
              <div className="space-y-3">
                {diagnosis.fertilizerAdvisory.fertilizersToAvoid.map((avoid, idx) => (
                  <div
                    key={idx}
                    className="bg-stone-950/80 border border-red-900/60 p-3.5 rounded-xl flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Ban className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-red-200 block">{avoid.name}</span>
                      <span className="text-xs text-stone-300 leading-relaxed">{avoid.dangerReason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Soil Conditioning Amendments */}
          {diagnosis.fertilizerAdvisory?.soilAmendments?.length > 0 && (
            <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-lg">
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2.5">
                Soil Health & Bio-Amendments
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {diagnosis.fertilizerAdvisory.soilAmendments.map((amend, idx) => (
                  <div
                    key={idx}
                    className="bg-stone-950/60 border border-stone-800 p-2.5 rounded-xl text-xs text-stone-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{amend}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 3: Treatments (Organic & Chemical) */}
      {activeTab === 'treatments' && (
        <div className="space-y-6">
          {/* Organic / Biological Solutions */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-stone-100">
                Eco-Friendly & Biological Treatments
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diagnosis.organicTreatments?.map((treatment, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950/70 border border-stone-800 rounded-xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-emerald-300 mb-1">{treatment.name}</h4>
                    <p className="text-xs text-stone-300 leading-relaxed mb-3">{treatment.description}</p>
                  </div>
                  <div className="text-[11px] text-stone-400 border-t border-stone-800 pt-2 space-y-1">
                    <div>
                      <strong className="text-stone-300">Preparation: </strong>
                      {treatment.preparation}
                    </div>
                    <div>
                      <strong className="text-stone-300">Schedule: </strong>
                      {treatment.timing}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chemical Treatments */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Beaker className="w-5 h-5 text-teal-400" />
              <h3 className="text-base font-bold text-stone-100">
                Conventional Chemical Controls (Safety Certified)
              </h3>
            </div>
            <div className="space-y-3">
              {diagnosis.chemicalTreatments?.map((chem, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950/70 border border-stone-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{chem.activeIngredient}</span>
                      <span className="text-[10px] bg-teal-500/10 text-teal-300 px-2 py-0.5 rounded border border-teal-500/20">
                        Commercial: {chem.tradeExamples}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400">{chem.safetyPrecautions}</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-xs border-t md:border-t-0 md:border-l border-stone-800 pt-2 md:pt-0 md:pl-4">
                    <div>
                      <span className="block text-[10px] text-stone-500 font-semibold uppercase">Rate</span>
                      <span className="font-mono text-stone-200">{chem.applicationRate}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-stone-500 font-semibold uppercase">PHI (Days)</span>
                      <span className="font-mono text-amber-300 font-bold">{chem.preHarvestIntervalDays}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preventative Cultural Practices */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-lg">
            <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-3">
              Long-Term Field Prevention
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {diagnosis.preventativeMeasures?.map((measure, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950/60 border border-stone-800/80 p-3 rounded-xl text-xs text-stone-300 flex items-start gap-2.5"
                >
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{measure}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: Weather Impact & Spray Timing */}
      {activeTab === 'weather' && (
        <div className="space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2.5 mb-3 text-teal-400">
              <CloudSun className="w-5 h-5" />
              <h3 className="text-base font-bold text-stone-100">
                Weather Conditions Favoring {diagnosis.diseaseName}
              </h3>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed mb-4">
              {diagnosis.weatherImpact?.favorableConditions || diagnosis.favorableWeatherConditions}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-800">
              <div className="bg-stone-950/70 p-3.5 rounded-xl border border-stone-800">
                <span className="text-[10px] text-stone-500 font-semibold uppercase block">
                  Optimal Pathogen Temp Range
                </span>
                <span className="text-sm font-bold text-amber-300">
                  {diagnosis.weatherImpact?.temperatureRangeC || '20°C - 28°C'}
                </span>
              </div>

              <div className="bg-stone-950/70 p-3.5 rounded-xl border border-stone-800">
                <span className="text-[10px] text-stone-500 font-semibold uppercase block">
                  Humidity Sensitivity
                </span>
                <span className="text-sm font-bold text-blue-300">
                  {diagnosis.weatherImpact?.humidityRiskLevel || 'High (>75%)'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-2xl p-6 shadow-xl">
            <h4 className="text-sm font-bold text-emerald-300 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Field Application & Spraying Rules
            </h4>
            <p className="text-xs text-stone-200 leading-relaxed">
              {diagnosis.weatherImpact?.optimalSprayingAdvice ||
                'Apply foliar sprays during calm early morning hours (6:00 AM - 9:00 AM) when wind is below 10 km/h, and ensure no heavy rainfall is forecasted for at least 4 hours to guarantee rain-fast absorption.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
