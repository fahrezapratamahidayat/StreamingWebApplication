export default function SkeletonCardSearch() {
  return (
    <>
      <div className={`animate-pulse `}>
        <div className="mt-2 w-[130px] h-5 bg-slate-800"></div>
        <div className="lg:flex flex-wrap grid md:flex grid-cols-3 lg:gap-5 md:gap-1 mt-[18px] min-[400px]:flex max-[767px]:flex min-[400px]:gap-1 max-[767px]:gap-1 min-[400px]:ml-4 lg:ml-0">
          {Array.from({ length: 20 }).map((movie: any, index: number) => (
            <div
              className="flex flex-col justify-center items-start gap-[5px]"
              key={index}
            >
              <div className="rounded-xl w-[122px] h-[170px] bg-slate-800"></div>
              <p className="text-white text-sm bg-slate-800 w-full "></p>
              <div className="flex items-center justify-between w-full ">
                <p
                  className={` px-[2px] py-[1px] bg-slate-800 text-sm w-full h-2`}
                ></p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p
                  className={` px-[2px] py-[1px] bg-slate-800 text-sm w-10 h-2`}
                ></p>
                <p
                  className={` px-[2px] py-[1px] bg-slate-800 text-sm w-10 h-2`}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
