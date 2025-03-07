import { View, Text, TouchableOpacity, Switch, Keyboard, Dimensions, TextInput } from 'react-native'
import React, { forwardRef, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetHandleProps, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView, TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import CustomButton from '../../CustomButton';
import PriceField from '../../form/PriceField';
import SelectField from '../../form/SelectField';
import { UserFilterState } from '@/types/type';
import { Listing, ListingFilters, DEFAULT_FILTERS, CATEGORIES, Condition, Status } from "@/constants/listing";
import { bottomSheetCorners } from '@/constants/styles';
import { ArrowLeft, ArrowRight, Delete, Info } from 'lucide-react-native';
import PriceKeypad from '@/components/form/PriceKeypad';

import InputField from '@/components/form/InputField';
import { Description, Feature, Location, Price, Submit, Title, ConditionCategory } from '@/components/AddListingFormComponents';
import { router } from 'expo-router';

interface AddBottomSheetProps {
    header?: string;
    }


const AddBottomSheet = forwardRef<BottomSheetModal, AddBottomSheetProps>(
    ({ header }, ref) => {
        const bottomSheetRef = ref as MutableRefObject<BottomSheetModal | null>;
        const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
        
        const renderHeader = useCallback(
            (_: BottomSheetHandleProps) => (
                <View className='items-center mb-4'>
                    <View className='w-10 h-1 rounded-full bg-neutral-400 mt-4'></View>
                </View>
            ),
            [header]
        );
        
        const [subscriptionStatus, setSubscriptionStatus] = useState('subscribed');
        const [showForm, setShowForm] = useState(false);

        const formSections = [
            { key: 'title', component: <Title /> },
            { key: 'description', component: <Description /> },
            { key: 'price', component: <Price /> },
            { key: 'condition', component: <ConditionCategory /> },
            { key: 'location', component: <Location /> },
            { key: 'feature', component: <Feature /> },
            { key: 'submit', component: <Submit /> }
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

        return (
            <BottomSheetModal
                ref={ref}
                backdropComponent={renderBackdrop}
                handleComponent={renderHeader}
                enableDynamicSizing={true}
                enableOverDrag={true}
                backgroundStyle={bottomSheetCorners}
            >
                <BottomSheetView className='px-8'> 
                    
                    {!showForm && subscriptionStatus === 'unsubscribed' && (
                        <View className="items-center mt-4 mb-16">
                            <Text className="text-lg text-center text-primary-400 font-regular mb-1">Unlock Selling</Text>
                            <Text className="text-center text-2xl font-medium text-dark w-3/4 mb-4">Turn Items into Cash</Text>
                            <Text className="text-center text-base font-regular text-light mb-8">List your items and connect with buyers instantly. Subscribe to get started.</Text>
                            <CustomButton
                                title="Subscribe Now"
                                className="w-full"
                                onPress={() => {
                                    router.push('/settings');
                                    bottomSheetRef.current?.dismiss();
                                }}
                            />    
                        </View>
                    )}

                    {!showForm && subscriptionStatus === 'limitReached' && (
                        <View className="items-center mt-4 mb-16">
                            <Text className="text-lg text-center text-primary-400 font-regular mb-1">Limit Reached</Text>
                            <Text className="text-center text-2xl font-medium text-dark w-3/4 mb-4">Save as a Draft</Text>
                            <Text className="text-center text-base font-regular text-light mb-8">
                                You can only have 4 active listings at a time. Save your current listing as a draft or upgrade to Premium for unlimited listings.
                            </Text>
                            <CustomButton title="Continue" className="w-full" onPress={() => setShowForm(true)} />
                            <TouchableOpacity>
                                <Text className="text-primary-400 text-center text-base font-medium mt-3">Upgrade to Premium</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {!showForm && subscriptionStatus === 'subscribed' && (
                        <View className="items-center mt-4 mb-16">
                            <Text className="text-lg text-center text-primary-400 font-regular mb-1">Get Started</Text>
                            <Text className="text-center text-2xl font-medium text-dark w-3/4 mb-4">Create a Listing</Text>
                            <Text className="text-center text-base font-regular text-light mb-8">
                                List your items now and connect with buyers instantly.
                            </Text>
                            <CustomButton title="Create a Listing" className="w-full" onPress={() => setShowForm(true)} />
                        </View>
                    )}

                    {showForm && (
                        <>
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
                        </>
                    )}

                </BottomSheetView>
            </BottomSheetModal>
        );
    }

);

export default AddBottomSheet;