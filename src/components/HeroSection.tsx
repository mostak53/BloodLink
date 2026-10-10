import React from 'react';
import { 
  Search, 
  MapPin, 
  Droplet, 
  ShieldCheck, 
  Clock, 
  Heart, 
  Sparkles, 
  AlertCircle,
  Users
} from 'lucide-react';
import { BloodGroup, Language } from '../types';
import { translations } from '../translations';
import { BANGLADESH_LOCATIONS } from '../data/mockData';

interface HeroSectionProps {
  language: Language;
  selectedBloodType: BloodGroup | '';
  setSelectedBloodType: (type: BloodGroup | '') => void;
  selectedDivision: string;
  setSelectedDivision: (div: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (dist: string) => void;
  searchSubArea: string;
  setSearchSubArea: (sub: string) => void;
  onSearch: () => void;
  onOpenRegister: () => void;
  onOpenNewRequest: () => void;
  onNavigateToAi: () => void;
}

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  selectedBloodType,
  setSelectedBloodType,
  selectedDivision,
  setSelectedDivision,
  selectedDistrict,
  setSelectedDistrict,
  searchSubArea,
  setSearchSubArea,
  onSearch,
  onOpenRegister,
  onOpenNewRequest,
  onNavigateToAi,
}) => {
  const t = translations[language];

  const currentDistricts = BANGLADESH_LOCATIONS.find(l => l.division === selectedDivision)?.districts || [];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-rose-100 dark:border-slate-800">
      
      {/* Subtle ambient medical glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-500/10 dark:bg-rose-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header / Badges */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-bold shadow-2xs mb-4">
            <Droplet className="w-4 h-4 fill-rose-600 text-rose-600 animate-bounce" />
            <span>{language === 'bn' ? 'জরুরি প্রয়োজনে সরাসরি রক্তদাতা সংযোগ' : 'Zero Middlemen • 100% Voluntary Network'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {t.heroTitlePrefix}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-red-600 dark:from-rose-500 dark:to-red-400">
              {t.heroTitleHighlight}
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>

          {/* Quick Action Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6">
            <button
              onClick={onOpenNewRequest}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{t.requestBloodCta}</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-700 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm shadow-2xs transition-colors"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>{t.navRegisterDonor}</span>
            </button>

            <button
              onClick={onNavigateToAi}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-900 hover:border-violet-400 text-violet-700 dark:text-violet-300 font-bold text-xs sm:text-sm shadow-2xs transition-colors"
            >
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span>{t.navAiAssist}</span>
            </button>
          </div>
        </div>

        {/* Interactive Search Filter Box (Direct Interaction on Home Page) */}
        <div className="mt-8 sm:mt-12 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 lg:p-7 shadow-xl shadow-slate-200/50 dark:shadow-black/40 border border-rose-100 dark:border-slate-800 max-w-5xl mx-auto">
          
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 font-black text-slate-800 dark:text-white text-sm sm:text-base">
              <Search className="w-5 h-5 text-rose-600" />
              <span>{language === 'bn' ? 'দ্রুত রক্তদাতা খুঁজুন' : 'Quick Blood Donor Search'}</span>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {language === 'bn' ? 'রক্তের গ্রুপ ও এলাকা দিয়ে খুঁজুন' : 'Filter by Blood Group, Location & Sub-Area'}
            </span>
          </div>

          {/* Quick Blood Group Chips */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {t.bloodType}
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-9 gap-2">
              <button
                type="button"
                onClick={() => setSelectedBloodType('')}
                className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all border ${
                  selectedBloodType === ''
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                }`}
              >
                {language === 'bn' ? 'সকল' : 'All'}
              </button>
              {BLOOD_GROUPS.map((bg) => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => setSelectedBloodType(bg)}
                  className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-black transition-all border ${
                    selectedBloodType === bg
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30 scale-105'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:text-rose-600'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            
            {/* Division */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                {t.division}
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setSelectedDistrict('');
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              >
                <option value="">{t.allLocations}</option>
                {BANGLADESH_LOCATIONS.map((loc) => (
                  <option key={loc.division} value={loc.division}>
                    {loc.division}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                {t.district}
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedDivision}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-500 disabled:opacity-50"
              >
                <option value="">{t.allDistricts}</option>
                {currentDistricts.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Area / Locality Search */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                {t.subArea}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchSubArea}
                  onChange={(e) => setSearchSubArea(e.target.value)}
                  placeholder={t.searchPlaceholderSubArea}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Search CTA */}
            <div className="md:col-span-2 flex items-end">
              <button
                type="button"
                onClick={onSearch}
                className="w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-md shadow-rose-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-4 h-4" />
                <span>{t.searchDonorsBtn}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10 max-w-4xl mx-auto">
          
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 backdrop-blur-xs">
            <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 shrink-0">
              <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                1,480+
              </div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {t.livesSavedCount}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 backdrop-blur-xs">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                3,250+
              </div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {t.activeDonorsCount}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 backdrop-blur-xs">
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                &lt; 12 Mins
              </div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {t.avgResponseTime}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 backdrop-blur-xs">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                100% Free
              </div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {t.freePlatform}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
