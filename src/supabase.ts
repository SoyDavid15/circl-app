import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://thhqdbtzfwyulkxiitlu.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_ouI9_CaDpv0FlU_KkOgeFg_wgY3MIhR'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)