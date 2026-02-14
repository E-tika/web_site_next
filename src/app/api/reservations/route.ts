import { NextResponse } from 'next/server';

export async function GET() {
    const GAS_URL = process.env.GAS_URL;
    const API_KEY = process.env.GAS_KEY;

    if (!GAS_URL) {
        return NextResponse.json(
            { error: 'GAS APIのURLが設定されていません' },
            { status: 500 }
        );
    }

    try {
        const url = new URL(GAS_URL);
        if (API_KEY) {
            url.searchParams.set('apiKey', API_KEY);
        }

        const response = await fetch(url.toString(), {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error(`GAS API error: ${response.status}`);
        }

        const data = await response.json();

        // オブジェクト形式 {"0": {...}, "1": {...}} を配列に変換
        const reservations = Array.isArray(data) ? data : Object.values(data);

        return NextResponse.json(reservations);
    } catch (error) {
        console.error('GAS API error:', error);
        return NextResponse.json(
            { error: 'データの取得に失敗しました' },
            { status: 500 }
        );
    }
}
