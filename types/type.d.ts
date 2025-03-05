import { TouchableOpacityProps, TextInputProps } from "react-native";


declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "dark" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "dark" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label?: string;
  subLabel?: string
  icon?: React.ElementType; // Change to React.ElementType to accept any component
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  required?: boolean;
  isBottomSheetInput?: boolean; // Required for keyboard avoiding view in gorham-bottom-sheets <BottomSheetTextInput>

}
declare interface ScrollSelectProps extends TextInputProps {
  label: string;
  options: string[];
  selectedValues: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  required?: boolean;
  layout?: "scroll" | "wrap";
}

declare interface PriceFieldProps extends InputFieldProps {
  currency?: string;
}

declare interface UserListings {
  listings: Array<{
      listing_id: string;
      title: string;
      price: string;
      status: string;
      is_featured: boolean;
      category_id: string;
      condition: string;
  }>;
};

declare interface UserFilterState {
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  condition?: string[];
  status?: string[];
  isFeaturedOnly?: boolean;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}