import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    TouchableOpacity,
    TextInputProps,
    TextInput,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
    withSpring,
    interpolate,
    runOnJS,
    useSharedValue,
} from "react-native-reanimated";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import {
    Check,
    Search,
    X,
    ChevronDown,
    ChevronUp,
    Calendar,
    DollarSign,
} from "lucide-react-native";
import {
    Gesture,
    GestureDetector,
    PanGesture,
} from "react-native-gesture-handler";

/*

global.css custom classes used in the components:
	form-label
	form-sub-label
	form-value-label

tailwindcss config


*/

// Make sure they all have errors if required

/* -------------------- CHECKBOX -------------------- */

interface CheckboxProps {
    values: string[];
    selectedValues: string[];
    onValueChange: (values: string[]) => void;
    mainLabel?: string;
    subLabel?: string;
    required?: boolean;
    boxStyle?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    subLabelClassName?: string;
    checkboxClassName?: string;
    activeCheckboxClassName?: string;
    checkboxLabelClassName?: string;
    activeCheckboxLabelClassName?: string;
    icon?: boolean;
    error?: string;
    errorClassName?: string;
    orientation?: "wrap" | "scroll" | "list";
    alignment?: "left" | "center" | "right";
}

export const Checkbox: React.FC<CheckboxProps> = ({
    values,
    selectedValues,
    onValueChange,
    mainLabel,
    subLabel,
    required = false,
    boxStyle = false,
    containerClassName = "",
    labelClassName = "",
    subLabelClassName = "",
    checkboxClassName = "",
    activeCheckboxClassName = "",
    checkboxLabelClassName = "",
    activeCheckboxLabelClassName = "",
    icon = false,
    error,
    errorClassName = "",
    orientation = "wrap",
    alignment = "left",
}) => {
    const handleToggle = (value: string) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];

        if (required && newSelectedValues.length === 0) {
            return;
        }

        onValueChange(newSelectedValues);
    };

    const renderCheckboxes = () => {
        const checkboxes = values.map((value) => {
            const isSelected = selectedValues.includes(value);

            if (boxStyle) {
                return (
                    <Pressable
                        key={value}
                        onPress={() => handleToggle(value)}
                        className={`px-4 py-2 rounded-lg border mb-2 mr-2 ${
                            isSelected
                                ? "bg-primary-400 border-primary-400"
                                : "border-neutral-300"
                        } ${checkboxClassName} ${isSelected ? activeCheckboxClassName : ""}`}
                    >
                        <View className="flex-row items-center">
                            {isSelected && icon && (
                                <Check
                                    size={16}
                                    color="white"
                                    style={{ marginRight: 8 }}
                                />
                            )}
                            <Text
                                className={`form-value-label ${isSelected ? "text-white" : "text-neutral-800"} ${checkboxLabelClassName} ${
                                    isSelected
                                        ? activeCheckboxLabelClassName
                                        : ""
                                }`}
                            >
                                {value}
                            </Text>
                        </View>
                    </Pressable>
                );
            }

            return (
                <View key={value} className="flex-row items-center mb-2 mr-4">
                    <Pressable
                        onPress={() => handleToggle(value)}
                        className={`w-6 h-6 rounded border items-center justify-center mr-2 ${
                            isSelected
                                ? "bg-primary-400 border-primary-400"
                                : "border-neutral-300"
                        } ${checkboxClassName} ${isSelected ? activeCheckboxClassName : ""}`}
                    >
                        {isSelected && <Check size={16} color="white" />}
                    </Pressable>
                    <Text
                        className={`text-sm font-regular text-neutral-800 ${checkboxLabelClassName} ${
                            isSelected ? activeCheckboxLabelClassName : ""
                        }`}
                    >
                        {value}
                    </Text>
                </View>
            );
        });

        if (orientation === "wrap") {
            const alignmentClass =
                alignment === "center"
                    ? "justify-center"
                    : alignment === "right"
                      ? "justify-end"
                      : "justify-start";
            return (
                <View className={`flex-row flex-wrap ${alignmentClass}`}>
                    {checkboxes}
                </View>
            );
        } else if (orientation === "scroll") {
            return (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="overflow-visible"
                >
                    <View className="flex-row">{checkboxes}</View>
                </ScrollView>
            );
        } else if (orientation === "list") {
            const alignmentClass =
                alignment === "center"
                    ? "items-center"
                    : alignment === "right"
                      ? "items-end"
                      : "items-start";
            return (
                <View className={`${alignmentClass}`}>
                    {checkboxes.map((item, idx) => (
                        <View key={idx} className="mb-2">
                            {item}
                        </View>
                    ))}
                </View>
            );
        }
    };

    return (
        <View className={containerClassName}>
            <View className="mb-3">
                {mainLabel && (
                    <Text className={`form-label ${labelClassName}`}>
                        {mainLabel}
                        {required && <Text className="text-red-500"> *</Text>}
                    </Text>
                )}
                {subLabel && (
                    <Text className={`form-sub-label ${subLabelClassName}`}>
                        {subLabel}
                    </Text>
                )}
            </View>

            {renderCheckboxes()}
            {error && required && selectedValues.length === 0 && (
                <Text className={`form-error mt-1 ${errorClassName}`}>
                    {error}
                </Text>
            )}
        </View>
    );
};

