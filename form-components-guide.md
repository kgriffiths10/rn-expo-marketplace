# Custom Form Components Guide

This guide provides an overview and usage instructions for the custom form components available in this project. These components are designed to be flexible and customizable to fit various form requirements.

Components can be found in **FormComponents.tsx** and imported as `<ComponentName />`.

An **interactive demo** can be found at FormComponentsDemo.tsx.

## Tailwind & Global CSS
Tailwind’s configuration (tailwind.config.js) customizes utility classes (colors, spacing, etc.), and global.css contains shared styles (e.g., form-label). These ensure consistent, uniform styling throughout the project. These styles can be changed as you wish.

Uses lucide-react-native icons, in order for classname stroke-color to apply, cssInterop required, unless other icon set is used.

## Components

### RadioButton

The `RadioButton` component allows users to select a single option from a list of values.

**Props:**
- `values`: string[] - List of options.
- `selectedValue`: string - Currently selected value.
- `onValueChange`: (value: string) => void - Callback when a value is selected.
- `mainLabel`: string - Main label for the radio button group.
- `subLabel`: string - Sub-label for the radio button group.
- `required`: boolean - Whether selection is required.
- `wrap`: boolean - Whether to wrap options.
- `wrapAlignment`: 'left' | 'center' | 'right' - Alignment of wrapped options.
- `boxStyle`: boolean - Whether to use box style for options.
- `containerClassName`: string - Custom class name for the container.
- `labelClassName`: string - Custom class name for the main label.
- `subLabelClassName`: string - Custom class name for the sub-label.
- `radioClassName`: string - Custom class name for radio buttons.
- `activeRadioClassName`: string - Custom class name for active radio buttons.
- `radioLabelClassName`: string - Custom class name for radio button labels.
- `activeRadioLabelClassName`: string - Custom class name for active radio button labels.
- `icon`: boolean - Whether to show an icon on the selected option

### Dropdown

The `Dropdown` component provides a dropdown menu for selecting a single option from a list.

**Props:**
- `values`: string[] - List of options.
- `selectedValue`: string - Currently selected value.
- `onValueChange`: (value: string) => void - Callback when a value is selected.
- `mainLabel`: string - Main label for the dropdown.
- `subLabel`: string - Sub-label for the dropdown.
- `placeholder`: string - Placeholder text.
- `required`: boolean - Whether selection is required.
- `leftIcon`: React.ReactNode - Custom left icon.
- `disabled`: boolean - Whether the dropdown is disabled.
- `error`: string - Error message.
- `containerClassName`: string - Custom class name for the container.
- `labelClassName`: string - Custom class name for the main label.
- `subLabelClassName`: string - Custom class name for the sub-label.
- `dropdownClassName`: string - Custom class name for the dropdown.
- `activeDropdownClassName`: string - Custom class name for active dropdown.
- `optionClassName`: string - Custom class name for options.
- `activeOptionClassName`: string - Custom class name for active options.
- `errorClassName`: string - Custom class name for error message.
- `maxHeight`: number - Maximum height of the dropdown.

### DatePicker

The `DatePicker` component allows users to select a date from a modal date picker.

**Props:**
- `selectedDate`: Date | null - Currently selected date.
- `onDateChange`: (date: Date) => void - Callback when a date is selected.
- `mainLabel`: string - Main label for the date picker.
- `subLabel`: string - Sub-label for the date picker.
- `placeholder`: string - Placeholder text.
- `required`: boolean - Whether selection is required.
- `disabled`: boolean - Whether the date picker is disabled.
- `error`: string - Error message.
- `rightIcon`: React.ReactNode - Custom right icon.
- `minDate`: Date - Minimum selectable date.
- `maxDate`: Date - Maximum selectable date.
- `dateFormat`: string - Date format string.
- `containerClassName`: string - Custom class name for the container.
- `labelClassName`: string - Custom class name for the main label.
- `subLabelClassName`: string - Custom class name for the sub-label.
- `pickerClassName`: string - Custom class name for the picker.
- `activePickerClassName`: string - Custom class name for active picker.
- `errorClassName`: string - Custom class name for error message.

### ComboBox

The `ComboBox` component allows users to select multiple options from a list with a search input.

