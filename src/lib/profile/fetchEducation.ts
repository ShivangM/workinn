import { Education } from '@/interfaces/user';

const fetchEducation = async (
  token: string | undefined,
  userId?: string
): Promise<APIResponse<Education[]>> => {
  const res = await fetch(
    userId
      ? `http://localhost:3000/api/user/education?userId=${userId}`
      : 'http://localhost:3000/api/user/education',
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
