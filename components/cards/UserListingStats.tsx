import { cssInterop } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';
import CustomButton from '../CustomButton';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useFetch } from '../../lib/fetch';
import { Plus } from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AddListing from '../bottom-sheets/listings/AddListing';
import { getSupabaseClient } from '@/lib/supabase';
import AddBottomSheet from '../bottom-sheets/listings/Add';
import UpgradeBottomSheet from '../bottom-sheets/listings/Upgrade';
import SubscribeBottomSheet from '../bottom-sheets/listings/Subscribe';

const InteropLinearGradient = cssInterop(LinearGradient, {
    className: {
      target: "style",
      nativeStyleToProp: {},
    },
});

type ListingStats = {
    total_value_sold: number; //applied toFixed(2)
    total_listings: number;
    total_active: number; 
    total_views: number;
    total_sold: number; 
};

const UserListingStats = () => {
    const { user } = useUser();
    const clerkID = user?.id;

    const { getToken } = useAuth(); // Setting clerk auth token for supabase 
    
    const [ listingsStats, setListingStats ] = useState<ListingStats | null>(null);


    useEffect(() => {
        fetchListingStats();
    }, []);

    const fetchListingStats = async () => {
        const token = await getToken({ template: "supabase" });
        try {
            const supabase = await getSupabaseClient(token);
            const { data, error } = await supabase.rpc('get_user_listing_stats');
            // console.log("Fetched user listing stats:", data);
        
            if (error) {
                console.error("Error fetching user info:", error);
                return;
            }
            setListingStats({
                total_listings: data?.[0].total_listings || 0,
                total_active:  data?.[0].total_active || 0,
                total_sold:  data?.[0].total_sold || 0,
                total_views:  data?.[0].total_views || 0,
                total_value_sold:  data?.[0].total_value_sold.toFixed(2) || '0.00',
            });        

        } catch (error) {
            console.error("Error fetching user listing stats:", error);
        }
    }

    // Temporary Subscription Status -> Replace with global state
    type SubscriptionStatus = "subscribed" | "unsubscribed" | "limitReached";
    const userSubscription = "subscribed" as SubscriptionStatus; // Example default value

    
    // Add Listing Bottom Sheet 
    const addListingBottomSheetRef = useRef<BottomSheetModal>(null);
    const presentAddListingBottomSheet = useCallback(() => {
        addListingBottomSheetRef.current?.present();
    }, []);

    // Upgrade Bottom Sheet
    const upgradeBottomSheetRef = useRef<BottomSheetModal>(null);
    const presentUpgradeBottomSheet = useCallback(() => {
        upgradeBottomSheetRef.current?.present();
    }, []);

    // Subscribe Bottom Sheet
    const subscribeBottomSheetRef = useRef<BottomSheetModal>(null);
    const presentSubscribeBottomSheet = useCallback(() => {
        subscribeBottomSheetRef.current?.present();
    }, []);

    return (
        <View>
            <InteropLinearGradient
                colors={['#f56565', '#ed8936']}
                start={[0, 0]}
                end={[1, 0]}
                className='px-8 py-4 rounded-2xl'
            >
                <Text className='text-center font-PoppinsRegular text-neutral-100 text-base mb-2'>Earnings</Text>
                <Text className='text-center font-PoppinsMedium text-neutral-50 text-4xl mb-4'>
                    ${listingsStats?.total_value_sold || 0.00}
                </Text>
                <CustomButton 
                    title='Add Listing' 
                    onPress={ () => {
                        switch (userSubscription) {
                            case 'subscribed':
                                presentAddListingBottomSheet();
                                break;
                            case 'unsubscribed':
                                presentSubscribeBottomSheet();
                                break;
                            case 'limitReached':
                                presentUpgradeBottomSheet();
                    }}}
                    bgVariant='dark'
                    IconLeft={() => <Plus className='stroke-neutral-50 mr-2' size={20} />}
                />
                <View className='flex flex-row justify-between'>
                    <View>
                        <Text className='text-center font-PoppinsRegular text-neutral-100 text-sm mt-4'>Listings</Text>
                        <Text className='text-center font-PoppinsMedium text-neutral-50 text-2xl'>
                            {listingsStats?.total_listings || 0}
                        </Text>
                    </View>
                    <View>
                        <Text className='text-center font-PoppinsRegular text-neutral-100 text-sm mt-4'>Active</Text>
                        <Text className='text-center font-PoppinsMedium text-neutral-50 text-2xl'>
                            {listingsStats?.total_active || 0}
                        </Text>
                    </View>
                    <View>
                        <Text className='text-center font-PoppinsRegular text-neutral-100 text-sm mt-4'>Sold</Text>
                        <Text className='text-center font-PoppinsMedium text-neutral-50 text-2xl'>
                            {listingsStats?.total_sold || 0}
                        </Text>
                    </View>
                    <View>
                        <Text className='text-center font-PoppinsRegular text-neutral-100 text-sm mt-4'>Views</Text>
                        <Text className='text-center font-PoppinsMedium text-neutral-50 text-2xl'>
                            {listingsStats?.total_views || 0}
                        </Text>
                    </View>    
                </View>
            </InteropLinearGradient>

            {/* <AddListing ref={addListingBottomSheetRef} /> */}

            <AddBottomSheet ref={addListingBottomSheetRef}  />
            <UpgradeBottomSheet ref={upgradeBottomSheetRef} />
            <SubscribeBottomSheet ref={subscribeBottomSheetRef} />
        </View>
    );
};

export default UserListingStats;