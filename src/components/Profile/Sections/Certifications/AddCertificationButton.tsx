'use client';
import useProfileStore from '@/store/profileStore';

const AddCertificationButton = () => {
  const [toggleAddCertificationModal] = useProfileStore((state) => [
    state.toggleAddCertificationModal,
  ]);
  return (
    <button className="btn" onClick={() => toggleAddCertificationModal(null)}>
      Add Certification
    </button>
  );
};

export default AddCertificationButton;
