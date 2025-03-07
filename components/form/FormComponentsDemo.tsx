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
				<View className="mb-16 border-t border-neutral-500 pt-4">
					<Text className="text-2xl font-medium mb-4">Checkboxes</Text>

					<View className="mb-4">
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
					</View>

					<View className="mb-4">
						<Checkbox
							mainLabel="Interests"
							subLabel="What topics interest you?"
							values={["Technology", "Art", "Science", "Travel", "Food", "Music", "Sports"]}
							selectedValues={selectedCategories}
							onValueChange={setSelectedCategories}							
							required={false}
							boxStyle={true}
							labelClassName="form-label"
							subLabelClassName="form-sub-label"
							checkboxLabelClassName="form-value-label"
						/>
					</View>

					<View className="mb-4">
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
				</View>
				
				{/* Radio Button */}

				<View className="mb-16 border-t border-neutral-500 pt-4">
					<Text className="text-2xl font-medium mb-4">Radio Buttons</Text>

					<View className="mb-4">
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
					</View>
					<View className="mb-4">
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
					</View>
					<View className="mb-4">
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
				</View>

				{/* Autocomplete */}

				<View className="mb-16 border-t border-neutral-500 pt-4">
					<Text className="text-2xl font-medium mb-4">Autocomplete</Text>

					<View className="mb-4">
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
				</View>
				
				{/* Dropdown */}

				<View className="mb-16 border-t border-neutral-500 pt-4">
					<Text className="text-2xl font-medium mb-4">Dropdowns</Text>

					<View className="mb-4">
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
					</View>
					<View className="mb-4">
						<Dropdown
						mainLabel="Province / State"
						subLabel="What province/state are you from?"
						values={['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan']}
						selectedValue={selectedCountry}
						onValueChange={setSelectedCountry}
						required
						error={selectedCountry ? '' : 'Please select your province/state'}
						/>
					</View>
				</View>

				{/* Combobox */}

				<View className="mb-16 border-t border-neutral-500 pt-4">
					<Text className="text-2xl font-medium mb-4">Combobox</Text>
					<View className="mb-4">
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
					
				</View>

				{/* Date Picker */}

				<View className="mb-16 border-t border-neutral-500 pt-4">
					<Text className="text-2xl font-medium mb-4">Date Picker</Text>

					<View className="mb-4">
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
				</View>

				{/* Buttons */}

				<View className="mb-16 border-t border-neutral-500 pt-4">
					<Text className="text-2xl font-medium mb-4">Buttons</Text>
					
					<View className="mb-16 flex gap-4">
                        <Text className="text-xl font-medium mb-4">Button Icons</Text>
						<Button
							text="Submit Form"
							onPress={handleSubmit}
							variant="primary"
							rightIcon={<Send size={20} className="stroke-neutral-50" />}
							size="lg"
							fullWidth
						/>
						<Button
							text="Like Post"
							onPress={handleSubmit}
							variant="primary"
							leftIcon={<Heart size={20} className="stroke-neutral-50" />}
							size="lg"
							fullWidth
						/>
					</View>


					<View className="mb-16 flex gap-4">
                        <Text className="text-xl font-medium mb-4">Button Colors</Text>
						<Button
							text="Submit Form"
							onPress={handleSubmit}
							variant="primary"
							size="lg"
							fullWidth
						/>

                        <Button
                            text="Submit Form"
                            onPress={handleSubmit}
                            variant="secondary"
                            size="lg"
                            fullWidth
                        />

                        <Button
                            text="Submit Form"
                            onPress={handleSubmit}
                            variant="tertiary"
                            size="lg"
                            fullWidth
                        />

                        <Button
                            text="Submit Form"
                            onPress={handleSubmit}
                            variant="dark"
                            size="lg"
                            fullWidth
                        />

                        <Button
                            text="Submit Form"
                            onPress={handleSubmit}
                            variant="light"
                            size="lg"
                            fullWidth
                        />

                        <Button
                            text="Submit Form"
                            onPress={handleSubmit}
                            variant="primary-outline"
                            size="lg"
                            fullWidth
                        />
                        <Button
                            text="Submit Form"
                            onPress={handleSubmit}
                            variant="secondary-outline"
                            size="lg"
                            fullWidth
                        />
                        <Button
                            text="Submit Form"
                            onPress={handleSubmit}
                            variant="dark-outline"
                            size="lg"
                            fullWidth
                        />
                        <Button
                            text="Submit Form"
                            onPress={handleSubmit}
                            variant="light-outline"
                            size="lg"
                            fullWidth
                        />
                    </View>

					<View className="mb-16 flex gap-4">
                        <Text className="text-xl font-medium mb-4">Button Sizes</Text>

                        <Button
                            text="Submit Form"
                            onPress={handleSubmit}
                            variant="primary"
                            size="sm"
                            fullWidth
                        />
                        <Button
                            text="Submit Form"
                            onPress={handleSubmit}
                            variant="primary"
                            size="md"
                            fullWidth
                        />
                        <Button
                            text="Submit Form"
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
                            text="Success"
                            onPress={() => {}}
                            variant="success-outline"
                            size="md"
                        />
                        <Button
                            text="Warning"
                            onPress={() => {}}
                            variant="warning-outline"
                            size="md"
                        />
                        <Button
                            text="Danger"
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
