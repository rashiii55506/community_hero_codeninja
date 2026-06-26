# 🏙️ Civic Guardian (Hackathon Edition)

> **Transforming Urban Maintenance through AI & Gamification.**
> Built with ❤️ by **Rashi Sharma**

![Hackathon Project](https://img.shields.io/badge/Status-Hackathon_Ready-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_Tailwind_|_Framer_Motion-blue?style=for-the-badge)

🔴 **Live Demo:** [https://community-hero-693053014960.asia-southeast1.run.app/](https://community-hero-693053014960.asia-southeast1.run.app/)

## 🛑 The Problem
Traditional civic reporting is broken. Citizens face complex forms, language barriers, and zero feedback loops. Meanwhile, city councils are overwhelmed with unverified, unstructured data, making triage slow and inefficient.

## 💡 Our Solution: Civic Guardian
**Civic Guardian** is a next-generation civic-tech platform that bridges the gap between citizens and authorities. By leveraging **Google AI**, **Computer Vision**, **Multilingual AI**, and **Behavioral Gamification**, we make reporting a pothole as easy and rewarding as posting on social media, while providing authorities with a pre-triaged, actionable dashboard.

---

## ✨ The "Wow" Features (Hackathon Highlights)

### 👁️ 1. AI Vision Triage Engine (Google Gemini Vision AI)
* **Auto-Assessment:** Users upload images/videos; our AI instantly scans for structural hazards using Vision models.
* **Smart Auto-Routing:** Bypasses manual sorting. A pothole? Goes to Public Works. A broken pipe? Routed to Water & Sanitation. 
* **Severity Tagging:** Automatically flags critical issues (e.g., *Level 4 - Critical*).

### 🎙️ 2. Smart Multilingual Voice Input (Google Cloud Speech-to-Text & Translation API)
* **Break the Language Barrier:** Citizens can report issues in their native languages (Hindi, Bengali, Tamil, Marathi, etc.).
* **Real-time Translation:** Instantly converts local dialects into structured, professional English reports for the City Council dashboard.

### 🎮 3. Civic Gamification Loop
* **Extrinsic Rewards:** Citizens earn **Impact Points (XP)** for valid reports and community validation.
* **Intrinsic Motivation:** Generates official "Letters of Appreciation" from the City Council upon successful submission.
* **Ranks & Leaderboards:** Progress from 'Civic Starter' to 'Neighborhood Legend' to unlock rewards and civic vouchers.

### 🗺️ 4. Predictive Analytics & Heatmaps (Google Maps Platform)
* **Live City Grid:** Interactive visualizations of ongoing reports and neighborhood safety indices powered by Google Maps.
* **Authority Dashboard:** A smart inbox for city officials to efficiently manage, verify, and resolve issues mapped out geospatially.

---

## 🛠️ The Tech Stack (Under the Hood)

This project leverages a modern, highly-scalable stack focused on delivering a buttery-smooth user experience while handling complex AI operations efficiently.

### Frontend Architecture
* **Core:** React (v18+) & TypeScript for robust, type-safe UI components.
* **Styling:** Tailwind CSS to create a premium, cohesive Dark-Mode (`bg-slate-950`) aesthetic with high-contrast glowing elements.
* **Motion & Micro-interactions:** Framer Motion powers the immersive, game-like transitions, staggered reveals, and responsive feedback (like pulsing mics and bouncing success badges) that keep users engaged.
* **UI Tooling:** Lucide React for crisp, scalable vector icons.
* **Build Tool:** Vite for lightning-fast HMR and optimized production builds.

### ☁️ Google Cloud & AI Integrations (The Brains)
To make the platform truly intelligent, we deeply integrated Google's ecosystem:
* **Google Gemini (Vision AI):** Powers the core "Report Issue" engine. It analyzes uploaded photos/videos of civic hazards, understands the context (e.g., "pothole", "fallen tree"), assesses severity, and automatically routes the ticket to the correct municipal department.
* **Google Cloud Speech-to-Text & Translation API:** Powers the "Smart Voice Input" feature. It allows citizens to speak in their native tongue, accurately transcribes the audio, and seamlessly translates it into a structured, professional English format for the authorities.
* **Google Maps Platform:** Drives the "Live City Grid Map" and "Predictive Heatmap", placing all reports in a geospatial context, allowing authorities to visualize hotspots and optimize dispatch routes.

---

## 🚀 Quick Start (Run Locally)

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Fire up the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` to see the magic.

---

## 🔮 Future Scope (What's Next?)
* **AR X-Ray Mode:** Let citizens scan infrastructure using Augmented Reality.
* **Micro-Tendering Integration:** Allow verified local contractors to seamlessly bid on minor repairs.
* **IoT Integration:** Connect with smart city sensors for automated hazard alerts without manual reporting.

---
*Built to win. Crafted to make an impact.* 🏆
