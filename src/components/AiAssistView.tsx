import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  Droplet,
  HeartHandshake,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { BloodGroup, Language } from '../types';
import { translations } from '../translations';
import { askBloodlinkAi } from '../services/aiService';

interface AiAssistViewProps {
  language: Language;
}

interface MessageItem {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const BLOOD_COMPATIBILITY: Record<BloodGroup, { canDonateTo: BloodGroup[]; canReceiveFrom: BloodGroup[]; note: string }> = {
  'O-': {
    canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    canReceiveFrom: ['O-'],
    note: 'Universal Donor for red blood cells. Crucial for emergency trauma and newborns.',
  },
  'O+': {
    canDonateTo: ['A+', 'B+', 'AB+', 'O+'],
    canReceiveFrom: ['O+', 'O-'],
    note: 'Most common blood group. High demand across all surgical centers.',
  },
  'A-': {
    canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
    canReceiveFrom: ['A-', 'O-'],
    note: 'Rare negative factor. Vital for A- and AB- patients.',
  },
  'A+': {
    canDonateTo: ['A+', 'AB+'],
    canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
    note: 'Second most common group. High utilization in oncology and cardiac surgery.',
  },
  'B-': {
    canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
    canReceiveFrom: ['B-', 'O-'],
    note: 'Rare blood group in South Asia. Desperately needed in thalassemia wards.',
  },
  'B+': {
    canDonateTo: ['B+', 'AB+'],
    canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
    note: 'Very prevalent in Bangladesh & India. Highly needed for maternal emergencies.',
  },
  'AB-': {
    canDonateTo: ['AB+', 'AB-'],
    canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
    note: 'Rarest blood group in the general population (< 1%).',
  },
  'AB+': {
    canDonateTo: ['AB+'],
    canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    note: 'Universal Recipient for red blood cells, and Universal Donor for blood plasma.',
  },
};

export const AiAssistView: React.FC<AiAssistViewProps> = ({ language }) => {
  const t = translations[language];

  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O-');
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: language === 'bn'
        ? `স্বাগতম! আমি ব্লাডলিংক এআই (Bloodlink AI) সহকারী। রক্তদানের যোগ্যতা, রক্তের গ্রুপের সামঞ্জস্য বা জরুরি হাসপাতালে রোগী ব্যবস্থাপনার বিষয়ে যেকোনো প্রশ্ন জিজ্ঞাসা করুন।`
        : `Welcome! I am Bloodlink AI Clinical Advisor. Ask me anything about blood type compatibility, donor eligibility, transfusion preparation, or patient guidelines.`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (customPrompt?: string) => {
    const prompt = (customPrompt || inputText).trim();
    if (!prompt || loading) return;

    const userMsg: MessageItem = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const answer = await askBloodlinkAi(prompt, language);
      const aiMsg: MessageItem = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const compData = BLOOD_COMPATIBILITY[selectedGroup];

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-[85vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/80 border border-violet-200 dark:border-violet-900 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-bold shadow-2xs mb-3">
            <Sparkles className="w-4 h-4 text-violet-500 animate-spin" />
            <span>Powered by Gemini Clinical Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.aiAssistTitle}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.aiAssistSubtitle}
          </p>
        </div>

        {/* 1. Interactive Blood Compatibility Matrix */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Droplet className="w-5 h-5 text-rose-600 fill-rose-600" />
                <span>{t.compatibilityMatrixTitle}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {language === 'bn' ? 'যেকোনো রক্তের গ্রুপে ক্লিক করে সামঞ্জস্য পরীক্ষা করুন' : 'Click any blood group to inspect donor and recipient compatibility'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Selected:</span>
              <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-black text-base shadow-xs">
                {selectedGroup}
              </span>
            </div>
          </div>

          {/* Blood group selector pills */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6">
            {(Object.keys(BLOOD_COMPATIBILITY) as BloodGroup[]).map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedGroup(bg)}
                className={`py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all border ${
                  selectedGroup === bg
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20 scale-105'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>

          {/* Detailed Matrix Breakdown for selectedGroup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Can Donate To */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{selectedGroup} {t.canDonateTo}:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {compData.canDonateTo.map((target) => (
                  <span
                    key={target}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 font-black text-sm border border-emerald-200 dark:border-emerald-800 shadow-2xs"
                  >
                    {target}
                  </span>
                ))}
              </div>
              {selectedGroup === 'O-' && (
                <div className="mt-3 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-950 p-2 rounded-xl">
                  ★ Universal Red Blood Cell Donor (সার্বজনীন দাতা)
                </div>
              )}
            </div>

            {/* Can Receive From */}
            <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-800 dark:text-blue-300 mb-3">
                <HeartHandshake className="w-4 h-4 text-blue-600" />
                <span>{selectedGroup} {t.canReceiveFrom}:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {compData.canReceiveFrom.map((src) => (
                  <span
                    key={src}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 font-black text-sm border border-blue-200 dark:border-blue-800 shadow-2xs"
                  >
                    {src}
                  </span>
                ))}
              </div>
              {selectedGroup === 'AB+' && (
                <div className="mt-3 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100/60 dark:bg-blue-950 p-2 rounded-xl">
                  ★ Universal Red Blood Cell Recipient (সার্বজনীন গ্রহীতা)
                </div>
              )}
            </div>

          </div>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 italic">
            <strong>Clinical Note:</strong> {compData.note}
          </p>

        </div>

        {/* 2. Interactive AI Consultation Chat */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Bloodlink AI Assistant
                </h3>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online • Medical Advice Mode
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'new-1',
                    sender: 'ai',
                    text: language === 'bn' 
                      ? 'নতুন সেশন শুরু হয়েছে। আপনার প্রশ্ন লিখুন।' 
                      : 'Session refreshed. How can Bloodlink AI assist you today?',
                    timestamp: 'Just now',
                  }
                ]);
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              title="Reset Chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FAQ Suggestion Chips */}
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              {t.aiSuggestedQuestions}:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAsk(t.faqCompatibility)}
                className="text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/60 hover:text-violet-600 dark:hover:text-violet-300 text-slate-700 dark:text-slate-300 transition-colors border border-transparent hover:border-violet-200"
              >
                {t.faqCompatibility}
              </button>
              <button
                onClick={() => handleAsk(t.faqPrep)}
                className="text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/60 hover:text-violet-600 dark:hover:text-violet-300 text-slate-700 dark:text-slate-300 transition-colors border border-transparent hover:border-violet-200"
              >
                {t.faqPrep}
              </button>
              <button
                onClick={() => handleAsk(t.faqMedicines)}
                className="text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/60 hover:text-violet-600 dark:hover:text-violet-300 text-slate-700 dark:text-slate-300 transition-colors border border-transparent hover:border-violet-200"
              >
                {t.faqMedicines}
              </button>
              <button
                onClick={() => handleAsk(t.faqEmergency)}
                className="text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/60 hover:text-violet-600 dark:hover:text-violet-300 text-slate-700 dark:text-slate-300 transition-colors border border-transparent hover:border-violet-200"
              >
                {t.faqEmergency}
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 mb-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    AI
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-rose-600 text-white rounded-tr-xs shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/60 dark:border-slate-700'
                  }`}
                >
                  {m.text}
                </div>

                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    You
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 p-3 rounded-2xl w-fit">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span className="font-bold">Analyzing clinical blood guidelines...</span>
              </div>
            )}
          </div>

          {/* Ask Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.askAiPlaceholder}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm border border-transparent focus:border-violet-500 focus:outline-hidden disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-violet-600/20 active:scale-95 flex items-center gap-2"
            >
              <span>{t.askAiBtn}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
