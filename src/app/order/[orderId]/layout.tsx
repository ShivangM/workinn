import CancelOrderModal from '@/components/Order/Modals/CancelOrderModal';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">
      <CancelOrderModal />
      <div className="container mx-auto py-32 px-6">{children}</div>
    </div>
  );
}
