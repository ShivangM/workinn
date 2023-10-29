import DeleteServiceModal from '@/components/Dashboard/Modals/DeleteServiceModal';
import ToggelServiceStatusModal from '@/components/Dashboard/Modals/ToggelServiceStatusModal';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">
      <DeleteServiceModal />
      <ToggelServiceStatusModal />
      <div className="container mx-auto py-32 px-6">{children}</div>
    </div>
  );
}
