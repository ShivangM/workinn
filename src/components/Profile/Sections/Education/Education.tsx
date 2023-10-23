import { Education } from '@/interfaces/user';
import fetchEducation from '@/lib/profile/fetchEducation';
import { cookies } from 'next/headers';
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

        <span className="text-sm text-gray-500">
          {education.school}, {education.country.label}
        </span>
        <p className="text-sm text-gray-600">
          <span className="text-gray-900 font-medium">Grauation Year:</span>{' '}
          <span>{education.yearOfGraduation}</span>{' '}
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
  const token = cookies().get('token')?.value;
  const { data: educations } = await fetchEducation(token, userId);

  return (
    <section title="Education" className="profile-section">
      <div className="flex item-center justify-between">
        <h2>Education</h2>
        {viewOnly ? null : <AddEducationButton />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {educations.length > 0 ? (
          educations.map((education) => (
            <EducationCard
              viewOnly={viewOnly}
              education={education}
              key={education.id}
            />
          ))
        ) : (
          <h3 className="text-gray-600">No educations added</h3>
        )}
      </div>
    </section>
  );
};

export default Education;
