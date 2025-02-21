
import { useAuth } from "@clerk/clerk-expo";
import { createClient } from "@supabase/supabase-js";

// Supabase setup
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or Anonymous Key');
}

// Create the Supabase client
export const getSupabaseClient = async (token: any) => {

    return createClient(supabaseUrl, supabaseAnonKey, {
        accessToken: async () => token,
        // global: {
        //     headers: {
        //         'Authorization': `Bearer ${token}`,
        //     },
        // }
    });
};

























































// import { useAuth } from '@clerk/clerk-expo'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { createClient } from '@supabase/supabase-js'
// import * as SecureStore from 'expo-secure-store';
// import { AppState } from 'react-native';

// import { useAuth } from "@clerk/clerk-expo";
// import { createClient } from "@supabase/supabase-js";

// const ExpoSecureStoreAdapter = {
//     getItem: (key: string) => {
//       return SecureStore.getItemAsync(key);
//     },
//     setItem: (key: string, value: string) => {
//       return SecureStore.setItemAsync(key, value);
//     },
//     removeItem: (key: string) => {
//       return SecureStore.deleteItemAsync(key);
//     },
//   };

// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase URL or Anonymous Key');
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// })



// // Create a custom hook to get an authenticated Supabase client
// export const useSupabaseClient = () => {
//     const { getToken } = useAuth();
    
//     const getSupabaseClient = async () => {
//       const token = await getToken({ template: 'supabase' });
      
//       if (token) {
//         supabase.auth.setSession({
//           access_token: token,
//           refresh_token: '',
//         });
//       }
      
//       return supabase;
//     };
    
//     return { getSupabaseClient };
// };






// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string

// export const getSupabaseClient = async () => {

//     const { getToken } = useAuth();
    
//     const token = await getToken({ template: "supabase" });

//     return createClient(supabaseUrl, supabaseAnonKey, {
        // global: {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // },
        
//     });
// };




// import { createClient } from '@supabase/supabase-js';
// import { useAuth } from '@clerk/clerk-expo';
// import * as SecureStore from 'expo-secure-store';

// // Supabase Client Configuration
// export function createClerkSupabaseClient() {
//   const { getToken } = useAuth();

//   return createClient(
//     process.env.EXPO_PUBLIC_SUPABASE_URL!,
//     process.env.EXPO_PUBLIC_SUPABASE_KEY!,
//     {
//       auth: {
//         storage: {
//           getItem: SecureStore.getItemAsync,
//           setItem: SecureStore.setItemAsync,
//           removeItem: SecureStore.deleteItemAsync,
//         },
//       },
//       global: {
//         fetch: async (url, options = {}) => {
//           const clerkToken = await getToken({ template: 'supabase' });

//           const headers = new Headers(options?.headers);
//           headers.set('Authorization', `Bearer ${clerkToken}`);

//           return fetch(url, { ...options, headers });
//         },
//       },
//     }
//   );
// }


// import { createClient } from "@supabase/supabase-js";
// import { useAuth } from '@clerk/clerk-expo';


// export const getSupabaseClient = async () => {
//     const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string
//     const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string
//     const { getToken } = useAuth();
    
//     if (!supabaseUrl || !supabaseAnonKey) {
//     throw new Error('Missing Supabase URL or Anonymous Key');
//     }

//     return createClient(supabaseUrl, supabaseAnonKey, {
//         accessToken: async () => {
//             return await getToken({ template: "supabase" });
//         },
//     });
// };