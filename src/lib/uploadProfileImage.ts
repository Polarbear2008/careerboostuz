import { supabase } from './supabaseClient';

export async function uploadProfileImage(file: File, userId?: string): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId || 'anon'}_${Date.now()}.${fileExt}`;
  const { data, error } = await supabase.storage.from('profile-images').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) {
    throw error;
  }
  // Get public URL
  const { data: publicUrlData } = supabase.storage.from('profile-images').getPublicUrl(fileName);
  return publicUrlData?.publicUrl || null;
}
