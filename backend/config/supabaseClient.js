import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Supabase env variables missing");
  process.exit(1);
}


//  This client is used for:
// | - Auth admin operations (create/update users, reset passwords, sign out)
// | - Stateless backend requests

export const supabase = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);


//  It uses the same service role key but is logically separated
// | to enforce clear responsibility boundaries in the codebase.

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);


