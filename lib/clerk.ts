// import { clerkClient } from '@clerk/clerk-expo';

// export const syncUserWithSupabase = async (userId: string, email: string) => {
//   try {
//     const { data, error } = await supabase
//       .from('users')
//       .upsert(
//         { 
//           id: userId,
//           email: email,
//           updated_at: new Date().toISOString()
//         },
//         { onConflict: 'id' }
//       );

//     if (error) {
//       console.error('Error syncing user with Supabase:', error);
//       throw error;
//     }

//     return data;
//   } catch (error) {
//     console.error('Error in syncUserWithSupabase:', error);
//     throw error;
//   }
// };

// export const deleteUserFromSupabase = async (userId: string) => {
//   try {
//     const { error } = await supabase
//       .from('users')
//       .delete()
//       .eq('id', userId);

//     if (error) {
//       console.error('Error deleting user from Supabase:', error);
//       throw error;
//     }
//   } catch (error) {
//     console.error('Error in deleteUserFromSupabase:', error);
//     throw error;
//   }
// };