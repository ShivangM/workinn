'use client';

import { Language } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { AiOutlineDelete } from 'react-icons/ai';

type Props = {
  language: Language;
};

const DeleteLanguageButton = ({ language }: Props) => {
  const [toggleDeleteLanguageModal] = useProfileStore((state) => [
    state.toggleDeleteLanguageModal,
  ]);
  return (
    <button onClick={() => toggleDeleteLanguageModal(language)}>
      <AiOutlineDelete className="text-lg text-red-500" />
    </button>
  );
};

export default DeleteLanguageButton;
