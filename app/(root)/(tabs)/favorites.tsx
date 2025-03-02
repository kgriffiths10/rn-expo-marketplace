import UserListingStats from "@/components/cards/UserListingStats";
import SearchBar from "@/components/SearchBar";
import { useFetch } from "@/lib/fetch";
import { useUser } from "@clerk/clerk-expo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CircleX, Rocket, Store } from "lucide-react-native";
import { useCallback, useRef, useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableWithoutFeedback, Keyboard, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserFilterState, UserListings } from "@/types/type";
import Filter from "@/components/bottom-sheets/listings/Filter";
import Sort from "@/components/bottom-sheets/listings/Sort";


const Favorites = () => {
    return (
        <View>
            <Text>Favorites</Text>
        </View>
    )
}
    
export default Favorites;