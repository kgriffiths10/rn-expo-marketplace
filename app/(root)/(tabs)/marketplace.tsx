import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import SearchBar from "@/components/SearchBar";
import BannerAd from "@/components/BannerAd";
import SelectField from "@/components/form/SelectField";
import { useState } from "react";
import { Heart, MapPin, PinIcon } from "lucide-react-native";
import CustomButton from "@/components/CustomButton";
import { ImageBackground } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";


const mockData = [
    {
        title: 'Macbook Pro 2020',
        price: '$1267.00',
        location: 'Seattle, Washington',
        category: 'Electronics',
        seller: 'Mackenzie Reid',
        image: require("@/assets/images/howard-bouchevereau-S2r2Ex8jv2o-unsplash.jpg")
    },
    {
        title: 'Apple Watch Series 6',
        price: '$399.00',
        location: 'Seattle, Washington',
        category: 'Electronics',
        seller: 'Mackenzie Reid',
        image: require("@/assets/images/klim-musalimov-nmhZgiSU8_0-unsplash.jpg")
    }
]

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
                    <Text className="info-dark">Seattle, Washington</Text>
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
                    {mockData.map((item, index) => (
                        <ImageBackground 
                        key={index}
                        source={item.image} 
                        className="h-80 w-full rounded-xl overflow-hidden mb-4 p-4 relative"
                        >
                            {/* Feature Tag & Save Button */}
                            <View className="flex flex-row items-center w-full justify-between">


                                <BlurView intensity={100} tint='light' experimentalBlurMethod="dimezisBlurView" className="overflow-hidden rounded-lg" >
                                    <Text className="info-dark py-2 px-4">Featured</Text>
                                </BlurView>

                                <BlurView intensity={100} tint='light' experimentalBlurMethod="dimezisBlurView" className="overflow-hidden rounded-full p-3" >                                    
                                    <Heart size={20} strokeWidth={1.5} className="stroke-neutral-800"/>
                                </BlurView>
                            </View>

                            {/* Bottom Details */}
                            <LinearGradient
                                colors={["transparent", "rgba(0,0,0,0.9)"]}
                                className="absolute bottom-0 left-0 right-0 pt-12 p-4"
                            >
                                <View className="flex-row justify-between">
                                    <Text className="title-white-xl" numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                                    <Text className="title-white-xl">{item.price}</Text>
                                </View>
                                <View className="flex flex-row gap-2 items-center">
                                    <MapPin size={16} strokeWidth={1.5} className="stroke-neutral-100"/>
                                    <Text className="info-white">{item.location}</Text>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                    ))}
                </ScrollView>
 
            </SafeAreaView>    
        </View>  
    );
}

export default Marketplace;