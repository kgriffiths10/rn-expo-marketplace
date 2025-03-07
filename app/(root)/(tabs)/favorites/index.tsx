import {
	ArrowLeft,
	ArrowRight,
	Calendar,
	ChevronLeft,
	FolderClock,
	Heart,
	LockOpen,
	Mail,
	Pin,
	Search,
	Send,
	Store,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
	Keyboard,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	AutoComplete,
	DatePicker,
	Button,
	Checkbox,
	ComboBox,
	Dropdown,
	RadioButton,
} from "@/components/form/FormComponents";
import FormComponentsDemo from "@/components/form/FormComponentsDemo";


const Favorites = () => {
	return (
		<FormComponentsDemo />
	);
};

export default Favorites;
