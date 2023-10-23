import React from 'react';
import Certifications from './Sections/Certifications/Certifications';
import Education from './Sections/Education/Education';
import Languages from './Sections/Languages/Languages';
import Skills from './Sections/Skills/Skills';

type Props = {
  userId?: string;
  viewOnly: boolean;
};

const ProfileForm = ({ userId, viewOnly }: Props) => {
  return (
    <div className="space-y-4 lg:col-span-2">
      {/* @ts-ignore */}
      <Languages userId={userId} viewOnly={viewOnly} />
      {/* @ts-ignore */}
      <Skills userId={userId} viewOnly={viewOnly} />
      {/* @ts-ignore */}
      <Education userId={userId} viewOnly={viewOnly} />
      {/* @ts-ignore */}
      <Certifications userId={userId} viewOnly={viewOnly} />
    </div>
  );
};

export default ProfileForm;
