import { View, Text, TouchableOpacity, Switch, Keyboard } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetHandleProps, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView, TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import CustomButton from '../../CustomButton';
import PriceField from '../../form/PriceField';
import SelectField from '../../form/SelectField';
import { UserFilterState } from '@/types/type';
import { categories, conditions, statuses } from '@/constants/tables';
export type Ref = BottomSheetModal;
interface Props extends Partial<UserFilterState> {
    header?: string;
    setFilters?: (filters: UserFilterState) => void;
}

const Filter = forwardRef<Ref, Props>((props, ref) => {
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

    const saveFilters = () => {
        props.setFilters && props.setFilters({ 
            minPrice: tempfilters.minPrice,  
            maxPrice: tempfilters.maxPrice,
            categories: tempfilters.categories,
            condition: tempfilters.condition,
            status: tempfilters.status,
            isFeaturedOnly: tempfilters.isFeaturedOnly
        });
    }
    // Temp states until saved, reduces API calls
    const [tempfilters, setTempFilters] = useState<UserFilterState>({
        minPrice: props.minPrice,
        maxPrice: props.maxPrice,
        categories: props.categories,
        condition: props.condition,
        status: props.status,
        isFeaturedOnly: props.isFeaturedOnly
    });
    
    const renderFooter = useCallback(
        (props: any) => ( 
          <BottomSheetFooter {...props} bottomInset={0}>
                <View className="p-8 bg-white shadow-md">
                    <CustomButton title='Save Filters' onPress={saveFilters} />
                </View>
          </BottomSheetFooter>
        ),
        [props.setFilters, tempfilters]
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
            backgroundStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
            {...props}
        >
            <BottomSheetView className='px-8'>

                {/* Category */}
                <SelectField
                    label="Category"
                    options={categories}
                    multiple={true}
                    wrap={false}
                    containerStyle="mb-8"
                    selectedValues={tempfilters.categories}
                    onChange={(values) => setTempFilters({ ...tempfilters, categories: values })}
                />


                {/* Price Range */}
                    <View className="flex flex-row gap-4"> 
                        <View className="flex-1">
                            <PriceField 
                                label="Min Price"
                                isBottomSheetInput={true}
                                placeholder="00.00"
                                defaultValue={tempfilters.minPrice?.toString()}
                                onChangeText={(text) => setTempFilters({ ...tempfilters, minPrice: Number(text) })}
                            />
                        </View>
                        <View className="flex-1">
                            <PriceField 
                                label="Max Price"
                                isBottomSheetInput={true}
                                placeholder="00.00"
                                defaultValue={tempfilters.maxPrice?.toString()}
                                onChangeText={(text) => 
                                    setTempFilters({ 
                                        ...tempfilters, 
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
                        value={tempfilters.isFeaturedOnly}
                        trackColor={{ false: '#F5F5F5', true: '#FF5A5F' }}
                        thumbColor={tempfilters.isFeaturedOnly ? '#FAFAFA' : '#F5F5F5'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => setTempFilters(prev => ({ ...prev, isFeaturedOnly: value }))}
                    />
                </View>
                {/* <Text>{tempfilters.isFeaturedOnly ? 'On' : 'Off'}</Text> */}

                {/* Condition */}
                <SelectField
                    label="Condition"
                    options={conditions}
                    multiple={true}
                    wrap={true}
                    containerStyle="mb-8"
                    selectedValues={tempfilters.condition}
                    onChange={(values) => setTempFilters({ ...tempfilters, condition: values })}
                />
                
                {/* Status */}
                <SelectField
                    label="Status"
                    options={statuses}
                    multiple={true}
                    wrap={true}
                    containerStyle="mb-8"
                    selectedValues={tempfilters.status}
                    onChange={(values) => setTempFilters({ ...tempfilters, status: values })}
                />
            </BottomSheetView>
        </BottomSheetModal>
    )
});

export default Filter