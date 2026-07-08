import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nyaya-theme') || 'light';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('nyaya-lang') || 'English';
  });

  const [savedCases, setSavedCases] = useState(() => {
    const saved = localStorage.getItem('nyaya-saved-cases');
    return saved ? JSON.parse(saved) : [];
  });

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('nyaya-chats');
    return saved ? JSON.parse(saved) : [];
  });

  const [evidence, setEvidence] = useState(() => {
    const saved = localStorage.getItem('nyaya-evidence');
    return saved ? JSON.parse(saved) : [];
  });

  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('nyaya-complaints');
    return saved ? JSON.parse(saved) : [];
  });

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

  // Keep saved cases in localStorage
  useEffect(() => {
    localStorage.setItem('nyaya-saved-cases', JSON.stringify(savedCases));
  }, [savedCases]);

  // Keep chats in localStorage
  useEffect(() => {
    localStorage.setItem('nyaya-chats', JSON.stringify(chats));
  }, [chats]);

  // Keep evidence in localStorage
  useEffect(() => {
    localStorage.setItem('nyaya-evidence', JSON.stringify(evidence));
  }, [evidence]);

  // Keep complaints in localStorage
  useEffect(() => {
    localStorage.setItem('nyaya-complaints', JSON.stringify(complaints));
  }, [complaints]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const saveCase = (caseData) => {
    setSavedCases(prev => {
      // Avoid duplicates
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
    localStorage.removeItem('nyaya-chats');
    localStorage.removeItem('nyaya-saved-cases');
    localStorage.removeItem('nyaya-evidence');
    localStorage.removeItem('nyaya-complaints');
  };

  return (
    <AppContext.Provider value={{
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
