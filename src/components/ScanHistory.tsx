import React, { useState } from 'react';
import {
  Clock,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  Download,
  Calendar,
  AlertCircle,
  FileCheck,
  Leaf,
  Sprout,
  ArrowRight,
} from 'lucide-react';
import { HistoryItem, DiagnosisResult } from '../types/crop';
import { TRANSLATIONS, Language } from '../utils/translations';

interface ScanHistoryProps {
  history: HistoryItem[];
  language?: Language;
  onSelectScan: (item: HistoryItem) => void;
  onDeleteScan: (id: string) => void;
  onClearHistory: () => void;
  onNewScan: () => void;
}

export const ScanHistory: React.FC<ScanHistoryProps> = ({
  history,
  language = 'en',
  onSelectScan,
  onDeleteScan,
  onClearHistory,
  onNewScan,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCrop, setFilterCrop] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const crops = ['All', ...Array.from(new Set(history.map((h) => h.cropName)))];

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCrop = filterCrop === 'All' || item.cropName === filterCrop;
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Healthy' && item.healthStatus.toLowerCase().includes('healthy')) ||
      (filterStatus === 'Diseased' && item.healthStatus.toLowerCase().includes('diseased'));

    return matchesSearch && matchesCrop && matchesStatus;
  });

  const exportHistoryJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `agrishield_field_scans_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getSeverityColor = (sev: string) => {
    if (sev.toLowerCase().includes('critical') || sev.toLowerCase().includes('severe')) {
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    }
    if (sev.toLowerCase().includes('moderate')) {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
    if (sev.toLowerCase().includes('mild')) {
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-stone-100">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900/90 border border-stone-800 p-5 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-100">{t.historyTitle}</h2>
            <p className="text-xs text-stone-400">
              {history.length} {t.historySubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {history.length > 0 && (
            <>
              <button
                onClick={exportHistoryJSON}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Download JSON report"
              >
                <Download className="w-3.5 h-3.5" />
                {t.exportBtn}
              </button>
              <button
                onClick={onClearHistory}
                className="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {t.clearBtn}
              </button>
            </>
          )}

          <button
            onClick={onNewScan}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md ml-auto sm:ml-0"
          >
            <Leaf className="w-3.5 h-3.5" />
            {t.newScanBtn}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      {history.length > 0 && (
        <div className="bg-stone-900/70 border border-stone-800 p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by disease or crop..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-stone-400 font-medium">Crop:</span>
              <select
                value={filterCrop}
                onChange={(e) => setFilterCrop(e.target.value)}
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
              <span className="text-[11px] text-stone-400 font-medium">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-stone-950 border border-stone-700 text-stone-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Statuses</option>
                <option value="Diseased">Diseased</option>
                <option value="Healthy">Healthy</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* History Items List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-stone-900/60 border border-dashed border-stone-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center justify-center text-stone-500 mb-4">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-base font-semibold text-stone-200 mb-1">
            {history.length === 0 ? 'No Crop Scans in History Yet' : 'No Scans Match Filter'}
          </h3>
          <p className="text-xs text-stone-400 max-w-sm mb-5">
            {history.length === 0
              ? 'Take a photo of a leaf or upload an image to diagnose diseases and receive tailored fertilizer prescriptions.'
              : 'Try searching for a different crop name or reset the status filter.'}
          </p>
          <button
            onClick={onNewScan}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <Leaf className="w-4 h-4" />
            Start First Leaf Scan
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-stone-900/90 hover:bg-stone-900 border border-stone-800 hover:border-emerald-500/40 rounded-2xl p-4 transition-all shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Thumbnail */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-950 border border-stone-700 shrink-0">
                  <img
                    src={item.thumbnailUrl || item.imageUrl}
                    alt={item.diseaseName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-0.5 right-0.5 text-[8px] bg-black/80 px-1 rounded text-stone-300 font-mono">
                    {item.confidenceScore}%
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-bold text-white">{item.cropName}</span>
                    <span className="text-[10px] text-stone-400">•</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getSeverityColor(item.severity)}`}>
                      {item.severity}
                    </span>
                    <span className="text-[10px] text-stone-500 flex items-center gap-1 ml-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-emerald-400 leading-snug">
                    {item.diseaseName}
                  </h4>

                  {item.fertilizerAdvisory?.recommendedFertilizers?.[0] && (
                    <p className="text-[11px] text-stone-400 line-clamp-1 flex items-center gap-1">
                      <Sprout className="w-3 h-3 text-emerald-500" />
                      Prescribed: {item.fertilizerAdvisory.recommendedFertilizers.map((f) => f.name).slice(0, 2).join(', ')}
                    </p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => onSelectScan(item)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-stone-950 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>View Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeleteScan(item.id)}
                  className="p-2 rounded-xl bg-stone-950 hover:bg-red-950/60 text-stone-400 hover:text-red-400 border border-stone-800 hover:border-red-800 transition-colors"
                  title="Delete from history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
