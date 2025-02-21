import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
    try {
        // console.log('Fetching user listings...');
        const sql = neon(`${process.env.DATABASE_URL}`);

        // Parse `clerkID` from the query parameters
        const url = new URL(request.url);
        const clerkID = url.searchParams.get('clerkID');

        if (!clerkID) {
            return new Response(JSON.stringify({ error: 'clerkID is required' }), { status: 400 });
        }

        // Find the user_id using the clerk_id
        const user = await sql`
            SELECT user_id FROM users WHERE clerk_id = ${clerkID}
        `;

        if (user.length === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const userID = user[0].user_id;

        // Get parameters with fallback values
        const status = url.searchParams.getAll('status') ;
        const condition = url.searchParams.getAll('condition');
        const category = url.searchParams.getAll('category');
        const isFeatured = url.searchParams.getAll('isFeatured');
        const minPrice = url.searchParams.get('minPrice');
        const maxPrice = url.searchParams.get('maxPrice');
        const sortBy = url.searchParams.get('sortBy');
        const sortDirection = url.searchParams.get('sortDirection');


        // Fetch specific fields from listings with user_id
        let query = sql`
            SELECT listing_id, title, price, status, is_featured, category_id, condition, created_at, listing_views
            FROM listings
            WHERE user_id = ${userID}
            AND (
                status = ANY(${status})
                AND condition = ANY(${condition})
                AND category_id = ANY(${category})
                AND is_featured = ANY(${isFeatured})
                AND price >= ${minPrice}
                AND price <= ${maxPrice}
            )
            ORDER BY price DESC
        `;

        const listings = await query;

        // console.log(listings);

        return new Response(JSON.stringify({ listings }), { status: 200 });

    } catch (error) {
        console.error('Error fetching user listings:', error);
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
- status (Enum: 'Active', 'Sold', 'Inactive', 'Draft')
- category_id ("1", "2", "3"...)
- created_at
- ...
- listing_views
- condition (Enum: New, Used, Refurbished)
- ...
- is_featured (true, false)
- ...

categories Table:
category_id (PK) ex. 1, 2, 3
category_name

*/
