import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import SearchBar from "@/components/SearchBar";
import BannerAd from "@/components/BannerAd";
import SelectField from "@/components/form/SelectField";
import { useState } from "react";
import { Heart, MapPin, PinIcon } from "lucide-react-native";
import CustomButton from "@/components/CustomButton";


const Marketplace = () => {
    const { user } = useUser();
	const clerkFirstName = user?.firstName;

    const [category, setCategory] = useState('');

    return (
        <View className="p-4 bg-white flex-1">
            <SafeAreaView>
                <SignedIn>
                    <Text className='page-heading'>Welcome back, {clerkFirstName}</Text>
                </SignedIn>

                <SearchBar // TODO: This component is not yet implemented
                    placeholder='Search for listings...'
                    searchQuery=""
                    setSearchQuery={() => {console.log('Search query set')}}
                    filterOpen={() => {console.log('Filter open')}}
                    containerStyle="mb-2"
                />
                {/* TODO: Implement default location from global state, then from filter*/}
                <View className="flex flex-row gap-2 items-center mb-4">
                    <MapPin size={20} strokeWidth={1.5} className="stroke-neutral-400"/>
                    <Text className="info">Seattle, Washington</Text>
                </View>

                <BannerAd />
                
                <SelectField
                    required={false}
                    options={[ // TODO: This data should be fetched from the API
                        { id: '1', name: 'Furniture' },
                        { id: '2', name: 'Electronics' },
                        { id: '3', name: 'Clothing' },
                        { id: '4', name: 'Textbooks' },
                        { id: '5', name: 'Vehicles' },
                        { id: '6', name: 'Housing' },
                        { id: '7', name: 'Sports' },
                        { id: '8', name: 'Appliances' },
                        { id: '9', name: 'Rides' },
                        { id: '10', name: 'Other' },
                    ]}
                    selectedValues={[]}
                    multiple={false}
                    wrap={false}
                    onChange={(selected) => setCategory(selected[0])}
                    containerStyle="mt-4 mb-8"
                />

                <ScrollView>
                    {/* Listing Card */}
                    <View className=" bg-neutral-200 p-4 rounded-xl flex flex-col justify-between">
                        {/* Feature Tag & Save Button */}
                        <View className="flex flex-row justify-between items-center">
                            <Text className="bg-neutral-50 py-2 px-4 rounded-lg">Featured</Text>
                            <View className="h-12 w-12 bg-neutral-50 items-center justify-center rounded-full">
                                <Heart size={22} className="stroke-neutral-800"/>
                            </View> 
                        </View>
                        {/* Details */}
                        <View className="p-4 bg-neutral-50 rounded-lg">
                            <View className="flex-row justify-between">
                                <Text className="title">Macbook 2020</Text>
                                <Text className="title">$1267.00</Text>
                            </View>
                            <View className="flex flex-row gap-2 items-center">
                                <MapPin size={16} strokeWidth={1.5} className="stroke-neutral-400"/>
                                <Text className="info">Seattle, Washington</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>




                





                
            </SafeAreaView>    
        </View>
        
    );
}

export default Marketplace;