import { View, Text, TouchableOpacity, Switch } from 'react-native'
import React, { forwardRef, MutableRefObject, useCallback, useMemo, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetHandleProps, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import CustomButton from '../../CustomButton';
import { UserFilterState } from '@/types/type';
import { ChevronRight, ArrowUpDown, SortAsc, SortDesc, Eye, DollarSign, Text as TextIcon } from 'lucide-react-native';
import { Listing, ListingFilters, DEFAULT_FILTERS, CATEGORIES, Condition, Status, SortOption, SORT_OPTIONS } from "@/constants/listing";
import { bottomSheetCorners } from '@/constants/styles';
import { Mutable } from 'react-native-reanimated/lib/typescript/commonTypes';


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

    const iconSize = 18;
    const iconStyle = 'stroke-neutral-400';
    const getSortIcon = (column: string, direction: string) => {
        if (column === 'price') return <DollarSign size={iconSize} className={iconStyle} />;
        if (column === 'title') return <TextIcon size={iconSize} className={iconStyle} />;
        if (column === 'created_at') return <ArrowUpDown size={iconSize} className={iconStyle} />;
        if (column === 'listing_views') return <Eye size={iconSize} className={iconStyle} />;
    }

    const [selectedSort, setSelectedSort] = useState<SortOption>(filters.sortBy);

    const handleSelectOption = (option: SortOption) => {
        setSelectedSort(option);
        onSortPress({
            ...filters,
            sortBy: option
        });
        bottomSheetRef.current?.dismiss();
    };

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
                {SORT_OPTIONS.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        className='flex-row items-center justify-between mb-4'
                        onPress={() => handleSelectOption(option)}>
                        <View className='flex-row items-center gap-3'>
                            {getSortIcon(option.column, option.ascending ? 'asc' : 'desc')}
                            <Text className='label'>{option.label}</Text>
                        </View>
                        <View className='w-4 h-4 rounded-full border border-neutral-400 items-center justify-center'>
                            {selectedSort.id === option.id && (
                                <View className='w-4 h-4 rounded-full bg-primary-400'/>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </BottomSheetView> 
        </BottomSheetModal>
    )
});

export default SortBottomSheet;