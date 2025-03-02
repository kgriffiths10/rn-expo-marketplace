// import { supabase, useSupabaseClient } from "@/lib/supabase";
import { getSupabaseClient } from "@/lib/supabase";
import { useAuth } from "@clerk/clerk-expo";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



interface Listing {
    listing_id: string;
    title: string;
    price: number;
    description: string;
    status: 'active' | 'draft' | 'inactive' | 'sold';
    condition: 'new' | 'used' | 'refurbished';
    created_at: string;
    category_id: number;

}

interface User {
    clerk_id: string;
    email: string;
    first_name: string;
    last_name: string;
}

const Messages = () => {
    
    const [listings, setListings] = useState<Listing[]>([]);
    const [user, setUser] = useState<User | null >(null);
    const { getToken } = useAuth(); // Setting clerk auth token for supabase 



    // Fetching listings and user info
    useEffect(() => {
        fetchListings();
        fetchUserInfo();
    }, []);

    const [ status, setStatus ] = useState([]); // 'active' | 'draft' | 'inactive' | 'sold' 
    const [ condition, setCondition ] = useState([]); // 'new' | 'used' | 'refurbished'
    const [ category_id, setCategory_id ] = useState([]); // number from 1 to 10 



    const fetchListings = async () => {
        const token = await getToken({ template: "supabase" });
        try {
            const client = await getSupabaseClient(token);

            let query = client.from('listings').select('*');
            if (status.length > 0) {
                query = query.in('status', status);
            }
            if (condition.length > 0) {
                query = query.in('condition', condition);
            }
            if (category_id.length > 0) {
                query = query.in('category_id', category_id);
            }

            const { data, error } = await query;
            
            if (error) {
                console.error('Error fetching listings:', error);
                throw error;
            }
            // console.log('Fetched listings:', data);
            setListings(data || []);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const fetchUserInfo = async () => {
        const token = await getToken({ template: "supabase" });
        try {
            const client = await getSupabaseClient(token);
            const { data, error } = await client
                .from("users")
                .select("clerk_id, email, first_name, last_name");

            if (error) {
                console.error("Error fetching user info:", error);
                return;
            }
            console.log("Fetched user info:", data);
            // Set a single data to user state
            setUser(data? data[0] : null);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    // Return the listings and user info 
    return (
        <SafeAreaView>
            <Text className="text-2xl mt-4 mb-4">LISTING TEST SECTION</Text>
            {listings.length > 0 ? (
                listings.map((listing) => (
                    <Text key={listing.listing_id}>{listing.title}</Text>
                ))
            ) : (
                <Text>No listings found</Text>
            )}
            
            <Text className="text-2xl mt-4 mb-4">USER TEST SECTION</Text>
            {user ? (
                <View key={user.clerk_id}>
                    <Text>{user.first_name}</Text>
                    <Text>{user.last_name}</Text>
                    <Text>{user.email}</Text>
                    <Text>{user.clerk_id}</Text>
                </View>
            ) : (
                <Text>No user found</Text>
            )}
        </SafeAreaView>
    )
    
};
export default Messages;


