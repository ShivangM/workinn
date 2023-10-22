import React from 'react';
import Certifications from './Sections/Certifications';
import Education from './Sections/Education';
import Languages from './Sections/Languages';
import Skills from './Sections/Skills';

type Props = {};

const ProfileForm = (props: Props) => {
  return (
    <div className="space-y-4 col-span-2">
      <Languages />
      <Skills />
      <Education />
      <Certifications />
    </div>
  );
};

export default ProfileForm;
