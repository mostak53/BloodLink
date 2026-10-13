import React from 'react';
import { AlertTriangle, Clock, ArrowRight, Hospital } from 'lucide-react';
import { BloodRequest, Language } from '../types';
import { translations } from '../translations';

interface UrgentAlertTickerProps {
  requests: BloodRequest[];
  language: Language;
  onSelectRequest: (req: BloodRequest) => void;
}

export const UrgentAlertTicker: React.FC<UrgentAlertTickerProps> = ({
  requests,
  language,
  onSelectRequest,
}) => {
  const t = translations[language];
  const emergencyRequests = requests.filter(r => r.requestType === 'emergency' && r.status === 'open');

  if (emergencyRequests.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-inner border-y border-red-700/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 min-w-0">
          
          <div className="flex items-center gap-2 text-xs sm:text-sm font-black tracking-wide shrink-0 uppercase select-none">
            <span className="flex h-2.5 w-2.5 rounded-full bg-white animate-ping shrink-0" />
            <AlertTriangle className="w-4 h-4 text-amber-200 shrink-0" />
            <span className="text-amber-100 whitespace-nowrap">{t.urgentAlertTickerTitle}:</span>
          </div>

          {/* Marquee/Feed strictly contained horizontally */}
          <div className="w-full min-w-0 overflow-x-auto no-scrollbar flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium py-0.5 scroll-smooth touch-pan-x">
            {emergencyRequests.map((req) => (
              <div 
                key={req.id}
                onClick={() => onSelectRequest(req)}
                className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/30 active:bg-black/40 backdrop-blur-xs px-3 py-1.5 sm:py-1 rounded-full cursor-pointer transition-all whitespace-nowrap shrink-0 border border-white/10 group select-none hover:scale-[1.01]"
              >
                <span className="px-1.5 py-0.5 rounded-md bg-white text-rose-700 font-extrabold text-xs shadow-2xs">
                  {req.bloodType}
                </span>
                <span className="font-semibold text-white/95">
                  {req.unitsNeeded} {t.bags}
                </span>
                <span className="opacity-85 flex items-center gap-1 text-[11px] sm:text-xs">
                  <Hospital className="w-3 h-3 shrink-0 text-white/80" />
                  <span className="truncate max-w-[140px] sm:max-w-[200px]">
                    {req.hospitalName.split('(')[0].trim()}
                  </span>
                </span>
                <span className="text-amber-200 text-[11px] flex items-center gap-1 font-bold">
                  <Clock className="w-3 h-3 shrink-0" />
                  {req.requiredByTime || req.requiredByDate}
                </span>
                <ArrowRight className="w-3 h-3 text-white/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
