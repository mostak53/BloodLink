import React, { useState } from 'react';
import { X, Heart, ShieldCheck, MapPin, Phone, Mail, Calendar, CheckCircle2 } from 'lucide-react';
import { Donor, BloodGroup, AvailabilityStatus, Language } from '../types';
import { translations } from '../translations';
import { BANGLADESH_LOCATIONS } from '../data/mockData';

interface DonorRegisterLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSaveUser: (donor: Donor) => void;
}

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const DonorRegisterLoginModal: React.FC<DonorRegisterLoginModalProps> = ({
  isOpen,
  onClose,
  language,
  onSaveUser,
}) => {
  const t = translations[language];

  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bloodType, setBloodType] = useState<BloodGroup>('O+');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [subArea, setSubArea] = useState('');
  const [availability, setAvailability] = useState<AvailabilityStatus>('available');
  const [lastDonationDate, setLastDonationDate] = useState('2026-06-15');
  const [neverDonated, setNeverDonated] = useState(false);
  const [readyForEmergency, setReadyForEmergency] = useState(true);

  if (!isOpen) return null;

  const currentDistricts = BANGLADESH_LOCATIONS.find(l => l.division === division)?.districts || [];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newDonor: Donor = {
      id: `donor-${Date.now()}`,
      name,
      phone,
      whatsapp: phone.replace(/[^0-9]/g, ''),
      email: email || `${phone.replace(/[^0-9]/g, '')}@bloodlink.org`,
      bloodType,
      division,
      district,
      area: subArea.split('(')[0].trim() || 'Central',
      subArea: subArea || 'Downtown',
      availability,
      lastDonationDate: neverDonated ? '2024-01-01' : lastDonationDate,
      totalDonations: neverDonated ? 0 : 3,
      rating: 5.0,
      reviewCount: 1,
      verified: true,
      heroBadge: false,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80`,
      bio: 'Registered volunteer blood donor on Bloodlink.',
      readyForEmergency,
      age: 26,
      gender: 'Male',
      reviews: [
        {
          id: `rev-${Date.now()}`,
          donorId: `donor-${Date.now()}`,
          reviewerName: 'Bloodlink Verification Team',
          rating: 5,
          date: '2026-10-07',
          comment: 'Identity and phone number verified successfully. Welcome to Bloodlink!',
          bloodTypeProvided: bloodType,
        }
      ]
    };

    onSaveUser(newDonor);
    onClose();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate instant login with sample donor or saved user
    const existingDonor: Donor = {
      id: 'donor-1',
      name: name || 'Tanzid Ahmed',
      phone: phone || '+8801711234567',
      whatsapp: '8801711234567',
      email: email || 'tanzid.donor@example.com',
      bloodType: bloodType || 'O+',
      division: 'Dhaka',
      district: 'Dhaka City',
      area: 'Dhanmondi',
      subArea: 'Dhanmondi (Road 27 / Rangs Nasim)',
      availability: 'available',
      lastDonationDate: '2026-06-10',
      totalDonations: 8,
      rating: 4.95,
      reviewCount: 14,
      verified: true,
      heroBadge: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Voluntary blood donor for 4 years. Ready for critical and thalassemia emergencies.',
      readyForEmergency: true,
      age: 27,
      gender: 'Male'
    };

    onSaveUser(existingDonor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-slate-800 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch (Register vs Login) */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 max-w-xs mx-auto">
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'register'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.navRegisterDonor}
          </button>
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'login'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.navLogin}
          </button>
        </div>

        {mode === 'register' ? (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold mb-2">
                <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                <span>{language === 'bn' ? 'রক্তদাতা অ্যাকাউন্ট তৈরি' : 'Save Lives In Your Neighborhood'}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {t.registerTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t.registerSubtitle}
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  {t.fullName} *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tanzid Ahmed"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  required
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.phoneNumber} *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+8801711234567"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.emailAddress}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="donor@example.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Blood Type Picker */}
              <div>
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

              {/* Division & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
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
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  >
                    {currentDistricts.map(d => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sub-Area / Specific Locality */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  {t.subArea} (Area, Road, Thana) *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={subArea}
                    onChange={(e) => setSubArea(e.target.value)}
                    placeholder="e.g. Dhanmondi Road 27 / Rangs Nasim"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                    required
                  />
                </div>
              </div>

              {/* Last Donation Date (Countdown Basis) */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-rose-500" />
                    <span>{t.lastDonationDateLabel}</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={neverDonated}
                      onChange={(e) => setNeverDonated(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500 w-3.5 h-3.5"
                    />
                    <span>{t.neverDonatedBefore}</span>
                  </label>
                </div>

                {!neverDonated && (
                  <input
                    type="date"
                    value={lastDonationDate}
                    onChange={(e) => setLastDonationDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  />
                )}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  {language === 'bn' 
                    ? 'এই তারিখের ওপর ভিত্তি করে আপনার প্রোফাইলে পরবর্তী রক্তদানের দিন গণনার লাইভ কাউন্টডাউন দেখানো হবে।'
                    : 'This date powers the live countdown system on your profile and calculates WHO-recommended safe intervals.'}
                </p>
              </div>

              {/* Availability Status */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  {t.filterByStatus}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAvailability('available')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      availability === 'available'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {t.availableNow}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvailability('busy')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      availability === 'busy'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {t.busy}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvailability('donated_recently')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      availability === 'donated_recently'
                        ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {t.donatedRecently}
                  </button>
                </div>
              </div>

              {/* Ready for emergency toggle */}
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300 pt-1">
                <input
                  type="checkbox"
                  checked={readyForEmergency}
                  onChange={(e) => setReadyForEmergency(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span>{t.readyForEmergencyToggle}</span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] mt-4"
              >
                {t.createAccountBtn}
              </button>

            </form>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {t.loginTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t.loginSubtitle}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  {t.phoneNumber} / {t.emailAddress}
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+8801711234567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-md transition-all active:scale-[0.99]"
              >
                {t.loginBtn}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  {t.switchRegister}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
