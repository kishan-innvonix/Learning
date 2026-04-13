import Link from "next/link";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              🚀 MyApp
            </h1>

            {/* Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/about"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>

              <Link
                href="/users"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Users
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </>
  );
}
