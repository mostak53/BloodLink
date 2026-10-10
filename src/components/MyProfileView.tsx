import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  Heart, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  Save, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Donor, AvailabilityStatus, Language } from '../types';
import { translations } from '../translations';
import { ImageWithFallback } from './ImageWithFallback';

interface MyProfileViewProps {
  currentUser: Donor;
  language: Language;
  onUpdateDonor: (updated: Donor) => void;
  onLogout: () => void;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  currentUser,
  language,
  onUpdateDonor,
  onLogout,
}) => {
  const t = translations[language];

  const [availability, setAvailability] = useState<AvailabilityStatus>(currentUser.availability);
  const [lastDonationDate, setLastDonationDate] = useState<string>(currentUser.lastDonationDate);
  const [phone, setPhone] = useState<string>(currentUser.phone);
  const [subArea, setSubArea] = useState<string>(currentUser.subArea);
  const [readyForEmergency, setReadyForEmergency] = useState<boolean>(currentUser.readyForEmergency);
  const [savedNotice, setSavedNotice] = useState(false);

  // Calculate days since last donation
  const calculateDaysAgo = (dateStr: string) => {
    if (!dateStr) return 999;
    const lastDate = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysAgo = calculateDaysAgo(lastDonationDate);
  const isEligible = daysAgo >= 90;
  const daysRemaining = Math.max(0, 90 - daysAgo);
  const progressPercent = Math.min(100, Math.round((daysAgo / 90) * 100));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Donor = {
      ...currentUser,
      availability,
      lastDonationDate,
      phone,
      subArea,
      readyForEmergency,
    };
    onUpdateDonor(updated);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 text-center sm:text-left">
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative">
                <ImageWithFallback
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  fallbackInitials={currentUser.name.slice(0, 2).toUpperCase()}
                  bloodType={currentUser.bloodType}
                  className="w-20 h-20 rounded-3xl shadow-md border-2 border-rose-500/30"
                />
                <span className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-lg bg-rose-600 text-white font-black text-xs">
                  {currentUser.bloodType}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {currentUser.name}
                  </h1>
                  {currentUser.totalDonations >= 3 ? (
                    <span 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-black border border-sky-300 dark:border-sky-800 shadow-2xs"
                      title={language === 'bn' ? 'যাচাইকৃত রক্তদাতা: ৩+ রক্তদান সম্পন্ন' : 'Verified Donor: Completed at least 3 successful donations'}
                    >
                      <ShieldCheck className="w-4 h-4 fill-sky-600 text-white shrink-0" />
                      <span>{language === 'bn' ? 'যাচাইকৃত রক্তদাতা (৩+ রক্তদান)' : 'Verified Donor (3+ Donations)'}</span>
                    </span>
                  ) : (
                    <span 
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold"
                      title={language === 'bn' ? `যাচাইকৃত ব্যাজের জন্য আরও ${3 - currentUser.totalDonations}টি রক্তদান প্রয়োজন` : `${3 - currentUser.totalDonations} more donations needed for Verified status`}
                    >
                      <span>{currentUser.totalDonations}/3 {language === 'bn' ? 'রক্তদান' : 'Donations'}</span>
                    </span>
                  )}
                  {currentUser.totalDonations >= 5 && (
                    <span className="text-amber-500 inline-flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 border border-amber-300 dark:border-amber-800" title={t.heroDonor}>
                      <Award className="w-4 h-4" />
                      <span>5+ Hero</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{currentUser.subArea}, {currentUser.district}</span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 font-bold">
                    {currentUser.totalDonations} {t.donationsCount}
                  </span>
                  <span>•</span>
                  <span>{currentUser.reviewCount} {t.reviewsCount}</span>
                  <span>•</span>
                  <span className="text-amber-500 font-bold">★ {currentUser.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:border-rose-300 transition-colors"
            >
              {t.navLogout}
            </button>

          </div>
        </div>

        {/* LIVE COUNTDOWN SYSTEM SECTION */}
        <div className="bg-gradient-to-br from-rose-50 via-white to-red-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl p-6 sm:p-8 border border-rose-200 dark:border-slate-700 shadow-md mb-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'রক্তদানের লাইভ কাউন্টডাউন' : 'Live Biological Countdown'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {t.countdownTitle}
              </h2>
            </div>

            <span className={`px-3 py-1.5 rounded-full text-xs font-black self-start sm:self-auto ${
              isEligible
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
            }`}>
              {isEligible ? `✓ ${t.eligibleToDonate}` : `${daysRemaining} ${language === 'bn' ? 'দিন বাকি' : 'days left'}`}
            </span>
          </div>

          {/* Big Countdown Displays */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                {t.daysSinceLastDonation}
              </span>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                {daysAgo}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {language === 'bn' ? 'সর্বশেষ রক্তদানের তারিখ:' : 'Recorded Last Donation:'} <strong>{lastDonationDate}</strong>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                {t.daysUntilEligible}
              </span>
              <div className={`text-4xl sm:text-5xl font-black ${isEligible ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {isEligible ? '0' : daysRemaining}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {isEligible 
                  ? (language === 'bn' ? 'আপনি আজ রক্তদানের জন্য শতভাগ প্রস্তুত!' : 'You are 100% eligible to save a life today!') 
                  : (language === 'bn' ? 'শারীরিক হিমোগ্লোবিন ও আয়রন রিকভারি চলছে' : 'Biological replenishment in progress')}
              </p>
            </div>

          </div>

          {/* Recovery Progress Bar */}
          <div className="space-y-2 mb-5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">{t.recoveryStage}</span>
              <span className="text-rose-600 dark:text-rose-400">{progressPercent}%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-700 ${
                  isEligible 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                    : 'bg-gradient-to-r from-rose-500 to-amber-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Recovery Milestones */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-3 border-t border-slate-200 dark:border-slate-700">
            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
              <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Phase 1: Plasma</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{t.plasmaRegeneration}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
              <div className={`font-bold flex items-center gap-1.5 ${daysAgo >= 30 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>Phase 2: RBC Cells</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{t.rbcReplenishment}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
              <div className={`font-bold flex items-center gap-1.5 ${isEligible ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>Phase 3: Ferritin</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{t.ironReplenishment}</p>
            </div>
          </div>

        </div>

        {/* Profile Settings & Status Form */}
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            {language === 'bn' ? 'প্রোফাইল ও প্রাপ্যতা পরিবর্তন করুন' : 'Manage Availability & Information'}
          </h3>

          {savedNotice && (
            <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{t.updateProfileSuccess}</span>
            </div>
          )}

          {/* Quick Availability Status Toggle */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
              {t.profileStatusUpdate}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setAvailability('available')}
                className={`p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all text-left ${
                  availability === 'available'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-extrabold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  {t.availableNow}
                </div>
                <div className="text-[11px] opacity-75 mt-0.5">{language === 'bn' ? 'রোগী সরাসরি কল করতে পারবে' : 'Ready to receive emergency calls'}</div>
              </button>

              <button
                type="button"
                onClick={() => setAvailability('busy')}
                className={`p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all text-left ${
                  availability === 'busy'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-extrabold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  {t.busy}
                </div>
                <div className="text-[11px] opacity-75 mt-0.5">{language === 'bn' ? 'অফিস বা ভ্রমণে ব্যস্ত' : 'Temporarily unavailable'}</div>
              </button>

              <button
                type="button"
                onClick={() => setAvailability('donated_recently')}
                className={`p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all text-left ${
                  availability === 'donated_recently'
                    ? 'border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-extrabold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  {t.donatedRecently}
                </div>
                <div className="text-[11px] opacity-75 mt-0.5">{language === 'bn' ? 'শারীরিক বিশ্রাম চলছে' : 'Resting countdown active'}</div>
              </button>
            </div>
          </div>

          {/* Last Donation Date (Updates the Countdown live) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                {t.lastDonationDateLabel} (Recalibrate Countdown)
              </label>
              <input
                type="date"
                value={lastDonationDate}
                onChange={(e) => setLastDonationDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                {t.phoneNumber}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
              {t.subArea} (Locality)
            </label>
            <input
              type="text"
              value={subArea}
              onChange={(e) => setSubArea(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
            />
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={readyForEmergency}
              onChange={(e) => setReadyForEmergency(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
            />
            <span>{t.readyForEmergencyToggle}</span>
          </label>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{language === 'bn' ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Profile Changes'}</span>
          </button>

        </form>

      </div>
    </div>
  );
};
