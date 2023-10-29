'use client';

import { Certification } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { AiOutlineDelete } from 'react-icons/ai';

type Props = {
  certification: Certification;
};

const DeleteCertificationButton = ({ certification }: Props) => {
  const [toggleDeleteCertificationModal] = useProfileStore((state) => [
    state.toggleDeleteCertificationModal,
  ]);
  return (
    <button onClick={() => toggleDeleteCertificationModal(certification)}>
      <AiOutlineDelete className="text-lg text-red-500" />
    </button>
  );
};

export default DeleteCertificationButton;
