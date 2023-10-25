import { Service } from "@/interfaces/service";
import { APIResponse } from "@/interfaces/typing";
import BASE_URL from "@/utils/baseUrl";

const fetchUserServices = async (): Promise<APIResponse<Service[]>> => {
    const res = await fetch(`${BASE_URL}/api/user/services`, {
        mode: "no-cors",
        next: {
            tags: ["user-services"],
        },
    }).then((res) => res.json());

    return {
        data: res.services,
    }
}

export default fetchUserServices;