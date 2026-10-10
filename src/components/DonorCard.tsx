import React from 'react';
import { 
  Phone, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Donor, Language } from '../types';
import { translations } from '../translations';
import { ImageWithFallback } from './ImageWithFallback';

interface DonorCardProps {
  donor: Donor;
  language: Language;
  onOpenChat: (donor: Donor) => void;
  onViewProfile: (donor: Donor) => void;
  onRateDonor: (donor: Donor) => void;
}

export const DonorCard: React.FC<DonorCardProps> = ({
  donor,
  language,
  onOpenChat,
  onViewProfile,
  onRateDonor,
}) => {
  const t = translations[language];

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

  const whatsappMessage = encodeURIComponent(
    language === 'bn'
      ? `আসসালামু আলাইকুম ${donor.name}, আমি ব্লাডলিংক (Bloodlink) থেকে যোগাযোগ করছি। আপনার রক্তের গ্রুপ ${donor.bloodType} এর জন্য কি এই মুহূর্তে কথা বলা সম্ভব?`
      : `Hello ${donor.name}, I found your profile on Bloodlink for ${donor.bloodType} blood donation. Are you available for a quick inquiry?`
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-rose-300 dark:hover:border-rose-900 transition-all flex flex-col justify-between group">
      
      <div>
        {/* Top Header: Avatar, Blood Group & Availability */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ImageWithFallback
                src={donor.avatarUrl}
                alt={donor.name}
                fallbackInitials={donor.name.slice(0, 2).toUpperCase()}
                bloodType={donor.bloodType}
                className="w-14 h-14 rounded-2xl shadow-inner"
              />
              {/* Availability live status dot */}
              <span 
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
                  donor.availability === 'available'
                    ? 'bg-emerald-500 ring-2 ring-emerald-500/20'
                    : donor.availability === 'busy'
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
                title={
                  donor.availability === 'available'
                    ? t.availableNow
                    : donor.availability === 'busy'
                    ? t.busy
                    : t.donatedRecently
                }
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-black text-slate-900 dark:text-white text-base leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {donor.name}
                </h3>

                {/* Verified Donor Badge calculated from >= 3 successful donations */}
                {donor.totalDonations >= 3 ? (
                  <span 
                    title={language === 'bn' ? 'যাচাইকৃত রক্তদাতা (৩+ সফল রক্তদান সম্পন্ন)' : 'Verified Donor: Completed at least 3 successful donations'} 
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-300 text-[10px] font-black shadow-2xs"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 fill-sky-500 text-white shrink-0" />
                    <span>{language === 'bn' ? 'যাচাইকৃত' : 'Verified'}</span>
                  </span>
                ) : (
                  <span 
                    title={language === 'bn' ? `যাচাইকৃত ব্যাজের জন্য আরও ${3 - donor.totalDonations}টি রক্তদান প্রয়োজন` : `Requires ${3 - donor.totalDonations} more donation(s) for Verified status`}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-semibold"
                  >
                    <span>{donor.totalDonations}/3</span>
                  </span>
                )}

                {donor.totalDonations >= 5 && (
                  <span 
                    title={t.heroDonor} 
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-[10px] font-black"
                  >
                    <Award className="w-3 h-3 text-amber-500" />
                    <span>5+ Hero</span>
                  </span>
                )}
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{donor.rating.toFixed(1)}</span>
                </div>
                <span>•</span>
                <button 
                  onClick={() => onRateDonor(donor)}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors underline-offset-2 hover:underline"
                >
                  {donor.reviewCount} {t.reviewsCount}
                </button>
                <span>•</span>
                <span className="font-medium">{donor.totalDonations} {t.donationsCount}</span>
              </div>
            </div>
          </div>

          {/* Prominent Blood Group Badge */}
          <div className="flex flex-col items-end">
            <span className="px-3 py-1.5 rounded-2xl bg-rose-600 text-white font-black text-base sm:text-lg shadow-sm shadow-rose-600/30">
              {donor.bloodType}
            </span>
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl mb-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{donor.district}, {donor.division}</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-5 truncate">
            {donor.subArea || donor.area}
          </div>
        </div>

        {/* Countdown Badge: Days Since Last Donation */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px]">
              <Calendar className="w-3 h-3 text-rose-500" />
              {t.lastDonated}:
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
              {daysAgo} {t.daysAgo}
            </span>
          </div>

          {/* Biological Safe Status Meter */}
          <div className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-between border ${
            isEligible
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
          }`}>
            <span className="flex items-center gap-1">
              {isEligible ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.eligibleToDonate}</span>
                </>
              ) : (
                <>
                  <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{t.restingCycle}: {daysRemaining} {language === 'bn' ? 'দিন বাকি' : 'days left'}</span>
                </>
              )}
            </span>
            <span className="text-[10px] opacity-75 font-mono">
              {Math.min(100, Math.round((daysAgo / 90) * 100))}%
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Direct Call, WhatsApp & Live In-App Chat */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-2 gap-2">
          {/* Direct Phone Call */}
          <a
            href={`tel:${donor.phone}`}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-bold shadow-xs transition-transform active:scale-95"
            title={`Direct Phone Call to ${donor.name}`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t.callDirect}</span>
          </a>

          {/* Direct WhatsApp Button */}
          <a
            href={`https://wa.me/${donor.whatsapp || donor.phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-transform active:scale-95"
            title="Chat via WhatsApp"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{t.whatsappDirect}</span>
          </a>
        </div>

        {/* Live In-App Chat & Profile View */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenChat(donor)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-xs font-bold border border-rose-200 dark:border-rose-900 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.chatDirect}</span>
          </button>

          <button
            type="button"
            onClick={() => onViewProfile(donor)}
            className="flex items-center justify-center py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            <span>{t.viewProfile}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
