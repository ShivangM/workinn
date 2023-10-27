'use client';

import { Education } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { BiSolidEdit } from 'react-icons/bi';

type Props = {
  education: Education;
};

const EditEducationButton = ({ education }: Props) => {
  const [toggleAddEducationModal] = useProfileStore((state) => [
    state.toggleAddEducationModal,
  ]);

  return (
    <button onClick={() => toggleAddEducationModal(education)}>
      <BiSolidEdit className="text-lg" />
    </button>
  );
};

export default EditEducationButton;
