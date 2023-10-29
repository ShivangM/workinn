import { Education } from '@/interfaces/user';
import fetchEducation from '@/lib/profile/fetchEducation';
import { redirect } from 'next/navigation';
import React from 'react';
import AddEducationButton from './AddEducationButton';
import DeleteEducationButton from './DeleteEducationButton';
import EditEducationButton from './EditEducationButton';

type EducationCardProps = {
  education: Education;
  viewOnly: boolean;
};

const EducationCard = ({ education, viewOnly }: EducationCardProps) => {
  return (
    <div
      key={education.id}
      className="flex flex-col bg-gray-100 rounded-lg p-4"
    >
      <div className="">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {education.title}, {education.major}
          </h3>

          {!viewOnly ? (
            <div className="flex items-center space-x-2">
              <EditEducationButton education={education} />
              <DeleteEducationButton education={education} />
            </div>
          ) : null}
        </div>

        <span className="text-sm text-gray-500">{education.school}</span>
        <p className="text-sm text-gray-500">
          <span className="">{education.country.label}</span>,{' '}
          <span>Graduated {education.yearOfGraduation}</span>
        </p>
      </div>
    </div>
  );
};

type EducationProps = {
  viewOnly: boolean;
  userId?: string;
};

const Education = async ({ viewOnly, userId }: EducationProps) => {
  let education = null;

  try {
    const { data } = await fetchEducation(userId);
    education = data;
  } catch (error) {
    redirect('/signin');
  }

  return (
    <section title="Education" className="profile-section">
      <div className="flex item-center justify-between">
        <h2>Education</h2>
        {viewOnly ? null : <AddEducationButton />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {education && education.length > 0 ? (
          education.map((education) => (
            <EducationCard
              viewOnly={viewOnly}
              education={education}
              key={education.id}
            />
          ))
        ) : (
          <h3 className="text-gray-600">No education added</h3>
        )}
      </div>
    </section>
  );
};

export default Education;
