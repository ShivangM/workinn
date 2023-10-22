import fetchLanguages from '@/lib/profile/fetchLanguages';
import { cookies } from 'next/headers';
import React from 'react';

type Props = {};

const Languages = async () => {
  const token = cookies().get('token')?.value;
  const { data: languages } = await fetchLanguages(token);

  console.log('languages', languages);

  return (
    <section title="Languages" className="profile-section">
      <h2>Languages</h2>
    </section>
  );
};

export default Languages;
