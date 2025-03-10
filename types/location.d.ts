export type Location = {
    place_id: string;
    osm_id: string;
    osm_type: string;
    lat: string;
    lon: string;
    boundingbox: {
        0: string;
        1: string;
        2: string;
        3: string;
    };
    class: 'place' | string;
    type: 'city' | 'state' | 'country' | string;
    display_name: string;
    display_place: string;
    display_address: string;
    address: {
        name: string;
        city: string;
        state: string;
        country: string;
        country_code: string;
    };
}