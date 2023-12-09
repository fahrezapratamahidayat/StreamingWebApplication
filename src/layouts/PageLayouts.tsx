export default function PageLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col lg:ml-[19rem]">
        <div className="mt-[5rem]">
            {children}
        </div>
      </div>
    </>
  );
}
