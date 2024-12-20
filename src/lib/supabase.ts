import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://fdkushkqnwsljjfaulqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZka3VzaGtxbndzbGpqZmF1bHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTg4MDgsImV4cCI6MjAyNDUzNDgwOH0.HCYi6SXD42qk8lB7HqvH_dqTEBpwgmqk_TZGjKqbYIg'
);