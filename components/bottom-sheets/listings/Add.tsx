import { View, Text, TouchableOpacity, Switch, Keyboard, Dimensions, TextInput, Pressable } from 'react-native'
import React, { forwardRef, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetHandleProps, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView, TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import CustomButton from '../../CustomButton';
import PriceField from '../../form/PriceField';
import SelectField from '../../form/SelectField';
import { UserFilterState } from '@/types/type';
import { Listing, ListingFilters, DEFAULT_FILTERS, CATEGORIES, Condition, Status, FEATURE_OPTIONS, FeatureOption } from "@/constants/listing";
import { bottomSheetCorners } from '@/constants/styles';
import { ArrowLeft, ArrowRight, Delete, Facebook, Info, Instagram, Twitter } from 'lucide-react-native';
import PriceKeypad from '@/components/form/PriceKeypad';

import InputField from '@/components/form/InputField';
// import { Description, Feature, Location, Price, Submit, Title, ConditionCategory } from '@/components/AddListingFormComponents';
import { router } from 'expo-router';
import { AutoComplete, ComboBox, Input, PriceInput, RadioButton } from '@/components/form/FormComponents';
import { Dispatch, SetStateAction } from 'react';
import { clerk } from '@clerk/clerk-expo/dist/provider/singleton';
import dayjs from "dayjs";
import { countries } from '@/constants/location';


interface FormProps {
    form: Listing;
    setForm: Dispatch<SetStateAction<Listing>>;
}

const Title = ({ form, setForm }: FormProps) => {
    return (
        <View className="mb-24">
            <Text className="form-label mb-1">Give your listing a title</Text>
            <BottomSheetTextInput 
                placeholder="Bluetooth Wireless Headphones" 
                className="text-4xl font-medium leading-[1.25]" 
                multiline={true}   
                submitBehavior="blurAndSubmit"
                value={form.title}
                onChangeText={(text) => setForm((prev) => ({ ...prev, title: text }))}
            />
        </View>
    );
}

const Description = ({ form, setForm }: FormProps) => {
    return (
        <View className="mb-24">
            <Text className="form-label mb-1">Write a detailed description</Text>
            <BottomSheetTextInput 
                placeholder="Brand new, never used, wireless Bluetooth headphones with superior sound quality and noise-canceling..." 
                className="text-2xl font-medium leading-[1.25] max-h-72" 
                multiline={true}   
                submitBehavior="newline"
                value={form.description}
                onChangeText={(text) => setForm((prev) => ({ ...prev, description: text }))}

            />
        </View>
    );
}

const Price = ({ form, setForm }: FormProps) => {
    return (
        <View className="mb-12">
            <Text className="form-label text-center">Set an appropriate price</Text>
            <PriceKeypad onPriceChange={(val) => setForm(prev => ({ ...prev, price: parseFloat(val) }))} />
        </View>
    );
}

const ConditionCategory = ({ form, setForm }: FormProps) => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(form.category_id || null);
    const [selectedCondition, setSelectedCondition] = useState<Condition | null>(form.condition);

    return (
        <View className="mb-24">
            <View className='mb-4'>
                <RadioButton 
                    mainLabel='Choose a category for your item'
                    values={CATEGORIES.map(category => category.name)}
                    selectedValue={
                        selectedCategory !== null 
                            ? CATEGORIES.find(category => category.id === selectedCategory)?.name || "" 
                            : ""
                    }
                    onValueChange={(value) => {
                        const category = CATEGORIES.find(c => c.name === value);
                        setSelectedCategory(category ? category.id : null);
                        setForm(prev => ({ ...prev, category_id: category ? category.id : 0 }));
                    }}
                    required={true}
                    boxStyle={true}
                    orientation='wrap'
                    icon
                />    
            </View>
            <View>
                <RadioButton 
                    mainLabel="Condition (optional)"
                    values={Object.values(Condition).map(
                        (val) => val.charAt(0).toUpperCase() + val.slice(1) // Capitalizes only the first letter
                    )}
                    selectedValue={selectedCondition ? selectedCondition.charAt(0).toUpperCase() + selectedCondition.slice(1) : ""}
                    onValueChange={(value) => {
                        if (typeof value === 'string') {
                            const lowerCasedValue = value.toLowerCase() as Condition; // Convert back to lowercase for the database
                            setSelectedCondition(lowerCasedValue);
                            setForm(prev => ({ ...prev, condition: lowerCasedValue }));
                        }
                    }}
                    boxStyle={true}
                    orientation='wrap'
                    icon
                /> 
            </View>
            
        </View>
    );
}
const Location = ({ form, setForm }: FormProps) => {
    const [ city, setCity ] = useState('');
    const [ province, setProvince ] = useState('');
    const [ country, setCountry ] = useState('');
    return (
        <View className="mb-24">
            <Text className="form-label mb-1">City</Text>
            <BottomSheetTextInput 
                placeholder="Westminister" 
                className="text-4xl font-medium leading-[1.25]" 
                multiline={false}   
                submitBehavior="blurAndSubmit"
                textContentType="addressCity"
                value={city}
                onChangeText={(text) => setCity(text)}
            />
        </View> 
    )
}


