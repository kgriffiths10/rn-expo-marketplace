import UserListingStats from "@/components/cards/UserListingStats";
import SearchBar from "@/components/SearchBar";
import { useFetch } from "@/lib/fetch";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CircleX, Rocket, Store } from "lucide-react-native";
import { useCallback, useRef, useState, useEffect, useMemo } from "react";
import { ScrollView, Text, View, TouchableWithoutFeedback, Keyboard, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserFilterState} from "@/types/type";
import FilterBottomSheet from "@/components/bottom-sheets/listings/Filter";
import Sort from "@/components/bottom-sheets/listings/Sort";
import { getSupabaseClient } from "@/lib/supabase";
import { Listing, ListingFilters, DEFAULT_FILTERS } from "@/constants/listing";
import { router } from "expo-router";
import SortBottomSheet from "@/components/bottom-sheets/listings/Sort";


const Listings = () => {
    const { getToken } = useAuth(); // Setting clerk auth token for supabase 
    

    // Data fetching states
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ userListings, setUserListings ] = useState<Listing[]>([]);
    const [ refreshing, setRefreshing ] = useState(false);
    const [ filters, setFilters ] = useState<ListingFilters>({...DEFAULT_FILTERS});
    const [ searchQuery, setSearchQuery ] = useState('');

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

    // Filter Listing Bottom Sheet
    const filterBottomSheetRef = useRef<BottomSheetModal>(null);
    const openFilters = useCallback(() => {
        filterBottomSheetRef.current?.present();
    }, []);

    // Sort Listing Bottom Sheet
    const sortBottomSheetRef = useRef<BottomSheetModal>(null);
    const openSort = useCallback(() => {
        sortBottomSheetRef.current?.present();
    }, []);

    // Set filters state from filter and sort bottom sheets
    const handleSaveFilters = (updatedFilters: ListingFilters) => {
        setFilters(updatedFilters);
        fetchUserListings(updatedFilters);
    };

    // Fetch listings on initial load
    useEffect(() => {
        fetchUserListings(); // Without filters
    }, []);

    // Fetch listings on search query change
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchUserListings(filters);
        }, 500);
    
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // UI Testing (Simulating loading, error, and no listings)
    // useEffect(() => { // Uncomment individual sections to test UI states
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

    const fetchUserListings = async (currentFilters = filters) => {
        const token = await getToken({ template: "supabase" });
        
        setLoading(true);
        setError(false);
        setRefreshing(true);

        console.log('Fetching listings with filters:', currentFilters);
        try {
            const supabase = await getSupabaseClient(token);

            let query = supabase
                .from('user_listings')
                .select('*')
                .ilike('title', `%${searchQuery}%`);

            
            // Dynamic Filtering
            if (currentFilters.categories?.length > 0) {
                query = query.in('category_id', currentFilters.categories);
            }
            if (currentFilters.conditions.length > 0) {
                query = query.in('condition', currentFilters.conditions);
            }
            if (currentFilters.status.length > 0) {
                query = query.in('status', currentFilters.status);
            }
            if (currentFilters.minPrice) {
                query = query.gte('price', currentFilters.minPrice);
            }
            if (currentFilters.maxPrice) {
                query = query.lte('price', currentFilters.maxPrice);
            }
            if (currentFilters.isFeaturedOnly) {
                query = query.eq('is_featured', true);
            }
            if (currentFilters.sortBy) {
                query = query.order(currentFilters.sortBy.column, { ascending: currentFilters.sortBy.ascending });
            }


            const { data, error } = await query;

            if (error) {
                console.error('Error fetching user listings:', error);
                throw error;
            }
            // console.log('Fetched listings:', data);
            setUserListings(data);
            
        } catch (error) {
            console.error('Error fetching user listings:', error);
            setError(true);
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };

    const getAppliedFilterCount = useMemo(() => {
        let count = 0;
        if (filters.minPrice !== undefined) count++;
        if (filters.maxPrice !== undefined) count++;
        count += filters.categories.length;
        count += filters.conditions.length;
        count += filters.status.length;
        if (filters.isFeaturedOnly) count++;
        return count;
    }, [filters]);

    return (
        <View className="bg-white flex-1 px-4">
            {/* <Text>Min Price: {filters.minPrice}</Text>
            <Text>Max Price: {filters.maxPrice}</Text>
            <Text>Categories: {filters.categories}</Text>
            <Text>Condition: {filters.conditions}</Text>
            <Text>Status: {filters.status}</Text>
            <Text>Featured Only: {filters.isFeaturedOnly ? 'On' : 'Off'}</Text> */}
            {/* <Text>{filters.sortBy.label}</Text>
            <Text>{filters.sortBy.column}</Text>
            <Text>{filters.sortBy.ascending}</Text> */}

            <FilterBottomSheet  
                ref={filterBottomSheetRef}
                header='Filter Listings'
                filters={filters}
                onFiltersSaved={handleSaveFilters}
            />

            <SortBottomSheet 
                ref={sortBottomSheetRef}
                header="Sort Listings"
                filters={filters}
                onSortPress={handleSaveFilters}
            />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView className="pt-4">
                    <Text className="page-heading">Your Listings</Text>
                    <SearchBar 
                        placeholder="Search your listings..."
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filterOpen={openFilters}
                        showFilterButton={true} 
                        showSortButton={true}
                        sortOpen={openSort}
                        filterNotificationBadge={getAppliedFilterCount}
                        containerStyle="mb-8"
                    />
                    <UserListingStats />
                </SafeAreaView>
            </TouchableWithoutFeedback>

            {loading ? (
                <ActivityIndicator size="small" className="text-neutral-400 mt-24" />
            ) : error ? (
                <View className="flex flex-col items-center justify-center mt-24">
                    <CircleX size={24} strokeWidth={1.5} className="text-red-500 mb-2" />
                    <Text className="text-md font-PoppinsRegular text-red-600 text-center mb-2">
                        Error fetching listings
                    </Text>
                    <TouchableOpacity onPress={() => fetchUserListings()} className="mt-2 border px-4 py-2 rounded-md">
                        <Text className="text-neutral-600">Reload</Text>
                    </TouchableOpacity>
                </View>
            ) : userListings?.length === 0 ? (
                <View className="mt-24 flex flex-col items-center justify-center">   
                    <Store size={24} strokeWidth={1.5} className="text-neutral-400 mb-2"/>
                    <Text className="text-md font-PoppinsRegular text-neutral-500 text-center mb-2">
                        No listings Available
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={userListings}
                    keyExtractor={(item) => item.listing_id}
                    onRefresh={fetchUserListings}
                    refreshing={refreshing}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            key={item.listing_id} 
                            className="flex flex-row gap-4 p-4 mb-4 border border-neutral-200 rounded-2xl items-center"
                            onPress={() => router.push({ pathname: "/listings/[id]", params: { id: item.listing_id } })}
                        >
                            <View className="h-16 w-16 bg-neutral-200 rounded-full"></View>
                            <View className="flex flex-1">
                                <View className="flex flex-row justify-between items-center">
                                    <Text className="title-dark flex-1 mr-4" numberOfLines={1} ellipsizeMode="tail">
                                        {item.title}
                                    </Text>
                                    <Text className="title-dark">${item.price.toFixed(2)}</Text>
                                </View>
                                <View className="flex flex-row justify-between items-center">
                                    <View className="flex flex-row gap-2 items-center">
                                        <View className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></View> 
                                        <Text className="info-light">{item.status.trim().charAt(0).toUpperCase() + item.status.trim().slice(1)}</Text>    
                                    </View>
                                    {item.is_featured && (
                                        <View className="flex flex-row gap-2 items-center">
                                            <Rocket className="text-primary-400" size={16} />
                                            <Text className="info-light">Featured</Text>    
                                        </View>
                                    )}
                                </View>    
                            </View>    
                        </TouchableOpacity>    
                    )}
                />
            )}
        </View>
    );
}
export default Listings;


/*
app
    (auth)
        ...
    (root)
        (tabs)
            _layout.tsx
            listings.tsx
            marktplace.tsx
            settings.tsx
            favorites.tsx
        _layout.tsx
    _layout.tsx
    index.tsx
    +not-found.tsx
assets
components
...

*/