import {
  BasicDetails,
  Certification,
  Education,
  Language,
  Skill,
} from '@/interfaces/user';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ProfileState {
  editBasicDetailsModalOpen: boolean;
  basicDetails: BasicDetails | null;
  toggleEditBasicDetailsModal: (basicDetails: BasicDetails | null) => void;

  language: Language | null;

  addLanguageModalOpen: boolean;
  toggleAddLanguageModal: (language: Language | null) => void;

  deleteLanguageModalOpen: boolean;
  toggleDeleteLanguageModal: (language: Language | null) => void;

  certification: Certification | null;

  addCertificationModalOpen: boolean;
  toggleAddCertificationModal: (certification: Certification | null) => void;

  deleteCertificationModalOpen: boolean;
  toggleDeleteCertificationModal: (certification: Certification | null) => void;

  skill: Skill | null;

  addSkillModalOpen: boolean;
  toggleAddSkillModal: (skill: Skill | null) => void;

  deleteSkillModalOpen: boolean;
  toggleDeleteSkillModal: (skill: Skill | null) => void;

  education: Education | null;

  addEducationModalOpen: boolean;
  toggleAddEducationModal: (education: Education | null) => void;

  deleteEducationModalOpen: boolean;
  toggleDeleteEducationModal: (education: Education | null) => void;
}

const initialState = {
  basicDetails: null,
  editBasicDetailsModalOpen: false,

  language: null,
  addLanguageModalOpen: false,
  deleteLanguageModalOpen: false,

  certification: null,
  addCertificationModalOpen: false,
  deleteCertificationModalOpen: false,

  skill: null,
  addSkillModalOpen: false,
  deleteSkillModalOpen: false,

  education: null,
  addEducationModalOpen: false,
  deleteEducationModalOpen: false,
};

const useProfileStore = create<ProfileState>()(
  devtools((set) => ({
    ...initialState,
    toggleEditBasicDetailsModal: (basicDetails) => {
      set((state) => ({
        editBasicDetailsModalOpen: !state.editBasicDetailsModalOpen,
        basicDetails,
      }));
    },

    toggleAddLanguageModal: (language) => {
      set((state) => ({
        addLanguageModalOpen: !state.addLanguageModalOpen,
        language,
      }));
    },

    toggleDeleteLanguageModal: (language) => {
      set((state) => ({
        deleteLanguageModalOpen: !state.deleteLanguageModalOpen,
        language,
      }));
    },

    toggleAddCertificationModal: (certification) => {
      set((state) => ({
        addCertificationModalOpen: !state.addCertificationModalOpen,
        certification,
      }));
    },

    toggleDeleteCertificationModal: (certification) => {
      set((state) => ({
        deleteCertificationModalOpen: !state.deleteCertificationModalOpen,
        certification,
      }));
    },

    toggleAddSkillModal: (skill) => {
      set((state) => ({
        addSkillModalOpen: !state.addSkillModalOpen,
        skill,
      }));
    },

    toggleDeleteSkillModal: (skill) => {
      set((state) => ({
        deleteSkillModalOpen: !state.deleteSkillModalOpen,
        skill,
      }));
    },

    toggleAddEducationModal: (education) => {
      set((state) => ({
        addEducationModalOpen: !state.addEducationModalOpen,
        education,
      }));
    },

    toggleDeleteEducationModal: (education) => {
      set((state) => ({
        deleteEducationModalOpen: !state.deleteEducationModalOpen,
        education,
      }));
    },
  }))
);

export default useProfileStore;
