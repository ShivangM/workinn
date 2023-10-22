import { Language } from '@/interfaces/user';

const fetchLanguages = async (
  token: string | undefined
): Promise<APIResponse<Language[]>> => {
  const res = await fetch('http://localhost:3000/api/user/languages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ['languages'],
    },
  }).then((res) => res.json());

  return res;
};

export default fetchLanguages;
