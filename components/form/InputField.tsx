import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { InputFieldProps } from "@/types/type";
import { Icon } from "lucide-react-native";

const InputField = ({label, subLabel, labelStyle, icon: IconComponent, secureTextEntry = false, containerStyle, inputStyle, iconStyle, className, required, isBottomSheetInput = false, ...props}: InputFieldProps) => {
    return (
        <View className="w-full">
            {label && (
                <View className="mb-2">
                    {/* Label */}
    
                    <Text className={`label ${labelStyle}`}>
                        {label} {required && <Text className="text-red-500">*</Text>}
                    </Text>
                    
                    {/* Sub Label */}
                    {subLabel && (
                        <Text className="sub-label">
                            {subLabel}
                        </Text>
                    )}    
                </View>
            )}
            
            
            {/* Input Container */}
            <View className={`flex flex-row justify-start items-center relative rounded-xl border border-gray-300 focus:border-primary-400 w-full ${containerStyle}`}>
                {IconComponent && (<IconComponent className={`w-6 h-6 ml-4 ${iconStyle} text-neutral-300`} />)}                     
                {isBottomSheetInput ? (
                    <BottomSheetTextInput className={`rounded-full p-4 font-PoppinsRegular flex-1 ${inputStyle} text-left`} secureTextEntry={secureTextEntry} {...props} />
                ) : (
                    <TextInput className={`rounded-full p-4 font-PoppinsRegular flex-1 ${inputStyle} text-left`} secureTextEntry={secureTextEntry} {...props} />
                )}
            </View>
        </View>
    );
}

export default InputField;

