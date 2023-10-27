import { ETHRates } from "@/interfaces/typing";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<{
    data?: ETHRates;
    error?: string;
}>> {
    const data = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR,INR', {
        cache: 'no-cache',
    }).then((res) => res.json())
        .catch((error) => {
            return NextResponse.json({
                error: error.message,
            })
        });

    return NextResponse.json({ data }, {
        status: 200,
        statusText: 'OK',
    })
}