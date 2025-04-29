import 'dotenv/config';
export default {
  expo: {
    name: "Almutasaweq",
    slug: "Almutasaweq",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true
    },

    android: {
      package: "com.ammar.almutasaweq",
      usesCleartextTraffic: true,
      adaptiveIcon: {
        foregroundImage: "./src/Assets/images/app-icon.png",
        backgroundColor:'#f8f9fa'
      }
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/Assets/images/header.png"
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./src/Assets/images/header.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: '#f8f9fa'
        }
      ]
    ],

    experiments: {
      typedRoutes: true
    },

    updates: {
      url: "https://u.expo.dev/008a3683-266a-471c-b6e8-1db6c493eaa7"
    },

    // ✅ FIXED: Changed from { policy: "appVersion" } to fixed string
    runtimeVersion: "1.0.0",

    extra: {
      eas: {
        projectId: "b6eeaa7b-5659-4dd8-a1b7-f25f4f5b13c6" 
      },
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL
    }
  }
};