/* -------------------- RADIO BUTTON -------------------- */

interface RadioButtonProps {
    values: string[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    mainLabel?: string;
    subLabel?: string;
    required?: boolean;
    boxStyle?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    subLabelClassName?: string;
    radioClassName?: string;
    activeRadioClassName?: string;
    radioLabelClassName?: string;
    activeRadioLabelClassName?: string;
    icon?: boolean;
    error?: string;
    errorClassName?: string;
    orientation?: "wrap" | "scroll" | "list";
    alignment?: "left" | "center" | "right";
}

export const RadioButton: React.FC<RadioButtonProps> = ({
    values,
    selectedValue,
    onValueChange,
    mainLabel,
    subLabel,
    required = false,
    boxStyle = false,
    containerClassName = "",
    labelClassName = "",
    subLabelClassName = "",
    radioClassName = "",
    activeRadioClassName = "",
    radioLabelClassName = "",
    activeRadioLabelClassName = "",
    icon = false,
    error,
    errorClassName = "",
    orientation = "wrap",
    alignment = "left",
}) => {
    const handleSelect = (value: string) => {
        if (!required && value === selectedValue) {
            onValueChange("");
        } else {
            onValueChange(value);
        }
    };

    const renderRadioButtons = () => {
        const radioButtons = values.map((value) => {
            const isSelected = value === selectedValue;

            if (boxStyle) {
                return (
                    <Pressable
                        key={value}
                        onPress={() => handleSelect(value)}
                        className={`px-4 py-2 rounded-lg border mb-2 mr-2 ${
                            isSelected
                                ? "bg-primary-400 border-primary-400"
                                : "border-neutral-300"
                        } ${radioClassName} ${isSelected ? activeRadioClassName : ""}`}
                    >
                        <View className="flex-row items-center">
                            {isSelected && icon && (
                                <Check
                                    size={16}
                                    color="white"
                                    style={{ marginRight: 8 }}
                                />
                            )}
                            <Text
                                className={`form-value-label ${isSelected ? "text-white" : "text-neutral-800"} ${radioLabelClassName} ${
                                    isSelected ? activeRadioLabelClassName : ""
                                }`}
                            >
                                {value}
                            </Text>
                        </View>
                    </Pressable>
                );
            }

            return (
                <View key={value} className="flex-row items-center mb-2 mr-6">
                    <Pressable
                        onPress={() => handleSelect(value)}
                        className={`w-6 h-6 rounded-full border items-center justify-center mr-2 ${
                            isSelected
                                ? "border-primary-400"
                                : "border-neutral-300"
                        } ${radioClassName} ${isSelected ? activeRadioClassName : ""}`}
                    >
                        {isSelected && (
                            <View className="w-3 h-3 rounded-full bg-primary-400" />
                        )}
                    </Pressable>
                    <Text
                        className={`form-value-label ${radioLabelClassName} ${
                            isSelected ? activeRadioLabelClassName : ""
                        }`}
                    >
                        {value}
                    </Text>
                </View>
            );
        });

        if (orientation === "wrap") {
            const alignmentClass =
                alignment === "center"
                    ? "justify-center"
                    : alignment === "right"
                      ? "justify-end"
                      : "justify-start";
            return (
                <View className={`flex-row flex-wrap ${alignmentClass}`}>
                    {radioButtons}
                </View>
            );
        } else if (orientation === "scroll") {
            return (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="overflow-visible"
                >
                    <View className="flex-row">{radioButtons}</View>
                </ScrollView>
            );
        } else if (orientation === "list") {
            const alignmentClass =
                alignment === "center"
                    ? "items-center"
                    : alignment === "right"
                      ? "items-end"
                      : "items-start";
            return (
                <View className={`${alignmentClass}`}>
                    {radioButtons.map((item, idx) => (
                        <View key={idx} className="mb-2">
                            {item}
                        </View>
                    ))}
                </View>
            );
        }
    };

    return (
        <View className={containerClassName}>
            <View className="mb-3">
                {mainLabel && (
                    <Text className={`form-label ${labelClassName}`}>
                        {mainLabel}
                        {required && <Text className="text-red-500"> *</Text>}
                    </Text>
                )}
                {subLabel && (
                    <Text className={`form-sub-label ${subLabelClassName}`}>
                        {subLabel}
                    </Text>
                )}
            </View>

            {renderRadioButtons()}
            {error && required && !selectedValue && (
                <Text className={`form-error mt-1 ${errorClassName}`}>
                    {error}
                </Text>
            )}
        </View>
    );
};

/* -------------------- AUTOCOMPLETE -------------------- */

interface AutoCompleteProps {
    values: string[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    mainLabel?: string;
    subLabel?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    minChars?: number;
    highlightMatch?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    subLabelClassName?: string;
    inputClassName?: string;
    activeInputClassName?: string;
    optionClassName?: string;
    activeOptionClassName?: string;
    errorClassName?: string;
    maxHeight?: number;
    isBottomSheet?: boolean;
    icon?: React.ReactNode;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
    values,
    selectedValue,
    onValueChange,
    mainLabel,
    subLabel,
    placeholder = "Search...",
    required = false,
    disabled = false,
    error,
    minChars = 1,
    highlightMatch = true,
    containerClassName = "",
    labelClassName = "",
    subLabelClassName = "",
    inputClassName = "",
    activeInputClassName = "",
    optionClassName = "",
    activeOptionClassName = "",
    errorClassName = "",
    maxHeight = 200,
    isBottomSheet = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState(selectedValue);
    const [filteredValues, setFilteredValues] = useState<string[]>([]);

    useEffect(() => {
        if (searchText.length >= minChars) {
            const filtered = values.filter((value) =>
                value.toLowerCase().includes(searchText.toLowerCase()),
            );
            setFilteredValues(filtered);
            setIsOpen(true);
        } else {
            setFilteredValues([]);
            setIsOpen(false);
        }
    }, [searchText, values, minChars]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(isOpen ? maxHeight : 0),
            opacity: withTiming(isOpen ? 1 : 0),
        };
    });

