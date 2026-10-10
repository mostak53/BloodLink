import React from 'react';
import { Droplet, PhoneCall, ShieldAlert, Heart, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onNavigateTab: (tab: 'home' | 'donors' | 'requests' | 'ai' | 'profile') => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigateTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency Hotlines Banner */}
        <div className="bg-rose-950/60 border border-rose-900/60 rounded-3xl p-5 sm:p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-md">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-white">
                {language === 'bn' ? 'জরুরি রক্ত সন্ধান ও জাতীয় হেল্পলাইন' : 'National Emergency & Blood Bank Hotlines'}
              </h4>
              <p className="text-xs text-rose-200 mt-0.5">
                {language === 'bn' ? 'জাতীয় জরুরি সেবা ৯৯৯ এবং কেন্দ্রীয় রেড ক্রিসেন্ট ব্লাড ব্যাংক' : 'National Police/Ambulance 999 & Red Crescent Blood Center'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href="tel:999"
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-xs"
            >
              Emergency: 999
            </a>
            <a
              href="tel:+88029330188"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700"
            >
              Red Crescent: +880-2-9330188
            </a>
            <a
              href="tel:+8801714010869"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700"
            >
              Quantum: +8801714010869
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-xs sm:text-sm">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black">
                <Droplet className="w-4 h-4 fill-white text-white" />
              </div>
              <span className="text-xl font-black text-white">
                Blood<span className="text-rose-500">link</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              {language === 'bn'
                ? 'ব্লাডলিংক একটি মানবিক উন্মুক্ত প্ল্যাটফর্ম যা কোনো মধ্যস্বত্বভোগী ছাড়াই জরুরি মুমূর্ষু রোগী এবং রক্তদাতাদের সরাসরি যুক্ত করে। আমরা প্রতিটি জীবনের মূল্য বুঝি।'
                : 'Bloodlink is a voluntary humanitarian platform connecting emergency patients directly with blood donors without middlemen. Real-time alerts, direct call & chat.'}
            </p>
          </div>

          <div>
            <h5 className="font-black text-white uppercase tracking-wider text-xs mb-3">
              {language === 'bn' ? 'ন্যাভিগেশন' : 'Quick Links'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-rose-400 transition-colors">
                  {language === 'bn' ? 'হোম পেইজ' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('donors')} className="hover:text-rose-400 transition-colors">
                  {language === 'bn' ? 'রক্তদাতা তালিকা' : 'Find Donors'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('requests')} className="hover:text-rose-400 transition-colors">
                  {language === 'bn' ? 'জরুরি রক্তের আবেদন' : 'Emergency Requests'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('ai')} className="hover:text-rose-400 transition-colors">
                  {language === 'bn' ? 'এআই ক্লিনিক্যাল সহায়তা' : 'AI Clinical Assistant'}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-white uppercase tracking-wider text-xs mb-3">
              {language === 'bn' ? 'সুরক্ষা ও নিয়মাবলী' : 'Safety & Compliance'}
            </h5>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  {language === 'bn' 
                    ? 'রক্তদানের পূর্বে হাসপাতালে রক্তের স্ক্রিনিং ও ক্রস-ম্যাচিং বাধ্যতামূলক।'
                    : 'Mandatory clinical screening & cross-matching must be performed prior to transfusion.'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                100% Free & Open Source Voluntary Humanitarian Initiative.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bloodlink. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for saving human lives.
          </p>
        </div>

      </div>
    </footer>
  );
};
