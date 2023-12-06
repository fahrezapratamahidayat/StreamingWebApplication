type ListStaringProps = {
  nameCast: any;
  jobCast: any;
};
export default function ListStaring({ nameCast, jobCast }: ListStaringProps) {
  return (
    <>
      {/* <div className="mt-[3.12rem] ml-[3.5rem] flex">
        <div className="flex">
          <h2 className="text-white font-semibold text-[1rem]">Staring</h2>
          <div className="flex flex-col ml-[5.6rem]">

          </div>
        </div>
      </div> */}
      <div className="">
        <p className="text-white text-base font-semibold">{nameCast}</p>
        <p className="text-gray-400 text-[0.85rem] font-semibold">{jobCast}</p>
      </div>
    </>
  );
}
