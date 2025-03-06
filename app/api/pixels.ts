"use server"

import { createSupabaseServer } from '@/lib/supabase/server';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.from('square_pixels').select();
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ data });
}
