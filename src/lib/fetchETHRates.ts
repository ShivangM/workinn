import { APIResponse, ETHRates } from "@/interfaces/typing";
import BASE_URL from "@/utils/baseUrl";

const fetchETHRates = async (): Promise<APIResponse<ETHRates>> => {
    const res = await fetch(`${BASE_URL}/api/get-eth-rates`, {
        mode: "no-cors",
        cache: "no-cache",
    }).then((res) => res.json());

    return {
        data: res.data,
    }
}

export default fetchETHRates;