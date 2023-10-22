import fetchCertifications from '@/lib/profile/fetchCertifications';
import { cookies } from 'next/headers';
import React from 'react';

type Props = {};

const Certifications = async () => {
  const token = cookies().get('token')?.value;
  const { data: certifications } = await fetchCertifications(token);

  console.log('certifications', certifications);

  return (
    <section title="Certifications" className="profile-section">
      <h2>Certifications</h2>
    </section>
  );
};

export default Certifications;
