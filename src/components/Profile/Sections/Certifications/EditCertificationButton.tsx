'use client';

import { Certification } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { BiSolidEdit } from 'react-icons/bi';

type Props = {
  certification: Certification;
};

const EditCertificationButton = ({ certification }: Props) => {
  const [toggleAddCertificationModal] = useProfileStore((state) => [
    state.toggleAddCertificationModal,
  ]);
  return (
    <button onClick={() => toggleAddCertificationModal(certification)}>
      <BiSolidEdit className="text-lg" />
    </button>
  );
};

export default EditCertificationButton;
