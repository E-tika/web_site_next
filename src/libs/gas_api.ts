import axios from 'axios';

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL;
const API_KEY = process.env.NEXT_PUBLIC_GAS_KEY;

export const fetchReservations = async () => {
    // 環境変数のチェック
    if (!GAS_URL) {
        console.error('GAS_URL is not configured. Please set NEXT_PUBLIC_GAS_URL environment variable.');
        throw new Error('GAS APIのURLが設定されていません');
    }

    try {
        const response = await axios.get(GAS_URL, {
            params: {
                apiKey: API_KEY
            },
            timeout: 10000, // 10秒タイムアウト
        });

        // レスポンスデータの検証
        if (!response.data) {
            throw new Error('GAS APIからデータが返されませんでした');
        }

        // 配列でない場合の対応
        if (!Array.isArray(response.data)) {
            console.error('Unexpected response format:', response.data);
            throw new Error('GAS APIからのレスポンス形式が不正です');
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('GAS APIへの接続がタイムアウトしました');
            }
            if (error.response) {
                // サーバーがエラーレスポンスを返した場合
                console.error('GAS API error response:', error.response.status, error.response.data);
                throw new Error(`GAS APIエラー: ${error.response.status}`);
            }
            if (error.request) {
                // リクエストは送信されたがレスポンスがない場合
                console.error('GAS API no response:', error.message);
                throw new Error('GAS APIからの応答がありません');
            }
        }
        // その他のエラー
        console.error('GAS API error:', error);
        throw error;
    }
};
