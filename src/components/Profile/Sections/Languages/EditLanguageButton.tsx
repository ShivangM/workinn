'use client';

import { Language } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { BiSolidEdit } from 'react-icons/bi';

type Props = {
  language: Language;
};

const EditLanguageButton = ({ language }: Props) => {
  const [toggleAddLanguageModal] = useProfileStore((state) => [
    state.toggleAddLanguageModal,
  ]);
  return (
    <button onClick={() => toggleAddLanguageModal(language)}>
      <BiSolidEdit className="text-lg" />
    </button>
  );
};

export default EditLanguageButton;
