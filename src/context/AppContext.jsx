import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const session = localStorage.getItem('nyaya-user');
    return session ? JSON.parse(session) : null;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nyaya-theme') || 'light';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('nyaya-lang') || 'English';
  });

  // Isolated states for active user
  const [savedCases, setSavedCases] = useState([]);
  const [chats, setChats] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [complaints, setComplaints] = useState([]);

  // Load isolated user data whenever user session changes
  useEffect(() => {
    const email = currentUser ? currentUser.email.toLowerCase() : 'guest';
    
    const savedChats = localStorage.getItem(`nyaya-chats-${email}`);
    setChats(savedChats ? JSON.parse(savedChats) : []);

    const savedEvidence = localStorage.getItem(`nyaya-evidence-${email}`);
    setEvidence(savedEvidence ? JSON.parse(savedEvidence) : []);

    const savedComplaints = localStorage.getItem(`nyaya-complaints-${email}`);
    setComplaints(savedComplaints ? JSON.parse(savedComplaints) : []);

    const savedCases = localStorage.getItem(`nyaya-saved-cases-${email}`);
    setSavedCases(savedCases ? JSON.parse(savedCases) : []);
  }, [currentUser]);

  // Apply theme to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('nyaya-theme', theme);
  }, [theme]);

  // Keep language in localStorage
  useEffect(() => {
    localStorage.setItem('nyaya-lang', language);
    apiService.setLanguage(language);
  }, [language]);

  // Sync state modifications to active user's scoped storage keys
  useEffect(() => {
    const email = currentUser ? currentUser.email.toLowerCase() : 'guest';
    localStorage.setItem(`nyaya-saved-cases-${email}`, JSON.stringify(savedCases));
  }, [savedCases, currentUser]);

  useEffect(() => {
    const email = currentUser ? currentUser.email.toLowerCase() : 'guest';
    localStorage.setItem(`nyaya-chats-${email}`, JSON.stringify(chats));
  }, [chats, currentUser]);

  useEffect(() => {
    const email = currentUser ? currentUser.email.toLowerCase() : 'guest';
    localStorage.setItem(`nyaya-evidence-${email}`, JSON.stringify(evidence));
  }, [evidence, currentUser]);

  useEffect(() => {
    const email = currentUser ? currentUser.email.toLowerCase() : 'guest';
    localStorage.setItem(`nyaya-complaints-${email}`, JSON.stringify(complaints));
  }, [complaints, currentUser]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const loginUser = (userData) => {
    localStorage.setItem('nyaya-user', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('nyaya-user');
    setCurrentUser(null);
  };

  const saveCase = (caseData) => {
    setSavedCases(prev => {
      if (prev.find(c => c.id === caseData.id)) return prev;
      return [caseData, ...prev];
    });
  };

  const deleteCase = (caseId) => {
    setSavedCases(prev => prev.filter(c => c.id !== caseId));
  };

  const addEvidence = (item) => {
    setEvidence(prev => [item, ...prev]);
  };

  const deleteEvidence = (id) => {
    setEvidence(prev => prev.filter(item => item.id !== id));
  };

  const addComplaint = (item) => {
    setComplaints(prev => [item, ...prev]);
  };

  const deleteComplaint = (id) => {
    setComplaints(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setChats([]);
    setSavedCases([]);
    setEvidence([]);
    setComplaints([]);
    const email = currentUser ? currentUser.email.toLowerCase() : 'guest';
    localStorage.removeItem(`nyaya-chats-${email}`);
    localStorage.removeItem(`nyaya-saved-cases-${email}`);
    localStorage.removeItem(`nyaya-evidence-${email}`);
    localStorage.removeItem(`nyaya-complaints-${email}`);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      loginUser,
      logoutUser,
      theme,
      toggleTheme,
      language,
      setLanguage,
      savedCases,
      saveCase,
      deleteCase,
      chats,
      setChats,
      evidence,
      addEvidence,
      deleteEvidence,
      complaints,
      addComplaint,
      deleteComplaint,
      clearHistory
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
