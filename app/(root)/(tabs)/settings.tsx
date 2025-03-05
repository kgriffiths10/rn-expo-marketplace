import PriceKeypad from '@/components/form/PriceKeypad'
import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, View } from 'react-native'
import { Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignOutButton = () => {
    const { signOut } = useClerk()
    
    const handleSignOut = async () => {
        try {
            await signOut()
            Linking.openURL(Linking.createURL('/'))
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }
    return <Button title="Sign out" onPress={handleSignOut} />
}

const Settings = () => {
    // Clerk sign out Button
    return (
            <SafeAreaView className="bg-white flex-1 p-4">
                <SignOutButton />
                <PriceKeypad />
            </SafeAreaView>
    
    );
}

export default Settings;