    const handleSelect = (value: string) => {
        setSearchText(value);
        onValueChange(value);
        setIsOpen(false);
    };

    const clearSelection = () => {
        setSearchText("");
        onValueChange("");
    };

    const highlightText = (text: string, query: string) => {
        if (!highlightMatch || !query) return text;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <Text key={index} className="text-netral-800 font-semibold">
                    {part}
                </Text>
            ) : (
                <Text key={index}>{part}</Text>
            ),
        );
    };

    return (
        <View className={containerClassName}>
            <View className="mb-3">
                {mainLabel && (
                    <Text className={`form-label ${labelClassName}`}>
                        {mainLabel}
                        {required && <Text className="text-red-500"> *</Text>}
                    </Text>
                )}
                {subLabel && (
                    <Text className={`form-sub-label ${subLabelClassName}`}>
                        {subLabel}
                    </Text>
                )}
            </View>

            <View
                className={`
					flex-row items-center
					px-4 py-3 rounded-lg border
					${disabled ? "bg-neutral-100 border-neutral-200" : "bg-white border-neutral-300"}
					${isOpen ? "border-primary-400" : ""}
					${error ? "border-red-500" : ""}
					${inputClassName}
					${isOpen ? activeInputClassName : ""}
					`}
            >
                <Search size={20} color="#6B7280" className="mr-2" />
                {isBottomSheet ? (
                    <BottomSheetTextInput
                        value={searchText}
                        onChangeText={setSearchText}
                        onFocus={() =>
                            searchText.length >= minChars && setIsOpen(true)
                        }
                        placeholder={placeholder}
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 form-value-label"
                        editable={!disabled}
                    />
                ) : (
                    <TextInput
                        value={searchText}
                        onChangeText={setSearchText}
                        onFocus={() =>
                            searchText.length >= minChars && setIsOpen(true)
                        }
                        placeholder={placeholder}
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 form-value-label"
                        editable={!disabled}
                    />
                )}

                {searchText ? (
                    <Pressable onPress={clearSelection}>
                        <X size={20} color="#6B7280" />
                    </Pressable>
                ) : null}
            </View>

            <Animated.View
                className="overflow-hidden rounded-lg border border-neutral-300 mt-1"
                style={animatedStyle}
            >
                <ScrollView bounces={false}>
                    {filteredValues.map((value) => (
                        <Pressable
                            key={value}
                            onPress={() => handleSelect(value)}
                            className={`
                px-4 py-3
                ${value === selectedValue ? "bg-primary-100" : "bg-white"}
                ${value === filteredValues[filteredValues.length - 1] ? "" : "border-b border-neutral-200"}
                ${optionClassName}
                ${value === selectedValue ? activeOptionClassName : ""}
              `}
                        >
                            <Text
                                className={`
								form-value-label
								${value === selectedValue ? "text-primary-400" : "text-neutral-800"}
								`}
                            >
                                {highlightMatch
                                    ? highlightText(value, searchText)
                                    : value}
                            </Text>
                        </Pressable>
                    ))}
                    {filteredValues.length === 0 &&
                        searchText.length >= minChars && (
                            <View className="px-4 py-3">
                                <Text className="form-value-label text-neutral-500">
                                    No results found
                                </Text>
                            </View>
                        )}
                </ScrollView>
            </Animated.View>

            {error && (
                <Text className={`form-error mt-1 ${errorClassName}`}>
                    {error}
                </Text>
            )}
        </View>
    );
};

