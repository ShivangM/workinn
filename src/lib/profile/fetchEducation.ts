import { Education } from '@/interfaces/user';
import BASE_URL from '@/utils/baseUrl';

const fetchEducation = async (
  token: string | undefined,
  userId?: string
): Promise<APIResponse<Education[]>> => {
  const res = await fetch(
    userId
      ? `${BASE_URL}/api/user/education?userId=${userId}`
      : '${BASE_URL}/api/user/education',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['education'],
      },
    }
  ).then((res) => res.json());

  return res;
};

export default fetchEducation;
