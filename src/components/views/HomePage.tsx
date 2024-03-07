import NavbarFixed from "../navbar/NavbarFixed";
import { WavyBackground } from "../ui/wavy-background";

export default function HomePageView() {
  return (
    <>
      <NavbarFixed />
      <WavyBackground>
        <div className="">
          <div className="flex items-center justify-center">
            <h1
              className={`font-bold lg:text-7xl text-5xl text-white tracking-widest relative z-10`}
            >
              Santai Movies
            </h1>
          </div>
        </div>
      </WavyBackground>
    </>
  );
}
