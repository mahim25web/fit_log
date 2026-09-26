"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const showToast = useCallback(
    (message) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message }]);
      timers.current[id] = setTimeout(() => removeToast(id), 3000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 sm:bottom-6 sm:right-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-toast-in flex items-center gap-2 rounded-xl border border-white/10 bg-[#17181b] px-4 py-3 shadow-2xl shadow-black/40"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ccff00]" />
            <p className="text-sm font-medium text-white">{t.message}</p>
            <button
              onClick={() => removeToast(t.id)}
              aria-label="Dismiss notification"
              className="ml-2 text-white/40 transition hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

