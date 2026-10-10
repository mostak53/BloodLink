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
    <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-inner border-y border-red-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 text-xs sm:text-sm font-black tracking-wide shrink-0 uppercase">
            <span className="flex h-2.5 w-2.5 rounded-full bg-white animate-ping" />
            <AlertTriangle className="w-4 h-4 text-amber-200" />
            <span className="text-amber-100">{t.urgentAlertTickerTitle}:</span>
          </div>

          {/* Marquee/Feed */}
          <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-4 text-xs sm:text-sm font-medium">
            {emergencyRequests.slice(0, 3).map((req) => (
              <div 
                key={req.id}
                onClick={() => onSelectRequest(req)}
                className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full cursor-pointer transition-colors whitespace-nowrap shrink-0 border border-white/10 group"
              >
                <span className="px-1.5 py-0.5 rounded-md bg-white text-rose-700 font-extrabold text-xs">
                  {req.bloodType}
                </span>
                <span className="font-semibold text-white/95">
                  {req.unitsNeeded} {t.bags}
                </span>
                <span className="opacity-80 flex items-center gap-1 text-[11px] sm:text-xs">
                  <Hospital className="w-3 h-3" />
                  {req.hospitalName.split('(')[0].trim()}
                </span>
                <span className="text-amber-200 text-[11px] flex items-center gap-1 font-bold">
                  <Clock className="w-3 h-3" />
                  {req.requiredByTime || req.requiredByDate}
                </span>
                <ArrowRight className="w-3 h-3 text-white/70 group-hover:translate-x-0.5 transition-transform" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
