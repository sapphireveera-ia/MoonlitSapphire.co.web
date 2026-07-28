import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

// Vercel functions only have a writable /tmp — not the project folder.
// /tmp is NOT persistent across deploys or cold starts, so this is a
// short-term stand-in. Swap for a real DB (Vercel KV, Upstash, Supabase, etc.)
// when there's time; for now new entries just won't survive forever.
const RUNTIME_FILE = path.join('/tmp', 'guestbook-data.json');
const SEED_FILE = path.join(process.cwd(), 'guestbook-data.json');

function readGuestbook(): any[] {
  try {
    if (fs.existsSync(RUNTIME_FILE)) {
      return JSON.parse(fs.readFileSync(RUNTIME_FILE, 'utf-8'));
    }
    if (fs.existsSync(SEED_FILE)) {
      return JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8'));
    }
  } catch (error) {
    console.error('Gagal membaca guestbook file:', error);
  }
  return [];
}

function writeGuestbook(data: any[]) {
  try {
    fs.writeFileSync(RUNTIME_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Gagal menyimpan data guestbook:', error);
  }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const entries = readGuestbook();
    entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return res.status(200).json(entries);
  }

  if (req.method === 'POST') {
    try {
      const { name, message, rating } = req.body || {};
      if (!name || !message || typeof rating !== 'number') {
        return res.status(400).json({ error: 'Nama, pesan, dan rating (angka) wajib diisi.' });
      }

      const newEntry = {
        id: 'gb-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        name: String(name).substring(0, 50),
        message: String(message).substring(0, 500),
        rating: Math.max(1, Math.min(5, rating)),
        date: new Date().toISOString(),
      };

      const entries = readGuestbook();
      entries.push(newEntry);
      writeGuestbook(entries);

      return res.status(201).json(newEntry);
    } catch (error) {
      console.error('Error pada POST /api/guestbook:', error);
      return res.status(500).json({ error: 'Terjadi kesalahan internal pada server.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
