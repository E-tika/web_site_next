import axios from 'axios';

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL!;
const API_KEY = process.env.NEXT_PUBLIC_GAS_KEY;

export const fetchReservations = async () => {
    const response = await axios.get(GAS_URL, {
        params: {
            apiKey: API_KEY
        }
    });
    return response.data;
};
