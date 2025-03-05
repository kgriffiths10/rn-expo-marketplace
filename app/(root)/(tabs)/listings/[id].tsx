import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, Image } from "react-native";
import { getSupabaseClient } from "@/lib/supabase";
import { useAuth } from "@clerk/clerk-expo";
import { Listing } from "@/constants/listing";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { ChevronLeft, SquarePen } from "lucide-react-native";
import InputField from "@/components/form/InputField";

const ListingDetail = () => {
    const { getToken } = useAuth(); // Setting clerk auth token for supabase 


    const { id } = useLocalSearchParams(); // Get listing ID from the URL
    const [listing, setListing] = useState<Listing>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchListing = async () => {
            const token = await getToken({ template: "supabase" });

            try {
                const supabase = await getSupabaseClient(token);
                const { data, error } = await supabase
                    .from("user_listings")
                    .select("*")
                    .eq("listing_id", id)
                    .single(); // Fetch only one listing

                if (error) throw error;
                setListing(data);
            } catch (err) {
                console.error("Error fetching listing:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchListing();
    }, [id]);

    if (loading) return <ActivityIndicator size="large" className="mt-20" />;
    if (error || !listing) return <Text className="text-red-500 text-center mt-20">Listing not found.</Text>;

    return (
        <SafeAreaView className="bg-white flex-1 px-4">
            <View className="flex-row justify-between items-center mb-4">
                <TouchableOpacity 
                    onPress={() => router.back()}
                    className="flex-row items-center"
                >
                    <ChevronLeft size={24} className="stroke-neutral-800" />
                    <Text className="bottom-sheet-heading">Back</Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-14 h-14 bg-primary-400 rounded-full items-center justify-center">
                    <SquarePen className="w-full h-60 rounded-xl stroke-neutral-50" />
                </TouchableOpacity>    
            </View>
            <ScrollView>
                <InputField
                    label="Title"
                    value={listing.title}
                />
                <InputField
                    label="Price"
                    value={listing.price.toFixed(2)}
                />
                <InputField
                    label="Description"
                    value={listing.description || "No description available."}
                    multiline={true}
                    scrollEnabled={true}
                    className="h-16"
                /> 
                <Text className="label">Current Status</Text> 

                <Text>Created</Text> 
                 
            </ScrollView>

            

            
            
        </SafeAreaView>
    );
}
export default ListingDetail;



// <ScrollView className="flex-1 bg-white p-4">
//     <Stack.Screen options={{ title: listing.title || "Listing Details" }} />

//     {/* Image */}
//     {/* <Image source={{ uri: listing.image_url || "https://via.placeholder.com/300" }} className="w-full h-60 rounded-xl mb-4" /> */}

//     {/* Listing Info */}
//     <Text className="text-2xl font-bold">{listing.title}</Text>
//     <Text className="text-lg text-neutral-600">${listing.price.toFixed(2)}</Text>
//     <Text className="text-md text-neutral-500 mt-2">{listing.description || "No description available."}</Text>

//     {/* Other Details */}
//     <View className="mt-4 border-t pt-4">
//         <Text className="text-md font-semibold">Category: {listing.category_id}</Text>
//         <Text className="text-md font-semibold">Condition: {listing.condition}</Text>
//         <Text className="text-md font-semibold">Status: {listing.status}</Text>
//     </View>
// </ScrollView>

