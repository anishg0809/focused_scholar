import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nkvmcbavdsifkbneyloo.supabase.co'
const supabaseKey = 'sb_publishable_GoxiomWIQUaOTcRs_QbM4g_Z5-p8Me_'

export const supabase = createClient(supabaseUrl, supabaseKey)