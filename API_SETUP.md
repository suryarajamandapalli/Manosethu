# MANOSETHU PLATFORM — API SETUP & CREDENTIAL GUIDE

**Project**: MANOSETHU · Continuous Emotional Wellbeing & Distress Monitoring Platform  
**Core Principle**: *AI assists. Humans decide. People receive support.*

---

## Service Configuration Overview

| Service | Purpose | Status | Environment Variable | Location | Source |
|---|---|---|---|---|---|
| **Deterministic Scoring Engine** | Dynamic Distress Score (0–100), Risk Bands, Escalation Engine | **BUILT-IN (Active)** | None (Local Engine) | Frontend & Backend | Built-in |
| **Google Gemini AI** | Multimodal text & audio understanding, signal extraction | **OPTIONAL** | `GEMINI_API_KEY` | Backend Only | Google AI Studio |
| **Firebase Web** | Authentication, database persistence, session tracking | **CONFIGURED** | `VITE_FIREBASE_*` | Frontend | Firebase Console |
| **Communication Gateway (Twilio)** | SMS reminders & IVRS notifications | **OPTIONAL** | `TWILIO_*` | Backend Only | Twilio Console |

---

## Detailed Service Specifications

### 1. Google Gemini AI Service
- **Purpose**: Generates structured JSON distress signals from free-form victim notes and voice transcripts, and outputs plain-language explanations.
- **Requirement**: **OPTIONAL** (MANOSETHU includes an integrated deterministic scoring engine that operates with 100% functionality when an API key is absent).
- **Environment Variable**: `GEMINI_API_KEY`
- **Frontend or Backend**: **Backend / Server-side Only**.
- **Where to Obtain**: [https://aistudio.google.com/](https://aistudio.google.com/)
- **Security Requirement**: NEVER expose `GEMINI_API_KEY` in client-side Vite environment variables (`VITE_*`) or commit to Git repositories.

### 2. Firebase Web Service
- **Purpose**: Provides client-side real-time database syncing, user authentication, and data backup.
- **Requirement**: **CONFIGURED** (Pre-configured with defaults in `src/lib/firebase.ts`; custom project keys can be supplied via environment variables).
- **Environment Variables**:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
  - `VITE_FIREBASE_DATABASE_URL`
- **Frontend or Backend**: **Frontend**.
- **Where to Obtain**: [https://console.firebase.google.com/](https://console.firebase.google.com/)
- **Security Requirement**: Firebase Web API keys identify the project and must be protected by Firebase Security Rules restricting read/write access to authenticated roles.

### 3. Communication Gateway (Twilio / SMS / IVRS)
- **Purpose**: Dispatches check-in SMS notifications and helpline follow-up triggers.
- **Requirement**: **CONFIGURED** (Credentials populated in `.env`; operates in live mode when active, and falls back gracefully to `QUEUED / LOGGED` mode if network/number restrictions occur).
- **Environment Variables**:
  - `TWILIO_ACCOUNT_SID`
  - `TWILIO_AUTH_TOKEN`
  - `TWILIO_FROM_NUMBER`
- **Frontend or Backend**: **Backend / Secure Dispatcher**.
- **Where to Obtain**: [https://www.twilio.com/console](https://www.twilio.com/console)
- **Security Requirement**: API secrets must be held strictly in server-side process environments.
