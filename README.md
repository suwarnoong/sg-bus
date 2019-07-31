# Installation

- Run `yarn npm-reinstall`
- Run `yarn pod-reinstall`

# Generate stubs

- Run `yarn generate:stubs` to generate all stubs required by the app
- Run `yarn generate:bus-lta` to generate bus routes and services information from LTA
- Run `yarn generate:bus-onemap` to generate bus route polyline from OneMap
- Run `yarn generate:bus-searchable` to generate list for searchable bus information

# Generate app secret

Some of the tokens and credentials are not supposed to share with you. Hence, you will required to provide your own secrets. To generate the `app.secret.js` template, run `yarn generate:secret`

# Prepare for App submission

## iOS

- Run `yarn generate:stubs` to update latest stubs
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

- Run `yarn generate:stubs` to update latest stubs
- Open `android` folder with Android Studio
- Open `build.gradle` in `app` folder, increase `versionCode` and `versionName`
- Run `KEY=youkeystorepassword yarn android:release`
- Locate `app.aab` in `android/app/build/outputs/bundle/release` folder
