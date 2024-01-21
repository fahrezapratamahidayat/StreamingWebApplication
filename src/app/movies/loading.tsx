
import PageLayout from "@/components/layouts/PageLayout";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import SkeletonSidebar from "@/components/skeleton/SkeletonSidebar";

export default function Loading() {
  return (
    <>
    <SkeletonSidebar />
      <PageLayout>
        <SkeletonCard dummyArray={20} />
      </PageLayout>
    </>
  );
}
