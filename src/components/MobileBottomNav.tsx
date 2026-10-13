import React from 'react';
import { 
  Home, 
  Search, 
  PlusCircle, 
  AlertCircle, 
  Sparkles, 
  User 
} from 'lucide-react';
import { Language, Donor, NotificationItem } from '../types';
import { translations } from '../translations';

interface MobileBottomNavProps {
  currentTab: 'home' | 'donors' | 'requests' | 'ai' | 'profile';
  setCurrentTab: (tab: 'home' | 'donors' | 'requests' | 'ai' | 'profile') => void;
  language: Language;
  currentUser: Donor | null;
  onOpenNewRequest: () => void;
  onOpenRegister: () => void;
  urgentRequestsCount?: number;
  unreadNotificationsCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
  language,
  currentUser,
  onOpenNewRequest,
  onOpenRegister,
  urgentRequestsCount = 0,
}) => {
  const t = translations[language];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-rose-100 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden pb-[env(safe-area-inset-bottom,0px)] transition-colors"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-1">
        
        {/* 1. Home */}
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentTab === 'home'
              ? 'text-rose-600 dark:text-rose-500 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label={t.navHome}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {currentTab === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[64px]">
            {t.navHome}
          </span>
        </button>

        {/* 2. Find Donors */}
        <button
          onClick={() => setCurrentTab('donors')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentTab === 'donors'
              ? 'text-rose-600 dark:text-rose-500 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label={t.navFindDonors}
        >
          <div className="relative">
            <Search className="w-5 h-5" />
            {currentTab === 'donors' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[64px]">
            {language === 'bn' ? 'রক্তদাতা' : 'Donors'}
          </span>
        </button>

        {/* 3. Center Highlight: Post Emergency Request Button */}
        <div className="flex flex-col items-center justify-center -mt-5">
          <button
            onClick={onOpenNewRequest}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-lg shadow-rose-600/40 border-3 border-white dark:border-slate-900 active:scale-95 transition-transform"
            title={t.requestBloodCta}
            aria-label={t.requestBloodCta}
          >
            <PlusCircle className="w-6 h-6 animate-pulse" />
          </button>
          <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 mt-1 truncate max-w-[68px]">
            {language === 'bn' ? 'অনুরোধ' : 'Request'}
          </span>
        </div>

        {/* 4. Urgent Requests */}
        <button
          onClick={() => setCurrentTab('requests')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl relative transition-all ${
            currentTab === 'requests'
              ? 'text-rose-600 dark:text-rose-500 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label={t.navUrgentRequests}
        >
          <div className="relative">
            <AlertCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-600 rounded-full border border-white dark:border-slate-900 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-600 rounded-full border border-white dark:border-slate-900" />
            {currentTab === 'requests' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[64px]">
            {language === 'bn' ? 'জরুরি' : 'Urgent'}
          </span>
        </button>

        {/* 5. AI Assist or Profile */}
        <button
          onClick={() => setCurrentTab('ai')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentTab === 'ai'
              ? 'text-violet-600 dark:text-violet-400 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label={t.navAiAssist}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-violet-500" />
            {currentTab === 'ai' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-violet-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[64px]">
            {language === 'bn' ? 'এআই' : 'AI Assist'}
          </span>
        </button>

      </div>
    </nav>
  );
};
