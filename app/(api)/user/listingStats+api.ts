import { neon } from '@neondatabase/serverless';


/*
1. Fetch total number of listings for specific clerkid user.
2. Fetch total number of active listings for specific clerkid user.
3. Fetch total number of sold listings for specific clerkid user.
4. Fetch total number of listings views for specific clerkid user.
5. Fetch total price of sold listings for specific clerkid user.
*/

export async function GET(request: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        // Parse `clerkID` from the query parameters
        const url = new URL(request.url);
        const clerkID = url.searchParams.get('clerkID');

        if (!clerkID) {
            console.log("Missing clerkID in request"); // Detailed log
            return new Response(JSON.stringify({ error: 'clerkID is required' }), { status: 400 });
        }

        console.log("Fetching user listing stats for clerkID:", clerkID); // Detailed log

        const userListingStats = await sql`
            SELECT 
                COUNT(*) AS total_listings,
                COUNT(*) FILTER (WHERE status = 'Active') AS active_listings,
                COUNT(*) FILTER (WHERE status = 'Sold') AS sold_listings,
                SUM(listing_views) AS total_views,
                SUM(price) FILTER (WHERE status = 'Sold') AS total_sold_price
            FROM listings
            WHERE user_id = (SELECT user_id FROM users WHERE clerk_id = ${clerkID})
        `;

        return new Response(JSON.stringify(userListingStats[0]), { status: 200 });

    } catch (error) {
        console.error('Error fetching user listing stats:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

/*
users Table:
- user_id (PK)
- first_name
- last_name
- email
- clerk_id
- ...

listings Table:
- listing_id (PK)
- user_id (FK)
- title
- description
- price
- status (Active, Sold, Inactive, Draft)
- category_id
- ...
- listing_views
- condition
- ...
- is_featured
- ...

categories Table:
category_id (PK)
category_name

*/