/* -------------------- COMBOBOX -------------------- */

interface ComboBoxProps {
    values: string[];
    selectedValues: string[];
    onValueChange: (values: string[]) => void;
    mainLabel?: string;
    subLabel?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    subLabelClassName?: string;
    inputClassName?: string;
    activeInputClassName?: string;
    tagClassName?: string;
    activeTagClassName?: string;
    optionClassName?: string;
    activeOptionClassName?: string;
    errorClassName?: string;
    maxHeight?: number;
    isBottomSheet?: boolean;
}

export const ComboBox: React.FC<ComboBoxProps> = ({
    values,
    selectedValues,
    onValueChange,
    mainLabel,
    subLabel,
    placeholder = "Search and select options",
    required = false,
    disabled = false,
    error,
    containerClassName = "",
    labelClassName = "",
    subLabelClassName = "",
    inputClassName = "",
    activeInputClassName = "",
    tagClassName = "",
    activeTagClassName = "",
    optionClassName = "",
    activeOptionClassName = "",
    errorClassName = "",
    maxHeight = 200,
    isBottomSheet = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const filteredValues = values.filter((value) =>
        value.toLowerCase().includes(searchText.toLowerCase()),
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(isOpen ? maxHeight : 0),
            opacity: withTiming(isOpen ? 1 : 0),
        };
    });

    const handleToggleValue = (value: string) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];

        if (required && newSelectedValues.length === 0) {
            return;
        }

        onValueChange(newSelectedValues);
    };

    const removeTag = (value: string) => {
        onValueChange(selectedValues.filter((v) => v !== value));
    };

    return (
        <View className={containerClassName}>
            <View className="mb-3">
                {mainLabel && (
                    <Text className={`form-label ${labelClassName}`}>
                        {mainLabel}
                        {required && <Text className="text-red-500"> *</Text>}
                    </Text>
                )}
                {subLabel && (
                    <Text className={`form-sub-label ${subLabelClassName}`}>
                        {subLabel}
                    </Text>
                )}
            </View>

            <View>
                <View className="flex-row flex-wrap gap-2 mb-2">
                    {selectedValues.map((value) => (
                        <View
                            key={value}
                            className={`flex-row items-center bg-primary-100 rounded-full px-3 py-1 ${tagClassName} ${activeTagClassName}`}
                        >
                            <Text className="text-primary-700 mr-2 font-regular text-sm">
                                {value}
                            </Text>
                            <Pressable onPress={() => removeTag(value)}>
                                <Text className="text-primary-700 font-bold">
                                    ×
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                </View>

                <View
                    className={`
						flex-row items-center
						px-4 py-3 rounded-lg border
						${disabled ? "bg-neutral-100 border-neutral-200" : "bg-white border-neutral-300"}
						${isOpen ? "border-primary-400" : ""}
						${error ? "border-red-500" : ""}
						${inputClassName}
						${isOpen ? activeInputClassName : ""}
						`}
                >
                    <Search size={20} color="#6B7280" className="mr-2" />
                    {isBottomSheet ? (
                        <BottomSheetTextInput
                            value={searchText}
                            onChangeText={setSearchText}
                            onFocus={() => setIsOpen(true)}
                            placeholder={placeholder}
                            placeholderTextColor="#9CA3AF"
                            className="flex-1 form-value-label text-neutral-800"
                            editable={!disabled}
                        />
                    ) : (
                        <TextInput
                            value={searchText}
                            onChangeText={setSearchText}
                            onFocus={() => setIsOpen(true)}
                            placeholder={placeholder}
                            placeholderTextColor="#9CA3AF"
                            className="flex-1 form-value-label text-neutral-800"
                            editable={!disabled}
                        />
                    )}
                </View>

                <Animated.View
                    className="overflow-hidden rounded-lg border border-neutral-300 mt-1"
                    style={animatedStyle}
                >
                    <ScrollView bounces={false}>
                        {filteredValues.map((value) => (
                            <Pressable
                                key={value}
                                onPress={() => handleToggleValue(value)}
                                className={`
                    flex-row items-center px-4 py-3
                    ${selectedValues.includes(value) ? "bg-primary-100" : "bg-white"}
                    ${value === filteredValues[filteredValues.length - 1] ? "" : "border-b border-neutral-200"}
                    ${optionClassName}
                    ${selectedValues.includes(value) ? activeOptionClassName : ""}
                  `}
                            >
                                <Text
                                    className={`
									form-value-label flex-1
									${selectedValues.includes(value) ? "text-primary-400" : "text-neutral-800"}
									`}
                                >
                                    {value}
                                </Text>
                                {selectedValues.includes(value) && (
                                    <Text className="text-primary-400">✓</Text>
                                )}
                            </Pressable>
                        ))}
                    </ScrollView>
                </Animated.View>
            </View>

            {error && (
                <Text className={`form-error mt-1 ${errorClassName}`}>
                    {error}
                </Text>
            )}
        </View>
    );
};

/* -------------------- BUTTON -------------------- */

type ButtonVariant =
    | "primary"
    | "secondary"
    | "tertiary"
    | "dark"
    | "light"
    | "primary-outline"
    | "secondary-outline"
    | "dark-outline"
    | "light-outline"
    | "danger"
    | "danger-outline"
    | "success"
    | "success-outline"
    | "warning"
    | "warning-outline"
    | "custom";

interface ButtonProps {
    onPress: () => void;
    variant?: ButtonVariant;
    text: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    customStyle?: {
        backgroundColor?: string;
        textColor?: string;
        borderColor?: string;
    };
    containerClassName?: string;
    textClassName?: string;
    pressedClassName?: string;
    pressedTextClassName?: string;
}

export const Button: React.FC<ButtonProps> = ({
    onPress,
    variant = "primary",
    text,
    leftIcon,
    rightIcon,
    disabled = false,
    size = "md",
    fullWidth = false,
    customStyle,
    containerClassName = "",
    textClassName = "",
    pressedClassName = "",
    pressedTextClassName = "",
}) => {
    const getVariantStyles = () => {
        const styles: {
            container: string;
            text: string;
            icon: string;
        } = { container: "", text: "", icon: "" };

        switch (variant) {
            case "primary":
                styles.container = "bg-primary-400 border-primary-400";
                styles.text = "text-white";
                break;
            case "secondary":
                styles.container = "bg-secondary-400 border-secondary-400";
                styles.text = "text-white";
                break;
            case "tertiary":
                styles.container = "bg-primary-700 border-primary-700";
                styles.text = "text-white";
                break;
            case "dark":
                styles.container = "bg-neutral-800 border-neutral-800";
                styles.text = "text-white";
                break;
            case "light":
                styles.container = "bg-neutral-300 border-neutral-300";
                styles.text = "text-neutral-800";
                break;
            case "primary-outline":
                styles.container = "bg-transparent border-primary-400";
                styles.text = "text-primary-400";
                break;
            case "secondary-outline":
                styles.container = "bg-transparent border-secondary-400";
                styles.text = "text-secondary-400";
                break;
            case "dark-outline":
                styles.container = "bg-transparent border-neutral-800";
                styles.text = "text-neutral-800";
                break;
            case "light-outline":
                styles.container = "bg-transparent border-neutral-400";
                styles.text = "text-neutral-800";
                styles.icon = "#1F2937";
                break;
            case "danger":
                styles.container = "bg-red-500 border-red-500";
                styles.text = "text-white";
                break;
            case "danger-outline":
                styles.container = "bg-transparent border-red-500";
                styles.text = "text-red-500";
                break;
            case "success":
                styles.container = "bg-green-500 border-green-500";
                styles.text = "text-white";
                break;
            case "success-outline":
                styles.container = "bg-transparent border-green-500";
                styles.text = "text-green-500";
                break;
            case "warning":
                styles.container = "bg-yellow-500 border-yellow-500";
                styles.text = "text-white";
                break;
            case "warning-outline":
                styles.container = "bg-transparent border-yellow-500";
                styles.text = "text-yellow-500";
                break;
            case "custom":
                // Using proper utility classes instead of arbitrary values
                styles.container = "";
                styles.text = "";
                break;
        }

        return styles;
    };

    const getSizeStyles = () => {
        switch (size) {
            case "sm":
                return "px-3 py-2 text-sm";
            case "lg":
                return "px-6 py-4 text-lg";
            default:
                return "px-4 py-3 text-base";
        }
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    const iconElement = (icon: React.ReactNode) => {
        if (!icon) return null;
        return icon;
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            className={`
          flex-row items-center justify-center
          rounded-full border
          ${variantStyles.container}
          ${sizeStyles}
          ${fullWidth ? "w-full" : ""}
          ${disabled ? "opacity-50" : ""}
          ${containerClassName}
        `}
        >
            {leftIcon && <View className="mr-2">{iconElement(leftIcon)}</View>}
            <Text
                className={`
                font-regular
                ${variantStyles.text}
                ${size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"}
                ${textClassName}
              `}
            >
                {text}
            </Text>
            {rightIcon && (
                <View className="ml-2">{iconElement(rightIcon)}</View>
            )}
        </TouchableOpacity>
    );
};

/* -------------------- DROPDOWN -------------------- */

interface DropdownProps {
    values: string[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    mainLabel?: string;
    subLabel?: string;
    placeholder?: string;
    required?: boolean;
    leftIcon?: React.ReactNode;
    disabled?: boolean;
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    subLabelClassName?: string;
    dropdownClassName?: string;
    activeDropdownClassName?: string;
    optionClassName?: string;
    activeOptionClassName?: string;
    errorClassName?: string;
    maxHeight?: number;
}

export const Dropdown: React.FC<DropdownProps> = ({
    values,
    selectedValue,
    onValueChange,
    mainLabel,
    subLabel,
    placeholder = "Select an option",
    required = false,
    leftIcon,
    disabled = false,
    error,
    containerClassName = "",
    labelClassName = "",
    subLabelClassName = "",
    dropdownClassName = "",
    activeDropdownClassName = "",
    optionClassName = "",
    activeOptionClassName = "",
    errorClassName = "",
    maxHeight = 200,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(isOpen ? maxHeight : 0),
            opacity: withTiming(isOpen ? 1 : 0),
        };
    });

    const iconRotation = useAnimatedStyle(() => {
        const rotation = interpolate(isOpen ? 1 : 0, [0, 1], [0, 180]);
        return {
            transform: [{ rotate: `${rotation}deg` }],
        };
    });

    return (
        <View className={containerClassName}>
            <View className="mb-3">
                {mainLabel && (
                    <Text className={`form-label ${labelClassName}`}>
                        {mainLabel}
                        {required && <Text className="text-red-500"> *</Text>}
                    </Text>
                )}
                {subLabel && (
                    <Text className={`form-sub-label ${subLabelClassName}`}>
                        {subLabel}
                    </Text>
                )}
            </View>

            <Pressable
                onPress={() => !disabled && setIsOpen(!isOpen)}
                className={`
            flex-row items-center justify-between
            px-4 py-3 rounded-lg border
            ${disabled ? "bg-neutral-100 border-neutral-200" : "bg-white border-neutral-300"}
            ${isOpen ? "border-primary-400" : ""}
            ${error ? "border-red-500" : ""}
            ${dropdownClassName}
            ${isOpen ? activeDropdownClassName : ""}
          `}
            >
                <View className="flex-row items-center gap-4">
                    {leftIcon}
                    <Text
                        className={`
							form-value-label
							${disabled ? "text-neutral-400" : "text-neutral-800"}
							${!selectedValue ? "text-neutral-400" : ""}
							`}
                    >
                        {selectedValue || placeholder}
                    </Text>
                </View>
                <Animated.View style={iconRotation}>
                    <ChevronDown
                        size={20}
                        color={disabled ? "#9CA3AF" : "#4B5563"}
                    />
                </Animated.View>
            </Pressable>

            <Animated.View
                className="overflow-hidden rounded-lg border border-neutral-300 mt-1"
                style={animatedStyle}
            >
                <ScrollView bounces={false}>
                    {values.map((value) => (
                        <Pressable
                            key={value}
                            onPress={() => {
                                onValueChange(value);
                                setIsOpen(false);
                            }}
                            className={`
                  px-4 py-3
                  ${value === selectedValue ? "bg-primary-100" : "bg-white"}
                  ${value === values[values.length - 1] ? "" : "border-b border-neutral-200"}
                  ${optionClassName}
                  ${value === selectedValue ? activeOptionClassName : ""}
                `}
                        >
                            <Text
                                className={`
                    form-value-label
                    ${value === selectedValue ? "text-primary-400" : "text-neutral-800"}
                  `}
                            >
                                {value}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </Animated.View>

            {error && (
                <Text className={`form-error mt-1 ${errorClassName}`}>
                    {error}
                </Text>
            )}
        </View>
    );
};

/* -------------------- DATEPICKER -------------------- */

interface DatePickerProps {
    selectedDate: Date | null;
    onDateChange: (date: Date) => void;
    mainLabel?: string;
    subLabel?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    rightIcon?: React.ReactNode;
    minDate?: Date;
    maxDate?: Date;
    dateFormat?: string;
    containerClassName?: string;
    labelClassName?: string;
    subLabelClassName?: string;
    pickerClassName?: string;
    activePickerClassName?: string;
    errorClassName?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    selectedDate,
    onDateChange,
    mainLabel,
    subLabel,
    placeholder = "Select a date",
    required = false,
    disabled = false,
    error,
    rightIcon,
    minDate,
    maxDate,
    dateFormat = "MMM dd, yyyy",
    containerClassName = "",
    labelClassName = "",
    subLabelClassName = "",
    pickerClassName = "",
    activePickerClassName = "",
    errorClassName = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = (date: Date) => {
        onDateChange(date);
        setIsOpen(false);
    };

    return (
        <View className={containerClassName}>
            <View className="mb-3">
                {mainLabel && (
                    <Text className={`form-label ${labelClassName}`}>
                        {mainLabel}
                        {required && <Text className="text-red-500"> *</Text>}
                    </Text>
                )}
                {subLabel && (
                    <Text className={`form-sub-label ${subLabelClassName}`}>
                        {subLabel}
                    </Text>
                )}
            </View>

            <Pressable
                onPress={() => !disabled && setIsOpen(true)}
                className={`
            flex-row items-center justify-between
            px-4 py-3 rounded-lg border
            ${disabled ? "bg-neutral-100 border-neutral-200" : "bg-white border-neutral-300"}
            ${error ? "border-red-500" : ""}
            ${pickerClassName}
            ${isOpen ? activePickerClassName : ""}
          `}
            >
                <Text
                    className={`
              form-value-label
              ${disabled ? "text-neutral-400" : "text-neutral-800"}
              ${!selectedDate ? "text-neutral-400" : ""}
            `}
                >
                    {selectedDate
                        ? format(selectedDate, dateFormat)
                        : placeholder}
                </Text>
                <View className="flex-row items-center">
                    {rightIcon || (
                        <Calendar
                            size={20}
                            color={disabled ? "#9CA3AF" : "#4B5563"}
                        />
                    )}
                </View>
            </Pressable>

            <DateTimePickerModal
                isVisible={isOpen}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setIsOpen(false)}
                minimumDate={minDate}
                maximumDate={maxDate}
            />

            {error && (
                <Text className={`form-error mt-1 ${errorClassName}`}>
                    {error}
                </Text>
            )}
        </View>
    );
};

/* -------------------- TEXTINPUT -------------------- */

interface CustomTextInputProps extends TextInputProps {
    mainLabel?: string;
    subLabel?: string;
    error?: string;
    required?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    clearable?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    subLabelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
    isBottomSheet?: boolean;
}

export const Input: React.FC<CustomTextInputProps> = ({
    mainLabel,
    subLabel,
    error,
    required = false,
    leftIcon,
    rightIcon,
    clearable = false,
    value,
    onChangeText,
    placeholder = "Enter text",
    containerClassName,
    labelClassName,
    subLabelClassName,
    inputClassName,
    errorClassName,
    isBottomSheet = false,
    ...props
}) => {
    const handleClear = () => {
        onChangeText?.("");
    };

    return (
        <View className={containerClassName}>
            <View className="mb-3">
                {mainLabel && (
                    <Text className={`form-label ${labelClassName}`}>
                        {mainLabel}
                        {required && <Text className="text-red-500"> *</Text>}
                    </Text>
                )}
                {subLabel && (
                    <Text className={`form-sub-label ${subLabelClassName}`}>
                        {subLabel}
                    </Text>
                )}
            </View>

            <View
                className={`
			flex-row items-center
			px-4 py-3 rounded-lg border
			${props.editable === false ? "bg-neutral-100 border-gray-200" : "bg-white border-neutral-300"}
			${error ? "border-red-500" : ""}
			${inputClassName}
			`}
            >
                {leftIcon && <View className="mr-2">{leftIcon}</View>}
                {isBottomSheet ? (
                    <BottomSheetTextInput
                        className="flex-1 form-value-label text-neutral-800"
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        placeholderTextColor="#9CA3AF"
                        {...props}
                    />
                ) : (
                    <TextInput
                        className="flex-1 form-value-label text-neutral-800"
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        placeholderTextColor="#9CA3AF"
                        {...props}
                    />
                )}

                {clearable && value ? (
                    <TouchableOpacity onPress={handleClear} className="ml-2">
                        <X size={20} className="stroke-neutral-800" />
                    </TouchableOpacity>
                ) : rightIcon ? (
                    <View className="ml-2">{rightIcon}</View>
                ) : null}
            </View>

            {error && (
                <Text className={`form-error mt-1 ${errorClassName}`}>
                    {error}
                </Text>
            )}
        </View>
    );
};

/* -------------------- PRICE INPUT -------------------- */

interface PriceInputProps {
    value: string;
    onChangeText: (value: string) => void;
    mainLabel?: string;
    subLabel?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    labelClassName?: string;
    subLabelClassName?: string;
    errorClassName?: string;
    containerClassName?: string;
    isBottomSheet?: boolean;
}

interface DualPriceInputProps
    extends Omit<PriceInputProps, "value" | "onChangeText"> {
    minValue: string;
    maxValue: string;
    onMinChange: (value: string) => void;
    onMaxChange: (value: string) => void;
    orientation?: "row" | "column";
}

const formatPrice = (value: string): string => {
    if (!value) return "";

    // Remove non-numeric characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, "");

    // Handle multiple decimal points
    const parts = cleanValue.split(".");
    const wholePart = parts[0];
    const decimalPart = parts.slice(1).join("");

    // Format decimal places
    if (decimalPart) {
        return `${wholePart}.${decimalPart.slice(0, 2).padEnd(2, "0")}`;
    } else {
        return wholePart ? `${wholePart}.00` : "";
    }
};

export const PriceInput: React.FC<PriceInputProps> = ({
    value,
    onChangeText,
    mainLabel,
    subLabel,
    error,
    required = false,
    disabled = false,
    placeholder = "0.00",
    labelClassName,
    subLabelClassName,
    errorClassName,
    containerClassName,
    isBottomSheet = false,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChangeText = (text: string) => {
        onChangeText(text.replace(/[^\d.]/g, ""));
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (value) {
            onChangeText(formatPrice(value));
        }
    };

    return (
        <View className={containerClassName}>
            <View className="mb-3">
                {mainLabel && (
                    <Text className={`form-label ${labelClassName}`}>
                        {mainLabel}
                        {required && <Text className="text-red-500"> *</Text>}
                    </Text>
                )}
                {subLabel && (
                    <Text className={`form-sub-label ${subLabelClassName}`}>
                        {subLabel}
                    </Text>
                )}
            </View>

            <View
                className={`flex-row items-center px-4 py-3 rounded-lg border bg-white
			${disabled ? "opacity-50" : ""}
			${error ? "border-red-500" : "border-neutral-300"}
			${isFocused ? "border-primary-400" : ""}`}
            >
                <View className="mr-2">
                    <DollarSign size={20} color="#6B7280" />
                </View>
                {isBottomSheet ? (
                    <BottomSheetTextInput
                        className="flex-1 form-value-label text-neutral-800"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false);
                            if (value) {
                                onChangeText(formatPrice(value));
                            }
                        }}
                        defaultValue={value}
                        onChangeText={handleChangeText}
                        placeholder={placeholder}
                        placeholderTextColor="#9CA3AF"
                        keyboardType="decimal-pad"
                        editable={!disabled}
                    />
                ) : (
                    <TextInput
                        className="flex-1 form-value-label text-neutral-800"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false);
                            if (value) {
                                onChangeText(formatPrice(value));
                            }
                        }}
                        defaultValue={value}
                        onChangeText={handleChangeText}
                        placeholder={placeholder}
                        placeholderTextColor="#9CA3AF"
                        keyboardType="decimal-pad"
                        editable={!disabled}
                    />
                )}
            </View>

            {error && (
                <Text className={`form-error mt-1 ${errorClassName}`}>
                    {error}
                </Text>
            )}
        </View>
    );
};

