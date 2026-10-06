import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { CameraCapture } from './components/CameraCapture';
import { DiagnosisView } from './components/DiagnosisView';
import { WeatherWidget } from './components/WeatherWidget';
import { DiseaseLibrary } from './components/DiseaseLibrary';
import { ScanHistory } from './components/ScanHistory';
import { AgronomistChat } from './components/AgronomistChat';
import { DiagnosisResult, HistoryItem } from './types/crop';
import { TRANSLATIONS, Language } from './utils/translations';
import tomatoImg from './assets/images/tomato_early_blight_leaf_1791265044146.jpg';
import cornImg from './assets/images/corn_leaf_blight_1791265059190.jpg';
import {
  AlertCircle,
  Sparkles,
  Camera,
  Leaf,
  CloudSun,
  Sprout,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

const STORAGE_KEY = 'agrishield_scan_history_v1';

// Initial pre-seeded scans for instant demonstration
const INITIAL_DEMO_SCANS: HistoryItem[] = [
  {
    id: 'demo-scan-1',
    timestamp: new Date(Date.now() - 3600000 * 26).toISOString(),
    thumbnailUrl: tomatoImg,
    imageUrl: tomatoImg,
    isPlant: true,
    cropName: 'Tomato',
    cropVarietyOrType: 'Solanum lycopersicum (Roma)',
    healthStatus: 'Diseased',
    diseaseName: 'Early Blight (Alternaria solani)',
    scientificName: 'Alternaria solani',
    pathogenType: 'Fungal',
    confidenceScore: 97,
    severity: 'Moderate (15-40%)',
    severityPercentageEstimate: 28,
    keyAffectedParts: ['Lower foliage', 'Petioles'],
    visualSymptoms: [
      'Concentric target-board rings on older leaves',
      'Yellow chlorotic halos surrounding brown necrotic lesions',
      'Defoliation commencing from bottom canopy',
    ],
    diseaseDescription:
      'Early Blight is an aggressive foliar fungal disease caused by Alternaria solani. The pathogen overwinters in crop residues and soil, germinating during warm, humid conditions. Conidia spores penetrate through stomata or mechanical wounds, producing alternariol toxins that break down cell structures and generate characteristic concentric rings with chlorotic yellow margins.',
    fertilizerAdvisory: {
      summary:
        'Withhold high-nitrogen fertilizers immediately. Boost Potassium (K) and Calcium (Ca) to thicken plant epidermal tissues and arrest mycelial advancement.',
      recommendedFertilizers: [
        {
          name: 'Potassium Sulfate (SOP 0-0-50)',
          category: 'Foliar / Soil Application',
          npkOrComposition: '0-0-50 + 17% Sulfur',
          dosageAndRate: '2.5 kg/acre or 5g per Liter water',
          applicationMethod: 'Foliar spray during early morning',
          benefitForThisDisease:
            'Thickens cell walls, enhances cuticle density, and lowers leaf vulnerability to enzymatic toxin dissolution.',
        },
        {
          name: 'Calcium Nitrate with Boron',
          category: 'Foliar Nutrient',
          npkOrComposition: '15.5-0-0 + 19% Ca + 0.3% B',
          dosageAndRate: '3g per Liter water every 10 days',
          applicationMethod: 'Foliar spray onto middle and top canopy',
          benefitForThisDisease:
            'Cross-links pectin molecules in the middle lamella, preventing pathogen pectolytic degradation.',
        },
      ],
      fertilizersToAvoid: [
        {
          name: 'Pure Nitrogen / Urea (46-0-0)',
          dangerReason:
            'Causes rapid succulent, thin-walled leaf growth that is extremely susceptible to rapid fungal spore colonization.',
        },
      ],
      soilAmendments: [
        'Apply organic neem cake (100 kg/acre) around root zones to suppress soil-borne fungal inoculum.',
        'Mulch heavily with dry straw to eliminate soil splashing onto lower foliage.',
      ],
    },
    weatherImpact: {
      favorableConditions: 'Warm temperatures (24°C - 29°C) accompanied by heavy morning dew or frequent rainfall.',
      humidityRiskLevel: 'High',
      temperatureRangeC: '22°C - 30°C',
      optimalSprayingAdvice:
        'Spray treatments between 6:30 AM and 9:00 AM when wind speed is under 10 km/h and foliage has dried.',
    },
    summaryDiagnosis:
      'Moderate Early Blight infection detected on lower tomato foliage. Immediate bottom-leaf sanitation and a potassium-calcium foliar application are required to stop vertical spread to fruit.',
    immediateActions: [
      'Prune and destroy infected leaves within 30cm of soil level (do NOT compost).',
      'Switch strictly from overhead sprinklers to drip irrigation to keep leaf surfaces dry.',
    ],
    organicTreatments: [
      {
        name: 'Copper Hydroxide 53.8% DF (Organic Certified)',
        description: 'Broad-spectrum protective copper barrier preventing spore germination.',
        timing: 'Apply every 7-10 days until dry conditions return',
        preparation: 'Mix 2g per Liter of clean water; spray thorough coverage on both leaf surfaces',
      },
    ],
    chemicalTreatments: [
      {
        activeIngredient: 'Azoxystrobin + Difenoconazole',
        tradeExamples: 'Amistar Top, Custodia',
        applicationRate: '1.0 ml / Liter water',
        preHarvestIntervalDays: '7 days',
        safetyPrecautions: 'Wear gloves, respirator mask, and protective goggles. Avoid spraying near water bodies.',
      },
    ],
    preventativeMeasures: [
      'Rotate with non-solanaceous crops (beans, corn, brassicas) for minimum 2-3 years.',
      'Ensure 60cm plant spacing for maximum sunlight and ventilation.',
    ],
    favorableWeatherConditions: 'Warm humid weather (24-29°C) with continuous wet leaf surface.',
    contagionRisk: 'High',
    yieldRiskIfUntreated: '35% to 50% harvest loss due to canopy collapse and fruit scald.',
    recoveryOutlook: 'Good',
    recommendedFollowUpDays: 5,
    notes: 'Field sample from greenhouse section 2',
  },
  {
    id: 'demo-scan-2',
    timestamp: new Date(Date.now() - 3600000 * 50).toISOString(),
    thumbnailUrl: cornImg,
    imageUrl: cornImg,
    isPlant: true,
    cropName: 'Corn / Maize',
    cropVarietyOrType: 'Zea mays (Field Corn)',
    healthStatus: 'Diseased',
    diseaseName: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
    scientificName: 'Exserohilum turcicum',
    pathogenType: 'Fungal',
    confidenceScore: 94,
    severity: 'Mild (1-15%)',
    severityPercentageEstimate: 12,
    keyAffectedParts: ['Middle canopy leaves'],
    visualSymptoms: [
      'Elongated grayish-tan cigar-shaped elliptical lesions',
      'Lesions running parallel to leaf veins',
    ],
    diseaseDescription:
      'Northern Corn Leaf Blight is a destructive foliar disease of maize caused by the fungus Exserohilum turcicum. Inoculum resides in corn residue, releasing conidia that travel by wind. In humid periods, spores penetrate and colonize leaf tissues, forming classic long cigar-shaped blighted lesions.',
    fertilizerAdvisory: {
      summary:
        'Optimize Potassium (MOP) to balance stalk strength and apply chelated Zinc to aid photosynthetic enzyme resilience.',
      recommendedFertilizers: [
        {
          name: 'Muriate of Potash (MOP 0-0-60)',
          category: 'Soil Nutrient',
          npkOrComposition: '0-0-60',
          dosageAndRate: '35 kg/acre split application',
          applicationMethod: 'Side dressing during cultivation',
          benefitForThisDisease:
            'Enhances lignification of vascular bundles and prevents rapid lesion expansion.',
        },
        {
          name: 'Zinc Sulfate (ZnSO4 21%)',
          category: 'Foliar Micronutrient',
          dosageAndRate: '2g per Liter water',
          applicationMethod: 'Foliar spray at knee-high to tasseling stage',
          benefitForThisDisease: 'Activates antioxidant enzymes reducing oxidative leaf necrosis.',
        },
      ],
      fertilizersToAvoid: [
        {
          name: 'Excessive single-dose late Nitrogen top-dress',
          dangerReason: 'Delays maturity and prolongs canopy moisture retention.',
        },
      ],
      soilAmendments: ['Deep tillage post-harvest to bury infected corn stubble.'],
    },
    weatherImpact: {
      favorableConditions: 'Moderate temperatures (18°C - 26°C) and heavy morning fog or dew.',
      humidityRiskLevel: 'Moderate',
      temperatureRangeC: '18°C - 27°C',
      optimalSprayingAdvice: 'Spray in the morning before heat causes thermal upward air currents.',
    },
    summaryDiagnosis:
      'Early-stage Northern Corn Leaf Blight observed on middle leaves. Lesions are currently contained. Potassium supplementation and monitoring are advised.',
    immediateActions: [
      'Scout the field to determine if >50% of plants show lesions below the ear leaf.',
      'Check irrigation scheduling to avoid evening watering.',
    ],
    organicTreatments: [
      {
        name: 'Trichoderma viride Bio-fungicide',
        description: 'Beneficial fungal antagonist applied to canopy.',
        timing: 'Apply at 10-day intervals',
        preparation: 'Mix 5g per Liter water with sticker agent',
      },
    ],
    chemicalTreatments: [
      {
        activeIngredient: 'Pyraclostrobin + Fluxapyroxad',
        tradeExamples: 'Priaxor',
        applicationRate: '0.75 ml / Liter water',
        preHarvestIntervalDays: '14 days',
        safetyPrecautions: 'Use standard PPE; follow resistance management by rotating MOA modes.',
      },
    ],
    preventativeMeasures: ['Select blight-resistant hybrid seeds with Ht resistance genes.'],
    favorableWeatherConditions: 'Overcast weather with 6+ hours of dew.',
    contagionRisk: 'Moderate',
    yieldRiskIfUntreated: '15% to 25% if infection spreads before grain fill.',
    recoveryOutlook: 'Good',
    recommendedFollowUpDays: 7,
    notes: 'North paddock corner inspection',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('scanner');
  const [currentDiagnosis, setCurrentDiagnosis] = useState<DiagnosisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('kn');
  const [clarificationPrompt, setClarificationPrompt] = useState<string>('');
  const [lastCapturedImage, setLastCapturedImage] = useState<{ data: string; mime: string; hint?: string; notes?: string } | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Track online/offline status for field use
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load history from localStorage or pre-seed
  const [scanHistory, setScanHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored history:', e);
    }
    return INITIAL_DEMO_SCANS;
  });

  // Sync scanHistory to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scanHistory));
    } catch (e) {
      console.warn('Failed to save scan history to storage:', e);
    }
  }, [scanHistory]);

  // Handle Photo Capture / Diagnosis
  const handleCaptureAndDiagnose = async (
    base64Data: string,
    mimeType: string,
    cropHint?: string,
    notes?: string
  ) => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    setLastCapturedImage({ data: base64Data, mime: mimeType, hint: cropHint, notes });

    const langName = language === 'kn' ? 'Kannada' : language === 'hi' ? 'Hindi' : 'English';

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType,
          cropHint,
          notes,
          language: langName,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        // If 503 or demand spike, formulate helpful message
        const rawErr = data.error || 'Failed to analyze crop photo.';
        if (typeof rawErr === 'string' && (rawErr.includes('503') || rawErr.includes('high demand') || rawErr.includes('UNAVAILABLE'))) {
          throw new Error(
            language === 'kn'
              ? 'ಕ್ಲೌಡ್ AI ಸರ್ವರ್‌ನಲ್ಲಿ ತಾತ್ಕಾಲಿಕ ದಟ್ಟಣೆಯಿದೆ. ಕೆಳಗಿರುವ "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಆಫ್‌ಲೈನ್ ಬೆಳೆ ಕೈಪಿಡಿಯನ್ನು ವೀಕ್ಷಿಸಿ.'
              : language === 'hi'
              ? 'क्लाउड AI सर्वर पर अत्यधिक लोड है। कृपया "पुनः प्रयास करें" दबाएं या ऑफलाइन गाइड देखें।'
              : 'AI servers are experiencing temporary high demand. Please click "Retry Now" or explore the offline Field Guide.'
          );
        }
        throw new Error(rawErr);
      }

      // Attach image URL to diagnosis
      const fullDiagnosis: DiagnosisResult = {
        ...data,
        imageUrl: base64Data,
      };

      setCurrentDiagnosis(fullDiagnosis);

      // Add to Scan History
      const historyRecord: HistoryItem = {
        ...fullDiagnosis,
        thumbnailUrl: base64Data,
        notes: notes || undefined,
      };

      setScanHistory((prev) => [historyRecord, ...prev]);
    } catch (err: any) {
      console.error('Diagnosis error:', err);
      setErrorMessage(
        err.message || 'An error occurred during diagnosis. Please check image quality and try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setCurrentDiagnosis(item);
    setActiveTab('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistoryItem = (id: string) => {
    setScanHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all crop scan history records?')) {
      setScanHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-stone-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={scanHistory.length}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Offline Field Mode Indicator Banner */}
        {!isOnline && (
          <div className="max-w-4xl mx-auto bg-amber-950/80 border border-amber-700/80 text-amber-200 px-4 py-3 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <div className="text-xs">
                <span className="font-bold block sm:inline mr-1">
                  {language === 'kn' ? 'ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ:' : language === 'hi' ? 'ऑफलाइन मोड सक्रिय:' : 'Offline Field Mode Active:'}
                </span>
                <span>
                  {language === 'kn'
                    ? 'ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದಿದ್ದರೂ ಸರ್ವಿಸ್ ವರ್ಕರ್ ಬೆಳೆ ರೋಗ ಕೈಪಿಡಿ ಮತ್ತು ಗೊಬ್ಬರ ಸಲಹೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಿದೆ.'
                    : language === 'hi'
                    ? 'सर्विस वर्कर ने फसल रोग गाइड व खाद की जानकारी को ऑफलाइन सुरक्षित रखा है।'
                    : 'The Service Worker has cached the Disease Library & fertilizer reference for offline field access.'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('library')}
              className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 transition-colors"
            >
              {language === 'kn' ? 'ಕೈಪಿಡಿ ತೆರೆಯಿರಿ' : language === 'hi' ? 'गाइड खोलें' : 'Open Field Guide'}
            </button>
          </div>
        )}

        {/* Error Notification Banner with Retry & Offline Guide fallback */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto bg-red-950/90 border border-red-700/80 text-red-100 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-red-200">
                  {language === 'kn' ? 'ಗಮನಿಸಿ' : language === 'hi' ? 'सूचना' : 'Notice'}
                </h4>
                <p className="text-xs text-red-300 leading-snug">{errorMessage}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              {lastCapturedImage && (
                <button
                  onClick={() => {
                    handleCaptureAndDiagnose(
                      lastCapturedImage.data,
                      lastCapturedImage.mime,
                      lastCapturedImage.hint,
                      lastCapturedImage.notes
                    );
                  }}
                  disabled={isAnalyzing}
                  className="text-xs bg-emerald-600 hover:bg-emerald-500 text-stone-950 px-3 py-1.5 rounded-xl font-bold transition-all shadow-md"
                >
                  {language === 'kn' ? 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ' : language === 'hi' ? 'पुनः प्रयास करें' : 'Retry Now'}
                </button>
              )}
              <button
                onClick={() => {
                  setErrorMessage(null);
                  setActiveTab('library');
                }}
                className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1.5 rounded-xl font-medium transition-colors border border-stone-700"
              >
                {language === 'kn' ? 'ಆಫ್‌ಲೈನ್ ಕೈಪಿಡಿ' : language === 'hi' ? 'ऑफलाइन गाइड' : 'Offline Guide'}
              </button>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-xs text-stone-400 hover:text-white px-2 py-1"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: SCANNER & DIAGNOSIS VIEW */}
        {activeTab === 'scanner' && (
          <div className="space-y-8">
            {/* If diagnosis is currently loaded, display the full diagnosis report */}
            {currentDiagnosis ? (
              <div className="space-y-6">
                <DiagnosisView
                  diagnosis={currentDiagnosis}
                  language={language}
                  onAskAgronomist={(prompt) => {
                    if (prompt) setClarificationPrompt(prompt);
                    setActiveTab('chat');
                  }}
                  onNewScan={() => setCurrentDiagnosis(null)}
                />

                {/* Micro-climate widget contextually embedded below diagnosis */}
                <div className="max-w-5xl mx-auto">
                  <WeatherWidget
                    cropName={currentDiagnosis.cropName}
                    diseaseName={currentDiagnosis.diseaseName}
                    language={language}
                  />
                </div>
              </div>
            ) : (
              /* If no diagnosis active, display the Camera Capture and Quick Weather Summary */
              <div className="space-y-8">
                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t.heroBadge}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {t.heroTitle}
                  </h1>
                  <p className="text-sm text-stone-400 max-w-xl mx-auto">
                    {t.heroSubtitle}
                  </p>
                </div>

                {/* Camera / Photo Scanner */}
                <CameraCapture
                  onCapture={handleCaptureAndDiagnose}
                  isAnalyzing={isAnalyzing}
                  language={language}
                />

                {/* Weather & Spray Advisor Quick Banner */}
                <div className="max-w-4xl mx-auto">
                  <WeatherWidget language={language} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FIELD WEATHER & DISEASE RISK */}
        {activeTab === 'weather' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-emerald-400" />
                {t.weatherTitle}
              </h2>
              <p className="text-xs text-stone-400">
                {t.weatherSubtitle}
              </p>
            </div>
            <WeatherWidget
              cropName={currentDiagnosis?.cropName}
              diseaseName={currentDiagnosis?.diseaseName}
              language={language}
            />
          </div>
        )}

        {/* TAB 3: FIELD ENCYCLOPEDIA / DISEASE GUIDE */}
        {activeTab === 'library' && <DiseaseLibrary />}

        {/* TAB 4: SCAN HISTORY */}
        {activeTab === 'history' && (
          <ScanHistory
            history={scanHistory}
            language={language}
            onSelectScan={handleSelectHistoryItem}
            onDeleteScan={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
            onNewScan={() => {
              setCurrentDiagnosis(null);
              setActiveTab('scanner');
            }}
          />
        )}

        {/* TAB 5: AI AGRONOMIST CONSULTATION */}
        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <AgronomistChat
              diagnosis={currentDiagnosis}
              language={language}
              initialQuestion={clarificationPrompt}
              onClose={() => {
                setClarificationPrompt('');
                setActiveTab('scanner');
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-stone-800/80 bg-stone-950 py-6 text-stone-500 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-500" />
            <span className="text-stone-300 font-semibold">AgriShield AI</span>
            <span>— Precision Crop Health & Agronomy Intelligence</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <span>Powered by Gemini 3.8 Multimodal AI</span>
            <span>•</span>
            <span>Weather via Open-Meteo</span>
            <span>•</span>
            <span>Safe Agricultural Standards</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