const Submit = ({ form, setForm }: FormProps) => {
    return (
        <View className="mb-12 items-center">
            <Text className="form-label text-center">Spread the word to friends</Text>
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
                <CustomButton title="Post Listing" className="w-full" onPress={ () => {
                    console.log('Posting Listing:', form);
                }}
                />
 
                <View className='flex flex-row gap-4'>
                    <CustomButton title="Save as Draft" className="flex-1" bgVariant='secondary' textVariant='dark'/>
                    <CustomButton title="Cancel" className="flex-1" bgVariant='danger' textVariant='danger'/>        
                </View>
            </View>
        </View>
    );
}




interface AddBottomSheetProps {
    header?: string;
    }

const AddBottomSheet = forwardRef<BottomSheetModal, AddBottomSheetProps>(
    ({ header }, ref ) => {

        // const bottomSheetRef = ref as MutableRefObject<BottomSheetModal | null>;
        const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
        
        const renderHeader = useCallback(
            (_: BottomSheetHandleProps) => (
                <View className='items-center mb-4'>
                    <View className='w-10 h-1 rounded-full bg-neutral-400 mt-4'></View>
                </View>
            ),
            [header]
        );

        const [form, setForm] = useState<Listing>({
            category_id: 0, // Default values
            condition: Condition.NEW,
            category_name: CATEGORIES[0].name,
            created_at: new Date().toISOString(),
            description: "",
            is_featured: false,
            featured_expires_at: "", //timestamptz
            listing_id: "",
            listing_views: 0,
            price: 0,
            status: Status.ACTIVE,
            title: "",
            views: 0,
            user_id: "",
            location: "",
        });
        
        const formSections = [
            { key: 'title', component: <Title form={form} setForm={setForm}/> },
            { key: 'description', component: <Description form={form} setForm={setForm} /> },
            { key: 'price', component: <Price form={form} setForm={setForm} /> },
            { key: 'condition', component: <ConditionCategory form={form} setForm={setForm} /> },
            { key: 'location', component: <Location form={form} setForm={setForm} /> },
            // { key: 'feature', component: <Feature form={form} setForm={setForm} /> },
            { key: 'submit', component: <Submit form={form} setForm={setForm} /> }
        ]

        const formSteps = formSections.length;
        const [ currentIndex, setCurrentIndex ] = useState(0);
        
        const handleBack = () => {
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }
        const handleNext = () => {
            if (currentIndex < formSteps - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }

        // console.log('Current Index:', currentIndex);
        console.log('Form:', form);


        return (
            <BottomSheetModal
                ref={ref}
                backdropComponent={renderBackdrop}
                handleComponent={renderHeader}
                enableDynamicSizing={true}
                enableOverDrag={true}
                backgroundStyle={bottomSheetCorners}
                keyboardBlurBehavior="restore"
            >
                <BottomSheetView className='px-8'> 
                    {/* Form Sections */}
                    <View className='mt-4'>
                        {formSections[currentIndex].component}
                    </View>

                    {/*Form Navigation Header */}
                    <View className="flex-row justify-between items-center mb-10">
                        <TouchableOpacity onPress={handleBack} className="border border-neutral-300 rounded-full p-2">
                            <ArrowLeft size={24} strokeWidth={1.75} className="text-neutral-800"/>    
                        </TouchableOpacity>

                        <View className="flex-row gap-2">
                            {formSections.map((_, index) => (
                                <View
                                    key={index}
                                    className={`h-2 rounded-full ${index === currentIndex ? "w-8 bg-primary-400" : "w-2"} ${
                                        index < currentIndex ? "bg-primary-400" : "bg-neutral-300"
                                    }`}
                                />
                            ))}
                        </View>

                        <TouchableOpacity onPress={handleNext} className="border border-neutral-300 rounded-full p-2">
                            <ArrowRight size={24} strokeWidth={1.75} className="text-neutral-800" />    
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        );
    }

);

export default AddBottomSheet;

