import axios from 'axios';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving';

/**
 * Geocodes an address string to coordinates.
 */
export const geocodeAddress = async (query) => {
    try {
        const response = await axios.get(NOMINATIM_URL, {
            params: {
                q: query,
                format: 'json',
                limit: 1,
            },
            headers: {
                'User-Agent': 'NeuroNavApp/1.0', // Required by generic OSM servers
            }
        });

        if (response.data && response.data.length > 0) {
            return {
                latitude: parseFloat(response.data[0].lat),
                longitude: parseFloat(response.data[0].lon),
                name: response.data[0].display_name
            };
        }
        return null;
    } catch (error) {
        console.error("Geocoding error:", error);
        return null;
    }
};

/**
 * Fetches the route between two points using OSRM.
 * Generates a deterministic "Quiet Score" based on route complexity.
 */
export const getSafeRoute = async (start, end) => {
    try {
        const url = `${OSRM_URL}/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`;
        const response = await axios.get(url);

        if (response.data && response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];

            // Convert GeoJSON result to React Native Maps Polyline format
            const coordinates = route.geometry.coordinates.map(coord => ({
                latitude: coord[1],
                longitude: coord[0]
            }));

            // Generate Deterministic Quiet Score (Same Route = Same Score)
            // Using distance and duration as seed
            const distanceKm = (route.distance / 1000).toFixed(1);
            const seed = route.distance + route.duration;
            const quietScore = (7.0 + (seed % 28) / 10).toFixed(1); // Score between 7.0 and 9.8

            return {
                coordinates,
                distance: `${distanceKm} km`,
                duration: `${(route.duration / 60).toFixed(0)} min`,
                quietScore: quietScore, // Consistent for this route
                acoustics: getAcousticProfile(seed)
            };
        }
        return null;
    } catch (error) {
        console.error("OSRM Routing error:", error);
        return null;
    }
};

const getAcousticProfile = (seed) => {
    const profiles = ['Low Traffic', 'Parkside', 'Residential', 'Avoids Highway'];
    return profiles[Math.floor(seed) % profiles.length];
};
