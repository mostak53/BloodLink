import React, { useState } from 'react';
import { 
  Droplet, 
  Search, 
  AlertCircle, 
  Sparkles, 
  Bell, 
  Sun, 
  Moon, 
  Languages, 
  User, 
  PlusCircle,
  Menu,
  X,
  HeartHandshake,
  PhoneCall,
  ChevronRight
} from 'lucide-react';
import { Language, Theme, Donor, NotificationItem } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  currentTab: 'home' | 'donors' | 'requests' | 'ai' | 'profile';
  setCurrentTab: (tab: 'home' | 'donors' | 'requests' | 'ai' | 'profile') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  currentUser: Donor | null;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenNewRequest: () => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  theme,
  toggleTheme,
  currentUser,
  onOpenLogin,
  onOpenRegister,
  onOpenNewRequest,
  notifications,
  onOpenNotifications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNav = (tab: 'home' | 'donors' | 'requests' | 'ai' | 'profile') => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-rose-100 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 shadow-md shadow-rose-500/25 group-hover:scale-105 transition-transform shrink-0">
              <Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Blood<span className="text-rose-600 dark:text-rose-500">link</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300">
                  Live
                </span>
              </div>
              <p className="hidden md:block text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5">
                {language === 'bn' ? 'রক্তদাতা ও রোগীর সরাসরি সংযোগ' : 'Direct Donor-Patient Network'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'home'
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              {t.navHome}
            </button>

            <button
              onClick={() => handleNav('donors')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'donors'
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-4 h-4" />
              {t.navFindDonors}
            </button>

            <button
              onClick={() => handleNav('requests')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all relative ${
                currentTab === 'requests'
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <AlertCircle className="w-4 h-4 text-rose-500" />
              {t.navUrgentRequests}
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute top-2 right-1.5" />
            </button>

            {/* AI Assist Navigation Button */}
            <button
              onClick={() => handleNav('ai')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'ai'
                  ? 'bg-gradient-to-r from-violet-600/10 to-rose-600/10 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-900 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-950/20'
              }`}
            >
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span>{t.navAiAssist}</span>
              <span className="text-[10px] bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 px-1 rounded font-bold">
                AI
              </span>
            </button>
          </nav>

          {/* Action Tools & Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* Language Switcher Button (English / বাংলা) */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-800 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
              title="Switch Language / ভাষা পরিবর্তন করুন"
              aria-label="Toggle language between English and Bangla"
            >
              <Languages className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 transition-colors shadow-2xs"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-1.5 sm:p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 transition-colors shadow-2xs"
              title="Urgent Blood Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 text-rose-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-rose-600 rounded-full animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Request Blood CTA (Desktop) */}
            <button
              onClick={onOpenNewRequest}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-md shadow-rose-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.requestBloodCta}</span>
            </button>

            {/* Donor Profile or Register/Login (Desktop) */}
            {currentUser ? (
              <button
                onClick={() => handleNav('profile')}
                className={`hidden md:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border transition-all ${
                  currentTab === 'profile'
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:border-rose-300 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">
                  {currentUser.bloodType}
                </div>
                <span className="text-xs sm:text-sm font-semibold max-w-[80px] sm:max-w-[110px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenRegister}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <HeartHandshake className="w-4 h-4 text-rose-500" />
                <span>{t.navRegisterDonor}</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle (Visible on screens < lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 shrink-0 transition-colors"
              aria-label="Toggle navigation menu"
              title="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Full mobile navigation view) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-2xl max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          
          {/* Navigation Links */}
          <div className="space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-colors ${
                currentTab === 'home' 
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900' 
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Droplet className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>{t.navHome}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('donors')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-colors ${
                currentTab === 'donors' 
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900' 
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-rose-500" />
                <span>{t.navFindDonors}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('requests')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-colors ${
                currentTab === 'requests' 
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900' 
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>{t.navUrgentRequests}</span>
              </div>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </span>
            </button>

            <button
              onClick={() => handleNav('ai')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-colors ${
                currentTab === 'ai' 
                  ? 'bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400 border border-violet-200 dark:border-violet-900' 
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-violet-500" />
                <span>{t.navAiAssist}</span>
              </div>
              <span className="text-[10px] bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded font-black">
                Gemini AI
              </span>
            </button>

            {/* Profile or Register Link */}
            {currentUser ? (
              <button
                onClick={() => handleNav('profile')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-colors ${
                  currentTab === 'profile' 
                    ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900' 
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-black">
                    {currentUser.bloodType}
                  </div>
                  <span>{t.navMyProfile} ({currentUser.name})</span>
                </div>
                <span className="text-xs font-semibold text-rose-500">View</span>
              </button>
            ) : (
              <button
                onClick={() => { onOpenRegister(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HeartHandshake className="w-4 h-4 text-rose-500" />
                  <span>{t.navRegisterDonor}</span>
                </div>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">Join</span>
              </button>
            )}
          </div>

          {/* Quick Action CTA */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => { onOpenNewRequest(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-black text-white bg-gradient-to-r from-rose-600 to-red-600 shadow-md shadow-rose-600/25 active:scale-98 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.requestBloodCta}</span>
            </button>

            {/* National Emergency Hotline */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:999"
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-center"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>{language === 'bn' ? 'জাতীয় জরুরি: ৯৯৯' : 'Emergency: 999'}</span>
              </a>
              <a
                href="tel:10655"
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-center"
              >
                <PhoneCall className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{language === 'bn' ? 'রেড ক্রিসেন্ট: ১০৬৫৫' : 'Red Crescent: 10655'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
