import { UserData } from '@/interfaces/user';

const fetchUserData = async (
  token: string | undefined
): Promise<APIResponse<UserData>> => {
  const res = await fetch('http://localhost:3000/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ['basic-details'],
    },
  }).then((res) => res.json());

  return res;
};

export default fetchUserData;
