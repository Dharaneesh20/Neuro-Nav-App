# 📱 Neuro-Nav Android App

[![Download APK](https://img.shields.io/badge/Download-Android%20APK%20v1.0.0-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://github.com/Dharaneesh20/Neuro-Nav-App/releases/download/v1.0.0/application-7a681380-8df6-43f7-b8b0-0f81515ec6e7.apk)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Dharaneesh20/Neuro-Nav-App)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)
[![React Native](https://img.shields.io/badge/Built%20with-React%20Native-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)

> **Navigate your city with confidence.** Neuro-Nav Android helps neurodivergent individuals and people with sensory sensitivities navigate urban environments while minimizing sensory overload.

---

## 🎯 About Neuro-Nav Android

Neuro-Nav Android is a mobile-first sensory-friendly navigation application designed for individuals with:
- **Autism Spectrum Disorder (ASD)** with sensory sensitivities
- **Anxiety disorders** triggered by crowds and noise
- **ADHD** requiring calm navigation routes
- **Sensory processing disorders**
- Anyone seeking a **calmer urban experience**

The app combines **real-time sensory data**, **AI-powered routing**, and **community insights** to create personalized, stress-free navigation routes through cities.

### Core Philosophy
**We believe everyone deserves to navigate their world with confidence and comfort.** By prioritizing sensory wellness in navigation, Neuro-Nav makes cities more accessible for neurodivergent individuals.

---

## 📥 Quick Download

### Get the App Now

**[⬇️ Download Neuro-Nav v1.0.0 APK](https://github.com/Dharaneesh20/Neuro-Nav-App/releases/download/v1.0.0/application-7a681380-8df6-43f7-b8b0-0f81515ec6e7.apk)**

- **File Size:** ~50MB
- **Android Version:** 8.0+
- **Latest Release:** January 2026

---

## 🚀 Features

### 🗺️ Intelligent Navigation
- **Quiet Routing with OSRM** - Calculates routes minimizing sensory overload (noise, crowds)
- **Real-time Sensory Data** - Access noise levels, crowd density, and light intensity
- **Safe Route Recommendations** - AI-powered suggestions based on your sensitivity profile
- **Trip History** - Local storage of past trips for easy re-booking
- **GPS Navigation** - Real-time location tracking and turn-by-turn guidance

### 🏘️ Safe Haven Discovery
- **Real-time Safe Place Mapping** - Find libraries, parks, cafes, and sensory-friendly spaces
- **OpenStreetMap Integration** - Community-curated locations with detailed information
- **Location Details** - Crowd levels, noise assessments, and user reviews
- **One-Tap Directions** - Instant navigation to nearest safe haven
- **Community Ratings** - User feedback on sensory-friendliness

### 🆘 Emergency Support
- **Panic Mode** - One-tap emergency button to find immediate safety
- **Quick Access to Contacts** - Emergency contact management
- **Calming Tools** - Built-in relaxation features during stress
- **Crisis Resources** - Quick access to support hotlines and resources
- **Safe Haven Priority** - Immediately routes to nearest quiet location

### 👥 Community Features
- **Report Sensory Hazards** - Flag construction, loud events, or crowded areas
- **Community Warnings** - See reports from other users about problematic areas
- **Share Safe Routes** - Publish peaceful routes for community benefit
- **Rate Locations** - Provide detailed sensory feedback on places
- **Trip Sharing** - Share your journey with trusted community members

### 📊 Personal Wellness Tools
- **Sensory Profile Setup** - Customize sensitivity to specific triggers
- **Mood Tracking** - Monitor your comfort level throughout the day
- **Stress Level Indicator** - Real-time anxiety/overload assessment
- **Route Analytics** - View trends in your navigation patterns
- **Preference Learning** - App learns your sensory preferences over time

### 🎨 User Experience
- **Intuitive Mobile UI** - Designed for easy one-handed operation
- **Dark Mode Support** - Reduces eye strain during evening navigation
- **Offline Functionality** - Access previously viewed maps without internet
- **Accessibility First** - Voice navigation, large text options, high contrast
- **Lightweight** - ~50MB download, optimized for all Android devices

---

## 🛠️ Technology Stack

### Framework & Tools
```
React Native            - Cross-platform mobile framework
Expo                    - Development platform and build system
Node.js 16+             - Runtime environment
npm/yarn                - Package management
```

### Maps & Routing
```
Leaflet.js              - WebView-based mapping library
OpenStreetMap           - Free, community-curated map tiles
OSRM                    - Open Source Routing Machine (quiet routing)
Geolocation API         - GPS and location services
```

### Data & Storage
```
AsyncStorage            - Local device storage (no cloud required)
Firebase                - Authentication and user management
Google Sheets API       - Sensory data collection and sync
```

### Build & Deployment
```
EAS Build               - Expo cloud build service
Android Studio          - Local APK compilation (optional)
Gradle                  - Android build system
```

---

## 📱 Installation & Setup

### Option 1: Download & Install APK (Recommended for Users)

#### Step 1: Download the APK
1. Click here to download: **[Neuro-Nav v1.0.0 APK](https://github.com/Dharaneesh20/Neuro-Nav-App/releases/download/v1.0.0/application-7a681380-8df6-43f7-b8b0-0f81515ec6e7.apk)**
2. Wait for download to complete (~50MB)
3. Save to your Downloads folder

#### Step 2: Enable Installation from Unknown Sources
1. Open **Settings** → **Apps & notifications**
2. Tap **Advanced** → **Special access** → **Install unknown apps**
3. Select your browser or file manager
4. Toggle **"Allow from this source"** ON

#### Step 3: Install the App
1. Open **Files** or **Downloads** app
2. Locate `application-7a681380-8df6-43f7-b8b0-0f81515ec6e7.apk`
3. Tap the file to install
4. Review permissions and tap **Install**
5. Wait for installation to complete
6. Tap **Open** or find Neuro-Nav in your app drawer

#### Step 4: Grant Permissions
When you first launch the app, you'll be asked to allow:
- ✅ **Location** - For route planning and safe haven discovery
- ✅ **Camera** - For environment sensing (optional)
- ✅ **Microphone** - For ambient noise analysis (optional)
- ✅ **Contacts** - For emergency contacts

Grant these permissions to unlock full functionality.

#### Step 5: Complete Onboarding
1. Create your account (Firebase authentication)
2. Set up your sensory profile with trigger preferences
3. Customize your safety contacts
4. Explore the map and available features

### Option 2: Build from Source (For Developers)

#### Prerequisites
- **Node.js** 16.0 or higher
- **npm** or **yarn**
- **Git**
- **Expo CLI**: `npm install -g expo-cli`
- **(Optional) Android Studio** for native builds

#### Installation Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/Dharaneesh20/Neuro-Nav-App.git
   cd Neuro-Nav-App
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment (Optional)**
   Create `.env` file in root directory:
   ```env
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_domain
   FIREBASE_PROJECT_ID=your_project_id
   GOOGLE_MAPS_API_KEY=your_maps_key
   ```

4. **Run Development Build**
   ```bash
   npx expo start
   ```
   - Scan QR code with **Expo Go** app on your Android device
   - Or press `a` to open Android emulator

5. **Build APK with Expo**
   ```bash
   eas build --platform android
   # Follow prompts to create development or production build
   ```

6. **Local Build with Android Studio** (Advanced)
   ```bash
   eas build --platform android --local
   # Requires Android Studio and JDK configured
   ```

---

## 🔐 Configuration & Customization

### Map Configuration

#### **Default: OpenStreetMap with Leaflet** ✅
The app uses **free, open-source mapping** by default:
- ✅ **No API key required**
- ✅ **Works out of the box**
- ✅ **Privacy-respecting** (no tracking)
- ✅ **Lightweight** performance
- Location: `src/components/LeafletMap.js`

#### **Optional: Google Maps Integration**
Switch to native Google Maps for enhanced performance:

1. **Get API Key**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project
   - Enable **"Maps SDK for Android"**
   - Create **API Key** credential

2. **Configure in app.json**
   ```json
   {
     "expo": {
       "android": {
         "package": "com.dharaneeshrs007.neuronav",
         "config": {
           "googleMaps": {
             "apiKey": "YOUR_GOOGLE_MAPS_API_KEY_HERE"
           }
         }
       }
     }
   }
   ```

3. **Update Components**
   - In `src/screens/DashboardScreen.js`, replace `LeafletMap` with `GoogleMapView`
   - In `src/screens/RoutePlanningScreen.js`, do the same

4. **Compile New Build**
   ```bash
   # Must build APK, Expo Go won't support custom Google Maps key
   eas build --platform android
   # or locally
   eas build --platform android --local
   ```

### Firebase Configuration

For authentication and data sync, configure Firebase:

1. Create project at [firebase.google.com](https://firebase.google.com/)
2. Enable **Authentication** (Email + Google Sign-in)
3. Create **Realtime Database** or **Firestore**
4. Get credentials from Project Settings
5. Add to `.env`:
   ```env
   FIREBASE_API_KEY=AIzaSy...
   FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
   FIREBASE_PROJECT_ID=project-id
   ```

### Sensory Profile Customization

Users can fully customize their sensory preferences:

- **Noise Sensitivity** - Adjust route avoidance for loud areas (0-100%)
- **Crowd Tolerance** - Set comfort level for crowded routes
- **Light Sensitivity** - Prefer dimly lit areas
- **Visual Complexity** - Avoid visually overwhelming environments
- **Personal Triggers** - Add custom sensory triggers to avoid

---

## 📊 File Structure

```
Neuro-Nav-App/
│
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js           # App entry & main menu
│   │   ├── DashboardScreen.js      # Map & navigation hub
│   │   ├── RoutePlanningScreen.js  # Route calculation & preview
│   │   ├── SafeHavensScreen.js     # Browse nearby safe places
│   │   ├── PanicScreen.js          # Emergency mode
│   │   ├── ProfileScreen.js        # User preferences & settings
│   │   └── HistoryScreen.js        # Past trips & routes
│   │
│   ├── components/
│   │   ├── LeafletMap.js           # OpenStreetMap display
│   │   ├── GoogleMapView.js        # Google Maps (optional)
│   │   ├── RouteCard.js            # Route summary component
│   │   ├── SafeHavenCard.js        # Location preview card
│   │   ├── PanicButton.js          # Emergency button
│   │   ├── SensorySlider.js        # Sensitivity controls
│   │   └── PermissionHandler.js    # Location & camera access
│   │
│   ├── services/
│   │   ├── OSRMService.js          # Route calculations
│   │   ├── LocationService.js      # GPS & geolocation
│   │   ├── FirebaseService.js      # Auth & database
│   │   └── AsyncStorageService.js  # Local data storage
│   │
│   ├── context/
│   │   ├── AuthContext.js          # User authentication state
│   │   ├── SensoryContext.js       # Sensory preferences
│   │   └── LocationContext.js      # Current location
│   │
│   ├── assets/
│   │   ├── images/                 # Icons and graphics
│   │   └── sounds/                 # Calming audio files
│   │
│   └── App.js                      # App root & navigation
│
├── app.json                        # Expo configuration
├── app.config.js                   # Environment-specific config
├── package.json                    # Dependencies
└── README.md                       # Main project README
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] App launches without errors
- [ ] Location permission prompt appears
- [ ] Map loads with current location marker
- [ ] Safe havens display correctly on map
- [ ] Route planning calculates quiet routes
- [ ] Panic button accessible from any screen
- [ ] Trip history saves locally
- [ ] Community reports appear on map
- [ ] Sensory profile settings persist
- [ ] Dark mode toggle works smoothly
- [ ] Offline map viewing works
- [ ] Emergency contacts loadable
- [ ] Rate and review features functional

### Device Support
| Device | Support |
|--------|---------|
| **Android 8.0+** | ✅ Full Support |
| **Android 9.0+** | ✅ Recommended |
| **Android 10.0+** | ✅ Optimal |
| **ARM/x86** | ✅ Both architectures |
| **Tablets** | ✅ Fully responsive |

### Browser Testing (Expo Go)
- Download **Expo Go** app from Google Play Store
- Scan QR code from `npx expo start`
- Test all features in real-time

---

## 📈 Performance Optimizations

- **Lightweight Build** - ~50MB APK size
- **Lazy Loading** - Maps and heavy components load on-demand
- **Local Caching** - Reduce network calls with AsyncStorage
- **Image Optimization** - Compressed icons and assets
- **Code Splitting** - Route-based bundle optimization
- **Memory Management** - Efficient component lifecycle

---

## 🔒 Security & Privacy

### Data Protection
- **Local-First Design** - Most data stored locally on device
- **Encrypted Authentication** - Firebase handles security
- **Minimal Cloud Data** - Only sharing reports requires cloud sync
- **No Tracking** - We don't track user movements
- **User Control** - Full control over what data is shared

### Permissions Rationale
| Permission | Purpose | Required? |
|-----------|---------|-----------|
| Location | Route planning & safe haven discovery | ✅ Yes |
| Camera | Environment sensing (sensory analysis) | ⭕ Optional |
| Microphone | Ambient noise detection | ⭕ Optional |
| Contacts | Emergency contact management | ✅ Yes |
| Storage | Offline maps & trip cache | ✅ Yes |

### Privacy Policy
- No advertisement tracking
- No user movement logs stored remotely
- Community reports are anonymized
- Users can delete their data anytime
- Open-source codebase for transparency

---

## 🐛 Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| **APK won't install** | Enable "Unknown Sources" in Settings → Apps & notifications → Special access |
| **Map not loading** | Check internet connection; try restarting app |
| **Location not updating** | Enable GPS in Settings; grant location permission |
| **Routes not calculating** | Check internet connection; verify OSRM service is available |
| **Panic button not responding** | Restart app; check if emergency contacts are set |
| **App crashes on startup** | Uninstall and reinstall; clear app cache in Settings |
| **Offline map not working** | Download area first while connected to internet |

### Advanced Troubleshooting

**Clear App Data (Resets Everything)**
1. Settings → Apps → Neuro-Nav
2. Tap **Storage** → **Clear Cache** or **Clear Storage**
3. Relaunch app

**Check System Logs**
```bash
adb logcat | grep "NeuroNav"
```

**Report Issues**
- GitHub: [Issues](https://github.com/Dharaneesh20/Neuro-Nav-App/issues)
- Email: dharaneeshrs777@gmail.com

---

## 🤝 Contributing

Want to help make Neuro-Nav better? Contributions are welcome!

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/Dharaneesh20/Neuro-Nav-App.git
   cd Neuro-Nav-App
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Make Changes**
   - Follow existing code style
   - Test thoroughly on real device
   - Comment complex logic

4. **Commit Changes**
   ```bash
   git commit -m "Add: Description of your changes"
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Open Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Ensure all tests pass

### Areas We Need Help With
- 🗺️ **Better Routing Algorithms** - Improve OSRM quiet routing
- 🎨 **UI/UX Improvements** - Accessibility and design enhancements
- 🌍 **Localization** - Translate to more languages
- 🐛 **Bug Fixes** - Find and fix issues
- 📖 **Documentation** - Improve guides and setup docs
- 🧪 **Testing** - Help test on different devices

---

## 📋 Roadmap

### Current Status (v1.0.0) ✅
- [x] Core OSRM routing implementation
- [x] Safe haven discovery with OpenStreetMap
- [x] Panic mode with emergency contacts
- [x] Trip history and local storage
- [x] Community reporting system
- [x] Sensory profile customization

### Planned Features (v1.1.0) 🚀
- [ ] Real-time noise level API integration
- [ ] Advanced AI-powered sensory detection
- [ ] Offline map downloading
- [ ] Push notifications for alerts
- [ ] Community leaderboard
- [ ] Dark theme optimization

### Future Vision (v2.0.0) 📅
- [ ] Wearable device integration
- [ ] Multi-language support (10+ languages)
- [ ] Advanced AR navigation
- [ ] Personalized ML-based routing
- [ ] Integration with public transit apps
- [ ] Social features (friend tracking, group navigation)

---

## 📞 Support & Contact

Need help? We're here!

- **GitHub Issues**: [Report bugs & request features](https://github.com/Dharaneesh20/Neuro-Nav-App/issues)
- **Email**: dharaneeshrs777@gmail.com
- **GitHub Profile**: [@Dharaneesh20](https://github.com/Dharaneesh20)
- **Live App**: [neuro-nav-327583870558.us-central1.run.app](https://neuro-nav-327583870558.us-central1.run.app/)

---

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2026 Dharaneesh

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Technologies
- **React Native** - Cross-platform mobile framework
- **Expo** - Development and build platform
- **OSRM** - Open Source Routing Machine
- **OpenStreetMap** - Community-driven map data
- **Leaflet** - Lightweight mapping library
- **Firebase** - Authentication and backend services

### Community
- Neurodivergent community for inspiration
- Open source contributors
- Firebase and Expo teams
- All users providing feedback

### Support
- **Google Cloud Platform** - Hosting
- **Expo** - Build services
- **OpenStreetMap Foundation** - Map data

---

## 🌟 Mission Statement

**"We believe everyone deserves to navigate their world with confidence and comfort."**

Neuro-Nav is committed to creating a more accessible, inclusive urban experience for individuals with sensory sensitivities and invisible disabilities. Through technology and community support, we're making cities safer and calmer for everyone.

---

<div align="center">

### 🎯 Get Started Today

**Download Neuro-Nav and navigate with confidence!**

[![Download APK](https://img.shields.io/badge/DOWNLOAD-Android%20APK%20v1.0.0-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://github.com/Dharaneesh20/Neuro-Nav-App/releases/download/v1.0.0/application-7a681380-8df6-43f7-b8b0-0f81515ec6e7.apk)

**Available on Android 8.0+**

---

**Help us make cities calmer!** Give us a ⭐ on [GitHub](https://github.com/Dharaneesh20/Neuro-Nav-App)

[📱 Download APK](https://github.com/Dharaneesh20/Neuro-Nav-App/releases/download/v1.0.0/application-7a681380-8df6-43f7-b8b0-0f81515ec6e7.apk) • [🌐 Web Version](https://neuro-nav-327583870558.us-central1.run.app/) • [💻 GitHub](https://github.com/Dharaneesh20/Neuro-Nav-App)

**Made with ❤️ for a calmer world**

</div>

---

**Last Updated:** January 3, 2026 | Version 1.0.0 | Android 8.0+
