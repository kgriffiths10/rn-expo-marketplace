import UserListingStats from "@/components/cards/UserListingStats";
import SearchBar from "@/components/SearchBar";
import { useFetch } from "@/lib/fetch";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CircleX, Rocket, Store } from "lucide-react-native";
import { useCallback, useRef, useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableWithoutFeedback, Keyboard, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserFilterState} from "@/types/type";
import Filter from "@/components/bottom-sheets/listings/Filter";
import Sort from "@/components/bottom-sheets/listings/Sort";
import { getSupabaseClient } from "@/lib/supabase";


const Listings = () => {
    const { getToken } = useAuth(); // Setting clerk auth token for supabase 
    
    // Add states for filtering
    const [searchQuery, setSearchQuery] = useState('');


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

    // Filter Listing Modal
    const filterModalRef = useRef<BottomSheetModal>(null);
    const presentFilterModal = useCallback(() => {
        filterModalRef.current?.present();
    }, []);
    // Sort Listing Modal
    const sortModalRef = useRef<BottomSheetModal>(null);
    const presentSortModal = useCallback(() => {
        sortModalRef.current?.present();
    }, []);


    interface UserListingsFilters {
        minPrice?: number;
        maxPrice?: number;
        categories?: string[];
        condition?: string[];
        status?: string[];
        isFeaturedOnly?: boolean;
        sortBy?: string;
        sortDirection?: 'ASC' | 'DESC';
      }
    const [filters, setFilters] = useState<UserListingsFilters>({});

    interface UserListings {
        category_id: number;    
        condition: "new" | "used" | "refurbished";
        created_at: string;
        description: string;
        is_featured: boolean;
        listing_id: string;
        listing_views: number;
        price: number;
        status: "active" | "inactive" | "draft" | "sold";
        title: string;
    }


    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ listings, setListings ] = useState<UserListings[]>([]);



    useEffect(() => {
        fetchListings();
    }, []);

    // UI Testing (Simulating loading, error, and no listings)
    // useEffect(() => {
    //     // Simulating no listings UI
    //     setLoading(false); 
    //     setError(false);
    //     setListings([]);
    //     // Simulating loading UI
    //     setLoading(true);
    //     setError(false);
    //     setListings([]);
    //     // Simulating error UI
    //     setLoading(false);
    //     setError(true);
    //     setListings([]);
    // }, []);


    const fetchListings = async () => {
        const token = await getToken({ template: "supabase" });
        setLoading(true);
        setError(false);
        try {
            const supabase = await getSupabaseClient(token);

            const { data, error } = await supabase
                .from('user_listings')
                .select('*');
            
            if (error) {
                console.error('Error fetching listings:', error);
                throw error;
            }
            // console.log('Fetched listings:', data);
            setListings(data);
            
        } catch (error) {
            console.error('Error fetching listings:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <View className="bg-white flex-1 px-4">

            {/* <Text>Min Price: {filters.minPrice}</Text>
            <Text>Max Price: {filters.maxPrice}</Text>
            <Text>Categories: {filters.categories}</Text>
            <Text>Condition: {filters.condition}</Text>
            <Text>Status: {filters.status}</Text>
            <Text>Featured Only: {filters.isFeaturedOnly ? 'On' : 'Off'}</Text> */}


            <Filter  
                ref={filterModalRef}
                header='Filter Listings'
                setFilters={setFilters}
            />

            <Sort 
                ref={sortModalRef}
                header="Sort Listings"
                setFilters={setFilters}
            />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView className="pt-4">
                    <Text className="page-heading">Your Listings</Text>
                    <SearchBar 
                        placeholder="Search your listings..."
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filterOpen={presentFilterModal}
                        showFilterButton={true} 
                        showSortButton={true}
                        sortOpen={presentSortModal}
                        containerStyle="mb-8"
                    />
                    <UserListingStats />
                </SafeAreaView>
            </TouchableWithoutFeedback>
            {/* <CustomButton title='Update Params' onPress={updateQueryParams}/> */}

            {loading ? (
                <ActivityIndicator size="small" className="text-neutral-400 mt-24" />
            ) : error ? (
                <View className="flex flex-col items-center justify-center mt-24">
                    <CircleX size={24} strokeWidth={1.5} className="text-red-500 mb-2" />
                    <Text className="text-md font-PoppinsRegular text-red-600 text-center mb-2">
                        Error fetching listings
                    </Text>
                </View>
            ) : listings?.length === 0 ? (
                <View className="mt-24 flex flex-col items-center justify-center">   
                    <Store size={24} strokeWidth={1.5} className="text-neutral-400 mb-2"/>
                    <Text className="text-md font-PoppinsRegular text-neutral-500 text-center mb-2">
                        No listings Available
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={listings}
                    keyExtractor={(item) => item.listing_id}
                    // onRefresh={refetch}
                    refreshing={loading}
                    renderItem={({ item }) => (
                            <View key={item.listing_id} className="flex flex-row gap-4 p-4 mb-4 border border-neutral-200 rounded-2xl items-center">
                                <View className="h-16 w-16 bg-neutral-200 rounded-full"></View>
                                <View className="flex flex-1">
                                    <View className="flex flex-row justify-between items-center">
                                        <Text className="title flex-1 mr-4" numberOfLines={1} ellipsizeMode="tail">
                                            {item.title}
                                        </Text>
                                        <Text className="title">${item.price.toFixed(2)}</Text>
                                    </View>
                                    <View className="flex flex-row justify-between items-center">
                                        <View className="flex flex-row gap-2 items-center">
                                            <View className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></View> 
                                            <Text className="info">{item.status.trim().charAt(0).toUpperCase() + item.status.trim().slice(1)}</Text>    
                                        </View>
                                        {item.is_featured && (
                                            <View className="flex flex-row gap-2 items-center">
                                                <Rocket className="text-primary-400" size={16} />
                                                <Text className="info">Featured</Text>    
                                            </View>
                                        )}
                                    </View>    
                                </View>    
                            </View>    
                    )}
                />
            )}
            
            

        </View>
    );
}
export default Listings;