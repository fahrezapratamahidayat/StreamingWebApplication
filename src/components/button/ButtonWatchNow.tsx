"use client";
import { useRouter } from "next/navigation";

export default function ButtonWatchNow({ to }: { to: string }) {

    const router = useRouter();
    const handleWatchNow = () => {
        router.push(to);
      };
  return (
    <>
      <button
        type="button"
        onClick={handleWatchNow}
        className="text-black bg-white hover:bg-white/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-semibold rounded-lg text-sm lg:px-5 lg:py-2.5  p-2 px-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
      >
        <svg
          className="me-2"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="24"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M16.5775 8.38513L2.82801 0.25655C1.71087 -0.40358 0 0.23702 0 1.86977V18.123C0 19.5878 1.58978 20.4706 2.82801 19.7362L16.5775 11.6116C17.804 10.8889 17.8079 9.10775 16.5775 8.38513Z"
            fill="black"
          />
        </svg>
        Watch Now
      </button>
    </>
  );
}
