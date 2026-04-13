import { getUser } from "@/app/lib/users";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;
  const data = await getUser(id);

  if (!data) return { title: "User Not Found" };

  return {
    title: `${data.firstName} ${data.lastName} - Profile`,
    description: `Profile of ${data.firstName} ${data.lastName}`,
  };
};

const UserPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const data = await getUser(id);
  if (!data) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/users"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-6 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Users
        </Link>
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="relative px-6 pb-8">
            <div className="flex justify-center -mt-16 mb-4">
              <Image
                src={data.image}
                height={500}
                width={500}
                alt={`${data.firstName} ${data.lastName}`}
                className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 object-cover bg-white shadow-md relative z-10"
              />
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {data.firstName} {data.lastName}
              </h1>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                {data.company?.title || data.role || "User"}{" "}
                {data.company?.name ? `at ${data.company.name}` : ""}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-100 dark:border-gray-600">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-400 dark:text-gray-300 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-200">
                      {data.email || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-400 dark:text-gray-300 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-200">
                      {data.phone || "N/A"}
                    </span>
                  </div>
                  {data.address && (
                    <div className="flex items-start">
                      <svg
                        className="h-5 w-5 text-gray-400 dark:text-gray-300 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-200">
                        {data.address.address}
                        <br />
                        {data.address.city}, {data.address.state}{" "}
                        {data.address.postalCode}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-100 dark:border-gray-600">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Personal Details
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                      Age
                    </span>
                    <span className="text-gray-800 dark:text-gray-100 font-medium">
                      {data.age || "N/A"} years
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                      Gender
                    </span>
                    <span className="text-gray-800 dark:text-gray-100 font-medium capitalize">
                      {data.gender || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                      Birth Date
                    </span>
                    <span className="text-gray-800 dark:text-gray-100 font-medium">
                      {data.birthDate || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                      Blood Group
                    </span>
                    <span className="text-gray-800 dark:text-gray-100 font-medium">
                      {data.bloodGroup || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
