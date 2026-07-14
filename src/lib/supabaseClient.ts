import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ctqjfpvwhecqasnixylb.supabase.co'
const supabaseAnonKey = 'sb_publishable_XEO6BIj4stRz8djzyHe2HA_lXS3rxLf'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)