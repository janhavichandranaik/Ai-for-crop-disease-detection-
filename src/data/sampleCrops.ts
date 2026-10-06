import tomatoImg from '@/src/assets/images/tomato_early_blight_leaf_1791265044146.jpg';
import cornImg from '@/src/assets/images/corn_leaf_blight_1791265059190.jpg';
import potatoImg from '@/src/assets/images/potato_late_blight_1791265078186.jpg';
import healthyImg from '@/src/assets/images/healthy_crop_leaf_1791265092639.jpg';

export interface SampleCrop {
  id: string;
  name: string;
  crop: string;
  condition: string;
  imageUrl: string;
  description: string;
  badgeColor: string;
}

export const SAMPLE_CROPS: SampleCrop[] = [
  {
    id: 'sample-tomato-early-blight',
    name: 'Tomato Early Blight',
    crop: 'Tomato (Solanum lycopersicum)',
    condition: 'Early Blight (Alternaria solani)',
    imageUrl: tomatoImg,
    description: 'Concentric target-board rings with yellow chlorotic halos on lower foliage.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    id: 'sample-potato-late-blight',
    name: 'Potato Late Blight',
    crop: 'Potato (Solanum tuberosum)',
    condition: 'Late Blight (Phytophthora infestans)',
    imageUrl: potatoImg,
    description: 'Irregular dark water-soaked lesions spreading rapidly in cool humid weather.',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
  },
  {
    id: 'sample-corn-leaf-blight',
    name: 'Corn Northern Leaf Blight',
    crop: 'Maize / Corn (Zea mays)',
    condition: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
    imageUrl: cornImg,
    description: 'Elongated grayish-tan cigar-shaped elliptical lesions across leaf veins.',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
  },
  {
    id: 'sample-healthy-crop',
    name: 'Healthy Foliage',
    crop: 'Soybean / Vegetable Leaf',
    condition: 'Healthy Leaf (No Pathogens)',
    imageUrl: healthyImg,
    description: 'Vibrant green chlorophyll, crisp venation, clean cuticle with zero necrotic lesions.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
];
