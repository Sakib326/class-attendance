import React, { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaChartBar,
  FaUserCheck,
  FaUserTimes,
  FaUserMinus,
  FaDownload,
} from "react-icons/fa";
import {
  MdSchool,
  MdClass,
  MdPerson,
  MdAssignmentInd,
  MdBarChart,
} from "react-icons/md";

const ViewAttendance = () => {
  // Sample data for demonstration
  const initialAttendanceData = [
    {
      id: 1,
      studentName: "John Smith",
      rollNumber: "CS2023001",
      department: "Computer Science",
      course: "Data Structures",
      attendance: [
        { date: "2024-01-15", status: "present" },
        { date: "2024-01-16", status: "absent" },
        { date: "2024-01-17", status: "present" },
        { date: "2024-01-18", status: "present" },
        { date: "2024-01-19", status: "late" },
        { date: "2024-01-22", status: "present" },
        { date: "2024-01-23", status: "absent" },
        { date: "2024-01-24", status: "present" },
      ],
    },
    {
      id: 2,
      studentName: "Emma Johnson",
      rollNumber: "CS2023002",
      department: "Computer Science",
      course: "Data Structures",
      attendance: [
        { date: "2024-01-15", status: "present" },
        { date: "2024-01-16", status: "present" },
        { date: "2024-01-17", status: "present" },
        { date: "2024-01-18", status: "present" },
        { date: "2024-01-19", status: "present" },
        { date: "2024-01-22", status: "late" },
        { date: "2024-01-23", status: "present" },
        { date: "2024-01-24", status: "present" },
      ],
    },
    {
      id: 3,
      studentName: "Michael Brown",
      rollNumber: "PHY2023001",
      department: "Physics",
      course: "Quantum Mechanics",
      attendance: [
        { date: "2024-01-15", status: "absent" },
        { date: "2024-01-16", status: "present" },
        { date: "2024-01-17", status: "absent" },
        { date: "2024-01-18", status: "present" },
        { date: "2024-01-19", status: "absent" },
        { date: "2024-01-22", status: "present" },
        { date: "2024-01-23", status: "absent" },
        { date: "2024-01-24", status: "present" },
      ],
    },
    {
      id: 4,
      studentName: "Sarah Davis",
      rollNumber: "MATH2023001",
      department: "Mathematics",
      course: "Calculus I",
      attendance: [
        { date: "2024-01-15", status: "present" },
        { date: "2024-01-16", status: "present" },
        { date: "2024-01-17", status: "late" },
        { date: "2024-01-18", status: "present" },
        { date: "2024-01-19", status: "present" },
        { date: "2024-01-22", status: "present" },
        { date: "2024-01-23", status: "present" },
        { date: "2024-01-24", status: "late" },
      ],
    },
  ];

  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [filters, setFilters] = useState({
    department: "All",
    course: "All",
    startDate: "2024-01-15",
    endDate: "2024-01-24",
    searchTerm: "",
  });

  // Available options
  const departmentOptions = [
    "All",
    "Computer Science",
    "Mathematics",
    "Physics",
    "Engineering",
    "Chemistry",
  ];
  const courseOptions = [
    "All",
    "Data Structures",
    "Quantum Mechanics",
    "Calculus I",
    "Web Development",
    "Classical Physics",
  ];

  // Calculate attendance percentage
  const calculateAttendancePercentage = (attendanceRecords: any) => {
    const totalClasses = attendanceRecords.length;
    //@ts-ignore
    const presentClasses = attendanceRecords.filter(
      (record: any) => record.status === "present" || record.status === "late"
    ).length;
    return totalClasses > 0
      ? Math.round((presentClasses / totalClasses) * 100)
      : 0;
  };

  // Filter data based on filters
  const filteredData = attendanceData.filter((student) => {
    const matchesDepartment =
      filters.department === "All" || student.department === filters.department;
    const matchesCourse =
      filters.course === "All" || student.course === filters.course;
    const matchesSearch =
      filters.searchTerm === "" ||
      student.studentName
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase()) ||
      student.rollNumber
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

    return matchesDepartment && matchesCourse && matchesSearch;
  });

  // Handle filter changes
  //@ts-ignore
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Get status icon and color
  //@ts-ignore
  const getStatusInfo = (status) => {
    switch (status) {
      case "present":
        return {
          icon: FaUserCheck,
          color: "text-green-600 bg-green-100",
          text: "Present",
        };
      case "absent":
        return {
          icon: FaUserTimes,
          color: "text-red-600 bg-red-100",
          text: "Absent",
        };
      case "late":
        return {
          icon: FaUserMinus,
          color: "text-yellow-600 bg-yellow-100",
          text: "Late",
        };
      default:
        return {
          icon: FaUserMinus,
          color: "text-gray-600 bg-gray-100",
          text: "Unknown",
        };
    }
  };

  // Get percentage color
  const getPercentageColor = (percentage: any) => {
    if (percentage >= 75) return "text-green-600 bg-green-100";
    if (percentage >= 50) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvHeaders = [
      "Student Name",
      "Roll Number",
      "Department",
      "Course",
      "Attendance %",
      "Total Classes",
      "Present",
      "Absent",
      "Late",
    ];
    const csvData = filteredData.map((student) => {
      const totalClasses = student.attendance.length;
      const present = student.attendance.filter(
        (a) => a.status === "present"
      ).length;
      const absent = student.attendance.filter(
        (a) => a.status === "absent"
      ).length;
      const late = student.attendance.filter((a) => a.status === "late").length;
      const percentage = calculateAttendancePercentage(student.attendance);

      return [
        student.studentName,
        student.rollNumber,
        student.department,
        student.course,
        `${percentage}%`,
        totalClasses,
        present,
        absent,
        late,
      ];
    });

    const csvContent = [
      csvHeaders.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-report-${filters.startDate}-to-${filters.endDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const setQuickDateRange = (days: any) => {
    const end = new Date().toISOString().split("T")[0];
    const start = new Date();
    start.setDate(start.getDate() - days);
    handleFilterChange("endDate", end);
    handleFilterChange("startDate", start.toISOString().split("T")[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            View Attendance
          </h1>
          <p className="text-gray-600">
            Monitor and analyze student attendance records
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MdSchool className="inline mr-1" />
                Department
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.department}
                onChange={(e) =>
                  handleFilterChange("department", e.target.value)
                }
              >
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MdClass className="inline mr-1" />
                Course
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.course}
                onChange={(e) => handleFilterChange("course", e.target.value)}
              >
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range with Quick Selection */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" />
                Date Range
              </label>
              <div className="flex flex-col space-y-2">
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.startDate}
                    onChange={(e) =>
                      handleFilterChange("startDate", e.target.value)
                    }
                  />
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.endDate}
                    onChange={(e) =>
                      handleFilterChange("endDate", e.target.value)
                    }
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setQuickDateRange(7)}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
                  >
                    Last 7 Days
                  </button>
                  <button
                    onClick={() => setQuickDateRange(30)}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
                  >
                    Last 30 Days
                  </button>
                  <button
                    onClick={() => {
                      const today = new Date();
                      const firstDay = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        1
                      );
                      handleFilterChange(
                        "startDate",
                        firstDay.toISOString().split("T")[0]
                      );
                      handleFilterChange(
                        "endDate",
                        today.toISOString().split("T")[0]
                      );
                    }}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
                  >
                    This Month
                  </button>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaSearch className="inline mr-1" />
                Search Student
              </label>
              <input
                type="text"
                placeholder="Name or Roll Number..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.searchTerm}
                onChange={(e) =>
                  handleFilterChange("searchTerm", e.target.value)
                }
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Showing {filteredData.length} of {attendanceData.length} students
            </div>
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              <FaDownload />
              Export CSV
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <MdPerson className="text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredData.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FaUserCheck className="text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Attendance
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredData.length > 0
                    ? Math.round(
                        filteredData.reduce(
                          (acc, student) =>
                            acc +
                            calculateAttendancePercentage(student.attendance),
                          0
                        ) / filteredData.length
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <MdBarChart className="text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Classes
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredData.length > 0
                    ? filteredData[0].attendance.length
                    : 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                <FaChartBar className="text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Date Range</p>
                <p className="text-lg font-bold text-gray-900">
                  {filters.startDate} to {filters.endDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department & Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Daily Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Summary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((student) => {
                  const attendancePercentage = calculateAttendancePercentage(
                    student.attendance
                  );
                  const presentCount = student.attendance.filter(
                    (a) => a.status === "present"
                  ).length;
                  const absentCount = student.attendance.filter(
                    (a) => a.status === "absent"
                  ).length;
                  const lateCount = student.attendance.filter(
                    (a) => a.status === "late"
                  ).length;

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {student.studentName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <MdAssignmentInd className="text-gray-400" />
                            {student.rollNumber}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center gap-1 mb-1">
                            <MdSchool className="text-gray-400" />
                            {student.department}
                          </div>
                          <div className="flex items-center gap-1">
                            <MdClass className="text-gray-400" />
                            {student.course}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {student.attendance.map((record, index) => {
                            const StatusIcon = getStatusInfo(
                              record.status
                            ).icon;
                            return (
                              <span
                                key={index}
                                className={`inline-flex items-center p-1 rounded text-xs ${
                                  getStatusInfo(record.status).color
                                }`}
                                title={`${record.date}: ${
                                  getStatusInfo(record.status).text
                                }`}
                              >
                                <StatusIcon className="text-xs" />
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPercentageColor(
                            attendancePercentage
                          )}`}
                        >
                          <FaChartBar className="mr-1" />
                          {attendancePercentage}%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center gap-2">
                            <FaUserCheck className="text-green-500" />
                            <span>Present: {presentCount}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaUserTimes className="text-red-500" />
                            <span>Absent: {absentCount}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaUserMinus className="text-yellow-500" />
                            <span>Late: {lateCount}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No attendance records found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;
