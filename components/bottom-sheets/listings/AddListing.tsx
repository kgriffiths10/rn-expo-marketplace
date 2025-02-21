import { KeyboardAvoidingView, Platform, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import InputField from "../../form/InputField";
import { ArrowBigUpDash, CircleX, Info, Minus, Plus, SquarePen, } from "lucide-react-native";
import CustomButton from "../../CustomButton";
import { forwardRef, useCallback, useRef, useState, useEffect } from "react";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import BottomSheetModalComponent, { BottomSheetModalComponentProps } from "../BottomSheetModal";
import PriceField from "../../form/PriceField";
import { useUser } from "@clerk/clerk-expo";
import { fetchAPI, useFetch } from "@/lib/fetch";
import SelectField from "../../form/SelectField";
import { stat } from "fs";


const AddListing = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
    ({ content, header, footer, snapPoints }, ref) => {
    
    const { user } = useUser();
    const clerkID = user?.id;

    // Keep track of the current input values
    const formRef = useRef({
        title: '',
        category_id: '',
        description: '',
        price: '',
        condition: '',
        location: '',
        status: '',
    });

    // This state will be used when submitting the form
    const [form, setForm] = useState(formRef.current);

    return (
        <BottomSheetModalComponent // Custom BottomSheetModal.tsx component 
            ref={ref}
            enableDynamicSizing={false}
            snapPoints={['93%']} 
            header="Add Listing"
            footer= {
                <View className="p-8 bg-white shadow-md">
                    <CustomButton 
                        title="Add Listing"
                        onPress={() => console.log('Add listing form:', form)}
                    />
                </View>
            }
            content = {
                    <View>
                        
                        {/* Title */}
                        <InputField 
                            label="Title"
                            required={true}
                            isBottomSheetInput={true} // Required for keyboard avoiding view in gorham-bottom-sheets
                            placeholder="Enter a descriptive title"
                            defaultValue={formRef.current.title}
                            onChangeText={(text) => {formRef.current.title = text;}}
                            maxLength={50} 
                            editable={true}
                        />
                        {/* Category */}
                        <SelectField
                            label="Category"
                            required={true}
                            options={[
                                { id: '1', name: 'Electronics' },
                                { id: '2', name: 'Clothing' },
                                { id: '3', name: 'Furniture' },
                                { id: '4', name: 'Books' },
                                { id: '5', name: 'Miscellaneous' },
                            ]}
                            selectedValues={[formRef.current.category_id]} 
                            multiple={false}
                            wrap={true}
                            onChange={(selected) => {
                                formRef.current.category_id = selected[0];
                            }}
                            containerStyle="mb-8"
                        />
                        {/* Description */}
                        <InputField 
                            label="Description"
                            required={true}
                            isBottomSheetInput={true}
                            placeholder="Enter a detailed description"
                            defaultValue={form.description}
                            onChangeText={(text) => {formRef.current.description = text;}}

                            maxLength={1000} 
                        />
                        {/* Price */}
                        <PriceField 
                            label="Price"
                            required={true}
                            isBottomSheetInput={true}
                            placeholder="00.00"
                            defaultValue={form.price}
                            onChangeText={(text) => {formRef.current.price = text;}}
                        />
                        {/* Condition */}
                        <SelectField
                            label="Condition"
                            options={[
                                { id: 'New', name: 'New' },
                                { id: 'Used', name: 'Used' },
                                { id: 'Refurbished', name: 'Refurbished' }
                            ]}
                            selectedValues={[formRef.current.condition]} 
                            multiple={false}
                            wrap={true}
                            onChange={(selected) => {
                                formRef.current.condition = selected[0];
                            }}
                            containerStyle="mb-8"
                        />
                        {/* Images */}
                        <View className="mb-8">
                            <Text className="label mb-2">Images</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='flex flex-row gap-4 overflow-visible'>
                                <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-200 items-center justify-center">
                                    <Plus className='text-neutral-800' size={32} />
                                </View>
                                <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-200 "></View>
                                <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-200 "></View>
                                <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-200 "></View>
                                <View className="w-28 h-24 rounded-lg bg-neutral-200 "></View>
                            </ScrollView>
                        </View>

                        {/* Location */}
                        <InputField 
                            label="Location"
                            required={true}
                            isBottomSheetInput={true}
                            placeholder="Enter the listings location"
                            defaultValue={form.location}
                            onChangeText={(text) => {formRef.current.location = text;}}
                        />

                        {/* Feature */}
                        <View>
                            <View className="flex flex-row items-center justify-between">
                                <View>
                                    <Text className="label">Feature Listing</Text>
                                    <Text className="sub-label mb-2">Get more views and sell faster!</Text>    
                                </View>
                                <TouchableOpacity>
                                    <Info className="text-neutral-300" strokeWidth={1.75} />        
                                </TouchableOpacity>
                            </View>
                            <View className="flex gap-4 mb-8">
                            <TouchableOpacity className="flex flex-row items-center justify-between border border-neutral-300 rounded-2xl p-4">
                                    <View className="flex flex-row items-center gap-4">
                                        <View className="h-6 w-6 border border-neutral-300 rounded-full"></View>
                                        <Text className="text-lg font-PoppinsMedium">24 hrs</Text>                                 
                                    </View>
                                    <Text className="text-lg font-PoppinsRegular text-neutral-400">$1.99 USD</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex flex-row items-center justify-between border border-neutral-300 rounded-2xl p-4">
                                    <View className="flex flex-row items-center gap-4">
                                        <View className="h-6 w-6 border border-neutral-300 rounded-full"></View>
                                        <Text className="text-lg font-PoppinsMedium">7 days</Text>
                                        <View className="bg-neutral-800 self-start py-1 px-3 rounded-full">
                                            <Text className="text-neutral-100 text-sm font-PoppinsRegular">BEST VALUE</Text>
                                        </View>
                                    </View>
                                    <Text className="text-lg font-PoppinsRegular text-neutral-400">$4.99 USD</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex flex-row items-center justify-between border border-neutral-300 rounded-2xl p-4">
                                    <View className="flex flex-row items-center gap-4">
                                        <View className="h-6 w-6 border border-neutral-300 rounded-full"></View>
                                        <Text className="text-lg font-PoppinsMedium">14 days</Text>
                                    </View>
                                    <Text className="text-lg font-PoppinsRegular text-neutral-400">$8.99 USD</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

            }
        />
    );

});

export default AddListing;


