import NavbarFixed from "@/components/navbar/NavbarFixed";

export default function MainLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen bg-black 90-zoom:px-[2rem] 80-zoom:px-[3rem] 75-zoom:px-[4rem] 67-zoom:px-[7rem] 50-zoom:px-[32rem] 33-zoom:px-[82rem] 25-zoom:px-[134rem]">
        <div className="flex">{children}</div>
      </div>
    </>
  );
}
