import MainLayouts from "@/components/layouts/MainLayouts";
import SkeletonCard from "@/components/skeleton/SkeletonCard";

export default function Loading() {
  return (
    <>
      <MainLayouts>
        <div className=" items-center justify-center flex mt-[5rem] mx-5">
          <div className="flex flex-col">
            <div className="lg:flex flex-wrap grid md:flex grid-cols-3 lg:gap-5 md:gap-1 min-[400px]:flex max-[767px]:flex min-[400px]:gap-1 max-[767px]:gap-1 min-[400px]:ml-4 lg:ml-0">
              <SkeletonCard dummyArray={10} />
            </div>
          </div>
        </div>
      </MainLayouts>
    </>
  );
}