**Props:**
- `values`: string[] - List of options.
- `selectedValues`: string[] - Currently selected values.
- `onValueChange`: (values: string[]) => void - Callback when values are selected.
- `mainLabel`: string - Main label for the combo box.
- `subLabel`: string - Sub-label for the combo box.
- `placeholder`: string - Placeholder text.
- `required`: boolean - Whether selection is required.
- `disabled`: boolean - Whether the combo box is disabled.
- `error`: string - Error message.
- `containerClassName`: string - Custom class name for the container.
- `labelClassName`: string - Custom class name for the main label.
- `subLabelClassName`: string - Custom class name for the sub-label.
- `inputClassName`: string - Custom class name for the input.
- `activeInputClassName`: string - Custom class name for active input.
- `tagClassName`: string - Custom class name for tags.
- `activeTagClassName`: string - Custom class name for active tags.
- `optionClassName`: string - Custom class name for options.
- `activeOptionClassName`: string - Custom class name for active options.
- `errorClassName`: string - Custom class name for error message.
- `maxHeight`: number - Maximum height of the options list.

### Checkbox

The `Checkbox` component allows users to select multiple options from a list of checkboxes.

**Props:**
- `values`: string[] - List of options.
- `selectedValues`: string[] - Currently selected values.
- `onValueChange`: (values: string[]) => void - Callback when values are selected.
- `mainLabel`: string - Main label for the checkbox group.
- `subLabel`: string - Sub-label for the checkbox group.
- `required`: boolean - Whether selection is required.
- `wrap`: boolean - Whether to wrap options.
- `wrapAlignment`: 'left' | 'center' | 'right' - Alignment of wrapped options.
- `boxStyle`: boolean - Whether to use box style for options.
- `containerClassName`: string - Custom class name for the container.
- `labelClassName`: string - Custom class name for the main label.
- `subLabelClassName`: string - Custom class name for the sub-label.
- `checkboxClassName`: string - Custom class name for checkboxes.
- `activeCheckboxClassName`: string - Custom class name for active checkboxes.
- `checkboxLabelClassName`: string - Custom class name for checkbox labels.
- `activeCheckboxLabelClassName`: string - Custom class name for active checkbox labels.
- `icon`: boolean - Whether to show an icon on the selected checkbox

### Button

The `Button` component provides a customizable button with various styles and sizes.

**Props:**
- `onPress`: () => void - Callback when the button is pressed.
- `variant`: ButtonVariant - Button style variant.
- `text`: string - Button text.
- `leftIcon`: React.ReactNode - Custom left icon.
- `rightIcon`: React.ReactNode - Custom right icon.
- `disabled`: boolean - Whether the button is disabled.
- `size`: 'sm' | 'md' | 'lg' - Button size.
- `fullWidth`: boolean - Whether the button takes full width.
- `customStyle`: { backgroundColor?: string; textColor?: string; borderColor?: string; } - Custom styles for the button.
- `containerClassName`: string - Custom class name for the container.
- `textClassName`: string - Custom class name for the text.
- `pressedClassName`: string - Custom class name for pressed state.
- `pressedTextClassName`: string - Custom class name for pressed text.

### AutoComplete

The `AutoComplete` component provides a search input with auto-complete suggestions.

**Props:**
- `values`: string[] - List of options.
- `selectedValue`: string - Currently selected value.
- `onValueChange`: (value: string) => void - Callback when a value is selected.
- `mainLabel`: string - Main label for the auto-complete.
- `subLabel`: string - Sub-label for the auto-complete.
- `placeholder`: string - Placeholder text.
- `required`: boolean - Whether selection is required.
- `disabled`: boolean - Whether the auto-complete is disabled.
- `error`: string - Error message.
- `minChars`: number - Minimum characters to start showing suggestions.
- `highlightMatch`: boolean - Whether to highlight matching text.
- `containerClassName`: string - Custom class name for the container.
- `labelClassName`: string - Custom class name for the main label.
- `subLabelClassName`: string - Custom class name for the sub-label.
- `inputClassName`: string - Custom class name for the input.
- `activeInputClassName`: string - Custom class name for active input.
- `optionClassName`: string - Custom class name for options.
- `activeOptionClassName`: string - Custom class name for active options.
- `errorClassName`: string - Custom class name for error message.
- `maxHeight`: number - Maximum height of the suggestions list.



