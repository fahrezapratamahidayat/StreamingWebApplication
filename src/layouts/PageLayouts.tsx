export default function PageLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col lg:ml-[19rem] pt-[5rem] lg:pt-0">
        <div className="mt-[5rem]">
            {children}
        </div>
      </div>
    </>
  );
}
