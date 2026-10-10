import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  RotateCcw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Donor, BloodGroup, AvailabilityStatus, Language } from '../types';
import { translations } from '../translations';
import { BANGLADESH_LOCATIONS } from '../data/mockData';
import { DonorCard } from './DonorCard';

interface DonorSearchAndListProps {
  donors: Donor[];
  language: Language;
  selectedBloodType: BloodGroup | '';
  setSelectedBloodType: (type: BloodGroup | '') => void;
  selectedDivision: string;
  setSelectedDivision: (div: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (dist: string) => void;
  searchSubArea: string;
  setSearchSubArea: (sub: string) => void;
  onOpenChat: (donor: Donor) => void;
  onViewProfile: (donor: Donor) => void;
  onRateDonor: (donor: Donor) => void;
}

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const DonorSearchAndList: React.FC<DonorSearchAndListProps> = ({
  donors,
  language,
  selectedBloodType,
  setSelectedBloodType,
  selectedDivision,
  setSelectedDivision,
  selectedDistrict,
  setSelectedDistrict,
  searchSubArea,
  setSearchSubArea,
  onOpenChat,
  onViewProfile,
  onRateDonor,
}) => {
  const t = translations[language];

  const [selectedStatus, setSelectedStatus] = useState<AvailabilityStatus | ''>('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'days' | 'donations'>('rating');

  // Filter available districts based on selected division
  const currentDistricts = BANGLADESH_LOCATIONS.find(l => l.division === selectedDivision)?.districts || [];

  // Filtered and sorted donor list
  const filteredDonors = useMemo(() => {
    return donors.filter((d) => {
      // Blood type
      if (selectedBloodType && d.bloodType !== selectedBloodType) return false;
      // Division
      if (selectedDivision && d.division.toLowerCase() !== selectedDivision.toLowerCase()) return false;
      // District
      if (selectedDistrict && d.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
      // Sub-area keyword search
      if (searchSubArea.trim()) {
        const query = searchSubArea.toLowerCase().trim();
        const matchesSubArea = d.subArea?.toLowerCase().includes(query);
        const matchesArea = d.area?.toLowerCase().includes(query);
        const matchesDistrict = d.district?.toLowerCase().includes(query);
        if (!matchesSubArea && !matchesArea && !matchesDistrict) return false;
      }
      // Availability status
      if (selectedStatus && d.availability !== selectedStatus) return false;
      // Verified only (at least 3 donations or verified status)
      if (verifiedOnly && !(d.totalDonations >= 3 || d.verified)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'donations') {
        return b.totalDonations - a.totalDonations;
      }
      if (sortBy === 'days') {
        const dateA = new Date(a.lastDonationDate).getTime();
        const dateB = new Date(b.lastDonationDate).getTime();
        return dateA - dateB; // older last donation = more days ago = more rested
      }
      return 0;
    });
  }, [donors, selectedBloodType, selectedDivision, selectedDistrict, searchSubArea, selectedStatus, verifiedOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedBloodType('');
    setSelectedDivision('');
    setSelectedDistrict('');
    setSearchSubArea('');
    setSelectedStatus('');
    setVerifiedOnly(false);
    setSortBy('rating');
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.donorDirectoryTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t.donorDirectorySubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold">
              {filteredDonors.length} {t.totalFound}
            </span>
          </div>
        </div>

        {/* Detailed Filter Toolbar */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 space-y-4">
          
          {/* Blood Group Fast Select */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
              {t.bloodType}:
            </span>
            <button
              onClick={() => setSelectedBloodType('')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectedBloodType === ''
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-300'
              }`}
            >
              {language === 'bn' ? 'সকল' : 'All'}
            </button>
            {BLOOD_GROUPS.map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedBloodType(bg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border ${
                  selectedBloodType === bg
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>

          {/* Location & Sub Area Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* Division */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {t.division}
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setSelectedDistrict('');
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-rose-500"
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
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {t.district}
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedDivision}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-rose-500 disabled:opacity-50"
              >
                <option value="">{t.allDistricts}</option>
                {currentDistricts.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {t.subArea}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchSubArea}
                  onChange={(e) => setSearchSubArea(e.target.value)}
                  placeholder={t.searchPlaceholderSubArea}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {t.filterByStatus}
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-rose-500"
              >
                <option value="">{t.allStatuses}</option>
                <option value="available">{t.availableNow}</option>
                <option value="busy">{t.busy}</option>
                <option value="donated_recently">{t.donatedRecently}</option>
              </select>
            </div>
          </div>

          {/* Bottom Controls: Verified Toggle, Sorting & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span>{t.verifiedOnly}</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{t.sortBy}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  <option value="rating">{t.sortHighestRated}</option>
                  <option value="days">{t.sortRecentDonation}</option>
                  <option value="donations">{t.sortTotalDonations}</option>
                </select>
              </div>

              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:border-rose-300 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.clearFilters}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Donors Grid */}
        {filteredDonors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDonors.map((donor) => (
              <DonorCard
                key={donor.id}
                donor={donor}
                language={language}
                onOpenChat={onOpenChat}
                onViewProfile={onViewProfile}
                onRateDonor={onRateDonor}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {language === 'bn' ? 'কোনো রক্তদাতা মেলেনি' : 'No Donors Found'}
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t.noDonorsFound}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs sm:text-sm hover:bg-rose-700 transition-colors"
            >
              {t.clearFilters}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
