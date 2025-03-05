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

interface AddBottomSheetProps {
    header?: string;
}


const AddBottomSheet = forwardRef<BottomSheetModal, AddBottomSheetProps>(
    ({ header }, ref) => {
        const bottomSheetRef = ref as MutableRefObject<BottomSheetModal | null>;
        // const snapPoints = useMemo(() => ['100%'], []);
        const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
        

        // currently testing ui design in favorites/index.tsx, to be implemented in Add.tsx


        return (
            <BottomSheetModal
                ref={ref}
                // snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                enableDynamicSizing={true}
                enableOverDrag={true}
                backgroundStyle={bottomSheetCorners}
            >
                <BottomSheetView className='px-8'> 
                    
                    {/* Title */}
                    <View className='pb-24'>
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
                    
                </BottomSheetView>
            </BottomSheetModal>
        );
    }

)

export default AddBottomSheet;