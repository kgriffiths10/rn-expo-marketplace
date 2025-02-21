import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import InputField from "../form/InputField";
import { Info, Minus, Plus, } from "lucide-react-native";
import ScrollSelect from "../form/ScrollSelect";
import CustomButton from "../CustomButton";
import { forwardRef, useCallback, useRef, useState, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetModalComponent from "./BottomSheetModal";
import PriceField from "../form/PriceField";
import { useUser } from "@clerk/clerk-expo";
import { fetchAPI, useFetch } from "@/lib/fetch";

type BottomSheetModalComponentProps = {
  content?: React.ReactNode;
};

const MarketplaceFilter = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
  ({ content }, ref) => {
    
    return (
        <BottomSheetModalComponent
            ref={ref}
            snapPoints={['85%']} 
            content = {
                <View>
                    <Text className='heading-2 text-center'>
                            Filters
                    </Text>

                    <Text className="label">Sort by</Text>
                
                    <Text>Set Location</Text>


                    <Text>Sort By</Text>
                    <Text>Location</Text>
                    <Text>Condition</Text>
                    <Text>Price Min</Text>'heading-3 mb-2'
                    <Text>Price Max</Text>


                </View>
            }
        />
    )
});

export default MarketplaceFilter;

