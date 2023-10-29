'use client';

import { Skill } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { BiSolidEdit } from 'react-icons/bi';

type Props = {
  skill: Skill;
};

const EditSkillButton = ({ skill }: Props) => {
  const [toggleAddSkillModal] = useProfileStore((state) => [
    state.toggleAddSkillModal,
  ]);
  return (
    <button onClick={() => toggleAddSkillModal(skill)}>
      <BiSolidEdit className="text-lg" />
    </button>
  );
};

export default EditSkillButton;
