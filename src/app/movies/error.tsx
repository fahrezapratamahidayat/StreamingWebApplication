"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  const router = useRouter()

  function handleBack(){
    router.back()
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          501
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5 text-white" onClick={handleBack}>
          Go Back
        </button>
      </div>
    </>
  );
}