export const DualPriceInput: React.FC<DualPriceInputProps> = ({
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
    mainLabel,
    subLabel,
    errorClassName,
    error,
    labelClassName,
    subLabelClassName,
    required = false,
    disabled = false,
    orientation = "row",
    placeholder = "0.00",
    containerClassName,
}) => {
    return (
        <View className={containerClassName}>
            <View>
                {mainLabel && (
                    <Text className={`form-label ${labelClassName}`}>
                        {mainLabel}
                        {required && <Text className="text-red-500"> *</Text>}
                    </Text>
                )}
                {subLabel && (
                    <Text className={`form-sub-label ${subLabelClassName}`}>
                        {subLabel}
                    </Text>
                )}
            </View>

            <View
                className={`${orientation === "row" ? "flex-row gap-2 items-center" : "flex-col space-y-2"}`}
            >
                <View
                    className={`${orientation === "row" ? "flex-1" : "w-full"}`}
                >
                    <PriceInput
                        value={String(minValue)}
                        onChangeText={onMinChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        mainLabel={
                            orientation === "column" ? "Minimum" : undefined
                        }
                    />
                </View>

                <Text
                    className={`
					text-center
					${orientation === "row" ? "mx-2" : "my-2"}
					text-neutral-500
				`}
                >
                    __
                </Text>

                <View
                    className={`${orientation === "row" ? "flex-1" : "w-full"}`}
                >
                    <PriceInput
                        value={String(maxValue)}
                        onChangeText={onMaxChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        mainLabel={
                            orientation === "column" ? "Maximum" : undefined
                        }
                    />
                </View>
            </View>

            {error && (
                <Text className={`form-error mt-1 ${errorClassName}`}>
                    {error}
                </Text>
            )}
        </View>
    );
};
