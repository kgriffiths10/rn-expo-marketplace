import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store';
import { useEffect } from "react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

// Add tokenCache configuration
const tokenCache = {
	getToken: (key: string) => SecureStore.getItemAsync(key),
	saveToken: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  };

export default function AppLayout() {
	const [loaded] = useFonts({
		Poppins: require('../assets/fonts/poppins/Poppins-Regular.ttf'),
		'Poppins-Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf'),
		'Poppins-ExtraBold': require('../assets/fonts/poppins/Poppins-ExtraBold.ttf'),
		'Poppins-Light': require('../assets/fonts/poppins/Poppins-Light.ttf'),
		'Poppins-Medium': require('../assets/fonts/poppins/Poppins-Medium.ttf'),
		'Poppins-SemiBold': require('../assets/fonts/poppins/Poppins-SemiBold.ttf'),
		'Poppins-Thin': require('../assets/fonts/poppins/Poppins-Thin.ttf'),
		'Poppins-Black': require('../assets/fonts/poppins/Poppins-Black.ttf'),
		'Poppins-ExtraLight': require('../assets/fonts/poppins/Poppins-ExtraLight.ttf'),
	});

	if (!publishableKey) {
		throw new Error(
		  'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
		)
	}

	useEffect(() => {
		if (loaded) {
		  SplashScreen.hideAsync();
		}
	  }, [loaded]);
	
	  if (!loaded) {
		return null;
	}

	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
			<ClerkLoaded>
				<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="(root)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
				</Stack>   
			</ClerkLoaded>
      	</ClerkProvider> 	
	);
}
