# Neuro-Nav App 🧠🗺️

**Neuro-Nav** is a sensory-friendly navigation application designed to help neurodivergent individuals navigate cities with confidence. It prioritizes "quiet" routes, identifies safe havens, and provides tools for stress management.

## 🚀 Features

*   **Quiet Routing:** Uses **OSRM** to calculate routes that minimize sensory overload (noise, crowds).
*   **Safe Havens:** Real-time discovery of quiet places (Libraries, Parks, Cafes) using **OpenStreetMap** data.
*   **Panic Mode:** One-tap access to emergency contacts and calming tools.
*   **Community Reporting:** Report sensory hazards (construction, loud events) to warn others.
*   **Trip History:** Local storage of past trips for easy re-booking.
*   **Leaflet Maps:** currently running on a **WebView-based Leaflet Map** (OpenStreetMap), requiring NO API Keys for display.

## 🛠️ Tech Stack

*   **Framework:** React Native (Expo)
*   **Maps:** Leaflet.js (WebView) + OpenStreetMap
*   **Routing:** OSRM (Open Source Routing Machine)
*   **Storage:** AsyncStorage (Local)
*   **Auth:** Firebase (Mocked for Demo/MVP)
*   **Build:** EAS (Expo Application Services)

## 📦 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Dharaneesh20/Neuro-Nav-App.git
    cd neuro-nav-rn
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the app:
    ```bash
    npx expo start
    ```

## 🔑 Configuration (Optional)

### 🌍 Map Configuration: Leaflet vs. Google Maps

#### **Current Default: Open Source Leaflet Maps**
The application is currently configured to use **Leaflet Maps (WebView)** with OpenStreetMap.
*   **No API Key Required:** Works out of the box.
*   **Open Source:** Uses free map data.
*   **Implementation:** Located in `src/components/LeafletMap.js`.

#### **Optional: Switching to Google Maps SDK**
If you prefer the performance and look of native Google Maps, you can switch the provider. **Note: This requires an API Key and recompiling the app.**

1.  **Get an API Key:**
    *   Visit the [Google Cloud Console](https://console.cloud.google.com/).
    *   Enable **"Maps SDK for Android"**.
    *   Create a credential (API Key).

2.  **Configure the App:**
    *   Open `app.json` and add your key under `android.config.googleMaps.apiKey`:
        ```json
        "android": {
          "package": "com.dharaneeshrs007.neuronav",
          "config": {
            "googleMaps": {
              "apiKey": "PASTE_YOUR_API_KEY_HERE"
            }
          }
        }
        ```

3.  **Update Code:**
    *   In `DashboardScreen.js` and `RoutePlanningScreen.js`, replace `LeafletMap` with `MapView` (Native).

4.  **Important - Compile with Android Studio:**
    *   Native Google Maps **will not work** in Expo Go if you use custom keys.
    *   You must compile a development build or APK using **Android Studio** or **EAS Build**.

## 📸 Demo

<!-- Embed YouTube Video Here -->
[![Watch the Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

*(Paste your YouTube video link above to replace the placeholder)*

## 🤝 Contributing

1.  Fork the repo
2.  Create a feature branch
3.  Commit your changes
4.  Push to the branch
5.  Create a Pull Request

## 👤 Author

**Dharaneesh**
*   GitHub: [@Dharaneesh20](https://github.com/Dharaneesh20)
*   Email: dharaneeshrs777@gmail.com
