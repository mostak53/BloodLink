import React, { useState, useEffect } from 'react';
import { 
  BloodGroup, 
  Language, 
  Theme, 
  Donor, 
  BloodRequest, 
  NotificationItem, 
  Review 
} from './types';
import { INITIAL_DONORS, INITIAL_REQUESTS, INITIAL_NOTIFICATIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { UrgentAlertTicker } from './components/UrgentAlertTicker';
import { HeroSection } from './components/HeroSection';
import { DonorSearchAndList } from './components/DonorSearchAndList';
import { EmergencyRequestFeed } from './components/EmergencyRequestFeed';
import { EmergencyRequestModal } from './components/EmergencyRequestModal';
import { DonorRegisterLoginModal } from './components/DonorRegisterLoginModal';
import { DonorProfileModal } from './components/DonorProfileModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MyProfileView } from './components/MyProfileView';
import { ChatDrawer } from './components/ChatDrawer';
import { RatingModal } from './components/RatingModal';
import { NotificationCenter } from './components/NotificationCenter';
import { AiAssistView } from './components/AiAssistView';
import { Footer } from './components/Footer';
import { playEmergencyChime } from './utils/audioAlert';
import { Bell, AlertTriangle, CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('bloodlink_theme') as Theme) || 'light';
  });

  // Language State (EN / BN)
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('bloodlink_lang') as Language) || 'en';
  });

  // Navigation Tab State
  const [currentTab, setCurrentTab] = useState<'home' | 'donors' | 'requests' | 'ai' | 'profile'>('home');

  // Search Filter State (Hero -> List synchronization)
  const [selectedBloodType, setSelectedBloodType] = useState<BloodGroup | ''>('');
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [searchSubArea, setSearchSubArea] = useState<string>('');

  // Core Data State
  const [donors, setDonors] = useState<Donor[]>(() => {
    const saved = localStorage.getItem('bloodlink_donors');
    if (!saved) return INITIAL_DONORS;
    try {
      const parsed: Donor[] = JSON.parse(saved);
      // Keep all custom user-registered donors
      const userRegistered = parsed.filter(p => !INITIAL_DONORS.some(init => init.id === p.id));
      // Keep all initial demo donors with any updated reviews/ratings
      const demoDonorsMerged = INITIAL_DONORS.map(init => {
        const found = parsed.find(p => p.id === init.id);
        return found ? { ...init, ...found } : init;
      });
      return [...userRegistered, ...demoDonorsMerged];
    } catch {
      return INITIAL_DONORS;
    }
  });

  const [requests, setRequests] = useState<BloodRequest[]>(() => {
    const saved = localStorage.getItem('bloodlink_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('bloodlink_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [currentUser, setCurrentUser] = useState<Donor | null>(() => {
    const saved = localStorage.getItem('bloodlink_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active Modals & Drawers
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isRegisterLoginModalOpen, setIsRegisterLoginModalOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [selectedDonorForProfile, setSelectedDonorForProfile] = useState<Donor | null>(null);
  const [selectedDonorForRating, setSelectedDonorForRating] = useState<Donor | null>(null);

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatDonor, setActiveChatDonor] = useState<Donor | null>(null);
  const [activeChatRequest, setActiveChatRequest] = useState<BloodRequest | null>(null);

  // Live Toast for Emergency Alerts
  const [liveToast, setLiveToast] = useState<{
    show: boolean;
    title: string;
    message: string;
  } | null>(null);

  // Sync theme class with HTML document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('bloodlink_theme', theme);
  }, [theme]);

  // Sync Language
  useEffect(() => {
    localStorage.setItem('bloodlink_lang', language);
  }, [language]);

  // Sync Donors
  useEffect(() => {
    localStorage.setItem('bloodlink_donors', JSON.stringify(donors));
  }, [donors]);

  // Sync Requests
  useEffect(() => {
    localStorage.setItem('bloodlink_requests', JSON.stringify(requests));
  }, [requests]);

  // Sync Notifications
  useEffect(() => {
    localStorage.setItem('bloodlink_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Sync Current User
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bloodlink_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('bloodlink_user');
    }
  }, [currentUser]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Trigger sound and toast when new emergency alert happens
  const triggerEmergencyAlert = (title: string, message: string) => {
    if (soundEnabled) {
      playEmergencyChime();
    }
    setLiveToast({ show: true, title, message });
    setTimeout(() => {
      setLiveToast(null);
    }, 5000);
  };

  // Simulate an urgent hospital pulse
  const handleSimulateUrgentAlert = () => {
    const rareGroups: BloodGroup[] = ['O-', 'AB-', 'B-', 'A-'];
    const randomGroup = rareGroups[Math.floor(Math.random() * rareGroups.length)];
    const hospitals = [
      'Dhaka Medical College Hospital',
      'Kurmitola General Hospital',
      'Chittagong Medical College',
      'National Heart Foundation, Mirpur',
    ];
    const hospital = hospitals[Math.floor(Math.random() * hospitals.length)];

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `URGENT: ${randomGroup} Blood Needed Immediately!`,
      titleBn: `জরুরি অ্যালার্ট: ${randomGroup} রক্ত অবিলম্বে প্রয়োজন!`,
      message: `${hospital}: Emergency ICU case. Attendant waiting for volunteer response.`,
      messageBn: `${hospital}: জরুরি আইসিইউ রোগী। ক্রস-ম্যাচিংয়ের জন্য রক্তদাতা প্রয়োজন।`,
      type: 'emergency',
      timestamp: 'Just now',
      read: false,
      bloodGroup: randomGroup,
      hospital,
    };

    setNotifications(prev => [newNotif, ...prev]);
    triggerEmergencyAlert(
      language === 'bn' ? newNotif.titleBn : newNotif.title,
      language === 'bn' ? newNotif.messageBn : newNotif.message
    );
  };

  // Submit Blood Request handler
  const handleCreateRequest = (newReq: BloodRequest) => {
    setRequests(prev => [newReq, ...prev]);

    // Create Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `URGENT: ${newReq.bloodType} Needed for ${newReq.patientName}`,
      titleBn: `জরুরি: ${newReq.patientName} এর জন্য ${newReq.bloodType} রক্ত প্রয়োজন`,
      message: `${newReq.hospitalName}: ${newReq.unitsNeeded} bags needed. ${newReq.reason}`,
      messageBn: `${newReq.hospitalName}: ${newReq.unitsNeeded} ব্যাগ রক্ত প্রয়োজন।`,
      type: 'emergency',
      timestamp: 'Just now',
      read: false,
      bloodGroup: newReq.bloodType,
      targetRequestId: newReq.id,
      hospital: newReq.hospitalName,
    };

    setNotifications(prev => [notif, ...prev]);
    triggerEmergencyAlert(
      language === 'bn' ? notif.titleBn : notif.title,
      language === 'bn' ? notif.messageBn : notif.message
    );
  };

  // Respond to request
  const handleRespondToRequest = (req: BloodRequest) => {
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, responsesCount: r.responsesCount + 1 } : r));
    
    // Automatically open chat with the patient/attendant!
    setActiveChatRequest(req);
    setActiveChatDonor(null);
    setIsChatOpen(true);
  };

  // Open Chat with donor
  const handleOpenDonorChat = (donor: Donor) => {
    setActiveChatDonor(donor);
    setActiveChatRequest(null);
    setIsChatOpen(true);
  };

  // Open Chat with patient from feed
  const handleOpenPatientChat = (req: BloodRequest) => {
    setActiveChatRequest(req);
    setActiveChatDonor(null);
    setIsChatOpen(true);
  };

  // Rate donor
  const handleSubmitDonorReview = (donorId: string, review: Review, newAverageRating: number) => {
    setDonors(prev =>
      prev.map(d => {
        if (d.id === donorId) {
          const currentReviews = d.reviews || [];
          return {
            ...d,
            rating: newAverageRating,
            reviewCount: d.reviewCount + 1,
            reviews: [review, ...currentReviews],
          };
        }
        return d;
      })
    );
  };

  // Register or Login Donor
  const handleSaveUser = (donor: Donor) => {
    setCurrentUser(donor);
    // Add to donors list at top and ensure immediate persistence
    setDonors(prev => {
      const remaining = prev.filter(d => d.id !== donor.id && d.phone !== donor.phone);
      const updated = [donor, ...remaining];
      localStorage.setItem('bloodlink_donors', JSON.stringify(updated));
      return updated;
    });
    // Navigate to donors list so user immediately sees their profile listed
    setCurrentTab('donors');
  };

  // Update donor profile from my profile view
  const handleUpdateDonor = (updated: Donor) => {
    setCurrentUser(updated);
    setDonors(prev => prev.map(d => (d.id === updated.id ? updated : d)));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-rose-500 selection:text-white pb-20 md:pb-0">
      
      {/* 1. Header Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
        currentUser={currentUser}
        onOpenLogin={() => setIsRegisterLoginModalOpen(true)}
        onOpenRegister={() => setIsRegisterLoginModalOpen(true)}
        onOpenNewRequest={() => setIsRequestModalOpen(true)}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationCenterOpen(true)}
      />

      {/* 2. Live Urgent Requests Ticker */}
      <UrgentAlertTicker
        requests={requests}
        language={language}
        onSelectRequest={(req) => {
          handleOpenPatientChat(req);
        }}
      />

      {/* 3. Live Emergency Toast */}
      {liveToast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-red-600 text-white p-4 rounded-2xl shadow-2xl flex items-start gap-3 border border-red-500 animate-slideLeft">
          <AlertTriangle className="w-5 h-5 text-amber-200 shrink-0 mt-0.5 animate-bounce" />
          <div className="flex-1 text-xs">
            <h4 className="font-black text-sm">{liveToast.title}</h4>
            <p className="mt-0.5 text-red-100">{liveToast.message}</p>
          </div>
          <button
            onClick={() => setLiveToast(null)}
            className="text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Tab Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            {/* Hero with Direct Interaction Search */}
            <HeroSection
              language={language}
              selectedBloodType={selectedBloodType}
              setSelectedBloodType={setSelectedBloodType}
              selectedDivision={selectedDivision}
              setSelectedDivision={setSelectedDivision}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              searchSubArea={searchSubArea}
              setSearchSubArea={setSearchSubArea}
              onSearch={() => {
                const donorsEl = document.getElementById('donors-section');
                if (donorsEl) {
                  donorsEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onOpenRegister={() => setIsRegisterLoginModalOpen(true)}
              onOpenNewRequest={() => setIsRequestModalOpen(true)}
              onNavigateToAi={() => setCurrentTab('ai')}
            />

            {/* Donor Directory with multi-filter */}
            <div id="donors-section">
              <DonorSearchAndList
                donors={donors}
                language={language}
                selectedBloodType={selectedBloodType}
                setSelectedBloodType={setSelectedBloodType}
                selectedDivision={selectedDivision}
                setSelectedDivision={setSelectedDivision}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                searchSubArea={searchSubArea}
                setSearchSubArea={setSearchSubArea}
                onOpenChat={handleOpenDonorChat}
                onViewProfile={(donor) => setSelectedDonorForProfile(donor)}
                onRateDonor={(donor) => setSelectedDonorForRating(donor)}
              />
            </div>

            {/* Emergency Request Feed */}
            <EmergencyRequestFeed
              requests={requests}
              language={language}
              onOpenNewRequest={() => setIsRequestModalOpen(true)}
              onRespondToRequest={handleRespondToRequest}
              onOpenDirectChatWithPatient={handleOpenPatientChat}
            />
          </>
        )}

        {currentTab === 'donors' && (
          <DonorSearchAndList
            donors={donors}
            language={language}
            selectedBloodType={selectedBloodType}
            setSelectedBloodType={setSelectedBloodType}
            selectedDivision={selectedDivision}
            setSelectedDivision={setSelectedDivision}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
            searchSubArea={searchSubArea}
            setSearchSubArea={setSearchSubArea}
            onOpenChat={handleOpenDonorChat}
            onViewProfile={(donor) => setSelectedDonorForProfile(donor)}
            onRateDonor={(donor) => setSelectedDonorForRating(donor)}
          />
        )}

        {currentTab === 'requests' && (
          <EmergencyRequestFeed
            requests={requests}
            language={language}
            onOpenNewRequest={() => setIsRequestModalOpen(true)}
            onRespondToRequest={handleRespondToRequest}
            onOpenDirectChatWithPatient={handleOpenPatientChat}
          />
        )}

        {currentTab === 'ai' && (
          <AiAssistView language={language} />
        )}

        {currentTab === 'profile' && (
          currentUser ? (
            <MyProfileView
              currentUser={currentUser}
              language={language}
              onUpdateDonor={handleUpdateDonor}
              onLogout={() => {
                setCurrentUser(null);
                setCurrentTab('home');
              }}
            />
          ) : (
            <div className="py-20 text-center max-w-md mx-auto px-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {language === 'bn' ? 'প্রোফাইলে লগইন করুন' : 'Sign in to access your donor profile'}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {language === 'bn' ? 'আপনার রক্তের গ্রুপের তথ্য ও কাউন্টডাউন পরিচালনা করুন।' : 'Manage your availability and biological recovery countdown.'}
              </p>
              <button
                onClick={() => setIsRegisterLoginModalOpen(true)}
                className="mt-6 px-6 py-3 rounded-2xl bg-rose-600 text-white font-bold text-sm shadow-md"
              >
                {language === 'bn' ? 'লগইন বা নিবন্ধন করুন' : 'Login / Register'}
              </button>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <Footer language={language} onNavigateTab={setCurrentTab} />

      {/* Modals & Drawers */}
      <EmergencyRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        language={language}
        onSubmitRequest={handleCreateRequest}
      />

      <DonorRegisterLoginModal
        isOpen={isRegisterLoginModalOpen}
        onClose={() => setIsRegisterLoginModalOpen(false)}
        language={language}
        onSaveUser={handleSaveUser}
      />

      <DonorProfileModal
        donor={selectedDonorForProfile}
        isOpen={!!selectedDonorForProfile}
        onClose={() => setSelectedDonorForProfile(null)}
        language={language}
        onOpenChat={handleOpenDonorChat}
        onRateDonor={(donor) => {
          setSelectedDonorForProfile(null);
          setSelectedDonorForRating(donor);
        }}
      />

      <RatingModal
        donor={selectedDonorForRating}
        isOpen={!!selectedDonorForRating}
        onClose={() => setSelectedDonorForRating(null)}
        language={language}
        onSubmitReview={handleSubmitDonorReview}
      />

      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        partnerDonor={activeChatDonor}
        partnerRequest={activeChatRequest}
        language={language}
      />

      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        notifications={notifications}
        language={language}
        onMarkAllAsRead={() => {
          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }}
        onSelectNotification={(item) => {
          setIsNotificationCenterOpen(false);
          if (item.targetRequestId) {
            const req = requests.find(r => r.id === item.targetRequestId);
            if (req) {
              handleOpenPatientChat(req);
              return;
            }
          }
          setCurrentTab('requests');
        }}
        onSimulateUrgentAlert={handleSimulateUrgentAlert}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        currentUser={currentUser}
        onOpenNewRequest={() => setIsRequestModalOpen(true)}
        onOpenRegister={() => setIsRegisterLoginModalOpen(true)}
        urgentRequestsCount={requests.filter(r => r.requestType === 'emergency' && r.status === 'open').length}
        unreadNotificationsCount={notifications.filter(n => !n.read).length}
      />

    </div>
  );
}
