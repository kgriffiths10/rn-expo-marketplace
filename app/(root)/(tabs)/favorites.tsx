import UserListingStats from "@/components/cards/UserListingStats";
import SearchBar from "@/components/SearchBar";
import { useFetch } from "@/lib/fetch";
import { useUser } from "@clerk/clerk-expo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CircleX, Rocket, Store } from "lucide-react-native";
import { useCallback, useRef, useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableWithoutFeedback, Keyboard, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserFilterState, UserListings } from "@/types/type";
import Filter from "@/components/bottom-sheets/listings/Filter";
import Sort from "@/components/bottom-sheets/listings/Sort";


const Favorites = () => {
    const { user } = useUser();
    const clerkID = user?.id;
    
    // Add states for filtering
    const [searchQuery, setSearchQuery] = useState('');


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-active-100';
            case 'Inactive':
                return 'bg-inactive-100';
            case 'Draft':
                return 'bg-draft-100';
            case 'Sold':
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


    const [filters, setFilters] = useState<UserFilterState>({
        minPrice: 0.00,
        maxPrice: 99999999.99,
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        condition: ['New', 'Used', 'Refurbished'],
        status: ['Active', 'Sold', 'Inactive', 'Draft'],
        isFeaturedOnly: false,
        sortBy: 'title',
        sortDirection: 'ASC'
    });


    // Update query params with dynamic filters
    const filterQueryParams = new URLSearchParams();

    if ((filters.status ?? []).length > 0) {
        filters.status?.forEach(s => filterQueryParams.append('status', s));
    } else {
        // Default status 
        ['Active', 'Sold', 'Inactive', 'Draft'].forEach(status => filterQueryParams.append('status', status));
    }
    if ((filters.condition ?? []).length > 0) {
        filters.condition?.forEach(c => filterQueryParams.append('condition', c));
    } else {
        // Default condition
        ['New', 'Used', 'Refurbished'].forEach(condition => filterQueryParams.append('condition', condition));
    }
    if ((filters.categories ?? []).length > 0) {
        filters.categories?.forEach(c => filterQueryParams.append('category', c));
    } else {
        // Default category
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].forEach(category => filterQueryParams.append('category', category));
    }
    if (filters.isFeaturedOnly) {
        filterQueryParams.append('isFeatured', 'true');
    } else { 
        filterQueryParams.append('isFeatured', 'true');
        filterQueryParams.append('isFeatured', 'false');
    }
    filterQueryParams.append('minPrice', (filters.minPrice ?? 0).toString());
    filterQueryParams.append('maxPrice', (filters.maxPrice ?? 99999999.99).toString());
    filterQueryParams.append('sortBy', filters.sortBy ?? 'price');
    filterQueryParams.append('sortDirection', filters.sortDirection ?? 'DESC');

    // Fetch user listings
    const { data, loading, error, refetch } = useFetch<UserListings>(
        `/(api)/user/listings?clerkID=${clerkID}&${filterQueryParams.toString()}`
    );
    
    //  No Listings (length = 0) state UI test
    // const { data, loading, error, refetch } = { data: { listings: [] }, loading: false, error: false };
    //  Loading state UI test
    // const { data, loading, error, refetch } = { data: null, loading: true, error: false };
    //  Error state UI test
    // const { data, loading, error, refetch } = { data: null, loading: false, error: true };


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
                <ActivityIndicator size="small" className="text-neutral-400" />
            ) : error ? (
                <View className="flex flex-col items-center justify-center mt-24">
                    <CircleX size={24} strokeWidth={1.5} className="text-red-500 mb-2" />
                    <Text className="text-md font-PoppinsRegular text-red-600 text-center mb-2">
                        Error fetching listings
                    </Text>
                </View>
            ) : data?.listings.length === 0 ? (
                <View className="mt-24 flex flex-col items-center justify-center">   
                    <Store size={24} strokeWidth={1.5} className="text-neutral-400 mb-2"/>
                    <Text className="text-md font-PoppinsRegular text-neutral-500 text-center mb-2">
                        No listings Available
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={data?.listings}
                    keyExtractor={(item) => item.listing_id}
                    onRefresh={refetch}
                    refreshing={loading}
                    renderItem={({ item }) => (
                            <View key={item.listing_id} className="flex flex-row gap-4 p-4 mb-4 border border-neutral-200 rounded-2xl items-center">
                                <View className="h-16 w-16 bg-neutral-200 rounded-full"></View>
                                <View className="flex flex-1">
                                    <View className="flex flex-row justify-between items-center">
                                        <Text className="title flex-1 mr-4" numberOfLines={1} ellipsizeMode="tail">
                                            {item.title}
                                        </Text>
                                        <Text className="title">${item.price}</Text>
                                    </View>
                                    <View className="flex flex-row justify-between items-center">
                                        <View className="flex flex-row gap-2 items-center">
                                            <View className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></View> 
                                            <Text className="info">{item.status}</Text>    
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
export default Favorites;