import { View, Text, TouchableOpacity, Switch, Keyboard } from 'react-native'
import React, { forwardRef, MutableRefObject, useCallback, useMemo, useRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetHandleProps, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView, TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import CustomButton from '../../CustomButton';
import PriceField from '../../form/PriceField';
import SelectField from '../../form/SelectField';
import { UserFilterState } from '@/types/type';
import { Listing, ListingFilters, DEFAULT_FILTERS, CATEGORIES, Condition, Status } from "@/constants/listing";
import { bottomSheetCorners } from '@/constants/styles';
import { Checkbox, DualPriceInput } from '@/components/form/FormComponents';
import { Check } from 'lucide-react-native';
import { TextInput } from 'react-native-gesture-handler';


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

        // We created local states for minPrice and maxPrice as strings to keep autoformatting
        const [minPrice, setMinPrice] = useState(String(filters.minPrice ?? ''));
        const [maxPrice, setMaxPrice] = useState(String(filters.maxPrice ?? ''));

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
                    <Checkbox
                        mainLabel="Category"
                        values={CATEGORIES.map(category => category.name)}
                        selectedValues={CATEGORIES.filter(category => tempFilters.categories.includes(category.id)).map(category => category.name)}
                        onValueChange={(selectedNames) => {
                            const selectedIds = CATEGORIES.filter(category => selectedNames.includes(category.name)).map(category => category.id);
                            setTempFilters({ ...tempFilters, categories: selectedIds });
                        }}
                        required={false}
                        boxStyle={true}
                        containerClassName="mb-8"
                        orientation='scroll'
                    />

                    
                    <DualPriceInput 
                        mainLabel='Price Range'
                        minValue={minPrice}
                        maxValue={maxPrice}
                        onMinChange={(value) => {
                            setMinPrice(value);
                            // Convert string to float and update numeric filters
                            // If empty or non-numeric, set to undefined 
                            const numericValue = value.trim() === '' ? undefined : parseFloat(value);
                            setTempFilters(prev => ({
                                ...prev,
                                minPrice: isNaN(numericValue as number) ? undefined : numericValue
                            }));
                        }}
                        onMaxChange={(value) => {
                            setMaxPrice(value);
                            // Convert string to float and update numeric filters
                            // If empty or non-numeric, set to undefined
                            const numericValue = value.trim() === '' ? undefined : parseFloat(value);
                            setTempFilters(prev => ({
                                ...prev,
                                maxPrice: isNaN(numericValue as number) ? undefined : numericValue
                            }));
                        }}
                        isBottomSheet={true}
                        containerClassName='mb-8'
                    />
                    
                    
                    {/* Featured Toggle */}
                    <View className="flex flex-row justify-between items-center mb-8">
                        <Text className="form-label">Featured Only</Text>
                        <Switch 
                            value={tempFilters.isFeaturedOnly}
                            trackColor={{ false: '#F5F5F5', true: '#FF5A5F' }}
                            thumbColor={tempFilters.isFeaturedOnly ? '#FAFAFA' : '#F5F5F5'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => setTempFilters(prev => ({ ...prev, isFeaturedOnly: value }))}
                        />
                    </View>
                    
                    {/* Condition */}
                    <Checkbox
                        mainLabel="Condition"
                        values={Object.values(Condition).map(value => value.charAt(0).toUpperCase() + value.slice(1))}
                        selectedValues={tempFilters.conditions.map(value => value.charAt(0).toUpperCase() + value.slice(1))}
                        onValueChange={(selectedNames) => {
                            const selectedConditions = selectedNames.map(name => name.toLowerCase() as Condition);
                            setTempFilters({ ...tempFilters, conditions: selectedConditions });
                        }}
                        required={false}
                        boxStyle={true}
                        containerClassName="mb-8"
                    />

                    {/* Status */}
                    <Checkbox
                        mainLabel="Status"
                        values={Object.values(Status).map(value => value.charAt(0).toUpperCase() + value.slice(1))}
                        selectedValues={tempFilters.status.map(value => value.charAt(0).toUpperCase() + value.slice(1))}
                        onValueChange={(selectedNames) => {
                            const selectedStatuses = selectedNames.map(name => name.toLowerCase() as Status);
                            setTempFilters({ ...tempFilters, status: selectedStatuses });
                        }}
                        required={false}
                        boxStyle={true}
                        containerClassName="mb-8"
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