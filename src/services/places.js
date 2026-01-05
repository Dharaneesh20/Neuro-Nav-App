import axios from 'axios';

const MOCK_HAVENS = [
    { id: '1', name: 'Riverside Park', type: 'Park', distance: '0.2 mi', score: 9.2, latitude: 40.8006, longitude: -73.9712 },
    { id: '2', name: 'Central Library', type: 'Library', distance: '0.5 mi', score: 8.8, latitude: 40.7580, longitude: -73.9632 },
    { id: '3', name: 'Quiet Cafe', type: 'Cafe', distance: '0.8 mi', score: 7.5, latitude: 40.7300, longitude: -73.9950 },
];

/**
 * Fetches nearby safe havens using OpenStreetMap (Overpass API).
 * Focuses on locations likely to be sensory-friendly or quiet.
 * 
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} radius - Search radius in meters (default 1000m)
 */
export const fetchNearbyPlaces = async (lat, lon, radius = 4000) => {
    try {
        console.log(`Fetching places for ${lat}, ${lon} radius ${radius}`);
        // Query for cafes, libraries, parks, and places of worship
        // [out:json]; is required for JSON response
        const query = `
            [out:json][timeout:25];
            (
                node["amenity"="cafe"](around:${radius},${lat},${lon});
                node["amenity"="library"](around:${radius},${lat},${lon});
                node["leisure"="park"](around:${radius},${lat},${lon});
                node["amenity"="place_of_worship"](around:${radius},${lat},${lon});
            );
            out body;
            >;
            out skel qt;
        `;

        const response = await axios.get('https://overpass.kumi.systems/api/interpreter', {
            params: { data: query },
            timeout: 5000 // Client side timeout
        });

        if (response.data && response.data.elements) {
            return response.data.elements.map(place => ({
                id: place.id.toString(),
                name: place.tags.name || 'Unknown Place',
                type: formatType(place.tags),
                latitude: place.lat,
                longitude: place.lon,
                // Mocking a "Quiet Score" since OSM doesn't have this data
                score: (Math.random() * (9.8 - 7.0) + 7.0).toFixed(1)
            })).filter(p => p.name !== 'Unknown Place').slice(0, 10); // Limit to 10 results
        }

        return MOCK_HAVENS;
    } catch (error) {
        console.warn("Map server busy, switching to offline mode.");
        return MOCK_HAVENS;
    }
};

const formatType = (tags) => {
    if (tags.amenity === 'cafe') return 'Cafe';
    if (tags.amenity === 'library') return 'Library';
    if (tags.leisure === 'park') return 'Park';
    if (tags.amenity === 'place_of_worship') return 'Temple/Church';
    return 'Safe Haven';
};
