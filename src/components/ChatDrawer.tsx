import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Phone, 
  ExternalLink, 
  Clock, 
  CheckCheck, 
  Sparkles, 
  Hospital,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { Donor, BloodRequest, ChatMessage, Language } from '../types';
import { translations } from '../translations';
import { ImageWithFallback } from './ImageWithFallback';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  partnerDonor?: Donor | null;
  partnerRequest?: BloodRequest | null;
  language: Language;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  onClose,
  partnerDonor,
  partnerRequest,
  language,
}) => {
  const t = translations[language];

  const partnerName = partnerDonor?.name || partnerRequest?.patientName || 'Bloodlink Member';
  const partnerPhone = partnerDonor?.phone || partnerRequest?.contactPhone || '';
  const bloodType = partnerDonor?.bloodType || partnerRequest?.bloodType || 'O+';
  const partnerLocation = partnerDonor ? `${partnerDonor.subArea || partnerDonor.area}, ${partnerDonor.district}` : `${partnerRequest?.hospitalName}`;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial conversation state
  useEffect(() => {
    if (isOpen) {
      const initialGreeting: ChatMessage = {
        id: 'msg-1',
        senderId: 'partner',
        senderName: partnerName,
        receiverId: 'me',
        message: language === 'bn'
          ? `আসসালামু আলাইকুম। আমি ব্লাডলিংক এ যুক্ত আছি। রক্তের প্রয়োজন বা হাসপাতাল সংক্রান্ত তথ্য জানান।`
          : `Hello, thank you for reaching out via Bloodlink. Please let me know the hospital details or ward number.`,
        timestamp: 'Just now',
        isDonorSender: !!partnerDonor,
        read: true,
      };
      setMessages([initialGreeting]);
    }
  }, [isOpen, partnerDonor, partnerRequest, language, partnerName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      senderName: 'You',
      receiverId: 'partner',
      message: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDonorSender: false,
      read: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate direct instant donor reply
    setTimeout(() => {
      setIsTyping(false);
      const donorReplyText = language === 'bn'
        ? `ধন্যবাদ বার্তাটির জন্য। আমি বিষয়টি গুরুত্বের সাথে দেখেছি। আমি এখনই তৈরি হচ্ছি এবং হাসপাতালে যোগাযোগ রাখছি।`
        : `Understood! I am coordinating right away and keeping my phone available.`;

      const donorReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        senderId: 'partner',
        senderName: partnerName,
        receiverId: 'me',
        message: donorReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDonorSender: true,
        read: true,
      };
      setMessages((prev) => [...prev, donorReply]);
    }, 1400);
  };

  const whatsappMessage = encodeURIComponent(
    language === 'bn'
      ? `আসসালামু আলাইকুম ${partnerName}, ব্লাডলিংক (Bloodlink) অ্যাপের মাধ্যমে যোগাযোগ করছি।`
      : `Hello ${partnerName}, I am contacting you through Bloodlink.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-rose-100 dark:border-slate-800 animate-slideLeft">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                {bloodType}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base leading-tight">
                  {partnerName}
                </h3>
                <ShieldCheck className="w-4 h-4 text-sky-500" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                {partnerLocation}
              </p>
            </div>
          </div>

          {/* Quick Direct Actions in Chat Header (Call & WhatsApp) */}
          <div className="flex items-center gap-1.5">
            {partnerPhone && (
              <>
                <a
                  href={`tel:${partnerPhone}`}
                  className="p-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:scale-105 transition-transform"
                  title={t.callNowFromChat}
                >
                  <Phone className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/${partnerPhone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-600 text-white hover:scale-105 transition-transform"
                  title={t.waFromChat}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice Bar */}
        <div className="bg-rose-50 dark:bg-rose-950/40 px-4 py-2 text-[11px] text-rose-700 dark:text-rose-300 font-medium border-b border-rose-100 dark:border-rose-900 flex items-center justify-between">
          <span>{t.chatSubtitle}</span>
          <span className="font-bold text-rose-800 dark:text-rose-200">100% Free</span>
        </div>

        {/* Message Bubble Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map((msg) => {
            const isMe = msg.senderId === 'me';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-medium leading-relaxed ${
                    isMe
                      ? 'bg-rose-600 text-white rounded-tr-xs shadow-sm shadow-rose-600/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/60 dark:border-slate-700'
                  }`}
                >
                  {msg.message}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-rose-500" />}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-2xl w-fit">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </span>
              <span className="text-[11px] font-semibold">{partnerName} is replying...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Pre-Set Replies */}
        <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          {t.quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(reply)}
              className="text-[11px] font-semibold px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-300 dark:hover:border-rose-700 hover:text-rose-600 whitespace-nowrap transition-colors shrink-0 shadow-2xs"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.typeMessagePlaceholder}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm border border-transparent focus:border-rose-500 focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white transition-all active:scale-95 shadow-md shadow-rose-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
