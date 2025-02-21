import { KeyboardAvoidingView, Platform, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import InputField from "../form/InputField";
import { ArrowBigUpDash, ChevronRight, CircleX, Info, Minus, Plus, SquarePen } from "lucide-react-native";
import CustomButton from "../CustomButton";
import { forwardRef, useCallback, useRef, useState, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetModalComponent, { BottomSheetModalComponentProps } from "./BottomSheetModal";
import PriceField from "../form/PriceField";
import SelectField from "../form/SelectField";

const FilterListing = forwardRef<BottomSheetModal, BottomSheetModalComponentProps & { onApplyFilters: (filters: any) => void }>(
    ({ content, header, footer, snapPoints, onApplyFilters }, ref ) => {
    
    // Keep track of the current filter values
    const filtersRef = useRef({
        category_id: [] as string[],
        condition: [] as string[],
        is_featured: false,
        sort_by: '',
        status: [] as string[],
        min_price: '',
        max_price: '',
    });

    // This state will be used when applying filters
    const [filters, setFilters] = useState(filtersRef.current);

    const handleApplyFilters = () => {
        // Update the filters state with all current values from filtersRef
        setFilters({...filtersRef.current});
        // Pass the filters to the parent component
        onApplyFilters(filters);
    };

    return (
        <BottomSheetModalComponent
            ref={ref}
            enableDynamicSizing={true}
            header="Filters"
            footer={
                <View className="p-8 bg-white shadow-md">
                    <CustomButton 
                        title="Apply Filters"
                        onPress={handleApplyFilters}
                    />
                </View>
            }
            content={
                <View>
                    {/* Category */}
                    <SelectField
                        label="Category"
                        options={[
                            { id: '1', name: 'Electronics' },
                            { id: '2', name: 'Clothing' },
                            { id: '3', name: 'Furniture' },
                            { id: '4', name: 'Books' },
                            { id: '5', name: 'Miscellaneous' },
                        ]}
                        selectedValues={filtersRef.current.category_id}
                        multiple={true}
                        wrap={true}
                        onChange={(selected) => {
                            filtersRef.current.category_id = selected;
                        }}
                        containerStyle="mb-8"
                    />
                    
                    {/* Sort By */}
                    <View className="flex flex-row justify-between items-center mb-8">
                        <Text className="label">Order By</Text>
                        <TouchableOpacity className="flex flex-row items-center gap-2">
                            <Text className="info">{filtersRef.current.sort_by || 'Ascending Title'}</Text>
                            <ChevronRight size={24} className="text-neutral-400" />
                        </TouchableOpacity>
                    </View>

                    {/* Price Range */}
                    <View className="flex flex-row gap-4"> 
                        <View className="flex-1">
                            <PriceField 
                                label="Min Price"
                                isBottomSheetInput={true}
                                placeholder="00.00"
                                defaultValue={filtersRef.current.min_price}
                                onChangeText={(value) => {
                                    filtersRef.current.min_price = value;
                                }}
                            />
                        </View>
                        <View className="flex-1">
                            <PriceField 
                                label="Max Price"
                                isBottomSheetInput={true}
                                placeholder="00.00"
                                defaultValue={filtersRef.current.max_price}
                                onChangeText={(value) => {
                                    filtersRef.current.max_price = value;
                                }}
                            />
                        </View>
                    </View>    
                   
                    {/* Featured Toggle */}
                    <View className="flex flex-row justify-between items-center mb-8">
                        <Text className="label">Featured Only</Text>
                        <Switch 
                            trackColor={{ false: '#F5F5F5', true: '#FF5A5F' }}
                            thumbColor={filtersRef.current.is_featured ? '#FAFAFA' : '#F5F5F5'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => {
                                filtersRef.current.is_featured = value;
                            }}
                            value={filtersRef.current.is_featured}
                        />
                    </View>

                    {/* Condition */}
                    <SelectField
                        label="Condition"
                        options={[
                            { id: 'New', name: 'New' },
                            { id: 'Used', name: 'Used' },
                            { id: 'Refurbished', name: 'Refurbished' }
                        ]}
                        selectedValues={filtersRef.current.condition}
                        multiple={true}
                        wrap={true}
                        onChange={(selected) => {
                            filtersRef.current.condition = selected;
                        }}
                        containerStyle="mb-8"
                    />
                    
                    {/* Status */}
                    <SelectField
                        label="Status"
                        options={[
                            { id: 'Active', name: 'Active' },
                            { id: 'Inactive', name: 'Inactive' },
                            { id: 'Draft', name: 'Draft' },
                            { id: 'Sold', name: 'Sold' }
                        ]}
                        selectedValues={filtersRef.current.status}
                        multiple={true}
                        wrap={true}
                        onChange={(selected) => {
                            filtersRef.current.status = selected;
                        }}
                        containerStyle="mb-8"
                    />
                </View>
            }
        />
    );
});

export default FilterListing;