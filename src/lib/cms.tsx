import { Fragment, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

/** Tabuľky spravovateľné z admin centra. */
export type CmsTable = "services" | "shop_products" | "coaches" | "tour_events" | "pc_membership_packages";

export type CmsRow = Record<string, unknown> & { id: string };

type OrderSpec = { column: string; ascending?: boolean };

export async function fetchCms(table: CmsTable, order: OrderSpec[]): Promise<CmsRow[]> {
  let query = supabase.from(table).select("*");
  for (const o of order) query = query.order(o.column, { ascending: o.ascending ?? true });
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as CmsRow[];
}

/**
 * Načíta obsah z databázy pre verejné stránky.
 * Pri chybe (alebo prázdnej tabuľke) vráti prázdne pole – stránka použije zabudovaný obsah.
 */
export function useCms(table: CmsTable, order: OrderSpec[]) {
  const [rows, setRows] = useState<CmsRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetchCms(table, order)
      .then((r) => {
        if (active) setRows(r);
      })
      .catch(() => {
        if (active) setRows([]);
      })
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return { rows, loaded };
}

/** Jednoduché zvýraznenie: **text** sa vykreslí tučne. */
export function richText(value: string | null | undefined): ReactNode {
  if (!value) return null;
  return value.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/**
 * Spojí zabudovaný obsah s riadkami z databázy.
 * Riadok z databázy prepíše zhodnú položku (podľa kľúča), ostatné sa pridajú na koniec.
 */
export function mergeCms<T>(
  defaults: T[],
  rows: CmsRow[],
  keyOfDefault: (item: T) => string,
  keyOfRow: (row: CmsRow) => string,
  apply: (base: T | null, row: CmsRow) => T,
): T[] {
  if (rows.length === 0) return defaults;
  const byKey = new Map(defaults.map((d) => [keyOfDefault(d).trim().toLowerCase(), d]));
  return rows.map((row) => {
    const base = byKey.get(keyOfRow(row).trim().toLowerCase()) ?? null;
    return apply(base, row);
  });
}

export const str = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));
export const num = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
};
