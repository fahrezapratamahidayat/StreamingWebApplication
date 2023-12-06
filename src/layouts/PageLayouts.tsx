export default function PageLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col ml-[19rem] w-auto h-auto">
        <div className="mt-[5rem]">
            {children}
        </div>
      </div>
    </>
  );
}
