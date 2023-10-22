import { Education } from '@/interfaces/user';

const fetchEducation = async (
  token: string | undefined
): Promise<APIResponse<Education[]>> => {
  const res = await fetch('http://localhost:3000/api/user/education', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ['education'],
    },
  }).then((res) => res.json());

  return res;
};

export default fetchEducation;
