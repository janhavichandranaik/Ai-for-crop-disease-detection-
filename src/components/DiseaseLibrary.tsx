import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  AlertTriangle,
  Sprout,
  Beaker,
  CloudSun,
  ChevronRight,
  ShieldAlert,
  Leaf,
} from 'lucide-react';
import { DISEASE_LIBRARY, DiseaseLibraryItem } from '../data/diseaseLibraryData';

export const DiseaseLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedItem, setExpandedItem] = useState<string | null>(DISEASE_LIBRARY[0]?.id || null);

  const crops = ['All', ...Array.from(new Set(DISEASE_LIBRARY.map((d) => d.crop)))];
  const categories = ['All', 'Fungal', 'Bacterial', 'Viral'];

  const filtered = DISEASE_LIBRARY.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCrop = selectedCrop === 'All' || item.crop === selectedCrop;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCrop && matchesCategory;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-stone-100">
      {/* Header */}
      <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-100">Crop Disease & Fertilizer Field Guide</h2>
            <p className="text-xs text-stone-400">
              Agronomic reference for pathogens, favorable weather & nutrient management
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-stone-900/70 border border-stone-800 p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search crop, pathogen, or symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-stone-400 font-medium">Crop:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="bg-stone-950 border border-stone-700 text-stone-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              {crops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-stone-400 font-medium">Type:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-stone-950 border border-stone-700 text-stone-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Disease Cards List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isExpanded = expandedItem === item.id;
          return (
            <div
              key={item.id}
              className="bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden shadow-md transition-all"
            >
              {/* Card Header (Click to toggle) */}
              <button
                type="button"
                onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-850/50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold bg-stone-950 border border-stone-700 text-stone-300 px-2 py-0.5 rounded-full">
                        {item.crop}
                      </span>
                      <span className="text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-bold bg-red-500/10 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full">
                        {item.severityLevel}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-400 italic font-serif">
                      Pathogen: {item.scientificName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-stone-400">
                  <span className="text-xs hidden sm:inline text-stone-400">
                    {isExpanded ? 'Hide Details' : 'View Guide'}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90 text-emerald-400' : ''}`}
                  />
                </div>
              </button>

              {/* Expanded Card Details */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-stone-800 space-y-4 bg-stone-950/30 text-stone-200">
                  {/* Description */}
                  <div className="pt-4">
                    <p className="text-xs text-stone-300 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                      Key Identification Symptoms:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.symptoms.map((s, idx) => (
                        <div
                          key={idx}
                          className="bg-stone-900 border border-stone-800 p-2.5 rounded-xl text-xs flex items-start gap-2"
                        >
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weather Triggers */}
                  <div className="bg-stone-900/80 border border-stone-800 p-3.5 rounded-xl flex items-start gap-3">
                    <CloudSun className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-amber-300 block">Favorable Weather Conditions</span>
                      <p className="text-xs text-stone-300 mt-0.5">{item.favorableWeather}</p>
                    </div>
                  </div>

                  {/* Fertilizers to Apply & Avoid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-xl">
                      <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Sprout className="w-4 h-4" />
                        Recommended Fertilizers & Nutrition
                      </h4>
                      <div className="space-y-2.5">
                        {item.recommendedFertilizers.map((fert, idx) => (
                          <div key={idx} className="bg-stone-950 p-2.5 rounded-lg border border-stone-800 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{fert.name}</span>
                              {fert.npk && (
                                <span className="font-mono text-[10px] text-amber-300">{fert.npk}</span>
                              )}
                            </div>
                            <p className="text-[11px] text-stone-400 mt-1">{fert.benefit}</p>
                            <span className="text-[10px] text-emerald-400 block mt-1">Rate: {fert.dosage}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-red-950/20 border border-red-900/40 p-4 rounded-xl">
                      <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        Fertilizers to AVOID During Outbreak
                      </h4>
                      <ul className="space-y-2">
                        {item.fertilizersToAvoid.map((avoid, idx) => (
                          <li key={idx} className="text-xs text-stone-300 flex items-start gap-2">
                            <span className="text-red-400 font-bold">✕</span>
                            <span>{avoid}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
