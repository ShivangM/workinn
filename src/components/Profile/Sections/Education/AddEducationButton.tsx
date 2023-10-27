'use client';
import useProfileStore from '@/store/profileStore';

const AddEducationButton = () => {
  const [toggleAddEducationModal] = useProfileStore((state) => [
    state.toggleAddEducationModal,
  ]);

  return (
    <button className="btn" onClick={() => toggleAddEducationModal(null)}>
      Add Education
    </button>
  );
};

export default AddEducationButton;
