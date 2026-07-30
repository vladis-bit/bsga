import { supabase } from "@/integrations/supabase/client";

export type Simulator = {
  id: string;
  name: string;
  slug: string;
  hourly_rate_eur: number;
  is_active: boolean;
  sort_order: number;
};

export type Booking = {
  id: string;
  created_at: string;
  starts_at: string;
  ends_at: string | null;
  duration_hours: number;
  simulator_id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  price_eur: number;
  status: string;
  payment_status: string;
  note: string | null;
};

export type Message = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  preferred_date: string | null;
  message: string;
  source: string;
  is_read: boolean;
  email_status: string | null;
  email_error: string | null;
  resend_at: string | null;
};

export const STATUS_LABEL: Record<string, string> = {
  pending: "Čaká na potvrdenie",
  confirmed: "Potvrdená",
  cancelled: "Zrušená",
};

export const PAYMENT_LABEL: Record<string, string> = {
  pending: "Nezaplatené",
  paid: "Zaplatené",
  refunded: "Vrátené",
};

export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("sk-SK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });

export const fmtDate = (d: Date) =>
  d.toLocaleDateString("sk-SK", { day: "2-digit", month: "2-digit" });

export const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const startOfWeek = (d: Date) => {
  const x = startOfDay(d);
  const day = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - day);
  return x;
};

export const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

export async function fetchSimulators(): Promise<Simulator[]> {
  const { data, error } = await supabase
    .from("pc_simulators")
    .select("id,name,slug,hourly_rate_eur,is_active,sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Simulator[];
}

export async function fetchBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("pc_bookings")
    .select("*")
    .order("starts_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Booking[];
}

export const translateDbError = (message: string) => {
  if (/no_overlap|exclusion|conflict/i.test(message)) {
    return "Tento termín sa prekrýva s inou rezerváciou na rovnakom simulátore.";
  }
  if (/row-level security|permission/i.test(message)) {
    return "Nemáte oprávnenie na túto akciu (chýba admin rola).";
  }
  return message;
};