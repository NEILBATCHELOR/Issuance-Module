import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://kzmtkfgijxhzwcqkqegl.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6bXRrZmdpanhoendjcWtxZWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzOTYyNTcsImV4cCI6MjA1NTk3MjI1N30.a84ECFukxxXOIbVqk_JB-gj4JkjZk5iXi8k9b7LIvMQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
