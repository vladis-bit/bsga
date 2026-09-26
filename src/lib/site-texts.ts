import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/** Načíta editovateľné texty webu (tabuľka site_texts). Prázdna hodnota = použije sa predvolený text. */
export function useSiteTexts(keys: string[]) {
  const [texts, setTexts] = useState<Record<string, string>>({});
  useEffect(() => {
    let active = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("site_texts" as any) as any)
      .select("key,value")
      .in("key", keys)
      .then(({ data }: { data: { key: string; value: string }[] | null }) => {
        if (active && data) setTexts(Object.fromEntries(data.map((r) => [r.key, r.value])));
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.join("|")]);
  return texts;
}
