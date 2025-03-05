
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/form/InputField";
import PriceField from "@/components/form/PriceField";
import PriceKeypad from "@/components/form/PriceKeypad";
import SelectField from "@/components/form/SelectField";
import { CATEGORIES, Condition, Listing, ListingFilters } from "@/constants/listing";
import { ArrowLeft, ArrowRight, ChevronLeft, FolderClock, LockOpen, Store } from "lucide-react-native";
import { useState } from "react";
import {Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Favorites = () => {

    const [ addListingForm, setAddListingForm ] = useState<Listing>()

    return (
        <SafeAreaView className="p-4 bg-white flex-1">
            <ScrollView >
                {/* Initial View when a user presses add to section, depedning on situation */}

                {/* Unsubscribed User Screen */}
                <View className="p-8 border border-neutral-400 rounded-3xl items-center mb-4">
                <LockOpen size={32} strokeWidth={1.75} className="text-primary-400 mb-2" />
                <Text className="text-center text-xl font-medium text-dark mb-3">Unlock Selling Features</Text>
                <Text className="text-center text-base font-regular text-light mb-10">Turn your unwanted items into cash. Subscribe now to unlock selling features and reach buyers instantly.</Text>
                <CustomButton title="Subscribe Now" className="w-full" />    
                </View>

                {/* Subscribed (Maxed out 4 lisitngs/base subcription) User Screen */}
                <View className="p-8 border border-neutral-400 rounded-3xl items-center mb-4">
                <FolderClock size={32} strokeWidth={1.75} className="text-primary-400 mb-2" />
                <Text className="text-center text-xl font-medium text-dark mb-3">Create Now, Post Later</Text>
                <Text className="text-center text-base font-regular text-light mb-10">You’ve hit your 4 active listing limit. Create a listing and save it as a draft, or upgrade to Premium for unlimited selling.</Text>
                <CustomButton title="Create a Listing" className="w-full" />    
                <TouchableOpacity>
                    <Text className="text-light text-center text-base font-regular mt-3">Upgrade to Premium</Text>
                </TouchableOpacity>
                </View>

                {/* Subscribed User Screen */}
                <View className="p-8 border border-neutral-400 rounded-3xl items-center mb-4">
                <Store size={32} strokeWidth={1.75} className="text-primary-400 mb-2" />
                <Text className="text-center text-xl font-medium text-dark mb-3">Start Selling</Text>
                <Text className="text-center text-base font-regular text-light mb-10">Start listing now, and watch your items connect with buyers eager to purchase.</Text>
                <CustomButton title="Continue" className="w-full" />    
                </View>

                {/* Following form section*/}

                {/* Title */}
                <View className="p-8 border border-neutral-400 rounded-3xl mb-4">
                    
                    <View className="flex-row justify-between items-center mb-4">
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowLeft size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                        <View className="flex-row gap-2">
                            <View className="h-2 w-8 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                        </View>
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowRight size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                    </View>

                    <View className="mb-4">
                        <Text className="text-lg text-primary-400 font-regular mb-1">Give your listing a title</Text>
                        <TextInput 
                            placeholder="Bluetooth Wireless Headphones" 
                            className="text-4xl font-medium leading-[1.25]" 
                            multiline={true}   
                            submitBehavior="blurAndSubmit"
                        />
                    </View> 
                </View>


                {/* Description */}
                <View className="p-8 border border-neutral-400 rounded-3xl mb-4">
                    
                    <View className="flex-row justify-between items-center mb-4">
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowLeft size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                        <View className="flex-row gap-2">
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-8 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                        </View>
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowRight size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                    </View>

                    <View className="mb-4">
                        <Text className="text-lg text-primary-400 font-regular mb-1">Write a detailed description</Text>
                        <TextInput 
                            placeholder="Brand new, never used, wireless Bluetooth headphones with superior sound quality and noise-canceling..." 
                            className="text-2xl font-medium leading-[1.25] max-h-72" 
                            multiline={true}   
                            submitBehavior="newline"
                        />
                    </View> 
                </View>

                {/* Category & Condition */}


                {/* Price */}
                <View className="p-8 border border-neutral-400 rounded-3xl mb-4">
                    
                    <View className="flex-row justify-between items-center mb-4">
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowLeft size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                        <View className="flex-row gap-2">
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-8 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                        </View>
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowRight size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                    </View>

                    <View className="mb-4">
                        <Text className="text-lg text-primary-400 font-regular text-center">Set an appropriate price</Text>
                        <PriceKeypad />
                    </View> 
                </View>

                {/* Location */}
                <View className="p-8 border border-neutral-400 rounded-3xl mb-4">
                    
                    <View className="flex-row justify-between items-center mb-4">
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowLeft size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                        <View className="flex-row gap-2">
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-8 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                        </View>
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowRight size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                    </View>

                    <View className="mb-4">
                        <Text className="text-lg text-primary-400 font-regular mb-1">City</Text>
                        <TextInput 
                            placeholder="Westminister" 
                            className="text-4xl font-medium leading-[1.25]" 
                            multiline={false}   
                            submitBehavior="blurAndSubmit"
                            textContentType="addressCity"
                        />
                        <Text className="text-lg text-primary-400 font-regular mb-1">Province/State</Text>
                        <TextInput 
                            placeholder="London" 
                            className="text-4xl font-medium leading-[1.25]" 
                            multiline={false}   
                            submitBehavior="blurAndSubmit"
                            textContentType="addressState"
                        />
                        <Text className="text-lg text-primary-400 font-regular mb-1">Country</Text>
                        <TextInput 
                            placeholder="Ontario" 
                            className="text-4xl font-medium leading-[1.25]" 
                            multiline={false}   
                            submitBehavior="blurAndSubmit"
                            textContentType="countryName"
                        />
                    </View> 
                </View>

                {/* Feature */}
                <View className="p-8 border border-neutral-400 rounded-3xl mb-4">
                    
                    <View className="flex-row justify-between items-center mb-4">
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowLeft size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                        <View className="flex-row gap-2">
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-8 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-neutral-300 rounded-full"></View>
                        </View>
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowRight size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                    </View>

                    <View className="mb-4">
                        <Text className="text-lg text-primary-400 font-regular">Get noticed and sell faster</Text>
                        <Text className="text-base text-neutral-400 font-regular">Promote your listing to the top for quicker visibility and sales.</Text>

                        
                        <View className="flex gap-6 mt-4">
                            {[
                                { label: "24 hrs", price: "$1.99 USD" },
                                { label: "7 days", price: "$4.99 USD", best: true },
                                { label: "14 days", price: "$8.99 USD" }
                            ].map(({ label, price, best }, idx) => (
                                <TouchableOpacity key={idx} className="flex flex-row items-center justify-between border border-neutral-300 rounded-2xl p-4">
                                    <View className="flex flex-row items-center gap-4">
                                        <View className="h-6 w-6 border border-neutral-300 rounded-full" />
                                        <Text className="text-lg font-PoppinsMedium">{label}</Text>
                                        {best && (
                                            <View className="bg-primary-400 self-start absolute -top-7 -right-10 py-1 px-3 rounded-full">
                                                <Text className="text-neutral-100 text-sm font-PoppinsRegular">BEST VALUE</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text className="text-lg font-PoppinsRegular text-neutral-400">{price}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>


                    </View> 
                </View>

                {/* Summary */}
                <View className="p-8 border border-neutral-400 rounded-3xl mb-4">
                    
                    <View className="flex-row justify-between items-center mb-4">
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowLeft size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                        <View className="flex-row gap-2">
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-2 bg-primary-400 rounded-full"></View>
                            <View className="h-2 w-8 bg-primary-400 rounded-full"></View>
                        </View>
                        <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                            <ArrowRight size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                    </View>

                    <View className="mb-4">
                        <View className="mb-4">
                            <Text className="text-lg text-primary-400 font-regular">Title</Text>
                            <Text className="text-2xl font-medium">Macbook Pro</Text>
                        </View>
                        <View className="mb-4">
                            <Text className="text-lg text-primary-400 font-regular ">Description</Text>
                            <Text className="text-2xl font-medium">Brand new, never used, wireless Bluetooth headphones with...</Text>
                        </View>
                        <View className="mb-4">
                            <Text className="text-lg text-primary-400 font-regular ">Price</Text>
                            <Text className="text-2xl font-medium">$2345.00</Text>
                        </View>
                        <View className="mb-4">
                            <Text className="text-lg text-primary-400 font-regular ">Category</Text>
                            <Text className="text-2xl font-medium">Electronics</Text>
                        </View>
                        {/* If chosen */}
                        <View className="mb-4">
                            <Text className="text-lg text-primary-400 font-regular ">Condition</Text> 
                            <Text className="text-2xl font-medium">New</Text>
                        </View>
                        <View className="mb-4">
                            <Text className="text-lg text-primary-400 font-regular ">Location</Text> 
                            <Text className="text-2xl font-medium">Sherbrooke, Quebec, Canada</Text>
                        </View>
                        <View>
                            <Text className="text-lg text-primary-400 font-regular ">Featured Until</Text> 
                            <Text className="text-2xl font-medium">March 24, 2026</Text>
                        </View>

                        <View className="mt-8">
                            <TouchableOpacity className="bg-primary-400 rounded-full p-3 mb-4">
                                <Text className="text-base font-regular text-neutral-50 text-center">Post Listing</Text> 
                            </TouchableOpacity>
                            <View className="flex-row gap-4">
                                <TouchableOpacity className="border border-neutral-300 rounded-full p-3 flex-1">
                                    <Text className="text-base font-regular text-neutral-800 text-center">Save as Draft</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity className="border border-red-500 rounded-full p-3 flex-1">
                                    <Text className="text-base font-regular text-neutral-800 text-center">Cancel</Text> 
                                </TouchableOpacity>  
                            </View>
                        </View> 
                    </View> 
                </View>

                




            </ScrollView>


             
                            

        </SafeAreaView>
    )
}
    
export default Favorites;



// {/* Unsubscribed User Screen */}
// <View className="p-8 border border-neutral-400 rounded-3xl items-center mb-4">
// <LockOpen size={32} strokeWidth={1.75} className="text-primary-400 mb-2" />
// <Text className="text-center text-xl font-medium text-dark mb-3">Unlock Selling Features</Text>
// <Text className="text-center text-base font-regular text-light mb-10">Turn your unwanted items into cash. Subscribe now to unlock selling features and reach buyers instantly.</Text>
// <CustomButton title="Subscribe Now" className="w-full" />    
// </View>

// {/* Subscribed (Maxed out 4 lisitngs/base subcription) User Screen */}
// <View className="p-8 border border-neutral-400 rounded-3xl items-center mb-4">
// <FolderClock size={32} strokeWidth={1.75} className="text-primary-400 mb-2" />
// <Text className="text-center text-xl font-medium text-dark mb-3">Create Now, Post Later</Text>
// <Text className="text-center text-base font-regular text-light mb-10">You’ve hit your 4 active listing limit. Create a listing and save it as a draft, or upgrade to Premium for unlimited selling.</Text>
// <CustomButton title="Create a Post" className="w-full" />    
// <TouchableOpacity>
//     <Text className="text-light text-center text-base font-regular mt-3">Upgrade to Premium</Text>
// </TouchableOpacity>
// </View>

// {/* Subscribed User Screen */}
// <View className="p-8 border border-neutral-400 rounded-3xl items-center mb-4">
// <Store size={32} strokeWidth={1.75} className="text-primary-400 mb-2" />
// <Text className="text-center text-xl font-medium text-dark mb-3">Start Selling</Text>
// <Text className="text-center text-base font-regular text-light mb-10">Start listing now, and watch your items connect with buyers eager to purchase.</Text>
// <CustomButton title="Continue" className="w-full" />    
// </View>





{/* <View className="flex-row items-center gap-4 mb-4">
                <TouchableOpacity className="border border-neutral-300 rounded-full p-2">
                    <ArrowLeft size={24} strokeWidth={1.75} className="text-neutral-800" />    
                </TouchableOpacity>
                
                <Text className="text-lg font-medium">Create a Listing</Text>
            </View>

            <View>
                <View className="mb-4">
                    <Text className="text-lg text-primary-400 font-regular mb-1">Give your listing a title</Text>
                    <Text className="text-4xl text-neutral-500 font-medium w-full">Macbook Pro 2024</Text>    
                </View>
                
                <View className="mb-4">
                    <Text className="text-lg text-primary-400 font-regular mb-1">Write a detailed description</Text>
                    <Text className="text-2xl text-neutral-500 font-medium w-full">Brand new, never used, wireless Bluetooth headphones with superior sound quality and noise-canceling...</Text>
                </View>
            </View> */}



