export interface DiseaseLibraryItem {
  id: string;
  name: string;
  crop: string;
  scientificName: string;
  category: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest';
  symptoms: string[];
  description: string;
  favorableWeather: string;
  recommendedFertilizers: {
    name: string;
    npk?: string;
    dosage: string;
    benefit: string;
  }[];
  fertilizersToAvoid: string[];
  treatmentOrganic: string[];
  treatmentChemical: string[];
  severityLevel: 'Moderate' | 'High' | 'Severe';
}

export const DISEASE_LIBRARY: DiseaseLibraryItem[] = [
  {
    id: 'tomato-early-blight',
    name: 'Tomato Early Blight',
    crop: 'Tomato',
    scientificName: 'Alternaria solani',
    category: 'Fungal',
    severityLevel: 'High',
    description: 'A ubiquitous fungal foliar disease that begins on the oldest lower leaves with brown-to-black necrotic spots exhibiting concentric target-like rings and yellow halos. Over time, it causes extensive defoliation, sunburn on exposed fruit, and stem collar rot.',
    symptoms: [
      'Concentric target-board rings on older leaves',
      'Yellow chlorotic halos surrounding lesions',
      'Premature leaf drop from bottom to top of plant',
      'Dark sunken leathery lesions at stem ends of fruits',
    ],
    favorableWeather: 'Warm temperatures (24°C–29°C / 75°F–85°F) with high relative humidity (>80%) and frequent rain or heavy dew periods.',
    recommendedFertilizers: [
      {
        name: 'Potassium Sulfate (SOP)',
        npk: '0-0-50 + 17% S',
        dosage: '2.5 kg/acre or 5g/L foliar spray',
        benefit: 'Thickens leaf cell walls, boosts epidermal toughness, reducing fungal mycelial penetration.',
      },
      {
        name: 'Calcium Nitrate with Boron',
        npk: '15.5-0-0 + 19% Ca + 0.3% B',
        dosage: '3g/L foliar spray every 10-14 days',
        benefit: 'Strengthens middle lamella and pectin bonds in plant tissues, preventing enzymatic collapse.',
      },
      {
        name: 'Soluble Potassium Silicate',
        dosage: '2 ml/L water as foliar spray',
        benefit: 'Deposits a protective physical silica barrier beneath the leaf cuticle against spore penetration.',
      },
    ],
    fertilizersToAvoid: [
      'Excessive Nitrogen / Urea (promotes rapid, tender, soft vegetative growth vulnerable to spore infection)',
      'Fresh animal manure (can harbour pathogenic fungal spores and induce nitrogen burning)',
    ],
    treatmentOrganic: [
      'Copper Octanoate / Copper Hydroxide (Organic OMRI listed) applied every 7-10 days',
      'Bacillus subtilis or Trichoderma viride bio-fungicide foliar spray',
      'Remove and burn all infected bottom leaves up to 30cm off the ground',
    ],
    treatmentChemical: [
      'Azoxystrobin + Difenoconazole (Amistar Top) at 1ml/L (PHI: 7 days)',
      'Chlorothalonil 75% WP at 2g/L as preventative canopy barrier',
      'Mancozeb 75% WP at 2.5g/L',
    ],
  },
  {
    id: 'potato-late-blight',
    name: 'Potato Late Blight',
    crop: 'Potato',
    scientificName: 'Phytophthora infestans',
    category: 'Fungal',
    severityLevel: 'Severe',
    description: 'One of the most destructive agricultural oomycete pathogens globally, infamous for causing the Irish Potato Famine. Produces water-soaked irregular lesions that turn rapidly dark brown or black with delicate white fungal fuzz on leaf undersides in humid conditions.',
    symptoms: [
      'Water-soaked dark lesions rapidly enlarging across leaves',
      'Delicate white fluffy mold on the undersides of leaves during humid mornings',
      'Foul decaying smell in heavily infested potato fields',
      'Brown, dry rot extending beneath the tuber skin',
    ],
    favorableWeather: 'Cool, wet, foggy conditions (12°C–20°C / 54°F–68°F) with prolonged relative humidity (>90%) and continuous leaf wetness of 8+ hours.',
    recommendedFertilizers: [
      {
        name: 'Potassium Phosphite (Mono-potassium phosphite)',
        npk: '0-28-26',
        dosage: '2.5 ml/L water foliar spray',
        benefit: 'Triggers systemic acquired resistance (SAR) and synthesis of phytoalexins against oomycete Phytophthora.',
      },
      {
        name: 'Calcium Chelate (EDTA-Ca)',
        dosage: '1.5 g/L foliar spray',
        benefit: 'Fortifies tuber skins and foliage against zoospore infection.',
      },
    ],
    fertilizersToAvoid: [
      'Over-application of Nitrogen (delays maturity, causes dense canopy preventing airflow)',
    ],
    treatmentOrganic: [
      'Bordeaux Mixture (Copper Sulphate + Lime) 1% preventative spray',
      'Immediate field sanitation: harvest tubers early or destroy haulms if top blight exceeds 50%',
      'Trichoderma harzianum soil and drench application',
    ],
    treatmentChemical: [
      'Metalaxyl-M + Mancozeb (Ridomil Gold) at 2.5g/L (PHI: 14 days)',
      'Cymoxanil + Mancozeb (Curzate) at 2g/L (has curative kickback action)',
      'Dimethomorph 50% WP at 1g/L',
    ],
  },
  {
    id: 'corn-northern-leaf-blight',
    name: 'Northern Corn Leaf Blight',
    crop: 'Corn / Maize',
    scientificName: 'Exserohilum turcicum',
    category: 'Fungal',
    severityLevel: 'High',
    description: 'A major foliar disease of maize characterized by distinctive long, elliptical, grayish-green to tan lesions that resemble cigars. Severe infections blight entire leaves, drastically reducing photosynthetic capacity during grain filling.',
    symptoms: [
      'Long, elliptical cigar-shaped lesions (2.5 to 15 cm in length)',
      'Lesions turn grayish-green then straw-colored and tan',
      'Dark olive sporulation inside lesions in damp weather',
      'Premature death of leaves from lower canopy upward',
    ],
    favorableWeather: 'Moderate temperatures (18°C–27°C / 64°F–80°F) with heavy dew, overcast days, and frequent rain showers.',
    recommendedFertilizers: [
      {
        name: 'Potassium Chloride (MOP) or Sulfate of Potash',
        npk: '0-0-60',
        dosage: '40-50 kg/acre basal or top dress',
        benefit: 'Balances nitrogen uptake, hardens stalk and leaf tissue, significantly decreases lesion expansion.',
      },
      {
        name: 'Zinc Sulfate (ZnSO4 21%)',
        dosage: '2g/L foliar spray at knee-high stage',
        benefit: 'Enzyme activation for auxin synthesis and stress defense.',
      },
    ],
    fertilizersToAvoid: [
      'Excessive late-season Nitrogen application without matching Potassium',
    ],
    treatmentOrganic: [
      'Crop rotation with non-host crops (soybeans, legumes) for 1-2 years',
      'Deep plowing to bury infested corn stubble and residues',
      'Trichoderma viride seed treatment (10g/kg seed)',
    ],
    treatmentChemical: [
      'Pyraclostrobin + Fluxapyroxad at recommended label rate at VT/R1 tassel stage',
      'Propiconazole 25% EC at 1ml/L',
      'Azoxystrobin 23% SC at 1ml/L',
    ],
  },
  {
    id: 'rice-blast',
    name: 'Rice Blast Disease',
    crop: 'Rice / Paddy',
    scientificName: 'Magnaporthe oryzae',
    category: 'Fungal',
    severityLevel: 'Severe',
    description: 'The most catastrophic disease of cultivated rice worldwide. Attacks leaves (leaf blast), nodes (node blast), and panicle necks (neck blast). Leaf spots are diamond/spindle-shaped with gray-white centers and brownish borders.',
    symptoms: [
      'Spindle/diamond-shaped eye spots with pointed ends and gray centers',
      'Neck rot causing empty/chaffy white panicles (whiteheads)',
      'Nodes turning black and snapping easily in the field',
    ],
    favorableWeather: 'High humidity (>90%), daytime temperatures 25°C–28°C with cooler nights (17°C–20°C), overcast skies, and excess nitrogen.',
    recommendedFertilizers: [
      {
        name: 'Silica / Calcium Silicate Slag',
        dosage: '500-1000 kg/ha in soil preparation',
        benefit: 'Silica deposits in epidermal cells create a physical double layer that halts rice blast appressorium entry.',
      },
      {
        name: 'Muriate of Potash (MOP)',
        npk: '0-0-60',
        dosage: 'Split application at tillering and panicle initiation',
        benefit: 'Boosts lignin synthesis and reduces leaf exudates that stimulate spore germination.',
      },
    ],
    fertilizersToAvoid: [
      'Excessive single-dose Urea application (causes lush succulent leaves that blast spores penetrate easily)',
    ],
    treatmentOrganic: [
      'Pseudomonas fluorescens 10g/kg seed treatment and 2.5g/L foliar spray',
      'Intermittent flooding and draining to promote aerobic root respiration',
      'Neem oil 0.5% spray',
    ],
    treatmentChemical: [
      'Tricyclazole 75% WP at 0.6g/L (highly effective preventative and systemic blast fungicide)',
      'Isoprothiolane 40% EC at 1.5ml/L',
      'Kasugamycin 3% SL at 2ml/L (safe antibiotic fungicide)',
    ],
  },
  {
    id: 'wheat-leaf-rust',
    name: 'Wheat Brown Leaf Rust',
    crop: 'Wheat',
    scientificName: 'Puccinia triticina',
    category: 'Fungal',
    severityLevel: 'High',
    description: 'Fungal rust disease producing small, round to oval orange-brown uredinial pustules scattered irregularly across the upper surfaces of wheat leaves. Severe rust causes premature senescence and shriveled grains.',
    symptoms: [
      'Orange-red powdery circular pustules on upper leaf blades',
      'Pustules leave rust-colored powder on hands when brushed',
      'Rapid yellowing and drying out of flag leaves',
      'Shriveled grain heads with low test weight',
    ],
    favorableWeather: 'Mild temperatures (15°C–22°C / 59°F–72°F) accompanied by 6–8 hours of leaf moisture from dew or light rain.',
    recommendedFertilizers: [
      {
        name: 'Potassium Chloride (MOP)',
        npk: '0-0-60',
        dosage: '25-30 kg/acre',
        benefit: 'Reduces rust incidence by improving stomatal regulation and thickening outer epidermal layers.',
      },
      {
        name: 'Zinc + Manganese Chelate Spray',
        dosage: '1g/L at jointing stage',
        benefit: 'Maintains photosynthetic electron transport and chlorophyll integrity under rust stress.',
      },
    ],
    fertilizersToAvoid: [
      'Heavy late top-dressing of pure Nitrogen without adequate Potassium',
    ],
    treatmentOrganic: [
      'Plant rust-resistant certified cultivars (e.g., harboring Lr34 resistance genes)',
      'Early planting to escape optimal spore flight periods',
      'Foliar spray of fermented neem seed kernel extract (NSKE 5%)',
    ],
    treatmentChemical: [
      'Tebuconazole 25.9% EC at 1ml/L applied at flag leaf emergence',
      'Propiconazole 25% EC (Tilt) at 1ml/L',
    ],
  },
  {
    id: 'grape-powdery-mildew',
    name: 'Grape Powdery Mildew',
    crop: 'Grape',
    scientificName: 'Erysiphe necator',
    category: 'Fungal',
    severityLevel: 'High',
    description: 'A pervasive fungal disease of viticulture that covers leaves, young shoots, and grape clusters with a white or ash-gray powdery coating. Infected berries crack, bleed juice, fail to mature, and are ruined for table or wine use.',
    symptoms: [
      'White-gray powdery patches on upper and lower leaf surfaces',
      'Distorted, curled, crinkled young vine leaves',
      'Cracking berries with exposed seeds and sour rot secondary infection',
      'Musty, mildewy odor in dense grape canopies',
    ],
    favorableWeather: 'Warm, dry climate with shaded, dense canopies (20°C–28°C / 68°F–82°F) and moderate humidity; does NOT require free water to infect!',
    recommendedFertilizers: [
      {
        name: 'Potassium Bicarbonate / Foliar Potassium',
        npk: '0-0-30',
        dosage: '3-4 g/L water',
        benefit: 'Alters leaf surface pH to alkaline (>8.0), rupturing fungal powdery mildew hyphae on contact.',
      },
      {
        name: 'Calcium Polyphosphate',
        dosage: '2 ml/L foliar spray',
        benefit: 'Prevents berry skin splitting and enhances cluster firmness.',
      },
    ],
    fertilizersToAvoid: [
      'Excess nitrogen during pre-bloom and fruit set (promotes excessive shade canopy)',
    ],
    treatmentOrganic: [
      'Wettable Sulfur (Micronized Sulfur 80% WDG) at 2-3g/L (preventative gold standard)',
      'Potassium bicarbonate + organic horticultural oil (0.5%)',
      'Canopy management: summer leaf pulling around fruit zones to maximize sunlight and airflow',
    ],
    treatmentChemical: [
      'Penconazole 10% EC at 0.5ml/L',
      'Kresoxim-methyl 44.3% SC at 0.7ml/L',
      'Flusilazole 40% EC at 0.2ml/L (strict adherence to pre-harvest intervals)',
    ],
  },
];
