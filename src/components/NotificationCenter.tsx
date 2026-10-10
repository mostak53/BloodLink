import React from 'react';
import { 
  X, 
  Bell, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Radio, 
  Clock, 
  CheckCheck,
  Hospital
} from 'lucide-react';
import { NotificationItem, Language } from '../types';
import { translations } from '../translations';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  language: Language;
  onMarkAllAsRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
  onSimulateUrgentAlert: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  language,
  onMarkAllAsRead,
  onSelectNotification,
  onSimulateUrgentAlert,
  soundEnabled,
  setSoundEnabled,
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-slate-800 p-5 mt-16 max-h-[85vh] flex flex-col animate-slideDown">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-600 text-white shadow-xs">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {t.notificationCenterTitle}
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                {notifications.filter(n => !n.read).length} unread alerts
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                soundEnabled
                  ? 'border-emerald-300 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400'
              }`}
              title={soundEnabled ? 'Alert Chime Enabled' : 'Muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center justify-between py-2 px-1 text-xs">
          <button
            onClick={onSimulateUrgentAlert}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-bold hover:bg-rose-100 transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>{t.simulateAlertBtn}</span>
          </button>

          <button
            onClick={onMarkAllAsRead}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
          >
            {t.markAllAsRead}
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 my-2 pr-1">
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNotification(item)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  !item.read
                    ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/80 shadow-xs'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800'
                } hover:border-rose-300`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {item.bloodGroup && (
                      <span className="px-2 py-0.5 rounded-lg bg-rose-600 text-white font-black text-xs">
                        {item.bloodGroup}
                      </span>
                    )}
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                      {language === 'bn' ? item.titleBn : item.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                    {item.timestamp}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {language === 'bn' ? item.messageBn : item.message}
                </p>

                {item.hospital && (
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                    <Hospital className="w-3 h-3 text-rose-500" />
                    <span className="truncate">{item.hospital}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              {t.noNotifications}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
