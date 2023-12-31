import PageLayouts from "@/components/layouts/PageLayouts";

export default function Loading() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  return (
    <>
      <PageLayouts>
        <div className={`animate-pulse `}>
        <div className="w-[150px] h-5 bg-slate-800"></div>
          <div className="flex flex-wrap gap-[26px] mt-[18px]">
            {data.map((movie: any) => (
              <div
                className="flex flex-col justify-center items-start gap-[5px]"
                key={movie.id}
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
      </PageLayouts>
    </>
  );
}
