import { Tabs } from 'expo-router';
// import { Heart, ListPlus, MessageCircleMore, Search, Settings } from 'lib/icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Heart, MessageCircleMore, Search, Settings2, SquarePlus } from 'lucide-react-native';

export default function TabLayout() {
	const iconSize = 24;
	return (
		<GestureHandlerRootView>
 			<BottomSheetModalProvider>
				<Tabs 
					screenOptions={{ 
						tabBarShowLabel: false,
						tabBarStyle: {
							paddingTop: 8,
						},
					}} 
					initialRouteName="marketplace" 
				>
					<Tabs.Screen
					name="favorites"
					options={{
						title: 'Favorites',
						headerShown: false,
						tabBarIcon: ({ focused }) => <Heart size={iconSize} className={focused ? 'text-primary-400' : 'text-neutral-800'}/>,
					}}
					/>
					<Tabs.Screen
					name="listings"
					options={{
						title: 'Listings',
						headerShown: false,
						tabBarIcon: ({ focused }) => <SquarePlus size={iconSize} className={focused ? 'text-primary-400' : 'text-neutral-800'}/>,
					}}
					/>
					<Tabs.Screen
					name="marketplace"
					options={{
						title: 'Marketplace',
						headerShown: false,
						tabBarIcon: ({ focused }) => <Search size={iconSize} className={focused ? 'text-primary-400' : 'text-neutral-800'}/>,
					}}
					/>
					<Tabs.Screen
					name="messages"
					options={{
						title: 'Messages',
						headerShown: false,
						tabBarIcon: ({ focused }) => <MessageCircleMore size={iconSize} className={focused ? 'text-primary-400' : 'text-neutral-800'}/>,
					}}
					/>
					<Tabs.Screen
					name="settings"
					options={{
						title: 'Settings',
						headerShown: false,
						tabBarIcon: ({ focused }) => <Settings2 size={iconSize} className={focused ? 'text-primary-400' : 'text-neutral-800'}/>,
					}}
					/>
				</Tabs>
 			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}