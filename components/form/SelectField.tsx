import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface SelectFieldProps {
    label?: string;
    subLabel?: string;
    labelStyle?: string;
    options: { id: string, name: string }[];
    selectedValues?: string[];
    onChange?: (selected: string[]) => void;
    required?: boolean;
    multiple?: boolean;
    wrap?: boolean;
    containerStyle?: string;
}

const SelectField = ({ label, subLabel, labelStyle, options, selectedValues = [], onChange, required = false, multiple = false, wrap = true, containerStyle }: SelectFieldProps) => {
    const [selected, setSelected] = useState<string[]>(selectedValues);

    const handleSelect = (id: string) => {
        let newSelected;
        if (multiple) {
            if (selected.includes(id)) {
                newSelected = selected.filter(value => value !== id);
            } else {
                newSelected = [...selected, id];
            }
        } else {
            newSelected = selected.includes(id) ? [] : [id];
        }

        if (required && newSelected.length === 0) {
            return;
        }

        setSelected(newSelected);
        onChange && onChange(newSelected);
    };

    const renderOptions = () => {
        return options.map(option => (
            <TouchableOpacity
                key={option.id}
                className={`border rounded-xl self-start py-2 px-4 ${selected.includes(option.id) ? 'border-neutral-800 bg-neutral-800' : 'border-neutral-300'}`}
                onPress={() => handleSelect(option.id)}
            >
                <Text className={`font-PoppinsRegular text-sm ${selected.includes(option.id) ? 'text-neutral-50' : 'text-neutral-800'}`}>{option.name}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View className={`${containerStyle}`}>
            {(label || subLabel) && (
                <View className="mb-2">
                    {label && (
                        <Text className={`label ${labelStyle}`}>
                            {label} {required && <Text className="text-red-500">*</Text>}
                        </Text>
                    )}
                    {subLabel && (
                        <Text className="sub-label">
                            {subLabel}
                        </Text>
                    )}
                </View>
            )}
            {wrap ? (
                <View className="flex flex-row gap-4 flex-wrap">
                    {renderOptions()}
                </View>
            ) : (
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="overflow-visible">
                    <View className='flex flex-row gap-4'>
                        {renderOptions()}
                    </View>
                    
                </ScrollView>
            )}
        </View>
    );
};

export default SelectField;