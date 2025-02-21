import { KeyboardAvoidingView, Platform, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ArrowBigUpDash, ChevronRight, CircleX, Info, Minus, Plus, SquarePen } from "lucide-react-native";
import CustomButton from "../CustomButton";
import { forwardRef, useCallback, useRef, useState, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetModalComponent, { BottomSheetModalComponentProps } from "./BottomSheetModal";
import PriceField from "../form/PriceField";
import SelectField from "../form/SelectField";




const FilterUserListings = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
    ({ content, header, footer, snapPoints }, ref ) => {
        
        
        return (
            <BottomSheetModalComponent
                ref={ref}
                enableDynamicSizing={true}
                header="Filters"
                footer={
                    <View className="p-8 bg-white shadow-md">
                        <CustomButton 
                            title="Apply Filters"
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
                            multiple={true}
                            wrap={true}
                            containerStyle="mb-8"

                            
                        />
                        
                        {/* Sort By - Implement later for now*/}
                        <View className="flex flex-row justify-between items-center mb-8">
                            <Text className="label">Order By</Text>
                            <TouchableOpacity className="flex flex-row items-center gap-2">
                                <Text className="info">{ 'Ascending Title'}</Text>
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
                                />
                            </View>
                            <View className="flex-1">
                                <PriceField 
                                    label="Max Price"
                                    isBottomSheetInput={true}
                                    placeholder="00.00"
                                />
                            </View>
                        </View>
                    
                        {/* Featured Toggle */}
                        <View className="flex flex-row justify-between items-center mb-8">
                            <Text className="label">Featured Only</Text>
                            <Switch 
                                trackColor={{ false: '#F5F5F5', true: '#FF5A5F' }}
                                // thumbColor={localFilters.is_featured ? '#FAFAFA' : '#F5F5F5'}
                                ios_backgroundColor="#3e3e3e"
                                // onValueChange={(value) => setLocalFilters(prev => ({ ...prev, is_featured: value }))}
                            />
                        </View>

                        {/* <Text>{localFilters.is_featured ? 'On' : 'Off'}</Text> */}

                        {/* Condition */}
                        <SelectField
                            label="Condition"
                            options={[
                                { id: 'New', name: 'New' },
                                { id: 'Used', name: 'Used' },
                                { id: 'Refurbished', name: 'Refurbished' }
                            ]}
                            multiple={true}
                            wrap={true}
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
                            multiple={true}
                            wrap={true}
                            containerStyle="mb-8"
                        />
                    </View>

                }
            />
        );
});

export default FilterUserListings;
