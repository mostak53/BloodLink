import React, { useState } from 'react';
import { X, AlertTriangle, Hospital, MapPin, Phone, User, Clock, CheckCircle2 } from 'lucide-react';
import { BloodGroup, Language, RequestUrgency, BloodRequest } from '../types';
import { translations } from '../translations';
import { BANGLADESH_LOCATIONS } from '../data/mockData';

interface EmergencyRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSubmitRequest: (newRequest: BloodRequest) => void;
}

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const EmergencyRequestModal: React.FC<EmergencyRequestModalProps> = ({
  isOpen,
  onClose,
  language,
  onSubmitRequest,
}) => {
  const t = translations[language];

  const [requestType, setRequestType] = useState<RequestUrgency>('emergency');
  const [bloodType, setBloodType] = useState<BloodGroup>('O+');
  const [unitsNeeded, setUnitsNeeded] = useState<number>(1);
  const [patientName, setPatientName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [subArea, setSubArea] = useState('');
  const [requiredByDate, setRequiredByDate] = useState('2026-10-07');
  const [requiredByTime, setRequiredByTime] = useState('Within 3-4 Hours (Urgent)');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentDistricts = BANGLADESH_LOCATIONS.find(l => l.division === division)?.districts || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !hospitalName.trim() || !contactPhone.trim()) return;

    const newReq: BloodRequest = {
      id: `req-${Date.now()}`,
      patientName,
      bloodType,
      unitsNeeded: Number(unitsNeeded) || 1,
      hospitalName,
      division,
      district,
      area: subArea || 'Dhaka Central',
      subArea: subArea || 'Hospital Medical Ward',
      requestType,
      requiredByDate,
      requiredByTime,
      contactPerson: contactPerson || 'Patient Attendant',
      contactPhone,
      reason: reason || 'Urgent clinical blood transfusion required.',
      status: 'open',
      createdAt: new Date().toISOString(),
      responsesCount: 0,
      verifiedHospital: true,
    };

    onSubmitRequest(newReq);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

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

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {language === 'bn' ? 'আবেদন সম্প্রচারিত হয়েছে!' : 'Broadcast Successful!'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              {t.requestPostedSuccess}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs font-bold mb-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'রোগীর জরুরি রিকুইজিশন' : 'Emergency Hospital Requisition'}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {t.modalRequestTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t.modalRequestSubtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Request Type Toggle (Emergency vs Upcoming Operation) */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {language === 'bn' ? 'আবেদনের ধরণ' : 'Request Urgency'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRequestType('emergency')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      requestType === 'emergency'
                        ? 'border-red-500 bg-red-50/80 dark:bg-red-950/50 text-red-700 dark:text-red-300 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 hover:border-red-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping mt-1 shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold">{t.requestTypeEmergency}</div>
                      <div className="text-[11px] opacity-75 mt-0.5">{language === 'bn' ? 'তাৎক্ষণিক দুর্ঘটনা, সার্জারি বা রক্তক্ষরণ' : 'Severe trauma, ICU or childbirth'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequestType('upcoming_operation')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      requestType === 'upcoming_operation'
                        ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold">{t.requestTypeUpcoming}</div>
                      <div className="text-[11px] opacity-75 mt-0.5">{language === 'bn' ? 'আগামীকাল বা নির্ধারিত তারিখে অপারেশন' : 'Planned bypass, routine surgery'}</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Blood Group and Units */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.bloodType} *
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                    {BLOOD_GROUPS.map((bg) => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setBloodType(bg)}
                        className={`py-2 rounded-xl text-xs sm:text-sm font-black border transition-all ${
                          bloodType === bg
                            ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.unitsNeeded} ({t.bags}) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={unitsNeeded}
                    onChange={(e) => setUnitsNeeded(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200"
                    required
                  />
                </div>
              </div>

              {/* Patient Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  {t.patientFullName} *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Rasheda Begum (Age 42)"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                    required
                  />
                </div>
              </div>

              {/* Hospital Name & Sub Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.hospitalNameInput} *
                  </label>
                  <div className="relative">
                    <Hospital className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      placeholder="e.g. Dhaka Medical College, Ward 4"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.subArea} (Locality) *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={subArea}
                      onChange={(e) => setSubArea(e.target.value)}
                      placeholder="e.g. Dhanmondi 27 / Shahbagh"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Division & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.division}
                  </label>
                  <select
                    value={division}
                    onChange={(e) => {
                      setDivision(e.target.value);
                      setDistrict(BANGLADESH_LOCATIONS.find(l => l.division === e.target.value)?.districts[0]?.name || '');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  >
                    {BANGLADESH_LOCATIONS.map(l => (
                      <option key={l.division} value={l.division}>{l.division}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.district}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  >
                    {currentDistricts.map(d => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Required Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {language === 'bn' ? 'প্রয়োজনীয় তারিখ' : 'Required Date'}
                  </label>
                  <input
                    type="date"
                    value={requiredByDate}
                    onChange={(e) => setRequiredByDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {language === 'bn' ? 'প্রয়োজনীয় সময়' : 'Required Time / Slot'}
                  </label>
                  <input
                    type="text"
                    value={requiredByTime}
                    onChange={(e) => setRequiredByTime(e.target.value)}
                    placeholder="e.g. Within 2 hours / 3:00 PM"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              {/* Contact Person and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.contactPerson}
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Md. Shafi (Brother)"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.contactNumber} *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+8801712345678"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Medical Reason */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  {t.reasonForBlood}
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Cesarean delivery emergency, severe bleeding, cross-matching ready..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                {t.submitRequestBtn}
              </button>

            </form>
          </>
        )}

      </div>
    </div>
  );
};
