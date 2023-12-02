const ListDirector = ({
  nameDirector,
  jobDirector,
}: {
  nameDirector: any;
  jobDirector: any;
}) => {
  return (
    <>
      {/* <div className="mt-[3.12rem] ml-[3.5rem] flex">
        <div className="flex">
          <div className="flex flex-col ml-[5.18rem]">
            <p className="text-white text-[1rem] font-semibold">{nameDirector}</p>
            <p className="text-white text-[0.85rem] font-semibold">
              {jobDirector}
            </p>
          </div>
        </div>
      </div> */}
      <div className="">
        <p className="text-white text-[1rem] font-semibold">{nameDirector}</p>
        <p className="text-gray-400 text-[0.85rem] font-semibold">{jobDirector}</p>
      </div>
    </>
  );
};
export default ListDirector;
