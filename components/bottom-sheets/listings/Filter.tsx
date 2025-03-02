import { View, Text, TouchableOpacity, Switch, Keyboard } from 'react-native'
import React, { forwardRef, MutableRefObject, useCallback, useMemo, useRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetHandleProps, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView, TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import CustomButton from '../../CustomButton';
import PriceField from '../../form/PriceField';
import SelectField from '../../form/SelectField';
import { UserFilterState } from '@/types/type';
import { Listing, ListingFilters, DEFAULT_FILTERS, CATEGORIES, Condition, Status } from "@/constants/listing";
import { bottomSheetCorners } from '@/constants/styles';


interface FilterBottomSheetProps {
    filters: ListingFilters;
    header?: string;
    onFiltersSaved: (updatedFilters: ListingFilters) => void;
}

const FilterBottomSheet = forwardRef<BottomSheetModal, FilterBottomSheetProps>(
    ({ filters, header, onFiltersSaved }, ref) => {
        const bottomSheetRef = ref as MutableRefObject<BottomSheetModal | null>;
        // const snapPoints = useMemo(() => ['100%'], []);
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
        
        const [tempFilters, setTempFilters] = useState<ListingFilters>({ ...filters });

        const saveFilters = useCallback(() => {
            onFiltersSaved(tempFilters);
            bottomSheetRef.current?.dismiss();

        }, [tempFilters, onFiltersSaved]);

        const renderFooter = useCallback(
            (props: any) => ( 
              <BottomSheetFooter {...props} bottomInset={0}>
                    <View className="p-8 bg-white shadow-md">
                        <CustomButton title='Apply Filters' onPress={saveFilters} />
                    </View>
              </BottomSheetFooter>
            ),
            [saveFilters]
        );

        return (
            <BottomSheetModal
                ref={ref}
                // snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                handleComponent={renderHeader}
                footerComponent={renderFooter}
                enableDynamicSizing={true}
                enableOverDrag={true}
                backgroundStyle={bottomSheetCorners}
 
            >
                <BottomSheetView className='px-8'>

                    {/* Category */}
                    <SelectField
                        label="Category"
                        options={CATEGORIES}
                        multiple={true}
                        wrap={false}
                        containerStyle="mb-8"
                        selectedValues={tempFilters.categories}
                        onChange={(values) =>
                            setTempFilters({ ...tempFilters, categories: values.map(Number) })
                        }
                    />

                    {/* Price Range */}
                    <View className="flex flex-row gap-4"> 
                        <View className="flex-1">
                            <PriceField 
                                label="Min Price"
                                isBottomSheetInput={true}
                                placeholder="00.00"
                                defaultValue={tempFilters.minPrice?.toString()}
                                onChangeText={(text) => 
                                    setTempFilters({ 
                                        ...tempFilters, 
                                        minPrice: text.trim() === "" ? undefined : Number(text) 
                                    })
                                }
                            />
                        </View>
                        <View className="flex-1">
                            <PriceField 
                                label="Max Price"
                                isBottomSheetInput={true}
                                placeholder="00.00"
                                defaultValue={tempFilters.maxPrice?.toString()}
                                onChangeText={(text) => 
                                    setTempFilters({ 
                                        ...tempFilters, 
                                        maxPrice: text.trim() === "" ? undefined : Number(text) 
                                    })
                                }
                            />
                        </View>
                    </View>

                    {/* Featured Toggle */}
                    <View className="flex flex-row justify-between items-center mb-8">
                        <Text className="label">Featured Only</Text>
                        <Switch 
                            value={tempFilters.isFeaturedOnly}
                            trackColor={{ false: '#F5F5F5', true: '#FF5A5F' }}
                            thumbColor={tempFilters.isFeaturedOnly ? '#FAFAFA' : '#F5F5F5'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => setTempFilters(prev => ({ ...prev, isFeaturedOnly: value }))}
                        />
                    </View>

                    {/* Condition */}
                    <SelectField
                        label="Condition"
                        options={Object.values(Condition).map(value => ({ 
                            id: value, 
                            name: value.charAt(0).toUpperCase() + value.slice(1) // Capitalize first letter
                        }))}
                        multiple={true}
                        wrap={false}
                        containerStyle="mb-8"
                        selectedValues={tempFilters.conditions}
                        onChange={(values) =>
                            setTempFilters({ ...tempFilters, conditions: values as Condition[] })
                        }
                    />

                    {/* Status */}
                    <SelectField
                        label="Status"
                        options={Object.values(Status).map(value => ({ 
                            id: value, 
                            name: value.charAt(0).toUpperCase() + value.slice(1) // Capitalize first letter
                        }))}
                        multiple={true}
                        wrap={false}
                        containerStyle="mb-8"
                        selectedValues={tempFilters.status}
                        onChange={(values) =>
                            setTempFilters({ ...tempFilters, status: values as Status[] })
                        }
                    />

                    {/* Visualize the filters for testing - Delete if not using */}
                    {/* <Text>Temp category: {JSON.stringify(tempFilters.categories)}</Text>
                    <Text>Temp Condition: {JSON.stringify(tempFilters.conditions)}</Text>
                    <Text>Temp Status: {JSON.stringify(tempFilters.status)}</Text>
                    <Text>Temp Min Price: {JSON.stringify(tempFilters.minPrice)}</Text>
                    <Text>Temp Max Price: {JSON.stringify(tempFilters.maxPrice)}</Text>
                    <Text>{tempFilters.isFeaturedOnly ? 'On' : 'Off'}</Text>
                    <Text>-------</Text>
                    <Text>Filters category: {JSON.stringify(filters.categories)}</Text>
                    <Text>Filters conditions: {JSON.stringify(filters.conditions)}</Text>
                    <Text>Filters status: {JSON.stringify(filters.status)}</Text>
                    <Text>Filters min price: {filters.minPrice}</Text>
                    <Text>Filters max price: {filters.maxPrice}</Text> */}
                </BottomSheetView>
            </BottomSheetModal>
        );
    }

)

export default FilterBottomSheet;