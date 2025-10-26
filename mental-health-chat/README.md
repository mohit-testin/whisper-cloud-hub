# Mental Health Companion Chat

A voice and text-enabled mental health companion interface.

## Features
- Speech-to-Text (STT) using Deepgram
- Text-to-Speech (TTS) using Web Speech API
- Text input support
- Black & White minimalist UI
- Connects to FastAPI backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
VITE_DEEPGRAM_API_KEY=decce0a88f205bc23c614342ff54bbe5f3500879
VITE_API_URL=https://humi-fastapi.onrender.com/chat
```

3. Run:
```bash
npm run dev
```

## Tech Stack
- React + TypeScript
- Vite
- Deepgram (STT)
- Web Speech API (TTS)
- Tailwind CSS
