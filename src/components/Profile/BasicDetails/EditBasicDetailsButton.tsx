'use client';
import { BasicDetails } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { BiSolidEdit } from 'react-icons/bi';

type Props = {
  basicDetails: BasicDetails;
};

const EditBasicDetailsButton = ({ basicDetails }: Props) => {
  const [toggleEditBasicDetailsModal] = useProfileStore((state) => [
    state.toggleEditBasicDetailsModal,
  ]);

  return (
    <BiSolidEdit
      onClick={() => toggleEditBasicDetailsModal(basicDetails)}
      className="text-xl absolute right-4 top-4 font-semibold text-gray-700 cursor-pointer"
    />
  );
};

export default EditBasicDetailsButton;
