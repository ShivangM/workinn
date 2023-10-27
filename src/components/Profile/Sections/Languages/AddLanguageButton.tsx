'use client';
import useProfileStore from '@/store/profileStore';

const AddLanguageButton = () => {
  const [toggleAddLanguageModal] = useProfileStore((state) => [
    state.toggleAddLanguageModal,
  ]);
  return (
    <button className="btn" onClick={() => toggleAddLanguageModal(null)}>
      Add Language
    </button>
  );
};

export default AddLanguageButton;
