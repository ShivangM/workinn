import { Skill } from '@/interfaces/user';

const fetchSkills = async (
  token: string | undefined
): Promise<APIResponse<Skill[]>> => {
  const res = await fetch('http://localhost:3000/api/user/skills', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ['skills'],
    },
  }).then((res) => res.json());

  return res;
};

export default fetchSkills;
