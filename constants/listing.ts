export enum Condition {
    NEW = 'new', // lower case for API compatibility
    USED = 'used',
    REFURBISHED = 'refurbished'
}

export enum Status {
    ACTIVE = 'active', // lower case for API compatibility
    INACTIVE = 'inactive',
    DRAFT = 'draft',
    SOLD = 'sold'
}

// export enum SortOption {
//     PRICE_ASC = 'price_asc',
//     PRICE_DESC = 'price_desc',
//     TITLE_ASC = 'title_asc',
//     TITLE_DESC = 'title_desc',
//     NEWEST = 'newest',
//     OLDEST = 'oldest',
//     MOST_VIEWS = 'most_views',
//     LEAST_VIEWS = 'least_views',
// }




export interface Category {
    id: number;
    name: string;
}

export const CATEGORIES: Category[] = [
    { id: 1, name: 'Furniture' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Textbooks' },
    { id: 5, name: 'Vehicles' },
    { id: 6, name: 'Housing' },
    { id: 7, name: 'Sports' },
    { id: 8, name: 'Appliances' },
    { id: 9, name: 'Rides' },
    { id: 10, name: 'Other' }
];

export interface SortOption {
    column: string;
    ascending: boolean;
    label: string;
    id: number;
}

export const SORT_OPTIONS: SortOption[] = [
    { column: 'price', ascending: true, label: 'Price: Low to High', id: 1 },
    { column: 'price', ascending: false, label: 'Price: High to Low', id: 2 },
    { column: 'title', ascending: true, label: 'Title: A to Z', id: 3 },
    { column: 'title', ascending: false, label: 'Title: Z to A', id: 4 },
    { column: 'created_at', ascending: false, label: 'Newest', id: 5 },
    { column: 'created_at', ascending: true, label: 'Oldest', id: 6 },
    { column: 'listing_views', ascending: false, label: 'Most Views', id: 7 },
    { column: 'listing_views', ascending: true, label: 'Least Views', id: 8 }
];

export interface ListingFilters {
    minPrice?: number;
    maxPrice?: number;
    categories:  number[];
    conditions: Condition[];
    status: Status[];
    isFeaturedOnly: boolean;
    sortBy: SortOption;
}

export const DEFAULT_FILTERS: ListingFilters = {
    minPrice: undefined,
    maxPrice: undefined,
    categories: [],
    conditions: [],
    status: [],
    isFeaturedOnly: false,
    sortBy: SORT_OPTIONS[4], // Newest first
};

export interface Listing {
    category_id: number;    
    condition: Condition;
    created_at: string;
    description: string;
    is_featured: boolean;
    listing_id: string;
    listing_views: number;
    price: number;
    status: Status;
    title: string;
    views: number;
}