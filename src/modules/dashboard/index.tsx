import { FiChevronRight } from "react-icons/fi";
import { FaCodeBranch, FaRegNewspaper, FaUserGraduate } from "react-icons/fa";
import {
  useGetAdminDashboardStatsQuery,
  useGetProfileQuery,
} from "@/appstore/auth/auth_api";
import SummaryCard from "./components/summary";

import RegisteredStudents from "./components/registered-students";
import { useGetAllStudentQuery } from "@/appstore/student/api";
import { useState } from "react";
import RegisterStudent from "./components/regesterStudent";
type FiltersType = {
  keyword?: string;
  status?: { id: number }[];
  roles?: { id: number }[];
  position?: string;
  [key: string]: any;
};

export const Dashboard = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    status: undefined,
    position: undefined,
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortInfo, setSortInfo] = useState([
    {
      orderBy: "createdAt",
      order: "DESC",
    },
  ]);
  const queryParams = {
    page,
    limit,
    filters: {
      roles: [{ id: 2 }],
    } as FiltersType, // <-- Cast to FiltersType
    sort: sortInfo,
  };
  const { data: profileData } = useGetProfileQuery({});
  const { data: summary } = useGetAdminDashboardStatsQuery({});
  const { data: useStudent, isLoading: studentLoading } =
    useGetAllStudentQuery(queryParams);
  console.log("useStudent", useStudent);

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
      </div>
      <div className="p-[30px] bg-[#F6F7FA] rounded-[10px] mt-6">
        <h1 className="text-primary">Hi {profileData?.name}!</h1>
        <h4 className="font-normal leading-[36px]">
          Welcome to Attendify dashboard!
        </h4>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mt-6">
        <SummaryCard
          className="bg-[#FFA73F]"
          title="Total Registered Students"
          data={{ count: summary?.students?.total || "0" }}
          Icon={FaUserGraduate}
        >
          <p className="text-white">
            Active : <strong>{summary?.students?.totalActive || "0"}</strong>
            <br />
            Inactive :<strong>{summary?.students?.totalInactive || "0"}</strong>
          </p>
        </SummaryCard>

        <SummaryCard
          className="bg-[#009EF0]"
          title="Total Question Sets"
          data={{ count: summary?.questionSets?.total || "0" }}
          Icon={FaRegNewspaper}
        >
          <p className="text-white">
            Active :{" "}
            <strong>{summary?.questionSets?.totalActive || "0"}</strong>
            <br />
            Inactive :{" "}
            <strong>{summary?.questionSets?.totalInactive || "0"}</strong>
            <br />
          </p>
        </SummaryCard>

        <SummaryCard
          className="bg-[#1321a0]"
          title="Number of Questions"
          data={{ count: summary?.questions?.total || "0" }}
          Icon={FaRegNewspaper}
        >
          <p className="text-white">
            Active : <strong>{summary?.questions?.totalActive || "0"}</strong>
            <br />
            Inactive :{" "}
            <strong>{summary?.questions?.totalInactive || "0"}</strong>
            <br />
          </p>
        </SummaryCard>

        <SummaryCard
          className="bg-[#7460EE]"
          title="Total Departments"
          data={{ count: summary?.departments?.total || "0" }}
          Icon={FaCodeBranch}
        >
          <p className="text-white">
            Active : <strong>{summary?.departments?.totalActive || "0"}</strong>
            <br />
            Inactive :{" "}
            <strong>{summary?.departments?.totalInactive || "0"}</strong>
            <br />
          </p>
        </SummaryCard>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">
          Questions by Question Set
        </h3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {summary?.questionsBySet?.map((questionSet: any) => (
            <SummaryCard
              key={questionSet.questionSetId}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
              title={questionSet.questionSetName}
              data={{ count: questionSet.totalQuestions }}
              Icon={FaRegNewspaper}
            >
              <p className="text-white text-sm">
                Active: <strong>{questionSet.activeQuestions}</strong>
                <br />
                Inactive: <strong>{questionSet.inactiveQuestions}</strong>
              </p>
            </SummaryCard>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <RegisteredStudents
          className="bg-cyan-700"
          title="Recently Registered Students"
          link="/students/list"
          data={useStudent}
          loading={studentLoading}
        />
      </div>
    </div>
  );
};
export default Dashboard;
