import { Language } from '@/interfaces/user';
import BASE_URL from '@/utils/baseUrl';

const fetchLanguages = async (
  token: string | undefined,
  userId?: string
): Promise<APIResponse<Language[]>> => {
  const res = await fetch(
    userId
      ? `${BASE_URL}/api/user/languages?userId=${userId}`
      : `${BASE_URL}/api/user/languages`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['languages'],
      },
    }
  ).then((res) => res.json());

  return res;
};

export default fetchLanguages;
