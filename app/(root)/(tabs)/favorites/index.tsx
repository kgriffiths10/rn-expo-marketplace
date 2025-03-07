


import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, FolderClock, Heart, LockOpen, Mail, Search, Send, Store } from "lucide-react-native";
import { useEffect, useState } from "react";
import {Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AutoComplete, DatePicker, Button, Checkbox, ComboBox, Dropdown, RadioButton } from "@/components/form/FormComponents";

const Favorites = () => {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <SafeAreaView className="p-8 bg-white">
      <ScrollView className="overflow-visible h-full">
		<View className="mb-8 border-t border-neutral-500 pt-4">
			<Text className="text-2xl font-medium mb-4">Checkboxes</Text>

			<View className="mb-4">
				<Checkbox
				mainLabel="Interests"
				subLabel="What topics interest you?"
				values={['Technology', 'Art', 'Science', 'Travel', 'Food']}
				selectedValues={selectedCategories}
				onValueChange={setSelectedCategories}
				required
				wrap
				wrapAlignment="left"
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
				values={['Daily Digest', 'Weekly Updates', 'Special Offers', 'Product News']}
				selectedValues={selectedCategories}
				onValueChange={setSelectedCategories}
				boxStyle={false}
				labelClassName="form-label"
				subLabelClassName="form-sub-label"
				checkboxLabelClassName="form-value-label"
				/>
			</View>	
		</View>
        
		<View className="mb-8 border-t border-neutral-500 pt-4">

			<Text className="text-2xl font-medium mb-4">Radio Buttons</Text>

			<View className="mb-4">
				<RadioButton
				mainLabel="Experience Level"
				subLabel="Select your expertise"
				values={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
				selectedValue={selectedSize}
				onValueChange={setSelectedSize}
				required
				wrap
				wrapAlignment="left"
				boxStyle={true}

				/>
			</View>
			<View className="mb-4">
				<RadioButton
				mainLabel="Experience Level"
				subLabel="Select your expertise"
				values={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
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
				values={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
				selectedValue={selectedSize}
				onValueChange={setSelectedSize}
				required={false}
				wrap={false}
				wrapAlignment="left"
				boxStyle={false}
				/>
			</View>
		</View>

          {/* 

          <View >
            <Text >Dropdowns & Combos</Text>
            <Dropdown
              mainLabel="Country"
              subLabel="Where are you from?"
              values={['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan']}
              selectedValue={selectedCountry}
              onValueChange={setSelectedCountry}
              required
              rightIcon={<Mail size={20} color="#6B7280" />}
              error={selectedCountry ? '' : 'Please select your country'}
            />
          </View>

          <View>
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

          <View >
            <Text >Date & Auto-Complete</Text>
            <DatePicker
              mainLabel="Available From"
              subLabel="When can you start?"
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              required
              rightIcon={<Calendar size={20} color="#6B7280" />}
              minDate={new Date()}
              error={selectedDate ? '' : 'Please select a start date'}
            />
          </View>

          <View >
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

          <View>
            <Button
              text="Submit Form"
              onPress={handleSubmit}
              variant="primary"
              loading={loading}
              rightIcon={<Send size={20} color="white" />}
              size="lg"
              fullWidth
            />

            <View>
              <Button
                text="Save Draft"
                onPress={() => {}}
                variant="secondary"
                leftIcon={<Heart size={20} color="white" />}
              />
              <Button
                text="Preview"
                onPress={() => {}}
                variant="primary-outline"
                rightIcon={<Search size={20} color="#3B82F6" />}
              />
            </View>

            <View>
              <Button
                text="Success"
                onPress={() => {}}
                variant="success"
                size="sm"
              />
              <Button
                text="Warning"
                onPress={() => {}}
                variant="warning"
                size="sm"
              />
              <Button
                text="Danger"
                onPress={() => {}}
                variant="danger"
                size="sm"
              />
            </View>
          </View> */}
      </ScrollView>  
    </SafeAreaView>
    
  );
}
    
export default Favorites;




