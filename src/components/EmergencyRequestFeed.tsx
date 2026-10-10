import React, { useState } from 'react';
import { 
  AlertCircle, 
  Clock, 
  Hospital, 
  MapPin, 
  Phone, 
  PlusCircle, 
  CheckCircle2, 
  User, 
  Share2,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { BloodRequest, BloodGroup, Language, RequestUrgency } from '../types';
import { translations } from '../translations';

interface EmergencyRequestFeedProps {
  requests: BloodRequest[];
  language: Language;
  onOpenNewRequest: () => void;
  onRespondToRequest: (req: BloodRequest) => void;
  onOpenDirectChatWithPatient: (req: BloodRequest) => void;
}

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const EmergencyRequestFeed: React.FC<EmergencyRequestFeedProps> = ({
  requests,
  language,
  onOpenNewRequest,
  onRespondToRequest,
  onOpenDirectChatWithPatient,
}) => {
  const t = translations[language];

  const [urgencyFilter, setUrgencyFilter] = useState<'all' | RequestUrgency>('all');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup | ''>('');
  const [respondedMap, setRespondedMap] = useState<Record<string, boolean>>({});

  const filteredRequests = requests.filter((r) => {
    if (urgencyFilter !== 'all' && r.requestType !== urgencyFilter) return false;
    if (selectedBloodGroup && r.bloodType !== selectedBloodGroup) return false;
    return true;
  });

  const handleRespond = (req: BloodRequest) => {
    setRespondedMap(prev => ({ ...prev, [req.id]: true }));
    onRespondToRequest(req);
  };

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>{language === 'bn' ? 'সরাসরি রোগীর রক্তের চাহিদা' : 'Real-Time Hospital Feed'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.urgentFeedTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t.urgentFeedSubtitle}
            </p>
          </div>

          <button
            onClick={onOpenNewRequest}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs sm:text-sm shadow-md shadow-rose-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.postRequestBtn}</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 rounded-2xl mb-6 border border-slate-200 dark:border-slate-800">
          
          {/* Urgency Type Tabs */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setUrgencyFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                urgencyFilter === 'all'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {t.filterAllRequests}
            </button>
            <button
              onClick={() => setUrgencyFilter('emergency')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                urgencyFilter === 'emergency'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              {t.filterEmergencyOnly}
            </button>
            <button
              onClick={() => setUrgencyFilter('upcoming_operation')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                urgencyFilter === 'upcoming_operation'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40'
              }`}
            >
              {t.filterUpcomingOps}
            </button>
          </div>

          {/* Blood Group Fast Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">
              {t.bloodType}:
            </span>
            <button
              onClick={() => setSelectedBloodGroup('')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                selectedBloodGroup === ''
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-transparent'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              All
            </button>
            {BLOOD_GROUPS.map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedBloodGroup(bg)}
                className={`px-2 py-1 rounded-lg text-xs font-black border transition-colors ${
                  selectedBloodGroup === bg
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>

        </div>

        {/* Requests Cards List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredRequests.map((req) => {
            const isEmergency = req.requestType === 'emergency';
            const hasResponded = respondedMap[req.id];

            return (
              <div 
                key={req.id}
                className={`rounded-3xl p-5 sm:p-6 border transition-all ${
                  isEmergency
                    ? 'bg-gradient-to-br from-red-50/70 via-white to-rose-50/50 dark:from-red-950/30 dark:via-slate-900 dark:to-rose-950/20 border-red-200 dark:border-red-900/60 shadow-md shadow-red-500/5'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 text-white shadow-md shadow-rose-600/30">
                      <span className="text-xl font-black leading-none">{req.bloodType}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 opacity-90">{req.unitsNeeded} {t.bags}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide flex items-center gap-1 ${
                          isEmergency
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900'
                        }`}>
                          {isEmergency ? (
                            <>
                              <Clock className="w-3 h-3" />
                              <span>{language === 'bn' ? 'জরুরি প্রয়োজন (< ৪ ঘণ্টা)' : 'Emergency Need (< 4h)'}</span>
                            </>
                          ) : (
                            <>
                              <Calendar className="w-3 h-3" />
                              <span>{language === 'bn' ? 'পরিকল্পিত অপারেশন' : 'Planned Surgery'}</span>
                            </>
                          )}
                        </span>

                        {req.verifiedHospital && (
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                            ✓ {t.verifiedHospitalTag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                        {req.patientName}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    {req.responsesCount + (hasResponded ? 1 : 0)} {t.responsesSoFar}
                  </span>
                </div>

                {/* Reason description */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium mb-4 bg-white/80 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-rose-600 dark:text-rose-400">{t.reasonForBlood}: </span>
                  {req.reason}
                </p>

                {/* Hospital and Time Details */}
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 mb-5">
                  <div className="flex items-center gap-2">
                    <Hospital className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{req.hospitalName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{req.subArea || req.area}, {req.district}</span>
                  </div>

                  <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-300">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{t.requiredBy}: {req.requiredByTime || req.requiredByDate}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{t.contactPerson}: {req.contactPerson}</span>
                  </div>
                </div>

                {/* Actions: Call, WhatsApp, In-App Chat & "I Can Donate" */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  
                  {/* Respond Button */}
                  <button
                    onClick={() => handleRespond(req)}
                    disabled={hasResponded}
                    className={`flex-1 min-w-[130px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-xs ${
                      hasResponded
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95'
                    }`}
                  >
                    {hasResponded ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{language === 'bn' ? 'সাড়া দেওয়া হয়েছে' : 'Responded!'}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        <span>{t.iCanDonate}</span>
                      </>
                    )}
                  </button>

                  {/* Direct Phone Call */}
                  <a
                    href={`tel:${req.contactPhone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white font-bold text-xs sm:text-sm transition-transform active:scale-95 shadow-xs"
                    title={`Call ${req.contactPhone}`}
                  >
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.callDirect}</span>
                  </a>

                  {/* Chat with Patient */}
                  <button
                    onClick={() => onOpenDirectChatWithPatient(req)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 font-bold text-xs sm:text-sm transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.chatDirect}</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
