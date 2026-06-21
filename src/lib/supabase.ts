import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = url && key ? createClient(url, key) : null;

export type Donor = {
  id: number;
  name: string;
  country_code: string | null;
  anonymous: boolean;
  created_at: string;
};

export type PendingDonor = {
  name: string;
  email: string;
  donation_note: string;
};
