import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const GUESTBOOK_FILE = path.join(process.cwd(), "guestbook-data.json");

// Helper to read guestbook data
function readGuestbook(): any[] {
  try {
    if (fs.existsSync(GUESTBOOK_FILE)) {
      const data = fs.readFileSync(GUESTBOOK_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Gagal membaca guestbook file, menggunakan fallback memory:", error);
  }
  return [
    {
      id: "demo-1",
      name: "Bintang Aurora",
      message: "Website portofolio yang sangat indah! Tema Moonlit Universe-nya terasa magis sekali. Desain visualnya luar biasa.",
      rating: 5,
      date: "2026-07-01T10:30:00Z"
    },
    {
      id: "demo-2",
      name: "Rian Cahaya",
      message: "Fitur Ask Sapphire sangat responsif dan membantu menjelaskan proyek-proyek Anda. Sukses terus!",
      rating: 5,
      date: "2026-07-03T15:45:00Z"
    }
  ];
}

// Helper to write guestbook data
function writeGuestbook(data: any[]) {
  try {
    fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Gagal menyimpan data guestbook:", error);
  }
}

// Body parsing middleware
app.use(express.json());

// API: Guestbook GET
app.get("/api/guestbook", (req, res) => {
  const entries = readGuestbook();
  // Urutkan berdasarkan tanggal terbaru
  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  res.json(entries);
});

// API: Guestbook POST
app.post("/api/guestbook", (req, res) => {
  try {
    const { name, message, rating } = req.body;
    if (!name || !message || typeof rating !== "number") {
      res.status(400).json({ error: "Nama, pesan, dan rating (angka) wajib diisi." });
      return;
    }

    const newEntry = {
      id: "gb-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      name: name.substring(0, 50),
      message: message.substring(0, 500),
      rating: Math.max(1, Math.min(5, rating)),
      date: new Date().toISOString()
    };

    const entries = readGuestbook();
    entries.push(newEntry);
    writeGuestbook(entries);

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error pada POST /api/guestbook:", error);
    res.status(500).json({ error: "Terjadi kesalahan internal pada server." });
  }
});

// Vite & Static Asset Handling
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode: Mount Vite's middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server mounted.");
  } else {
    // Production Mode: Serve static files built by Vite
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static build routing setup completed.");
  }

  // Bind to port 3000 and host 0.0.0.0
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MoonlitSapphire 2.0 server running on http://localhost:${PORT}`);
  });
}

setupServer();
