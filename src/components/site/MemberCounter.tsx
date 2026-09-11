import { useEffect, useRef, useState } from "react";

const BASE = 2500;
const STORAGE_KEY = "apex-member-count";

export function MemberCounter() {
  const [shown, setShown] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= BASE) return parsed;
      }
    }
    return BASE;
  });
  const [pulse, setPulse] = useState(false);
  const prev = useRef(shown);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, shown.toString());
    }
  }, [shown]);

  useEffect(() => {
    function bump() {
      // Increment exactly by 1 when a form is submitted
      setShown((current) => current + 1);
    }
    window.addEventListener("apex-registration", bump);

    return () => {
      window.removeEventListener("apex-registration", bump);
    };
  }, []);

  useEffect(() => {
    if (shown === prev.current) return;
    prev.current = shown;
    setPulse(true);
    const id = window.setTimeout(() => setPulse(false), 1000);
    return () => window.clearTimeout(id);
  }, [shown]);

  return (
    <p
      className="mt-8 flex items-center gap-3 font-display text-2xl tracking-wide sm:text-3xl"
      aria-live="polite"
    >
      <span
        className={`inline-block h-2.5 w-2.5 rounded-full bg-primary ${pulse ? "animate-ping" : "animate-pulse"}`}
        aria-hidden
      />
      <span className={pulse ? "text-primary transition-colors" : "transition-colors"}>
        {shown.toLocaleString()}+
      </span>
      <span className="text-primary">Members and Counting</span>
    </p>
  );
}
