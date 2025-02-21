import { ArrowUpDown, Search, Settings2 } from "lucide-react-native";
import { TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";

type SearchBarProps = {
    placeholder: string;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filterOpen?: () => void;
    sortOpen?: () => void;
    showFilterButton?: boolean;
    showSortButton?: boolean;
    containerStyle?: string; 
}

const SearchBar = ( {placeholder, searchQuery, setSearchQuery, filterOpen, sortOpen, showFilterButton = true, showSortButton = true, containerStyle }: SearchBarProps) => {
    
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
                        className="border-neutral-300 border rounded-full align-center justify-center p-3"
                        onPress={filterOpen}
                    >
                        <Settings2 className='stroke-neutral-800' />
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