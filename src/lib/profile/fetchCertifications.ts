import { Certification } from '@/interfaces/user';

const fetchCertifications = async (
  token: string | undefined,
  userId?: string
): Promise<APIResponse<Certification[]>> => {
  const res = await fetch(
    userId
      ? `http://localhost:3000/api/user/certifications?userId=${userId}`
      : 'http://localhost:3000/api/user/certifications',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['certifications'],
      },
    }
  ).then((res) => res.json());

  return res;
};

export default fetchCertifications;
