import PageLayouts from "@/components/layouts/PageLayouts";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import SkeletonSidebar from "@/components/skeleton/SkeletonSidebar";

export default function Loading() {
  return (
    <>
    <SkeletonSidebar />
      <PageLayouts>
        <SkeletonCard dummyArray={20} />
      </PageLayouts>
    </>
  );
}
