import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../consts';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface UserProfile {
	id: string;
	email: string;
	full_name?: string;
	avatar_url?: string;
	created_at: string;
}

export interface ContactMessage {
	id: string;
	name: string;
	email: string;
	message: string;
	created_at: string;
}
