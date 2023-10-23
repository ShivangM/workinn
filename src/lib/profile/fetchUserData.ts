import { UserData } from '@/interfaces/user';
import BASE_URL from '@/utils/baseUrl';

const fetchUserData = async (
  token: string | undefined,
  userId?: string
): Promise<APIResponse<UserData>> => {
  const res = await fetch(
    userId ? `${BASE_URL}/api/user?userId=${userId}` : `${BASE_URL}/api/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['basic-details'],
      },
    }
  ).then((res) => res.json());

  return res;
};

export default fetchUserData;
