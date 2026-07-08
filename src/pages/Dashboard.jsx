import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Scale, MessageSquareCode, FileSignature, FileSearch, 
  ShieldAlert, FolderGit, CalendarRange, Landmark, Languages, Settings, 
  UserCircle, LogOut, Menu, X, Sun, Moon, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

// Import views
import Overview from './views/Overview';
import ChatAssistant from './views/ChatAssistant';
import ComplaintWizard from './views/ComplaintWizard';
import DocumentExplainer from './views/DocumentExplainer';
import RightsChecker from './views/RightsChecker';
import EvidenceManager from './views/EvidenceManager';
import CaseTimelineView from './views/CaseTimelineView';
import GovServices from './views/GovServices';
import LanguageSettings from './views/LanguageSettings';
import SettingsView from './views/SettingsView';
import ProfileView from './views/ProfileView';

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme, toggleTheme, language, setLanguage, logoutUser } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const currentTab = searchParams.get('tab') || 'overview';
  const session = localStorage.getItem('nyaya-user');

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  if (!session) {
    return null;
  }

  const user = JSON.parse(session);

  const setTab = (tabName) => {
    setSearchParams({ tab: tabName });
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const menuItems = [
    { id: 'overview', name: 'Dashboard Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'chat', name: 'AI Legal Assistant', icon: <MessageSquareCode className="w-5 h-5" /> },
    { id: 'complaint', name: 'Draft a Complaint', icon: <FileSignature className="w-5 h-5" /> },
    { id: 'explainer', name: 'Document Explainer', icon: <FileSearch className="w-5 h-5" /> },
    { id: 'rights', name: 'Rights Checker', icon: <ShieldAlert className="w-5 h-5" /> },
    { id: 'evidence', name: 'Evidence Manager', icon: <FolderGit className="w-5 h-5" /> },
    { id: 'timeline', name: 'Case Timeline', icon: <CalendarRange className="w-5 h-5" /> },
    { id: 'services', name: 'Gov Services', icon: <Landmark className="w-5 h-5" /> },
    { id: 'language', name: 'Language Options', icon: <Languages className="w-5 h-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'profile', name: 'Profile Details', icon: <UserCircle className="w-5 h-5" /> }
  ];

  const languages = [
    'English', 'Hindi', 'Punjabi', 'Tamil', 'Gujarati', 
    'Marathi', 'Kannada', 'Telugu', 'Malayalam', 'Bengali'
  ];

  const renderActiveView = () => {
    switch (currentTab) {
      case 'overview': return <Overview setTab={setTab} />;
      case 'chat': return <ChatAssistant />;
      case 'complaint': return <ComplaintWizard />;
      case 'explainer': return <DocumentExplainer />;
      case 'rights': return <RightsChecker />;
      case 'evidence': return <EvidenceManager />;
      case 'timeline': return <CaseTimelineView />;
      case 'services': return <GovServices />;
      case 'language': return <LanguageSettings />;
      case 'settings': return <SettingsView />;
      case 'profile': return <ProfileView />;
      default: return <Overview setTab={setTab} />;
    }
  };

  const activeMenu = menuItems.find(item => item.id === currentTab) || menuItems[0];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/50 dark:border-slate-850 bg-white dark:bg-slate-900/60 backdrop-blur-md relative z-25 flex-shrink-0">
        <div className="flex items-center h-16 px-6 border-b border-slate-200/50 dark:border-slate-850 gap-2">
          <img src="/logo.jpg" alt="NyayaAI logo" className="w-8 h-8 rounded-lg object-cover border border-blue-800 shadow-sm" />
          <span className="font-bold text-lg font-display">Nyaya<span className="text-blue-600 dark:text-blue-400">AI</span></span>
        </div>
        
        {/* Navigation list */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {menuItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 dark:bg-blue-700 text-white shadow-md shadow-blue-500/10' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-850 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-850">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide text-rose-500 hover:bg-rose-500/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar (Slide Over) */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            />
            
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-10"
            >
              <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <img src="/logo.jpg" alt="NyayaAI logo" className="w-8 h-8 rounded-lg object-cover border border-blue-800" />
                  <span className="font-bold text-lg font-display">Nyaya<span className="text-blue-600 dark:text-blue-400">AI</span></span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
                {menuItems.map(item => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-blue-600 dark:bg-blue-700 text-white shadow-md' 
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-850 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide text-rose-500 hover:bg-rose-500/5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200/50 dark:border-slate-850 bg-white dark:bg-slate-900/60 backdrop-blur-md px-4 sm:px-6 flex justify-between items-center relative z-20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider font-display">
              {activeMenu.name}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Status Badge */}
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              🟢 Powered by Local Gemma AI
            </span>

            {/* Language Toolbar Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setUserDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <span>{language}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden glass-card max-h-56 overflow-y-auto"
                  >
                    <div className="py-1">
                      {languages.map(lang => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850 ${
                            language === lang ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-405'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:bg-slate-105 dark:hover:bg-slate-850 cursor-pointer"
            >
              {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setUserDropdownOpen(!userDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center">
                  {user.name[0]}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-1.5 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden glass-card"
                  >
                    <div className="p-3 border-b border-slate-100 dark:border-slate-850">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{user.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setTab('profile');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
                      >
                        Profile Details
                      </button>
                      <button
                        onClick={() => {
                          setTab('settings');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
                      >
                        System Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-xs text-rose-500 hover:bg-rose-500/5 cursor-pointer"
                      >
                        Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic View Panel */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 dark:bg-[#0b0f19] relative">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {renderActiveView()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
