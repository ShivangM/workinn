import AddCertificationModal from '@/components/Profile/Modals/Profile/Certification/AddCertificationModal';
import DeleteCertificationModal from '@/components/Profile/Modals/Profile/Certification/DeleteCertificationModal';
import EditBasicDetailsModal from '@/components/Profile/Modals/Profile/EditBasicDetailsModal';
import AddEducationModal from '@/components/Profile/Modals/Profile/Education/AddEducationModal';
import DeleteEducationModal from '@/components/Profile/Modals/Profile/Education/DeleteEducationModal';
import AddLanguageModal from '@/components/Profile/Modals/Profile/Language/AddLanguageModal';
import DeleteLanguageModal from '@/components/Profile/Modals/Profile/Language/DeleteLanguageModal';
import AddSkillModal from '@/components/Profile/Modals/Profile/Skill/AddSkillModal';
import DeleteSkillModal from '@/components/Profile/Modals/Profile/Skill/DeleteSkillModal';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">
      <EditBasicDetailsModal />

      {/* Language  */}
      <AddLanguageModal />
      <DeleteLanguageModal />

      {/* Education  */}
      <AddEducationModal />
      <DeleteEducationModal />

      {/* Skills  */}
      <AddSkillModal />
      <DeleteSkillModal />

      {/* Certifications  */}
      <AddCertificationModal />
      <DeleteCertificationModal />

      <div className="container mx-auto py-32 px-6">{children}</div>
    </div>
  );
}
