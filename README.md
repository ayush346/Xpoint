XpointWeb — MERN Site Generator (Blue/White/Black)
==================================================

Beautiful MERN website scaffold with a consistent blue/white/black palette, smooth animations, and a text → website flow.

Tech
----
- Backend: Express, CORS, dotenv, Mongoose (optional)
- Frontend: Vite + React, Tailwind CSS, Framer Motion, Axios

Quick Start
-----------
1) Install dependencies:

```bash
# from repository root
npm install
cd server && npm install
cd ../client && npm install
```

2) (Optional) Configure MongoDB:
- Create a MongoDB URI. If omitted, the server runs in in-memory mode.
- Create a `.env` file in `server/`:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/xpointweb
NODE_ENV=development
```

3) Run development servers (concurrently):

```bash
# from repository root
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:5000

Build and Serve
---------------
```bash
cd client && npm run build
cd ..
npm run start
```

This serves the API and (if `NODE_ENV=production`) static files from `client/dist`.

How it Works
------------
- Paste your text in the Upload panel. The first short line becomes the title; blank lines split sections.
- The server parses and returns structured content. If MongoDB is configured, it also saves content.
- The client renders animated sections with Tailwind + Framer Motion using a consistent blue/white/black theme.

Adjust Theme
------------
- Tailwind colors are defined in `client/tailwind.config.js` under `primary`, `ink`, `surface`, etc.
- CSS variables and utility classes live in `client/src/index.css`.





