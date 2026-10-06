export type Language = 'en' | 'kn' | 'hi';

export interface Translations {
  appName: string;
  tagline: string;
  scanner: string;
  weather: string;
  guide: string;
  history: string;
  agronomist: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  camera: string;
  upload: string;
  takePhoto: string;
  retake: string;
  selectOrDrop: string;
  uploadDesc: string;
  browseFiles: string;
  targetCrop: string;
  autoDetect: string;
  fieldNotesLabel: string;
  fieldNotesPlaceholder: string;
  analyzeBtn: string;
  analyzingBtn: string;
  orTestSamples: string;
  clickToPreview: string;
  weatherTitle: string;
  weatherSubtitle: string;
  temperature: string;
  humidity: string;
  precipitation: string;
  windSpeed: string;
  diseaseRisk: string;
  sprayWindow: string;
  optimalSpray: string;
  unfavorableSpray: string;
  diseaseDescriptionTitle: string;
  fertilizerPrescriptionTitle: string;
  treatmentPlansTitle: string;
  weatherImpactTitle: string;
  listenVoice: string;
  stopVoice: string;
  askAgronomistBtn: string;
  scanAnother: string;
  contagionRisk: string;
  harvestLossRisk: string;
  recoveryOutlook: string;
  reinspectIn: string;
  recommendedFertilizers: string;
  fertilizersToAvoid: string;
  soilAmendments: string;
  dosageRate: string;
  applicationMethod: string;
  whyItHelps: string;
  organicTreatments: string;
  chemicalTreatments: string;
  immediateActions: string;
  observedSymptoms: string;
  historyTitle: string;
  historySubtitle: string;
  exportBtn: string;
  clearBtn: string;
  newScanBtn: string;
  noHistory: string;
  noHistoryDesc: string;
  viewReport: string;
  deleteBtn: string;
  chatPlaceholder: string;
  sendBtn: string;
  quickAsk: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'AgriShield AI',
    tagline: 'Crop Disease & Agronomy Intelligence',
    scanner: 'Scanner',
    weather: 'Weather & Spray',
    guide: 'Field Guide',
    history: 'History',
    agronomist: 'AI Agronomist',
    heroBadge: 'Instant Multimodal AI Pathologist & Agronomist',
    heroTitle: 'Crop Disease Detection & Fertilizer Advisor',
    heroSubtitle:
      'Take a leaf photo with your camera to detect diseases, diagnose pathogens, and get prescribed fertilizer nutrition & weather spray windows.',
    camera: 'Camera',
    upload: 'Upload',
    takePhoto: 'Take Leaf Photo',
    retake: 'Retake / Change',
    selectOrDrop: 'Select or Drop Leaf Photo',
    uploadDesc: 'Upload clear close-up images of affected leaves, stems, or fruits in JPG, PNG, or WEBP',
    browseFiles: 'Browse Gallery / Files',
    targetCrop: 'Target Crop (Optional)',
    autoDetect: 'Auto-detect',
    fieldNotesLabel: 'Field Observations / Symptoms',
    fieldNotesPlaceholder: 'e.g. Yellow spots on lower leaves, noticed after heavy rain',
    analyzeBtn: 'Analyze Disease & Get Fertilizer Prescription',
    analyzingBtn: 'AI Pathologist Examining Crop & Fertilizers...',
    orTestSamples: 'Or Test With Realistic Field Samples:',
    clickToPreview: 'Click any card to preview & test',
    weatherTitle: 'Field Micro-Climate & Disease Risk',
    weatherSubtitle: 'Real-time agricultural weather for spray timing',
    temperature: 'Temperature',
    humidity: 'Humidity',
    precipitation: 'Precipitation',
    windSpeed: 'Wind Speed',
    diseaseRisk: 'Disease Proliferation Risk',
    sprayWindow: 'Spraying & Fertilizer Window',
    optimalSpray: 'Optimal Spraying Window',
    unfavorableSpray: 'Unfavorable for Spraying',
    diseaseDescriptionTitle: 'Disease Description & Symptoms',
    fertilizerPrescriptionTitle: 'Fertilizer & Plant Nutrition Prescription',
    treatmentPlansTitle: 'Treatment Plans (Organic & Chemical)',
    weatherImpactTitle: 'Weather Impact & Spray Timing',
    listenVoice: 'Listen Report (Voice)',
    stopVoice: 'Stop Voice',
    askAgronomistBtn: 'Ask Field Agronomist',
    scanAnother: 'Scan Another Leaf',
    contagionRisk: 'Contagion Risk',
    harvestLossRisk: 'Harvest Loss Risk',
    recoveryOutlook: 'Recovery Outlook',
    reinspectIn: 'Re-Inspect In',
    recommendedFertilizers: 'Recommended Fertilizers to Apply',
    fertilizersToAvoid: 'CRITICAL WARNING: Fertilizers to AVOID Right Now',
    soilAmendments: 'Soil Health & Bio-Amendments',
    dosageRate: 'Dosage Rate',
    applicationMethod: 'Application',
    whyItHelps: 'Why it helps',
    organicTreatments: 'Eco-Friendly & Biological Treatments',
    chemicalTreatments: 'Conventional Chemical Controls',
    immediateActions: 'Immediate Field Actions (Next 24 to 48 Hours)',
    observedSymptoms: 'Observed Symptoms on this Leaf',
    historyTitle: 'Crop Health Check History',
    historySubtitle: 'field scans recorded & saved',
    exportBtn: 'Export',
    clearBtn: 'Clear',
    newScanBtn: 'New Scan',
    noHistory: 'No Crop Scans in History Yet',
    noHistoryDesc: 'Take a photo of a leaf or upload an image to diagnose diseases and receive tailored fertilizer prescriptions.',
    viewReport: 'View Report',
    deleteBtn: 'Delete',
    chatPlaceholder: 'Ask a question about fertilizer dosage, spray intervals, or leaf recovery...',
    sendBtn: 'Send',
    quickAsk: 'Quick ask:',
  },
  kn: {
    appName: 'ಅಗ್ರಿಶೀಲ್ಡ್ AI (AgriShield)',
    tagline: 'ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಗೊಬ್ಬರ ಸಲಹೆಗಾರ',
    scanner: 'ಕ್ಯಾಮೆರಾ ಸ್ಕ್ಯಾನರ್',
    weather: 'ಹವಾಮಾನ ಮತ್ತು ಸಿಂಪಡಣೆ',
    guide: 'ಬೆಳೆ ಕೈಪಿಡಿ',
    history: 'ಹಿಂದಿನ ಇತಿಹಾಸ',
    agronomist: 'ಕೃಷಿ ತಜ್ಞರ ಸಲಹೆ',
    heroBadge: 'ರೈತರಿಗಾಗಿ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI) ಬೆಳೆ ವೈದ್ಯ',
    heroTitle: 'ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಸೂಕ್ತ ರಸಗೊಬ್ಬರ ಮಾಹಿತಿ',
    heroSubtitle:
      'ನಿಮ್ಮ ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾದಿಂದ ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ - ಯಾವ ರೋಗ ಬಂದಿದೆ, ಯಾವ ಗೊಬ್ಬರ ಬಳಸಬೇಕು ಮತ್ತು ಯಾವಾಗ ಸಿಂಪಡಿಸಬೇಕು ಎಂದು ತಕ್ಷಣ ತಿಳಿಯಿರಿ.',
    camera: 'ಕ್ಯಾಮೆರಾ',
    upload: 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್',
    takePhoto: 'ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ',
    retake: 'ಮತ್ತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ',
    selectOrDrop: 'ಎಲೆಯ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ',
    uploadDesc: 'ರೋಗಗ್ರಸ್ತ ಎಲೆ ಅಥವಾ ಗಿಡದ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (JPG, PNG)',
    browseFiles: 'ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ',
    targetCrop: 'ಯಾವ ಬೆಳೆ (ಐಚ್ಛಿಕ)',
    autoDetect: 'ಸ್ವಯಂಚಾಲಿತ ಪತ್ತೆ',
    fieldNotesLabel: 'ಬೆಳೆ ಲಕ್ಷಣಗಳು / ಟಿಪ್ಪಣಿ',
    fieldNotesPlaceholder: 'ಉದಾ: ಕೆಳಗಿನ ಎಲೆಗಳಲ್ಲಿ ಹಳದಿ ಚುಕ್ಕೆಗಳು, ಮಳೆಯ ನಂತರ ಹೆಚ್ಚಾಗಿದೆ',
    analyzeBtn: 'ರೋಗ ಪತ್ತೆಹಚ್ಚಿ ಮತ್ತು ಗೊಬ್ಬರ ಸಲಹೆ ಪಡೆಯಿರಿ',
    analyzingBtn: 'AI ತಜ್ಞರು ಎಲೆ ಮತ್ತು ರೋಗವನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದ್ದಾರೆ...',
    orTestSamples: 'ಅಥವಾ ಪರೀಕ್ಷಾ ಮಾದರಿಗಳನ್ನು ಬಳಸಿ:',
    clickToPreview: 'ಪರೀಕ್ಷಿಸಲು ಯಾವುದೇ ಕಾರ್ಡ್ ಕ್ಲಿಕ್ ಮಾಡಿ',
    weatherTitle: 'ಹೊಲದ ಹವಾಮಾನ ಮತ್ತು ರೋಗದ ಅಪಾಯ',
    weatherSubtitle: 'ಸಿಂಪಡಣೆಗೆ ಸೂಕ್ತ ಸಮಯವನ್ನು ತಿಳಿಯಿರಿ',
    temperature: 'ತಾಪಮಾನ',
    humidity: 'ಗಾಳಿಯ ತೇವಾಂಶ',
    precipitation: 'ಮಳೆ ಸಾಧ್ಯತೆ',
    windSpeed: 'ಗಾಳಿಯ ವೇಗ',
    diseaseRisk: 'ರೋಗ ಹರಡುವ ಅಪಾಯ',
    sprayWindow: 'ಔಷಧ ಮತ್ತು ಗೊಬ್ಬರ ಸಿಂಪಡಣಾ ಸಮಯ',
    optimalSpray: 'ಸಿಂಪಡಣೆಗೆ ಅತ್ಯುತ್ತಮ ಸಮಯ',
    unfavorableSpray: 'ಈಗ ಸಿಂಪಡಿಸಬೇಡಿ (ಅನುಕೂಲಕರವಲ್ಲ)',
    diseaseDescriptionTitle: 'ರೋಗದ ವಿವರಣೆ ಮತ್ತು ಲಕ್ಷಣಗಳು',
    fertilizerPrescriptionTitle: 'ಬಳಸಬೇಕಾದ ರಸಗೊಬ್ಬರ ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಪಟ್ಟಿ',
    treatmentPlansTitle: 'ರೋಗ ನಿಯಂತ್ರಣೋಪಾಯಗಳು (ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ)',
    weatherImpactTitle: 'ಹವಾಮಾನ ಪರಿಣಾಮ ಮತ್ತು ಸಿಂಪಡಣೆ ನಿಯಮ',
    listenVoice: 'ಧ್ವನಿ ಮೂಲಕ ಆಲಿಸಿ (Voice)',
    stopVoice: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    askAgronomistBtn: 'ಕೃಷಿ ತಜ್ಞರನ್ನು ಪ್ರಶ್ನಿಸಿ',
    scanAnother: 'ಮತ್ತೊಂದು ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    contagionRisk: 'ಇತರ ಗಿಡಗಳಿಗೆ ಹರಡುವ ಅಪಾಯ',
    harvestLossRisk: 'ಇಳುವರಿ ನಷ್ಟದ ಸಾಧ್ಯತೆ',
    recoveryOutlook: 'ಗುಣಮುಖವಾಗುವ ಸಾಧ್ಯತೆ',
    reinspectIn: 'ಮತ್ತೆ ಪರಿಶೀಲಿಸಬೇಕಾದ ದಿನಗಳು',
    recommendedFertilizers: 'ಬೆಳೆಗೆ ನೀಡಬೇಕಾದ ಶಿಫಾರಸು ರಸಗೊಬ್ಬರಗಳು',
    fertilizersToAvoid: 'ಎಚ್ಚರಿಕೆ: ಈ ರೋಗವಿರುವಾಗ ಈ ಗೊಬ್ಬರಗಳನ್ನು ಬಳಸಬೇಡಿ!',
    soilAmendments: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಜೈವಿಕ ಸುಧಾರಣೆಗಳು',
    dosageRate: 'ಪ್ರಮಾಣ (Dosage)',
    applicationMethod: 'ಬಳಕೆಯ ವಿಧಾನ',
    whyItHelps: 'ಇದು ಹೇಗೆ ರೋಗ ತಡೆಯುತ್ತದೆ',
    organicTreatments: 'ಸಾವಯವ ಮತ್ತು ಜೈವಿಕ ನಿಯಂತ್ರಣ',
    chemicalTreatments: 'ರಾಸಾಯನಿಕ ಶಿಲೀಂಧ್ರನಾಶಕಗಳು',
    immediateActions: 'ತಕ್ಷಣ ಮಾಡಬೇಕಾದ ಕ್ರಮಗಳು (24-48 ಗಂಟೆಗಳಲ್ಲಿ)',
    observedSymptoms: 'ಎಲೆಯಲ್ಲಿ ಕಂಡುಬಂದ ಲಕ್ಷಣಗಳು',
    historyTitle: 'ಹಿಂದೆ ಪರೀಕ್ಷಿಸಿದ ಬೆಳೆಗಳ ಇತಿಹಾಸ',
    historySubtitle: 'ಸ್ಕ್ಯಾನ್ ದಾಖಲೆಗಳು ಉಳಿಸಲಾಗಿದೆ',
    exportBtn: 'ಡೌನ್‌ಲೋಡ್',
    clearBtn: 'ಅಳಿಸಿ',
    newScanBtn: 'ಹೊಸ ಸ್ಕ್ಯಾನ್',
    noHistory: 'ಇನ್ನೂ ಯಾವುದೇ ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸವಿಲ್ಲ',
    noHistoryDesc: 'ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ ತೆಗೆದು ರೋಗ ಮತ್ತು ಗೊಬ್ಬರದ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.',
    viewReport: 'ವರದಿ ವೀಕ್ಷಿಸಿ',
    deleteBtn: 'ತೆಗೆದುಹಾಕಿ',
    chatPlaceholder: 'ಗೊಬ್ಬರದ ಪ್ರಮಾಣ, ಸಿಂಪಡಿಸುವ ಸಮಯ ಅಥವಾ ಬೆಳೆ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ...',
    sendBtn: 'ಕಳುಹಿಸಿ',
    quickAsk: 'ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು:',
  },
  hi: {
    appName: 'एग्रीशील्ड AI (AgriShield)',
    tagline: 'फसल रोग पहचान एवं खाद-उर्वरक सलाहकार',
    scanner: 'कैमरा स्कैनर',
    weather: 'मौसम और छिड़काव',
    guide: 'फसल मार्गदर्शिका',
    history: 'पिछला इतिहास',
    agronomist: 'कृषि विशेषज्ञ सलाह',
    heroBadge: 'किसानों के लिए AI फसल रोग विशेषज्ञ',
    heroTitle: 'फसल रोग पहचान एवं सही खाद-उर्वरक सलाह',
    heroSubtitle:
      'पत्ते की फोटो खींचे — जानें कौन सा रोग है, कौन सा खाद (उर्वरक) डालना चाहिए और दवा छिड़कने का सही मौसम व समय क्या है।',
    camera: 'कैमरा',
    upload: 'फोटो अपलोड',
    takePhoto: 'फोटो खींचे',
    retake: 'दोबारा फोटो लें',
    selectOrDrop: 'पत्ते की फोटो चुनें',
    uploadDesc: 'रोगग्रस्त पत्ते या पौधे की साफ़ फोटो अपलोड करें (JPG, PNG)',
    browseFiles: 'गैलरी से चुनें',
    targetCrop: 'फसल का नाम (वैकल्पिक)',
    autoDetect: 'स्वचालित पहचान',
    fieldNotesLabel: 'लक्षण या खेत की स्थिति',
    fieldNotesPlaceholder: 'उदा: निचले पत्तों पर भूरे धब्बे, बारिश के बाद फैलाव',
    analyzeBtn: 'रोग पहचानें एवं उर्वरक नुस्खा प्राप्त करें',
    analyzingBtn: 'AI विशेषज्ञ पत्ते की जांच कर रहा है...',
    orTestSamples: 'या इन सैंपल पत्तों पर जांचें:',
    clickToPreview: 'परीक्षण के लिए किसी भी कार्ड पर क्लिक करें',
    weatherTitle: 'खेत का मौसम एवं रोग का जोखिम',
    weatherSubtitle: 'दवा व खाद छिड़कने का सही समय',
    temperature: 'तापमान',
    humidity: 'हवा में नमी (नमी %)',
    precipitation: 'बारिश की संभावना',
    windSpeed: 'हवा की गति',
    diseaseRisk: 'रोग फैलने का जोखिम',
    sprayWindow: 'छिड़काव एवं खाद डालने का समय',
    optimalSpray: 'छिड़काव के लिए उत्तम समय',
    unfavorableSpray: 'अभी छिड़काव न करें (खराब मौसम)',
    diseaseDescriptionTitle: 'रोग का विवरण एवं लक्षण',
    fertilizerPrescriptionTitle: 'उपयुक्त खाद और पोषक तत्वों की सूची',
    treatmentPlansTitle: 'उपचार योजना (जैविक एवं रासायनिक)',
    weatherImpactTitle: 'मौसम का प्रभाव एवं छिड़काव नियम',
    listenVoice: 'आवाज़ में सुनें (Voice)',
    stopVoice: 'आवाज़ रोकें',
    askAgronomistBtn: 'कृषि विशेषज्ञ से पूछें',
    scanAnother: 'अन्य पत्ते की जांच करें',
    contagionRisk: 'अन्य पौधों में फैलने का खतरा',
    harvestLossRisk: 'पैदावार नुकसान का खतरा',
    recoveryOutlook: 'फसल सुधरने की संभावना',
    reinspectIn: 'दोबारा जांच करने के दिन',
    recommendedFertilizers: 'डालने योग्य अनुशंसित खाद (उर्वरक)',
    fertilizersToAvoid: 'सावधानी: इस रोग में इन खादों का उपयोग बिलकुल न करें!',
    soilAmendments: 'मिट्टी का सुधार एवं जैविक उपाय',
    dosageRate: 'मात्रा (Dosage)',
    applicationMethod: 'उपयोग का तरीका',
    whyItHelps: 'यह रोग में कैसे मदद करता है',
    organicTreatments: 'जैविक एवं पर्यावरण अनुकूल उपचार',
    chemicalTreatments: 'रासायनिक कवकनाशी/दवाएं',
    immediateActions: 'तुरंत करने योग्य कार्य (24 से 48 घंटे में)',
    observedSymptoms: 'पत्ते पर दिखाई देने वाले लक्षण',
    historyTitle: 'पिछली फसल जांचों का इतिहास',
    historySubtitle: 'स्कैन रिकॉर्ड सुरक्षित हैं',
    exportBtn: 'डाउनलोड',
    clearBtn: 'साफ़ करें',
    newScanBtn: 'नया स्कैन',
    noHistory: 'अभी कोई पिछला इतिहास नहीं है',
    noHistoryDesc: 'कैमरे से फोटो खींचकर रोग और खाद की जानकारी प्राप्त करें।',
    viewReport: 'पूरी रिपोर्ट देखें',
    deleteBtn: 'हटाएं',
    chatPlaceholder: 'खाद की मात्रा, छिड़काव का समय या फसल संबंधी प्रश्न पूछें...',
    sendBtn: 'भेजें',
    quickAsk: 'जल्दी पूछें:',
  },
};
