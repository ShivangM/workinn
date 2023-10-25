import { Certification } from '@/interfaces/user';
import fetchCertifications from '@/lib/profile/fetchCertifications';
import { redirect } from 'next/navigation';
import React from 'react';
import AddCertificationButton from './AddCertificationButton';
import DeleteCertificationButton from './DeleteCertificationButton';
import EditCertificationButton from './EditCertificationButton';

type CertificationCardProps = {
  certification: Certification;
  viewOnly: boolean;
};

const CertificationCard = ({
  certification,
  viewOnly,
}: CertificationCardProps) => {
  return (
    <div
      key={certification.id}
      className="flex flex-col bg-gray-100 rounded-lg p-4"
    >
      <div className="">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{certification.name}</h3>

          {!viewOnly ? (
            <div className="flex items-center space-x-2">
              <EditCertificationButton certification={certification} />
              <DeleteCertificationButton certification={certification} />
            </div>
          ) : null}
        </div>

        <span className="text-sm text-gray-500">
          {certification.organization}
        </span>
      </div>
    </div>
  );
};

type CertificationsProps = {
  viewOnly: boolean;
  userId?: string;
};

const Certifications = async ({ viewOnly, userId }: CertificationsProps) => {
  let certifications = null;

  try {
    const { data } = await fetchCertifications(userId);
    certifications = data;
  } catch (error) {

    redirect('/signin');
  }

  return (
    <section title="Certifications" className="profile-section">
      <div className="flex item-center justify-between">
        <h2>Certifications</h2>
        {viewOnly ? null : <AddCertificationButton />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {certifications && certifications.length > 0 ? (
          certifications.map((certification) => (
            <CertificationCard
              certification={certification}
              key={certification.id}
              viewOnly={viewOnly}
            />
          ))
        ) : (
          <h3 className="text-gray-600">No certifications added</h3>
        )}
      </div>
    </section>
  );
};

export default Certifications;
