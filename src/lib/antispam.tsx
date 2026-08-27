import { useRef, useState, useCallback } from "react";

const MIN_FILL_MS = 3000; // formulár vyplnený rýchlejšie = bot
const MIN_INTERVAL_MS = 30000; // min. odstup medzi odoslaniami z jedného prehliadača
const STORAGE_KEY = "bsga-last-form-submit";

export type SpamCheck = { ok: boolean; reason?: string };

/**
 * Antispam ochrana bez externých služieb:
 * - honeypot (skryté pole, ktoré vypĺňajú len boti)
 * - time-trap (príliš rýchle odoslanie)
 * - throttling (príliš časté odosielanie z rovnakého prehliadača)
 */
export function useAntiSpam() {
  const loadedAt = useRef<number>(Date.now());
  const [honeypot, setHoneypot] = useState("");

  const check = useCallback((): SpamCheck => {
    if (honeypot.trim() !== "") {
      return { ok: false, reason: "Formulár bol vyhodnotený ako spam." };
    }
    if (Date.now() - loadedAt.current < MIN_FILL_MS) {
      return {
        ok: false,
        reason: "Formulár bol odoslaný príliš rýchlo. Skúste to prosím ešte raz.",
      };
    }
    try {
      const last = Number(localStorage.getItem(STORAGE_KEY) || 0);
      if (last && Date.now() - last < MIN_INTERVAL_MS) {
        return {
          ok: false,
          reason: "Správu ste práve odoslali. Skúste to prosím o chvíľu.",
        };
      }
    } catch {
      /* localStorage nedostupné – ignorujeme */
    }
    return { ok: true };
  }, [honeypot]);

  const markSubmitted = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    loadedAt.current = Date.now();
  }, []);

  const HoneypotField = useCallback(
    () => (
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company-website">Nevypĺňajte toto pole</label>
        <input
          id="company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
    ),
    [honeypot],
  );

  return { check, markSubmitted, HoneypotField };
}
