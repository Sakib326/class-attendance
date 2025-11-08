import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";

// Define the props interface
interface PromoProps {
  title: string;
  data?: any;
  link?: string;
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  baseColor?: string;
  highlightColor?: string;
}

const RegisteredStudents: React.FC<PromoProps> = ({
  title,
  link,
  className,
  children,
  loading = false,
  baseColor = "#312f5c",
  highlightColor = "#504d88",
  data,
}) => {
  if (loading) {
    return (
      <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        <section
          className={`w-full p-4 border border-gray-200 rounded-lg shadow sm:p-8 bg-white ${
            className ? className : ""
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <Skeleton width={300} height={15} />
            <Skeleton width={100} height={15} />
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              <li className="py-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Skeleton width={30} height={30} circle={true} />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <Skeleton width={140} height={15} />
                    <Skeleton width={180} height={10} />
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-black pr-10">
                    <Skeleton width={180} height={10} />
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-black">
                    <Skeleton width={80} height={10} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </SkeletonTheme>
    );
  }

  return (
    <div
      className={`w-full p-4 border border-gray-200 rounded-lg shadow sm:p-8 bg-white ${
        className ? className : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-black">{title}</h5>
        {link && (
          <Link
            to={link}
            className="text-sm font-medium text-black hover:underline"
          >
            View all
          </Link>
        )}
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-bold text-black truncate">
                  PERSONAL INFORMATION
                </p>
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-bold text-black truncate">
                  CONTACT INFORMATION
                </p>
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-bold text-black truncate">
                  ACADEMIC INFORMATION
                </p>
              </div>
            </div>
          </li>

          {data &&
            data?.data?.map((item: any, index: number) => {
              return (
                <li className="py-3 sm:py-4" key={index}>
                  <div className="flex items-center">
                    {/* Personal Information */}
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-black">
                        Full Name:
                      </p>
                      <p className="text-sm text-gray-700">
                        {item?.name || "N/A"}
                      </p>
                    </div>

                    {/* Contact Information */}
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-black">
                        Phone: {item?.mobile || "N/A"}
                      </p>
                      <p className="text-sm text-gray-700">
                        Email: {item?.email || "N/A"}
                      </p>
                      <p className="text-sm text-gray-700">
                        Address: {item?.address || "N/A"}
                      </p>
                    </div>

                    {/* Academic Information */}
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-black">
                        School: {item?.schoolName || "N/A"}
                      </p>
                      <p className="text-sm text-gray-700">
                        Enrolled: {item?.enrollmentDate || "N/A"}
                      </p>
                      <p className="text-sm text-gray-700">
                        Graduation: {item?.graduationDate || "N/A"}
                      </p>
                      <p className="text-sm text-gray-700">
                        Type: {item?.studyType || "N/A"}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        {children}
      </div>
    </div>
  );
};

export default RegisteredStudents;
