import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Define the props interface
interface RegisterStudent {
  title: string;
  data?: any;
  link?: string;
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  baseColor?: string;
  highlightColor?: string;
}

const RegisterStudent: React.FC<RegisterStudent> = ({
  title,
  data = [],
  link,
  className,
  children,
  loading = false,
  baseColor = "#312f5c",
  highlightColor = "#504d88",
}) => {
  if (loading) {
    return (
      <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        <section
          className={`w-full p-4  border border-gray-200 rounded-lg shadow sm:p-8 ${
            className ? className : "dark:bg-gray-800 dark:border-gray-700"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <Skeleton width={300} height={15} />
            <Skeleton width={100} height={15} />
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li className="py-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Skeleton width={30} height={30} circle={true} />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <Skeleton width={140} height={15} />
                    <Skeleton width={180} height={10} />
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white pr-10">
                    <Skeleton width={180} height={10} />
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
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
      className={`w-full p-4 border border-gray-200 rounded-lg shadow sm:p-8 ${
        className ? className : "dark:bg-gray-800 dark:border-gray-700"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {title}
        </h5>
        {link && (
          <Link
            to={link}
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </Link>
        )}
      </div>
      <div className="flow-root">
        {data && data.length > 0 ? (
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {data &&
              data.map((item: any, index: number) => {
                return (
                  <li className="py-3 sm:py-4" key={index}>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          crossOrigin="anonymous"
                          src={
                            item?.avatar && item?.avatar !== ""
                              ? item?.avatar
                              : "/images/misc/avatar-lg.png"
                          }
                          alt="advisor"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {item?.firstName} {item?.lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {item?.student.schoolEmail}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          School Name: {item?.student?.schoolName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Student Id: {item?.student?.studentId}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {item?.isVerified}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        ) : (
          <div className="flex text-grey justify-center mt-[100px]">
            No Data Available{" "}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default RegisterStudent;
