export interface RecommendedFertilizer {
  name: string;
  category: string;
  npkOrComposition?: string;
  dosageAndRate: string;
  applicationMethod: string;
  benefitForThisDisease: string;
}

export interface FertilizerToAvoid {
  name: string;
  dangerReason: string;
}

export interface FertilizerAdvisory {
  summary: string;
  recommendedFertilizers: RecommendedFertilizer[];
  fertilizersToAvoid: FertilizerToAvoid[];
  soilAmendments: string[];
}

export interface WeatherImpact {
  favorableConditions: string;
  humidityRiskLevel: 'Low' | 'Moderate' | 'High' | 'Extreme' | string;
  temperatureRangeC: string;
  optimalSprayingAdvice: string;
}

export interface OrganicTreatment {
  name: string;
  description: string;
  timing: string;
  preparation: string;
}

export interface ChemicalTreatment {
  activeIngredient: string;
  tradeExamples: string;
  applicationRate: string;
  preHarvestIntervalDays: string;
  safetyPrecautions: string;
}

export interface DiagnosisResult {
  id: string;
  timestamp: string;
  imageUrl?: string;
  isPlant: boolean;
  cropName: string;
  cropVarietyOrType: string;
  healthStatus: 'Healthy' | 'Diseased' | 'Pest Damage' | 'Nutrient Deficiency' | 'Abiotic Stress' | 'Non-Plant' | string;
  diseaseName: string;
  scientificName: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest / Mite' | 'Nutrient / Abiotic' | 'None' | string;
  confidenceScore: number;
  severity: string;
  severityPercentageEstimate: number;
  keyAffectedParts: string[];
  visualSymptoms: string[];
  diseaseDescription: string;
  fertilizerAdvisory: FertilizerAdvisory;
  weatherImpact: WeatherImpact;
  summaryDiagnosis: string;
  immediateActions: string[];
  organicTreatments: OrganicTreatment[];
  chemicalTreatments: ChemicalTreatment[];
  preventativeMeasures: string[];
  favorableWeatherConditions: string;
  contagionRisk: 'Low' | 'Moderate' | 'High' | 'Severe' | string;
  yieldRiskIfUntreated: string;
  recoveryOutlook: 'Good' | 'Fair' | 'Guarded' | 'Poor' | string;
  recommendedFollowUpDays: number;
}

export interface WeatherData {
  city: string;
  region: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitationChance: number;
  conditionText: string;
  conditionCode: number;
  isDay: boolean;
  lastUpdated: string;
}

export interface HistoryItem extends DiagnosisResult {
  thumbnailUrl: string;
  notes?: string;
}
