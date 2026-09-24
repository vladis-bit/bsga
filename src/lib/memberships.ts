import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import poukazka1 from "@/assets/vouchers/poukazka-1.webp.asset.json";
import poukazka5 from "@/assets/vouchers/poukazka-5.webp.asset.json";
import poukazka10 from "@/assets/vouchers/poukazka-10.webp.asset.json";
import poukazka20 from "@/assets/vouchers/poukazka-20.webp.asset.json";

export type MembershipPackage = {
  entries: number;
  label: string;
  price: number;
  pricePerEntry: number;
  savings: string | null;
  badge: string | null;
  image: string;
  validityMonths: number;
};

const bundledImages: Record<number, string> = {
  1: poukazka1.url,
  5: poukazka5.url,
  10: poukazka10.url,
  20: poukazka20.url,
};

const make = (
  entries: number,
  label: string,
  price: number,
  savings: string | null,
  badge: string | null,
  image?: string | null,
  validityMonths = 6,
): MembershipPackage => ({
  entries,
  label,
  price,
  pricePerEntry: Math.round((price / entries) * 100) / 100,
  savings,
  badge,
  image: image || bundledImages[entries] || poukazka1.url,
  validityMonths,
});

export const defaultMembershipPackages: MembershipPackage[] = [
  make(1, "1 vstup", 24.99, null, null),
  make(5, "5 vstupov", 119.99, "ušetríte 4,96 €", null),
  make(10, "10 vstupov", 229.99, "ušetríte 19,91 €", "Najobľúbenejšie"),
  make(20, "20 vstupov", 399.99, "ušetríte 99,81 € (−20 %)", "Najvýhodnejšie"),
];

/** Balíky členstiev z admin centra (pri chybe zabudované). */
export function useMembershipPackages() {
  const [packages, setPackages] = useState(defaultMembershipPackages);
  useEffect(() => {
    let active = true;
    supabase
      .from("pc_membership_packages")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
      .order("entries")
      .then(({ data, error }) => {
        if (!active || error || !data || data.length === 0) return;
        setPackages(
          data.map((r) =>
            make(r.entries, r.label, Number(r.price_eur), r.savings, r.badge, r.image, r.validity_months),
          ),
        );
      });
    return () => {
      active = false;
    };
  }, []);
  return packages;
}
