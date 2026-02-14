import axios from 'axios';

export const fetchReservations = async () => {
    try {
        const response = await axios.get('/api/reservations', {
            timeout: 10000,
        });

        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('GAS APIからのレスポンス形式が不正です');
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('GAS APIへの接続がタイムアウトしました');
            }
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
        }
        console.error('GAS API error:', error);
        throw error;
    }
};
