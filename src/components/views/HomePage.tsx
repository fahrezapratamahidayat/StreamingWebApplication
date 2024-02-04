import NavbarFixed from "../navbar/NavbarFixed";

export default function HomePageView() {

  return (
    <>
    <NavbarFixed />
      <div className="min-w-full min-h-screen ">
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
          <h1
            className={`font-bold lg:text-7xl text-5xl text-white tracking-widest relative z-10`}
          >
            Santai{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
              Movies
            </span>
          </h1>
        </div>
      </div>
    </>
  );
}
