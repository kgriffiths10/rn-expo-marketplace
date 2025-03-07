# React Native Mobile App - Student Marketplace 👋

This is a comprehensive React Native marketplace application built with [Expo](https://expo.dev). The app is designed to facilitate buying and selling items, managing listings, and interacting with other users. It leverages modern technologies and libraries to provide a seamless and efficient development experience.

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=ts,supabase,react,tailwind,nodejs" />
  </a>
</p>


<div align="center">
  <img src="assets/images/mockup-screenshots/mockup_2.png" alt="three-screen-mockup" width="100%"/>
</div>


## Key Features

- **User Authentication**: Secure user authentication using Clerk.
- **Database Integration**: Subabase postgres database and PostGIS integration for location based listings.
- **Token Storage**: Secure token storage with Expo Secure Store.
- **Custom Components**: Reusable custom components for buttons, input fields, and more.
- **Styling**: Tailwind CSS for consistent and responsive styling.
- **File-Based Routing**: Simplified navigation with Expo Router.
- **Icon Integration**: Rich iconography with Lucide icons and nativewind styling.
- **Fully custom form components**: Checkbox, RadioButton, Autocomplete, ComboBox, Dropdown, DatePicker, etc. for flexible, reusable inputs.

<div align="center">
  <img src="assets/images/ui-component-screenshots/ui-component-mockup.png" alt="ui-form-components-mockup" width="100%"/>
</div>


## Tech Stack
- **React Native & Expo SDK**
- **Supabase**
- **Tailwind CSS**
- **Clerk**




<div align="center">
  <img src="assets/images/mockup-screenshots/mockup_1.png" alt="multi-screen-mockup" width="100%"/>
</div>

## ⭐ Support & Contributions  

If you find this project useful, consider giving it a **⭐ star** on GitHub! It helps others discover the project and keeps me motivated to improve it.  

## .env Requirements
- EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
- EXPO_PUBLIC_SERVER_URL=""
- EXPO_PUBLIC_SUPABASE_URL=
- EXPO_PUBLIC_SUPABASE_ANON_KEY=

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.