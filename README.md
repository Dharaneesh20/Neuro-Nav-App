# 📱 Neuro-Nav Android App v4.0

<div align="center">

<img src="assets/logo.png" alt="Neuro-Nav Logo" width="150" height="150" />

[![Download APK](https://img.shields.io/badge/Download-Android%20APK%20v4.0.0-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://github.com/Dharaneesh20/Neuro-Nav-App/releases/tag/v4.0.0)

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Dharaneesh20/Neuro-Nav-App)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)
[![React Native](https://img.shields.io/badge/Built%20with-React%20Native-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)

> **Navigate your city with confidence.** Neuro-Nav helps neurodivergent individuals and people with sensory sensitivities navigate urban environments while minimizing sensory overload.

</div>

---

## 🎯 About Neuro-Nav

Neuro-Nav v4.0 is a sensory-friendly navigation app for individuals with ASD, ADHD, anxiety, or sensory sensitivities.

**Core Philosophy:** We believe everyone deserves to navigate their world with confidence. We prioritize sensory wellness to make cities more accessible.

---



## 📸 App Screenshots

<div align="center">

| **Dashboard** | **Gemini AI** | **Route Planning** |
|:---:|:---:|:---:|
| <img src="https://i.ibb.co/MyZdrMX2/Screenshot-20260105-123143-neuro-nav-rn.png" width="240" /> | <img src="https://i.ibb.co/7NLqk7Hm/Screenshot-20260105-123136-neuro-nav-rn.png" width="240" /> | <img src="https://i.ibb.co/Mx7qdL59/Screenshot-20260105-123331-neuro-nav-rn.png" width="240" /> |
| **Central Hub** | **Smart Assistant** | **Quiet Routes** |

| **Panic Mode** | **Community** | **Trip History** |
|:---:|:---:|:---:|
| <img src="https://i.ibb.co/7J6fY1KP/Screenshot-20260105-123151-neuro-nav-rn.png" width="240" /> | <img src="https://i.ibb.co/dwZ7c2Ws/Screenshot-20260105-123210-neuro-nav-rn.png" width="240" /> | <img src="https://i.ibb.co/KxdFCHxS/Screenshot-20260105-123506-neuro-nav-rn.png" width="240" /> |
| **Quick Safety** | **Hazards & Reports** | **Journey Logs** |

</div>

---

## 🚀 What's New in v4.0

### v4.0.0 (Latest)
- **🤖 Gemini AI Assistant**: Powered by Gemini 2.5 Flash for instant, context-aware responses.
- **🔄 Dynamic Map Switching**: Toggle between OpenStreetMap and Google Maps instantly.
- **🆘 Enhanced Panic Mode**: Visual breathing guides and one-tap Safe Haven navigation.
- **☁️ Cloud Build System**: Reliable, secure Android builds via EAS.
- **🎵 Spotify Integration**: Curated calming playlists and music control.

### v3.0.0 Beta
> ⚠️ **Discontinued**: This version had critical stability issues and has been retracted. Please use v4.0.0.

---

## 🌟 Core Features

### 🗺️ Intelligent Navigation
- **Quiet Routing with OSRM** - Routes minimizing sensory overload
- **Real-time Sensory Data** - Noise levels, crowd density, light intensity
- **Safe Route Recommendations** - AI-powered suggestions
- **GPS Navigation** - Turn-by-turn guidance with sensory awareness

### 🏘️ Safe Haven Discovery
- **Real-time Mapping** - Libraries, parks, cafes, sensory-friendly spaces
- **OpenStreetMap Integration** - Community-curated locations
- **Detailed Information** - Crowd levels, noise assessments, user reviews
- **One-Tap Directions** - Instant navigation to nearest haven

### 👥 Community Features
- Flag construction, loud events, or crowded areas
- See reports from other users about problematic locations
- Share peaceful routes with the community
- Rate locations with detailed sensory feedback

### 📱 User Experience
- **Intuitive Mobile UI** - Easy one-handed operation
- **Dark Mode Support** - Reduces eye strain
- **Accessibility First** - Voice navigation, large text, high contrast
- **Lightweight** - ~50MB download, optimized performance

---

## 📥 Quick Download

**[⬇️ Download Neuro-Nav v4.0.0 APK](https://github.com/Dharaneesh20/Neuro-Nav-App/releases/tag/v4.0.0)**

- **File Size:** ~50MB
- **Android Version:** 8.0+
- **Latest Release:** January 2026 (v4.0.0)

---

## 🛠️ Technology Stack

### Framework & Tools
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and build system
- **Node.js 16+** - Runtime environment

### AI & Intelligence
- **Google Gemini 2.5 Flash API** - AI assistant and recommendations
- **Firebase ML** - Sensory data processing

### Maps & Routing
- **Leaflet.js** - Default Open Source Map
- **Google Maps** - Optional (User-provided API Key)
- **OpenStreetMap** - Free, community-curated data

### Data & Storage
- **AsyncStorage** - Local device storage
- **Firebase** - Authentication and user management
- **Firebase Realtime Database** - Community reports sync

### Media Integration
- **Spotify Web API** - Calming music and playlists

---

## 📱 Installation & Setup

### Option 1: Install APK (Recommended)

#### Step 1: Download
Click here: **[Neuro-Nav v4.0.0 APK](https://github.com/Dharaneesh20/Neuro-Nav-App/releases/tag/v4.0.0)**

#### Step 2: Enable Unknown Sources
1. Open **Settings** → **Apps & notifications**
2. Tap **Special access** → **Install unknown apps**
3. Select your browser and enable **"Allow from this source"**

#### Step 3: Install
1. Open the downloaded APK file
2. Tap **Install** and wait for completion
3. Launch Neuro-Nav from your app drawer

#### Step 4: Grant Permissions
Allow these permissions for full functionality:
- ✅ **Location** - Route planning and safe haven discovery
- ✅ **Contacts** - Emergency contacts
- ⭕ **Camera** - Environment sensing (optional)
- ⭕ **Microphone** - Ambient noise analysis (optional)

#### Step 5: Complete Setup
1. Create your account or sign in
2. Set up your sensory profile
3. Customize safety contacts
4. Start navigating!

### Option 2: Build from Source

#### Prerequisites
- Node.js 16.0+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

#### Build Steps

```bash
# Clone repository
git clone https://github.com/Dharaneesh20/Neuro-Nav-App.git
cd Neuro-Nav-App

# Install dependencies
npm install

# Run development build
npx expo start

# Build APK
eas build --platform android
```

---

## 🔐 Configuration

### Gemini AI Setup

To enable AI assistant features:

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

### Firebase Configuration

1. Create project at [firebase.google.com](https://firebase.google.com/)
2. Enable Authentication (Email + Google)
3. Create Realtime Database
4. Add credentials to `.env`:
   ```env
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_domain
   FIREBASE_PROJECT_ID=your_project_id
   ```

### Spotify Integration (Optional)

1. Create app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Add credentials:
   ```env
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   ```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **APK won't install** | Enable "Install from Unknown Sources" in Settings |
| **Map not loading** | Check internet connection; restart app |
| **Location not updating** | Enable GPS; grant location permission |
| **AI assistant not responding** | Verify internet connection; check Gemini API status |
| **Panic button unresponsive** | Restart app; ensure emergency contacts are set |

**Need more help?** Open an issue on [GitHub](https://github.com/Dharaneesh20/Neuro-Nav-App/issues)

---



---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m "Add YourFeature"`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a Pull Request

### Areas We Need Help
- 🤖 AI prompt engineering and training
- 🗺️ Better routing algorithms
- 🎨 UI/UX improvements
- 🌍 Localization (translations)
- 🐛 Bug fixes and testing

---

## 📋 Roadmap

### Current Status (v4.0.0) ✅
- [x] Gemini AI assistant integration
- [x] Enhanced panic mode with visual breathing
- [x] Spotify music integration
- [x] Cloud Build System (EAS)
- [x] Advanced trip history

### Planned (v4.1.0) 🚀
- [ ] Real-time noise level API integration
- [ ] Offline map downloading
- [ ] Push notifications for hazard alerts
- [ ] Multi-language support
- [ ] Wearable device integration

### Future Vision (v5.0.0) 📅
- [ ] AR navigation overlays
- [ ] Machine learning route personalization
- [ ] Social features (friend tracking, group navigation)
- [ ] Public transit integration

---

## 📞 Support & Contact

- **GitHub Issues**: [Report bugs](https://github.com/Dharaneesh20/Neuro-Nav-App/issues)
- **Email**: dharaneeshrs777@gmail.com
- **GitHub**: [@Dharaneesh20](https://github.com/Dharaneesh20)
- **Web App**: [neuro-nav-327583870558.us-central1.run.app](https://neuro-nav-327583870558.us-central1.run.app/)

---

## 📄 License

This project is licensed under the **ISC License**. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

**Technologies**
- React Native & Expo
- Google Gemini API
- OSRM & OpenStreetMap
- Firebase & Spotify

**Community**
- Neurodivergent community for inspiration
- Open source contributors
- All users providing feedback

---

<div align="center">

## 🌟 Mission Statement

**"We believe everyone deserves to navigate their world with confidence and comfort."**

Neuro-Nav is committed to creating a more accessible, inclusive urban experience for individuals with sensory sensitivities and invisible disabilities.

---

### 🎯 Get Started Today
**Download Neuro-Nav and navigate with confidence!**

Available on Android 8.0+

---

**Help us make cities calmer!** Give us a ⭐ on [GitHub](https://github.com/Dharaneesh20/Neuro-Nav-App)

Made with ❤️ for a calmer world

[![GitHub](https://img.shields.io/badge/GitHub-Dharaneesh20-181717?style=flat-square&logo=github)](https://github.com/Dharaneesh20)


</div>

---

**Last Updated:** January 25, 2026 | Version 4.0.0 | Android 8.0+
