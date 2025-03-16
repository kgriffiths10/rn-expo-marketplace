import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, Image, Dimensions, Alert } from "react-native";
import { getSupabaseClient } from "@/lib/supabase";
import { useAuth } from "@clerk/clerk-expo";
import { CATEGORIES, Condition, FEATURE_OPTIONS, Listing, Status } from "@/constants/listing";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { ArrowLeft, ChevronLeft, Ellipsis, ListIcon, MapPin, Radio, Rocket, Share2, SquarePen, Trash2, X } from "lucide-react-native";
import { Input, PriceInput, RadioButton } from "@/components/form/FormComponents";
import CustomButton from "@/components/CustomButton";


const editListing = () => {
    const { getToken } = useAuth(); // Setting clerk auth token for supabase
    const { id } = useLocalSearchParams(); // Get listing ID from the URL
    const [listing, setListing] = useState<Listing>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);



    // Status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-active-100';
            case 'inactive':
                return 'bg-inactive-100';
            case 'draft':
                return 'bg-draft-100';
            case 'sold':
                return 'bg-sold-100';
            default:
                return 'bg-neutral-600';
        }
    };

    useEffect(() => {
        const fetchListing = async () => {
            const token = await getToken({ template: "supabase" });
    
            try {
                const supabase = await getSupabaseClient(token);
                const { data, error } = await supabase
                    .from("listings")
                    .select("*, categories(name)")
                    .eq("listing_id", id)
                    .single(); 
    
                if (error) throw error;
    
                // Create new object without 'categories'
                const { categories, ...rest } = data; 
    
                const formattedListing: Listing = { 
                    ...rest,
                    category_name: categories?.name || "Unknown", 
                };
    
                console.log("Listing:", formattedListing);
    
                setListing(formattedListing);
            } catch (err) {
                console.error("Error fetching listing:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
    
        if (id) fetchListing();
    }, [id]);

    if (loading) return <ActivityIndicator size="small" className="mt-42" />;
    if (error || !listing) return <Text className="text-red-500 text-center mt-20">Listing not found.</Text>;


    return (
        <View className="bg-white flex-1">
            <SafeAreaView className="px-4 pt-2 pb-6" edges={['top', 'left', 'right']}>
                {/* Header */}
                <View className="flex flex-row justify-between items-center">
                    <TouchableOpacity onPress={() => router.back()} className="w-12 h-12 border border-neutral-300 rounded-full p-2 align-center justify-center">
                        <ArrowLeft size={24} strokeWidth={1.75} className="text-neutral-800"/>
                    </TouchableOpacity>
                    <Text className="page-heading">Edit Listing</Text>
                    <TouchableOpacity
                        onPress={() => {}}
                        className="w-12 h-12 border border-neutral-300 rounded-full items-center justify-center"
                    > 
                        <Trash2 size={22} strokeWidth={1.75} className="text-red-500 align-center"/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView className="px-4 ">
                <View className="flex gap-4">
                    <Input mainLabel="Title" placeholder={listing.title} defaultValue={listing.title}/>
                    <Input mainLabel="Description" placeholder={listing.description} defaultValue={listing.description}/>
                    <PriceInput mainLabel="Price" value={listing.price.toString()} onChangeText={(value) => {}}/>
                    <RadioButton mainLabel="Condition" values={Object.values(Condition)} selectedValue={listing.condition} onValueChange={(value) => {}} boxStyle={true} icon={true}/>
                    <RadioButton mainLabel="Status" values={Object.values(Status)} selectedValue={listing.status} onValueChange={(value) => {}} boxStyle={true} icon={true}/>
                    <Input mainLabel="Location" placeholder={listing.location} defaultValue={listing.location}/>
                    <RadioButton mainLabel="Category" values={CATEGORIES.map(category => category.name)} selectedValue={listing.category_name} onValueChange={(value) => {}} boxStyle={true} icon={true}/>    
                </View>
                
                
                
                {/* Update supabase listing info */}
                <CustomButton title="Save Changes" onPress={() => {}}/>
                {/* Delete supabase listing row */}
                <CustomButton title="Delete" onPress={() => {}}/>

            
            </ScrollView>

        </View>
    );
};

export default editListing;


/*

export interface Listing {
    category_id: number; 
    category_name: string; // cateogry name comes from categories table (name) using cateogry_id as foreign key
    condition: Condition;
    created_at: string;
    description: string;
    is_featured: boolean;
    featured_expires_at?: string; //timestamptz
    listing_id: string;
    listing_views: number;
    price: number;
    status: Status;
    title: string;
    views: number;
    user_id: string;
    location: string;
}

export const CATEGORIES: Category[] = [
    { id: 1, name: 'Furniture' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Textbooks' },
    { id: 5, name: 'Vehicles' },
    { id: 6, name: 'Housing' },
    { id: 7, name: 'Sports' },
    { id: 8, name: 'Appliances' },
    { id: 9, name: 'Rides' },
    { id: 10, name: 'Other' }
];

*/