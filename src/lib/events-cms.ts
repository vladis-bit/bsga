import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  type EventItem,
  parseEventDate,
  defaultEvents,
  defaultEvents2027,
  defaultArchivedEvents,
} from "@/data/events";

export type EventCategory = "upcoming" | "2027" | "archive";

export const EVENT_CATEGORIES: { value: EventCategory; label: string }[] = [
  { value: "upcoming", label: "Nadchádzajúce (sezóna 2026)" },
  { value: "2027", label: "Akcie a pobyty 2027" },
  { value: "archive", label: "Archív" },
];

type Row = {
  title: string;
  date_label: string | null;
  location: string | null;
  poster_url: string | null;
  hide_signup: boolean;
  hide_poster: boolean;
  sold_out: boolean;
  category: string;
  sort_order: number;
  details: unknown;
};

export const rowToEvent = (r: Row): EventItem => ({
  title: r.title,
  date: r.date_label ?? "",
  location: r.location ?? undefined,
  posterUrl: r.poster_url || undefined,
  hideSignup: r.hide_signup,
  hidePoster: r.hide_poster,
  soldOut: r.sold_out,
  details: (r.details as EventItem["details"]) ?? undefined,
});

/** Eventy pre verejnú stránku – z databázy, pri prázdnej databáze zabudované. */
export function useEventsData() {
  const [data, setData] = useState({
    fromDb: false,
    events: defaultEvents,
    events2027: defaultEvents2027,
    archived: defaultArchivedEvents,
  });

  useEffect(() => {
    let active = true;
    supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .then(({ data: rows, error }) => {
        if (!active || error || !rows || rows.length === 0) return;
        const list = rows as unknown as Row[];
        const pick = (cat: EventCategory, desc = false) =>
          list
            .filter((r) => r.category === cat)
            .sort((a, b) => {
              if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
              const d = parseEventDate(a.date_label ?? "") - parseEventDate(b.date_label ?? "");
              return desc ? -d : d;
            })
            .map(rowToEvent);
        setData({
          fromDb: true,
          events: pick("upcoming"),
          events2027: pick("2027"),
          archived: pick("archive", true),
        });
      });
    return () => {
      active = false;
    };
  }, []);

  return data;
}

/** Riadky na import zabudovaných eventov do databázy. */
export const defaultEventRows = () => {
  const map = (e: EventItem, category: EventCategory) => ({
    title: e.title,
    subtitle: e.details?.subtitle ?? null,
    date_label: e.date,
    location: e.location ?? null,
    poster_url: e.posterUrl ?? null,
    year: Number(e.date.match(/(\d{4})\s*$/)?.[1]) || null,
    category,
    hide_signup: Boolean(e.hideSignup),
    hide_poster: Boolean(e.hidePoster),
    sold_out: Boolean(e.soldOut),
    is_featured: false,
    is_active: true,
    sort_order: 100,
    details: e.details ?? null,
  });
  return [
    ...defaultEvents.map((e) => map(e, "upcoming")),
    ...defaultEvents2027.map((e) => map(e, "2027")),
    ...defaultArchivedEvents.map((e) => map(e, "archive")),
  ];
};
