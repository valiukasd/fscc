# FSCC task

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). It features NativeWind for web-like styling and Jotai for atomic state management. It implements a simple login flow with reusable Button and Input components. The button features variants that you can pass as props, so we could implement a desctructive (red) button for example. The app handles the authentication with a [CRUD http API](https://mockapi.io/clone/66bca4db24da2de7ff6b5a06) and saves the token using the React Native AsyncStorage API.

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
    yarn dev
   ```

In the output, you'll find options to open the app in a

- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Android device](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=physical&mode=development-build&buildEnv=local)
- [iOS device](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical&mode=development-build&buildEnv=local)
