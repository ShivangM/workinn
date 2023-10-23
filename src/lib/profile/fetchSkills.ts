import { Skill } from '@/interfaces/user';
import BASE_URL from '@/utils/baseUrl';

const fetchSkills = async (
  token: string | undefined,
  userId?: string
): Promise<APIResponse<Skill[]>> => {
  const res = await fetch(
    userId
      ? `${BASE_URL}/api/user/skills?userId=${userId}`
      : '${BASE_URL}/api/user/skills',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['skills'],
      },
    }
  ).then((res) => res.json());

  return res;
};

export default fetchSkills;
