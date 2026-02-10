import React, { createContext, useContext, useState, useCallback } from 'react';

// SAFETY FIX: Add default values here. 
// If the provider is missing, these defaults prevent the "undefined" crash.
const NotificationContext = createContext({
  notification: null,
  showNotification: () => console.warn("Notification Provider missing"),
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [timer, setTimer] = useState(null);

  const showNotification = useCallback((message) => {
    if (timer) clearTimeout(timer);

    setNotification(message);

    const newTimer = setTimeout(() => {
      setNotification(null);
    }, 2500);

    setTimer(newTimer);
  }, [timer]);

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}

      {/* Toast UI */}
      <div
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[10000] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none
        ${notification ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      >
        {notification && (
          <div className="bg-obsidian/80 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex items-center gap-4 min-w-max animate-fade-up">
            <div className="w-2 h-2 rounded-full bg-bronze shadow-[0_0_10px_rgba(168,139,96,0.6)] animate-pulse"></div>
            <span className="text-xs uppercase tracking-[0.2em] text-bone font-medium">
              {notification}
            </span>
          </div>
        )}
      </div>

    </NotificationContext.Provider>
  );
};