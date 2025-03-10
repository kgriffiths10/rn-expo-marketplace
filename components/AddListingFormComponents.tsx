import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ArrowLeft, ArrowRight, Facebook, Instagram, Twitter } from 'lucide-react-native'
import PriceKeypad from './form/PriceKeypad'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import CustomButton from './CustomButton'
import { RadioButton } from './form/FormComponents'
import { CATEGORIES, Condition } from '@/constants/listing'





export const Title = () => {
    return (
        <View className="mb-24">
            <Text className="form-label mb-1">Give your listing a title</Text>
            <BottomSheetTextInput 
                placeholder="Bluetooth Wireless Headphones" 
                className="text-4xl font-medium leading-[1.25]" 
                multiline={true}   
                submitBehavior="blurAndSubmit"
                onChangeText={(text) => console.log(text)}
            />
        </View>
    );
}

export const Description = () => {
    return (
        <View className="mb-24">
            <Text className="text-lg text-primary-400 font-regular mb-1">Write a detailed description</Text>
            <BottomSheetTextInput 
                placeholder="Brand new, never used, wireless Bluetooth headphones with superior sound quality and noise-canceling..." 
                className="text-2xl font-medium leading-[1.25] max-h-72" 
                multiline={true}   
                submitBehavior="newline"
            />
        </View>
    );
}

export const Price = () => {
    return (
        <View className="mb-12">
            <Text className="text-lg text-primary-400 font-regular text-center">Set an appropriate price</Text>
            <PriceKeypad />
        </View>
    );
}

export const Location = () => {
    return (
        <View className="mb-24">
            <Text className="text-lg text-primary-400 font-regular mb-1">City</Text>
            <BottomSheetTextInput 
                placeholder="Westminister" 
                className="text-4xl font-medium leading-[1.25]" 
                multiline={false}   
                submitBehavior="blurAndSubmit"
                textContentType="addressCity"
            />
            <Text className="text-lg text-primary-400 font-regular mb-1">Province/State</Text>
            <BottomSheetTextInput 
                placeholder="London" 
                className="text-4xl font-medium leading-[1.25]" 
                multiline={false}   
                submitBehavior="blurAndSubmit"
                textContentType="addressState"
            />
            <Text className="text-lg text-primary-400 font-regular mb-1">Country</Text>
            <BottomSheetTextInput 
                placeholder="Ontario" 
                className="text-4xl font-medium leading-[1.25]" 
                multiline={false}   
                submitBehavior="blurAndSubmit"
                textContentType="countryName"
            />
        </View> 
    )
}

export const Feature = () => {
    return(
        <View className="mb-12">
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
    );
}

export const Submit = () => {
    return (
        <View className="mb-12 items-center">
            <Text className="text-lg text-primary-400 font-regular text-center">Spread the word to friends</Text>
            <View className='flex-row gap-4 mt-4'>
                <TouchableOpacity onPress={() => {}} className="border border-neutral-300 rounded-lg p-3">
                    <Facebook size={28} strokeWidth={1.75} className="text-neutral-800"/>    
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} className="border border-neutral-300 rounded-lg p-3">
                    <Instagram size={28} strokeWidth={1.75} className="text-neutral-800"/>    
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} className="border border-neutral-300 rounded-lg p-3">
                    <Twitter size={28} strokeWidth={1.75} className="text-neutral-800"/>    
                </TouchableOpacity>    
            </View>
            <View className='flex gap-4 w-full mt-8'>
                <CustomButton title="Post Listing" className="w-full" />
                <View className='flex flex-row gap-4'>
                    <CustomButton title="Save as Draft" className="flex-1" bgVariant='secondary' textVariant='dark'/>
                    <CustomButton title="Cancel" className="flex-1" bgVariant='danger' textVariant='danger'/>        
                </View>
            </View>
        </View>
    );
}

export const ConditionCategory = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);

    return (
        <View className="mb-24">
            <View className='mb-4'>
                <Text className="text-lg text-primary-400 font-regular mb-3">Choose a category for your item</Text>
                <RadioButton 
                    values={CATEGORIES.map(category => category.name)}
                    selectedValue={selectedCategory !== null ? CATEGORIES.find(category => category.id === selectedCategory)?.name || "" : ""}
                    onValueChange={(value) => {
                        const category = CATEGORIES.find(category => category.name === value);
                        setSelectedCategory(category ? category.id : null);
                    }}
                    required
                    boxStyle={true}
                    orientation='wrap'
                />    
            </View>
            <View>
                <Text className="text-lg text-primary-400 font-regular mb-3">What is your item's condition?</Text>
                <RadioButton 
                    values={Object.values(Condition).map(
                        val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
                    )}
                    selectedValue={selectedCondition || ""}
                    onValueChange={(value) => setSelectedCondition(value as Condition)}
                    required={false}
                    boxStyle={true}
                    orientation='wrap'
                />    
            </View>
            
        </View>
    );
}
