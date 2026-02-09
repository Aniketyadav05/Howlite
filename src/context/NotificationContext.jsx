import React, { createContext, useContext, useState, useCallback } from 'react';

// 1. ADD DEFAULT VALUE (Prevents "undefined" crash)
const NotificationContext = createContext({
  notification: null,
  showNotification: (msg) => console.log("Notification (Dev Mode):", msg),
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
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[10000] transition-all duration-500 ease-out 
        ${notification ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}
      >
        {notification && (
          <div className="bg-[#151515] border border-white/10 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 min-w-max">
            <div className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-bone font-medium">
              {notification}
            </span>
          </div>
        )}
      </div>

    </NotificationContext.Provider>
  );
};