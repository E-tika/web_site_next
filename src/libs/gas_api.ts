import axios from 'axios';

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL;

export const fetchReservations = async () => {
    if (!GAS_URL) {
        console.error('GAS_URL is not configured. Please set NEXT_PUBLIC_GAS_URL environment variable.');
        throw new Error('GAS APIのURLが設定されていません');
    }

    try {
        const response = await axios.get(GAS_URL, {
            timeout: 10000,
        });

        if (!response.data) {
            throw new Error('GAS APIからデータが返されませんでした');
        }

        // オブジェクト形式 {"0": {...}, "1": {...}} を配列に変換
        const data = response.data;
        const reservations = Array.isArray(data) ? data : Object.values(data);

        return reservations;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('GAS APIへの接続がタイムアウトしました');
            }
            if (error.response) {
                console.error('GAS API error response:', error.response.status, error.response.data);
                throw new Error(`GAS APIエラー: ${error.response.status}`);
            }
            if (error.request) {
                console.error('GAS API no response:', error.message);
                throw new Error('GAS APIからの応答がありません');
            }
        }
        console.error('GAS API error:', error);
        throw error;
    }
};
