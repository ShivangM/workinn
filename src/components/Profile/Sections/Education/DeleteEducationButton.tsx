'use client';

import { Education } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { AiOutlineDelete } from 'react-icons/ai';

type Props = {
  education: Education;
};

const DeleteEducationButton = ({ education }: Props) => {
  const [toggleDeleteEducationModal] = useProfileStore((state) => [
    state.toggleDeleteEducationModal,
  ]);

  return (
    <button onClick={() => toggleDeleteEducationModal(education)}>
      <AiOutlineDelete className="text-lg text-red-500" />
    </button>
  );
};

export default DeleteEducationButton;
