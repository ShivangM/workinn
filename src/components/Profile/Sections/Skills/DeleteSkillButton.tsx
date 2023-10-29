'use client';

import { Skill } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { AiOutlineDelete } from 'react-icons/ai';

type Props = {
  skill: Skill;
};

const DeleteSkillButton = ({ skill }: Props) => {
  const [toggleDeleteSkillModal] = useProfileStore((state) => [
    state.toggleDeleteSkillModal,
  ]);
  return (
    <button onClick={() => toggleDeleteSkillModal(skill)}>
      <AiOutlineDelete className="text-lg text-red-500" />
    </button>
  );
};

export default DeleteSkillButton;
