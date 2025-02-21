import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
    try {
        // console.log('Fetching user listings...');
        const sql = neon(`${process.env.DATABASE_URL}`);

        // Parse `clerkID` from the query parameters
        const url = new URL(request.url);
        const clerkID = url.searchParams.get('clerkID');
        
        const status = url.searchParams.getAll('status');
        const condition = url.searchParams.getAll('condition');
        const category = url.searchParams.getAll('category');

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

        console.log('status:', status); // status: [ 'Draft', 'Sold' ]
        console.log('condition:', condition); // condition: []
        console.log('category:', category); // category: []

        let query = sql`
            SELECT listing_id, title, price, status, is_featured, category_id, condition, created_at, listing_views
            FROM listings
            WHERE user_id = ${userID}
            AND (${status.length} = 0 OR status = ANY(${status}))
            AND (${condition.length} = 0 OR condition = ANY(${condition}))
            AND (${category.length} = 0 OR category_id = ANY(${category}))
        `;
        
        const listings = await query;

        // debug logging
        // console.log('Query parameters:', {
        //     userID,
        //     statusLength: status.length,
        //     conditionLength: condition.length,
        //     categoryLength: category.length
        // });

        console.log(listings);

        return new Response(JSON.stringify({ listings }), { status: 200 });

    } catch (error) {
        console.error('Error fetching user listings:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
//AND (status = COALESCE(${status}, status))
//AND (condition = COALESCE(${condition}, condition))
//AND (category_id = COALESCE(${category}, category_id))


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
