import Link from "next/link";
import { getAllUsers } from "../lib/users";
import { notFound } from "next/navigation";

export const generateMetadata = async () => {
  return {
    title: "Users Directory - SSR",
    description: "A server-side rendered directory of all our users.",
  };
};

export default async function SSRPage() {
  const data = await getAllUsers();
  if (!data || !data.users) return notFound();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Users Directory
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            A complete server-side rendered list of all active members.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.users.map((user: any) => (
            <Link 
              key={user.id} 
              href={`/users/${user.id}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:-translate-y-1"
            >
              <div className="h-24 bg-gradient-to-r from-blue-500/80 to-indigo-600/80 group-hover:from-blue-600 group-hover:to-indigo-700 transition-colors"></div>
              <div className="px-6 pb-6 relative">
                <div className="flex justify-center -mt-12 mb-4">
                  <img 
                    src={user.image || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`} 
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 object-cover bg-white shadow-sm"
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm font-medium text-blue-500 mt-1 mb-3">
                    {user.company?.title || user.role || 'Member'}
                  </p>
                  
                  <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
