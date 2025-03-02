import { ArrowUpDown, Search, Settings2 } from "lucide-react-native";
import { TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Text } from "react-native";

type SearchBarProps = {
    placeholder: string;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filterOpen?: () => void;
    sortOpen?: () => void;
    showFilterButton?: boolean;
    showSortButton?: boolean;
    filterNotificationBadge?: number;
    sortNotificationBadge?: number;
    containerStyle?: string; 
}

const SearchBar = ( {placeholder, searchQuery, setSearchQuery, filterOpen, sortOpen, showFilterButton = true, showSortButton = true, filterNotificationBadge, sortNotificationBadge, containerStyle }: SearchBarProps) => {
    console.log('Filter badge:', filterNotificationBadge);


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View className={`flex flex-row gap-2 ${containerStyle}`}>
                {/* Search Input */}
                <View className="flex flex-row flex-1 border-neutral-300 border rounded-full align-center justify-start p-3">
                    <Search className='stroke-neutral-400 mr-2' />
                    <TextInput
                        placeholder={placeholder}
                        className="info w-full"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        enterKeyHint="search"
                    /> 
                </View>
                {/* Conditionally render Filter Button */}
                {showFilterButton && (
                    <TouchableOpacity 
                        className="relative border-neutral-300 border rounded-full align-center justify-center p-3"
                        onPress={filterOpen}
                    >
                        <Settings2 className='stroke-neutral-800' />
                        {/* Filter Badge */}
                        {(filterNotificationBadge && filterNotificationBadge > 0) ? (
                            <View className="bg-red-500 absolute -top-2 -right-1 w-6 h-6 rounded-full items-center justify-center">
                                <Text className="text-center info-white">{filterNotificationBadge}</Text>
                            </View>
                        ) : null}
                        
                        
                    </TouchableOpacity>
                )}
                {/* Conditionally render Sort By Button */}
                {showSortButton && (
                    <TouchableOpacity 
                        className="border-neutral-300 border rounded-full align-center justify-center p-3"
                        onPress={sortOpen}
                    >
                        <ArrowUpDown className='stroke-neutral-800' />
                    </TouchableOpacity>
                )}


                
                
            </View>
        </KeyboardAvoidingView>
    );
}

export default SearchBar;