import { View, Text, TouchableOpacity, Switch } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetHandleProps, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import CustomButton from '../../CustomButton';
import { UserFilterState } from '@/types/type';
import { ChevronRight, ArrowUpDown, SortAsc, SortDesc, Eye, DollarSign, Text as TextIcon } from 'lucide-react-native';

export type Ref = BottomSheetModal;
interface Props extends Partial<UserFilterState> {
    header?: string;
    setFilters?: (filters: UserFilterState) => void;
}

const Sort = forwardRef<Ref, Props>((props, ref) => {
    // const snapPoints = useMemo(() => ['100%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
    
    const renderHeader = useCallback(
        (_: BottomSheetHandleProps) => (
            <View className='items-center mb-4'>
                <View className='w-10 h-1 rounded-full bg-neutral-400 mt-4 mb-4'></View>
                <Text className='bottom-sheet-heading my-4'>{props.header}</Text>
            </View>
        ),
        [props.header]
    );

    const sortOptions: { label: string; field: string; direction: 'ASC' | 'DESC'; icon: any }[] = [
        { label: 'Newest', field: 'created_at', direction: 'DESC', icon: SortDesc },
        { label: 'Oldest', field: 'created_at',  direction: 'ASC', icon: SortAsc },
        { label: 'Price: Low to High', field: 'price',  direction: 'ASC', icon: DollarSign },
        { label: 'Price: High to Low', field: 'price',  direction: 'DESC', icon: DollarSign },
        { label: 'Most Viewed', field: 'listing_views',  direction: 'DESC', icon: Eye },
        { label: 'Least Viewed', field: 'listing_views',  direction: 'ASC', icon: Eye },
        { label: 'Title: A-Z', field: 'title', direction: 'ASC', icon: TextIcon },
        { label: 'Title: Z-A', field: 'title', direction: 'DESC', icon: TextIcon },
    ];

    const handleSort = (field: string, direction: 'ASC' | 'DESC') => {
        props.setFilters && props.setFilters({
            ...props,
            sortBy: field,
            sortDirection: direction
        });
    };
    
    // Temp states until saved, reduces API calls
    const [tempSort, setTempSort] = useState<UserFilterState>({
        sortBy: props.sortBy,
        sortDirection: props.sortDirection
    });

    const renderFooter = useCallback(
        (props: any) => ( 
          <BottomSheetFooter {...props} bottomInset={0}>
                <View className="p-8 bg-white shadow-md">
                    <CustomButton title='Save Filters' onPress={saveFilters} />
                </View>
          </BottomSheetFooter>
        ), 
        [props.setFilters, tempSort]
    );

    const saveFilters = () => {
        props.setFilters && props.setFilters({ 
            sortBy: tempSort.sortBy
        });
    };


    return (
        <BottomSheetModal
            ref={ref}
            // snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleComponent={renderHeader}
            footerComponent={renderFooter}
            enableDynamicSizing={true}
            enableOverDrag={false}
            backgroundStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
            
            {...props}
        >
            <BottomSheetView className='px-8 pb-8'>
                {sortOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                        <TouchableOpacity
                            key={option.label}
                            onPress={() => handleSort(option.field, option.direction)}
                            className="flex-row justify-between items-center py-4 border-b border-neutral-200"
                        >
                            <View className="flex-row items-center">
                                <IconComponent size={20} color="black" className="mr-2 stroke-neutral-400" />
                                <Text className="text-dark">{option.label}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </BottomSheetView>
        </BottomSheetModal>
    )
});

export default Sort;

{/* 

Newest → created_at DESC (most recent first)
Oldest → created_at ASC (oldest first)
Price: Low to High → price ASC
Price: High to Low → price DESC
Most Viewed → listing_views DESC
Least Viewed → listing_views ASC
Title: A-Z → title ASC
Title: Z-A → title DESC
    
*/}