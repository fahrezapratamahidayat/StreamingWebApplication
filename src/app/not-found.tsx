import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen w-full flex-col">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                404
            </h1>
            <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <Link href="/"><button className="mt-5 text-white">Go Home</button></Link>
        </div>
    );
}