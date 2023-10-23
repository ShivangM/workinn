'use client';
import useProfileStore from '@/store/profile';

const AddSkillButton = () => {
  const [toggleAddSkillModal] = useProfileStore((state) => [
    state.toggleAddSkillModal,
  ]);
  return (
    <button className="btn" onClick={() => toggleAddSkillModal(null)}>
      Add Skill
    </button>
  );
};

export default AddSkillButton;
