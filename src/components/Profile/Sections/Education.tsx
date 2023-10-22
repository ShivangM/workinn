import fetchEducation from '@/lib/profile/fetchEducation';
import { cookies } from 'next/headers';
import React from 'react';

type Props = {};

const Education = async () => {
  const token = cookies().get('token')?.value;
  const { data: education } = await fetchEducation(token);

  console.log('education', education);

  return (
    <section title="Education" className="profile-section">
      <h2>Education</h2>
    </section>
  );
};

export default Education;
