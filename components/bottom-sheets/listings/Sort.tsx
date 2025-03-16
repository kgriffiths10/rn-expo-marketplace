import { View, Text, TouchableOpacity, Switch } from 'react-native'
import React, { forwardRef, MutableRefObject, useCallback, useMemo, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetHandleProps, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import CustomButton from '../../CustomButton';
import { UserFilterState } from '@/types/type';
import { ChevronRight, ArrowUpDown, SortAsc, SortDesc, Eye, DollarSign, Text as TextIcon } from 'lucide-react-native';
import { Listing, ListingFilters, DEFAULT_FILTERS, CATEGORIES, Condition, Status, SortOption, SORT_OPTIONS } from "@/constants/listing";
import { bottomSheetCorners } from '@/constants/styles';
import { Mutable } from 'react-native-reanimated/lib/typescript/commonTypes';
import { RadioButton } from '@/components/form/FormComponents';


interface SortBottomSheetProps {
    filters: ListingFilters;
    header?: string;
    onSortPress: (updatedFilters: ListingFilters) => void;
}

const SortBottomSheet = forwardRef<BottomSheetModal, SortBottomSheetProps>(
    ({filters, header, onSortPress}, ref) => {
    
    const bottomSheetRef = ref as MutableRefObject<BottomSheetModal | null>;
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
    
    const renderHeader = useCallback(
        (_: BottomSheetHandleProps) => (
            <View className='items-center mb-4'>
                <View className='w-10 h-1 rounded-full bg-neutral-400 mt-4 mb-4'></View>
                <Text className='bottom-sheet-heading my-4'>{header}</Text>
            </View>
        ),
        [header]
    );
    
    // Map SortOption objects to string labels for RadioButton component
    const sortOptionLabels = useMemo(() => 
        SORT_OPTIONS.map(option => option.label),
    []);
    
    // Get the currently selected sort option label
    const selectedSortLabel = useMemo(() => 
        filters.sortBy ? filters.sortBy.label : SORT_OPTIONS[4].label,
    [filters.sortBy]);

    const handleSortChange = useCallback((selectedLabel: string | number) => {
        if (typeof selectedLabel !== 'string') return;
        // Find the corresponding SortOption based on selected label
        const selectedOption = SORT_OPTIONS.find(option => option.label === selectedLabel);
        
        if (selectedOption) {
            // Create updated filters with new sort option
            const updatedFilters = {
                ...filters,
                sortBy: selectedOption
            };
            
            // Pass updated filters to parent component
            onSortPress(updatedFilters);
            
            // Dismiss the bottom sheet
            bottomSheetRef.current?.dismiss();
        }
    }, [filters, onSortPress, bottomSheetRef]);

    return (
        <BottomSheetModal
            ref={ref}
            backdropComponent={renderBackdrop}
            handleComponent={renderHeader}
            enableDynamicSizing={true}
            enableOverDrag={false}
            backgroundStyle={bottomSheetCorners}
        >
            <BottomSheetView className='px-8 pb-8'>
                <RadioButton
                    values={sortOptionLabels}
                    selectedValue={selectedSortLabel}
                    onValueChange={handleSortChange}
                    required={false}
                    boxStyle={false}
                    containerClassName="mb-8"
                    orientation='list'
                />
            </BottomSheetView> 
        </BottomSheetModal>
    )
});

export default SortBottomSheet;