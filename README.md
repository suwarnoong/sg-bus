# Installation

- Run `yarn npm-reinstall`
- Run `yarn pod-reinstall`

# Prepare for App submission

## iOS

- Open `SGBus.xcworkspace` with Xcode
- Select `SGBus` project, choose `General` tab, increase `Version` and `Build`
- Choose the destination to `Generic iOS Device`
- Select `Product` > `Archive`

### If you run into any errors during `Archive`, try the following steps:

- Run `yarn npm-reinstall`
- Run `yarn pod-reinstall`
- Open `SGBus.xcworkspace` with Xcode
- Select `SGBus` project, choose `Build Phases` tab, delete `[CP] Embeded Pods Frameworks`
- Open `File` > `Workspace Settings`, change Build System to `Legacy Build System`
- Select `Pods` project, delete `React` in **`Targets`**

## Android

- Open `android` folder with Android Studio
- Open `build.gradle` in `app` folder, increase `versionCode` and `versionName`
- Run `yarn android:release`
- Locate `app.aab` in `android/app/build/outputs/bundle/release` folder
