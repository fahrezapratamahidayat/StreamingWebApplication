export default function AuthLayouts({
  children,
  title
}: {
  children: React.ReactNode;
  title: string
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-md w-full space-y-8 px-2 lg:px-0">
          <h2 className="mt-5 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
            {title}
          </h2>
        {children}
      </div>
    </div>
  );
}
