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



const FormComponentsDemo = () => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedSize, setSelectedSize] = useState("Medium");
	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedProvince, setSelectedProvince] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedCity, setSelectedCity] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = () => {
		setLoading(true);
		setTimeout(() => setLoading(false), 2000);
	};

	return (
		<SafeAreaView className=" bg-white">
			<ScrollView className="overflow-visible h-full p-8">
				
				{/* Checkbox */}
				<View className=" flex gap-4 mb-16">
					<Text className="text-2xl font-medium mb-4">Checkboxes</Text>

					<Checkbox
						mainLabel="Interests"
						subLabel="What topics interest you?"
						values={["Technology", "Art", "Science", "Travel", "Food", "Music", "Sports"]}
						selectedValues={selectedCategories}
						onValueChange={setSelectedCategories}
						required
						error="Please select at least one interest"
						wrap
						wrapAlignment="left"
						boxStyle={true}
						labelClassName="form-label"
						subLabelClassName="form-sub-label"
						checkboxLabelClassName="form-value-label"
						icon
						
					/>

					<Checkbox
						mainLabel="Interests"
						subLabel="What topics interest you?"
						values={["Technology", "Art", "Science", "Travel", "Food" ]}
						selectedValues={selectedCategories}
						onValueChange={setSelectedCategories}							
						required={false}
						boxStyle={true}
						labelClassName="form-label"
						subLabelClassName="form-sub-label"
						checkboxLabelClassName="form-value-label"
					/>

					<Checkbox
						mainLabel="Newsletter Preferences"
						subLabel="Choose your subscription types"
						values={[
							"Daily Digest",
							"Weekly Updates",
							"Special Offers",
							"Product News",
						]}
						selectedValues={selectedCategories}
						onValueChange={setSelectedCategories}
						boxStyle={false}
						required={false}
						labelClassName="form-label"
						subLabelClassName="form-sub-label"
						checkboxLabelClassName="form-value-label"
					/>
				</View>
				
				{/* Radio Button */}

				<View className=" flex gap-4 mb-16">
					<Text className="text-2xl font-medium mb-4">Radio Buttons</Text>

					<RadioButton
						mainLabel="Experience Level"
						subLabel="Select your expertise"
						values={["Beginner", "Intermediate", "Advanced", "Expert"]}
						selectedValue={selectedSize}
						onValueChange={setSelectedSize}
						required
						error="Please select your experience level"
						wrap
						wrapAlignment="left"
						boxStyle={true}
						icon
					/>
					<RadioButton
						mainLabel="Experience Level"
						subLabel="Select your expertise"
						values={["Beginner", "Intermediate", "Advanced", "Expert"]}
						selectedValue={selectedSize}
						onValueChange={setSelectedSize}
						required={false}
						wrap={false}
						wrapAlignment="left"
						boxStyle={true}
					/>
					<RadioButton
						mainLabel="Experience Level"
						subLabel="Select your expertise"
						values={["Beginner", "Intermediate", "Advanced", "Expert"]}
						selectedValue={selectedSize}
						onValueChange={setSelectedSize}
						required={false}
						wrap={false}
						wrapAlignment="left"
						boxStyle={false}
					/>
				</View>

				{/* Autocomplete */}

				<View className=" flex gap-4 mb-16">
					<Text className="text-2xl font-medium mb-4">Autocomplete</Text>
					<AutoComplete
					mainLabel="City"
					subLabel="Search for your city"
					values={[
						'New York', 'San Francisco', 'Los Angeles', 'Chicago', 
						'Miami', 'Seattle', 'Boston', 'Austin', 'Portland'
					]}
					selectedValue={selectedCity}
					onValueChange={setSelectedCity}
					required
					highlightMatch
					error={selectedCity ? '' : 'Please select your city'}
					/>
				</View>
				
				{/* Dropdown */}
				<View className=" flex gap-4 mb-16">
					<Text className="text-2xl font-medium mb-4">Dropdowns</Text>

					<Dropdown
					mainLabel="Country"
					subLabel="Where country are you from?"
					values={['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan']}
					selectedValue={selectedCountry}
					onValueChange={setSelectedCountry}
					required
					leftIcon={<Pin size={20} className="stroke-neutral-800" />}
					error={selectedCountry ? '' : 'Please select your country'}
					/>
					<Dropdown
					mainLabel="Province / State"
					subLabel="What province/state are you from?"
					values={['Manitoba', 'Quebec', 'Alberta', 'New Brunswick', 'British Columbia', 'Nova Scotia', 'Saskatchewan']}
					selectedValue={selectedProvince}
					onValueChange={setSelectedProvince}
					required
					error={selectedCountry ? '' : 'Please select your province/state'}
					/>
				</View>

				{/* Combobox */}
				<View className=" flex gap-4 mb-16">
					<Text className="text-2xl font-medium mb-4">Combobox</Text>
					<ComboBox
						mainLabel="Skills"
						subLabel="Select all that apply"
						values={['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design', 'DevOps', 'Cloud Computing']}
						selectedValues={selectedTags}
						onValueChange={setSelectedTags}
						required
						error={selectedTags.length === 0 ? 'Please select at least one skill' : ''}
					/>
				</View>

				{/* Date Picker */}
				<View className=" flex gap-4 mb-16">
					<Text className="text-2xl font-medium mb-4">Date Picker</Text>

					<DatePicker
						mainLabel="Available From"
						subLabel="When can you start?"
						selectedDate={selectedDate}
						onDateChange={setSelectedDate}
						required
						rightIcon={<Calendar size={20} className="stroke-neutral-800" />}
						minDate={new Date()}
						error={selectedDate ? '' : 'Please select a start date'}
					/>
				</View>

				{/* Buttons */}
				<View className=" flex gap-4 mb-16">
					<Text className="text-2xl font-medium mb-4">Buttons</Text>
					
					<View className="mb-16 flex gap-4">
                        <Text className="text-xl font-medium mb-4">Button Icons</Text>
						<Button
							text="Send Message"
							onPress={handleSubmit}
							variant="primary"
							rightIcon={<Send size={20} className="stroke-neutral-50" />}
							size="md"
							fullWidth
						/>
						<Button
							text="Leave a Like"
							onPress={handleSubmit}
							variant="primary"
							leftIcon={<Heart size={20} className="stroke-neutral-50" />}
							size="md"
							fullWidth
						/>
					</View>


					<View className="mb-16 flex gap-4">
                        <Text className="text-xl font-medium mb-4">Button Colors</Text>
						<Button
							text="Primary Button"
							onPress={handleSubmit}
							variant="primary"
							size="md"
							fullWidth
						/>

                        <Button
                            text="Secondary Button"
                            onPress={handleSubmit}
                            variant="secondary"
                            size="md"
                            fullWidth
                        />

                        <Button
                            text="Tertiary Button"
                            onPress={handleSubmit}
                            variant="tertiary"
                            size="md"
                            fullWidth
                        />

                        <Button
                            text="Dark Button"
                            onPress={handleSubmit}
                            variant="dark"
                            size="md"
                            fullWidth
                        />

                        <Button
                            text="Light Button"
                            onPress={handleSubmit}
                            variant="light"
                            size="md"
                            fullWidth
                        />
					</View>

					<View className="mb-16 flex gap-4">
						<Text className="text-xl font-medium mb-4">Button Outlined</Text>
                        <Button
                            text="Primary Outlined Button"
                            onPress={handleSubmit}
                            variant="primary-outline"
                            size="md"
                            fullWidth
                        />
                        <Button
                            text="Secondary Outlined Button"
                            onPress={handleSubmit}
                            variant="secondary-outline"
                            size="md"
                            fullWidth
                        />
                        <Button
                            text="Dark Outlined Button"
                            onPress={handleSubmit}
                            variant="dark-outline"
                            size="md"
                            fullWidth
                        />
                        <Button
                            text="Light Outlined Button"
                            onPress={handleSubmit}
                            variant="light-outline"
                            size="md"
                            fullWidth
                        />
                    </View>

					<View className="mb-16 flex gap-4">
                        <Text className="text-xl font-medium mb-4">Button Sizes</Text>

                        <Button
                            text="Small Button"
                            onPress={handleSubmit}
                            variant="primary"
                            size="sm"
                            fullWidth
                        />
                        <Button
                            text="Medium Button"
                            onPress={handleSubmit}
                            variant="primary"
                            size="md"
                            fullWidth
                        />
                        <Button
                            text="Large Button"
                            onPress={handleSubmit}
                            variant="primary"
                            size="lg"
                            fullWidth
                        />
                    </View>

            
					<View className="mb-16 flex gap-4">
                    	<Text className="text-xl font-medium mb-4">Action Buttons</Text>
                        <Button
                            text="Success"
                            onPress={() => {}}
                            variant="success"
                            size="md"
                        />
                        <Button
                            text="Warning"
                            onPress={() => {}}
                            variant="warning"
                            size="md"
                        />
                        <Button
                            text="Danger"
                            onPress={() => {}}
                            variant="danger"
                            size="md"
                        />
                        <Button
                            text="Success Outlined"
                            onPress={() => {}}
                            variant="success-outline"
                            size="md"
                        />
                        <Button
                            text="Warning Outlined"
                            onPress={() => {}}
                            variant="warning-outline"
                            size="md"
                        />
                        <Button
                            text="Danger Outlined"
                            onPress={() => {}}
                            variant="danger-outline"
                            size="md"
                        />
                    </View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default FormComponentsDemo;
