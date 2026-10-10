import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle2, 
  Activity, 
  Heart,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Donor, Language } from '../types';
import { translations } from '../translations';
import { ImageWithFallback } from './ImageWithFallback';

interface DonorProfileModalProps {
  donor: Donor | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenChat: (donor: Donor) => void;
  onRateDonor: (donor: Donor) => void;
}

export const DonorProfileModal: React.FC<DonorProfileModalProps> = ({
  donor,
  isOpen,
  onClose,
  language,
  onOpenChat,
  onRateDonor,
}) => {
  const t = translations[language];

  if (!isOpen || !donor) return null;

  // Calculate days since last donation
  const calculateDaysAgo = (dateStr: string) => {
    if (!dateStr) return 999;
    const lastDate = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysAgo = calculateDaysAgo(donor.lastDonationDate);
  const isEligible = daysAgo >= 90;
  const daysRemaining = Math.max(0, 90 - daysAgo);
  const progressPercent = Math.min(100, Math.round((daysAgo / 90) * 100));

  const whatsappMessage = encodeURIComponent(
    language === 'bn'
      ? `আসসালামু আলাইকুম ${donor.name}, আমি ব্লাডলিংক (Bloodlink) এ আপনার প্রোফাইল দেখে যোগাযোগ করছি।`
      : `Hello ${donor.name}, I found your verified profile on Bloodlink.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-slate-800 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100 dark:border-slate-800 text-center sm:text-left">
          
          <div className="relative">
            <ImageWithFallback
              src={donor.avatarUrl}
              alt={donor.name}
              fallbackInitials={donor.name.slice(0, 2).toUpperCase()}
              bloodType={donor.bloodType}
              className="w-24 h-24 rounded-3xl shadow-md border-2 border-rose-500/20"
            />
            <span className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-xl bg-rose-600 text-white font-black text-sm shadow-md">
              {donor.bloodType}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {donor.name}
              </h2>
              {donor.totalDonations >= 3 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-black border border-sky-300 dark:border-sky-800 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 fill-sky-600 text-white shrink-0" />
                  <span>{language === 'bn' ? 'যাচাইকৃত রক্তদাতা (৩+ রক্তদান সম্পন্ন)' : 'Verified Donor (3+ Donations)'}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold">
                  <span>{donor.totalDonations}/3 {language === 'bn' ? 'রক্তদান সম্পন্ন (যাচাইকরণ বাকি)' : 'Donations (Verification Pending)'}</span>
                </span>
              )}
              {donor.totalDonations >= 5 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-black border border-amber-300 dark:border-amber-800 shadow-2xs">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{t.heroDonor}</span>
                </span>
              )}
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{donor.subArea || donor.area}, {donor.district}, {donor.division}</span>
            </div>

            {donor.bio && (
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl italic">
                "{donor.bio}"
              </p>
            )}

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80">
                <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white">{donor.totalDonations}</div>
                <div className="text-[10px] font-semibold text-slate-500">{t.donationsCount}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80">
                <div className="text-sm sm:text-base font-black text-amber-500 flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{donor.rating.toFixed(1)}</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-500">{donor.reviewCount} {t.reviewsCount}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80">
                <div className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400">
                  {donor.readyForEmergency ? 'Yes' : 'Daytime'}
                </div>
                <div className="text-[10px] font-semibold text-slate-500">Emergency Call</div>
              </div>
            </div>
          </div>

        </div>

        {/* PROMINENT COUNTDOWN SYSTEM (Requested feature) */}
        <div className="my-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-rose-50 via-white to-red-50/50 dark:from-slate-800/90 dark:via-slate-900 dark:to-slate-800 border border-rose-200 dark:border-slate-700 shadow-sm">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-600 text-white shadow-xs">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  {t.countdownTitle}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {language === 'bn' ? 'বিশ্ব স্বাস্থ্য সংস্থা (WHO) স্বীকৃত ৯০ দিনের সুরক্ষা সময়রেখা' : 'WHO 90-Day Safe Biological Recovery Protocol'}
                </span>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              isEligible
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            }`}>
              {isEligible ? t.eligibleToDonate : `${daysRemaining} ${language === 'bn' ? 'দিন বাকি' : 'days left'}`}
            </span>
          </div>

          {/* Large Countdown Numbers */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 my-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {daysAgo}
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                {t.daysSinceLastDonation}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {donor.lastDonationDate}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <div className={`text-2xl sm:text-4xl font-black ${isEligible ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {isEligible ? '0' : daysRemaining}
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                {isEligible ? (language === 'bn' ? 'আজই রক্তদান সম্ভব' : 'Eligible Today') : t.daysUntilEligible}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {isEligible ? '100% Ready' : 'Cellular Restoration'}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 my-3">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-300">{t.recoveryStage}</span>
              <span className="text-rose-600 dark:text-rose-400">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isEligible 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                    : 'bg-gradient-to-r from-rose-500 to-amber-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Biological Stages Breakdown */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{t.plasmaRegeneration}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className={`w-3.5 h-3.5 ${daysAgo >= 30 ? 'text-emerald-500' : 'text-slate-400'} shrink-0`} />
              <span>{t.rbcReplenishment}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className={`w-3.5 h-3.5 ${isEligible ? 'text-emerald-500' : 'text-slate-400'} shrink-0`} />
              <span>{t.ironReplenishment}</span>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 italic">
            {isEligible ? t.eligibleNowNotice : t.safeIntervalNotice}
          </p>

        </div>

        {/* Reviews & Reliability Feedback */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
              {language === 'bn' ? 'রোগী ও পরিবারদের প্রতিক্রিয়া' : 'Recipient Reviews & Feedback'}
            </h4>
            <button
              onClick={() => onRateDonor(donor)}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
            >
              + {t.rateDonor}
            </button>
          </div>

          {donor.reviews && donor.reviews.length > 0 ? (
            <div className="space-y-2.5">
              {donor.reviews.map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{rev.reviewerName}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic">
                    "{rev.comment}"
                  </p>
                  {rev.hospitalName && (
                    <div className="text-[10px] text-slate-400 mt-1">
                      {rev.hospitalName} • {rev.date}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              {language === 'bn' ? 'এখনো কোনো লিখিত রিভিউ নেই।' : 'No verified reviews written yet.'}
            </p>
          )}
        </div>

        {/* Action Contact Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <a
            href={`tel:${donor.phone}`}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span>{t.callDirect}</span>
          </a>

          <a
            href={`https://wa.me/${donor.whatsapp || donor.phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{t.whatsappDirect}</span>
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenChat(donor);
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.chatDirect}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
