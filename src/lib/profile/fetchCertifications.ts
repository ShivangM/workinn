import { Certification } from '@/interfaces/user';
import BASE_URL from '@/utils/baseUrl';

const fetchCertifications = async (
  token: string | undefined,
  userId?: string
): Promise<APIResponse<Certification[]>> => {
  const res = await fetch(
    userId
      ? `${BASE_URL}/api/user/certifications?userId=${userId}`
      : '${BASE_URL}/api/user/certifications',
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
