import React from 'react';
import {
  Camera,
  CloudSun,
  BookOpen,
  Clock,
  Sparkles,
  Globe,
  Leaf,
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../utils/translations';

export type ActiveTab = 'scanner' | 'weather' | 'library' | 'history' | 'chat';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  historyCount: number;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  historyCount,
  language,
  setLanguage,
}) => {
  const languages: { code: Language; label: string; badge: string }[] = [
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)', badge: 'ಕ' },
    { code: 'en', label: 'English', badge: 'En' },
    { code: 'hi', label: 'हिन्दी (Hindi)', badge: 'हि' },
  ];

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-50 bg-stone-950/85 backdrop-blur-xl border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          onClick={() => setActiveTab('scanner')}
          className="flex items-center gap-2.5 text-left group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-950/50 flex items-center justify-center">
            <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 fill-emerald-500/20" />
            </div>
          </div>
          <div>
            <span className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
              AgriShield
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                AI
              </span>
            </span>
            <span className="text-[10px] text-stone-400 block -mt-0.5">{t.tagline}</span>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center bg-stone-900/80 p-1 rounded-2xl border border-stone-800">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'scanner'
                ? 'bg-emerald-600 text-stone-950 shadow-md font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            {t.scanner}
          </button>

          <button
            onClick={() => setActiveTab('weather')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'weather'
                ? 'bg-emerald-600 text-stone-950 shadow-md font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <CloudSun className="w-3.5 h-3.5" />
            {t.weather}
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'library'
                ? 'bg-emerald-600 text-stone-950 shadow-md font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t.guide}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-emerald-600 text-stone-950 shadow-md font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {t.history}
            {historyCount > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'history'
                    ? 'bg-stone-950 text-emerald-300'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}
              >
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'chat'
                ? 'bg-emerald-600 text-stone-950 shadow-md font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.agronomist}
          </button>
        </nav>

        {/* Language selector: Kannada, English, Hindi */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-700/80 px-2.5 py-1.5 rounded-xl shadow-inner">
            <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-xs text-stone-100 font-semibold focus:outline-none cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-stone-950 text-stone-100 py-1 font-medium">
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Bottom / Secondary Navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-800/80 bg-stone-950 px-2 py-1.5">
        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] ${
            activeTab === 'scanner' ? 'text-emerald-400 font-bold' : 'text-stone-400'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>{t.scanner}</span>
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] ${
            activeTab === 'weather' ? 'text-emerald-400 font-bold' : 'text-stone-400'
          }`}
        >
          <CloudSun className="w-4 h-4" />
          <span>{t.weather}</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] ${
            activeTab === 'library' ? 'text-emerald-400 font-bold' : 'text-stone-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{t.guide}</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] relative ${
            activeTab === 'history' ? 'text-emerald-400 font-bold' : 'text-stone-400'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{t.history}</span>
          {historyCount > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] ${
            activeTab === 'chat' ? 'text-emerald-400 font-bold' : 'text-stone-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.agronomist}</span>
        </button>
      </div>
    </header>
  );
};
