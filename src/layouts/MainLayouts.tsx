import NavbarFixed from "@/components/navbar/NavbarFixed";

export default function MainLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen bg-black ">
        <div className="flex">
          {children}</div>
      </div>
    </>
  );
}
