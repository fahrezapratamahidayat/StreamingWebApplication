import PageLayout from "@/components/layouts/PageLayout";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import Sidebar from "@/components/sidebar/Sidebar";
import { animeSidebarItem } from "@/utils/data";

export const metadata = {
  title: "Animes Genre",
  description: "Animes Genre",
};

export default async function GenreAnimesPage({ searchParams }: any) {
  const genre = searchParams.name;
  const id = searchParams.id;
  return (
    <>
      <NavbarFixed title={genre} />
      <Sidebar items={animeSidebarItem} params={searchParams.name} />
      <PageLayout>
        <div className="flex flex-col items-center w-full min-h-screen py-12 space-y-4 text-center md:py-24">
          <div className="space-y-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-14 h-14 m-auto text-gray-400"
            >
              <rect x="2" y="6" width="20" height="8" rx="1"></rect>
              <path d="M17 14v7"></path>
              <path d="M7 14v7"></path>
              <path d="M17 3v3"></path>
              <path d="M7 3v3"></path>
              <path d="M10 14 2.3 6.3"></path>
              <path d="m14 6 7.7 7.7"></path>
              <path d="m8 6 8 8"></path>
            </svg>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl text-white">
              Under Construction
            </h1>
            <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-gray-400">
              We are working on something amazing. Stay tuned for the amazing
              launch.
            </p>
          </div>
          {/* <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
                placeholder="Enter your email"
                type="email"
              />
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div> */}
        </div>
      </PageLayout>
    </>
  );
}
