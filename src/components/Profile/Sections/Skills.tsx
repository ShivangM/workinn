import fetchSkills from '@/lib/profile/fetchSkills';
import { cookies } from 'next/headers';
import React from 'react';

type Props = {};

const Skills = async () => {
  const token = cookies().get('token')?.value;
  const { data: skills } = await fetchSkills(token);

  console.log('skills', skills);

  return (
    <section title="Skills" className="profile-section">
      <h2>Skills</h2>
    </section>
  );
};

export default Skills;
