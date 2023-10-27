export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-32 px-6">{children}</div>
    </div>
  );
}
