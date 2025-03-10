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
import { RadioButton } from '@/components/form/FormComponents';
import { Dispatch, SetStateAction } from 'react';
import { clerk } from '@clerk/clerk-expo/dist/provider/singleton';
import dayjs from "dayjs";


interface AddBottomSheetProps {
    header?: string;
    }

const SubscribeBottomSheet = forwardRef<BottomSheetModal, AddBottomSheetProps>(
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
                </BottomSheetView>
            </BottomSheetModal>
        );
    }

);

export default SubscribeBottomSheet;

