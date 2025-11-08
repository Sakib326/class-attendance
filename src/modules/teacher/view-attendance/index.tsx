import React, { useState } from "react";
import {
  BiSearch,
  BiDownload,
  BiCalendar,
  BiBook,
  BiUser,
  BiFilterAlt,
  BiChevronRight,
  BiTrendingUp,
  BiTrendingDown,
} from "react-icons/bi";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineClockCircle,
  AiOutlinePercentage,
  AiOutlineTeam,
  AiOutlineAlert,
  AiOutlineFile,
  AiOutlineEye,
} from "react-icons/ai";

const ViewAttendance = () => {
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-11-08");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table or cards

  // Sample courses data
  const courses = [
    { id: "all", name: "All Courses" },
    { id: "CS101", name: "CS101 - Introduction to Computer Science" },
    { id: "CS201", name: "CS201 - Data Structures & Algorithms" },
    { id: "CS301", name: "CS301 - Database Management Systems" },
    { id: "CS202", name: "CS202 - Web Development" },
  ];

  // Sample attendance data
  const [attendanceData] = useState([
    {
      id: 1,
      rollNo: "001",
      name: "Alice Johnson",
      email: "alice@university.edu",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      totalClasses: 30,
      present: 28,
      absent: 2,
      late: 0,
      attendancePercentage: 93.3,
      trend: "up",
    },
    {
      id: 2,
      rollNo: "002",
      name: "Bob Smith",
      email: "bob@university.edu",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      totalClasses: 30,
      present: 25,
      absent: 4,
      late: 1,
      attendancePercentage: 83.3,
      trend: "down",
    },
    {
      id: 3,
      rollNo: "003",
      name: "Carol Martinez",
      email: "carol@university.edu",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      totalClasses: 30,
      present: 29,
      absent: 0,
      late: 1,
      attendancePercentage: 96.7,
      trend: "up",
    },
    {
      id: 4,
      rollNo: "004",
      name: "David Chen",
      email: "david@university.edu",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      totalClasses: 30,
      present: 21,
      absent: 8,
      late: 1,
      attendancePercentage: 70.0,
      trend: "down",
    },
    {
      id: 5,
      rollNo: "005",
      name: "Emma Wilson",
      email: "emma@university.edu",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      totalClasses: 30,
      present: 30,
      absent: 0,
      late: 0,
      attendancePercentage: 100.0,
      trend: "up",
    },
    {
      id: 6,
      rollNo: "006",
      name: "Frank Brown",
      email: "frank@university.edu",
      courseCode: "CS201",
      courseName: "Data Structures & Algorithms",
      totalClasses: 28,
      present: 24,
      absent: 3,
      late: 1,
      attendancePercentage: 85.7,
      trend: "stable",
    },
    {
      id: 7,
      rollNo: "007",
      name: "Grace Lee",
      email: "grace@university.edu",
      courseCode: "CS201",
      courseName: "Data Structures & Algorithms",
      totalClasses: 28,
      present: 26,
      absent: 1,
      late: 1,
      attendancePercentage: 92.9,
      trend: "up",
    },
    {
      id: 8,
      rollNo: "008",
      name: "Henry Davis",
      email: "henry@university.edu",
      courseCode: "CS301",
      courseName: "Database Management Systems",
      totalClasses: 25,
      present: 18,
      absent: 7,
      late: 0,
      attendancePercentage: 72.0,
      trend: "down",
    },
    {
      id: 9,
      rollNo: "009",
      name: "Isabella Garcia",
      email: "isabella@university.edu",
      courseCode: "CS301",
      courseName: "Database Management Systems",
      totalClasses: 25,
      present: 24,
      absent: 0,
      late: 1,
      attendancePercentage: 96.0,
      trend: "up",
    },
    {
      id: 10,
      rollNo: "010",
      name: "Jack Taylor",
      email: "jack@university.edu",
      courseCode: "CS202",
      courseName: "Web Development",
      totalClasses: 15,
      present: 13,
      absent: 2,
      late: 0,
      attendancePercentage: 86.7,
      trend: "stable",
    },
  ]);

  // Filter data
  const filteredData = attendanceData.filter((student) => {
    const matchesCourse =
      selectedCourse === "all" || student.courseCode === selectedCourse;
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm);
    return matchesCourse && matchesSearch;
  });

  // Calculate summary statistics
  const totalStudents = filteredData.length;
  const avgAttendance =
    totalStudents > 0
      ? (
          filteredData.reduce((sum, s) => sum + s.attendancePercentage, 0) /
          totalStudents
        ).toFixed(1)
      : 0;
  const atRiskCount = filteredData.filter(
    (s) => s.attendancePercentage < 75
  ).length;
  const excellentCount = filteredData.filter(
    (s) => s.attendancePercentage >= 90
  ).length;

  const getPercentageColor = (percentage: any) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-orange-600";
    return "text-red-600";
  };

  const getPercentageBgColor = (percentage: any) => {
    if (percentage >= 90) return "bg-green-50 border-green-200";
    if (percentage >= 75) return "bg-orange-50 border-orange-200";
    return "bg-red-50 border-red-200";
  };

  const getTrendIcon = (trend: any) => {
    if (trend === "up")
      return <BiTrendingUp className="text-green-600" size={16} />;
    if (trend === "down")
      return <BiTrendingDown className="text-red-600" size={16} />;
    return <div className="w-4 h-0.5 bg-gray-400 rounded"></div>;
  };

  const handleExport = () => {
    const csvContent = [
      [
        "Roll No",
        "Student Name",
        "Course",
        "Total Classes",
        "Present",
        "Absent",
        "Late",
        "Attendance %",
      ],
      ...filteredData.map((s) => [
        s.rollNo,
        s.name,
        s.courseCode,
        s.totalClasses,
        s.present,
        s.absent,
        s.late,
        s.attendancePercentage.toFixed(1),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-report-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
        <BiChevronRight size={16} />
        <span className="hover:text-blue-600 cursor-pointer">My Courses</span>
        <BiChevronRight size={16} />
        <span className="font-medium text-gray-900">View Attendance</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          View Attendance
        </h1>
        <p className="text-gray-600">
          Filter and analyze student attendance records by course and date range
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BiFilterAlt size={20} className="text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Course Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <BiBook size={16} />
                <span>Course</span>
              </div>
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <BiCalendar size={16} />
                <span>Start Date</span>
              </div>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <BiCalendar size={16} />
                <span>End Date</span>
              </div>
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Export Button */}
          <div className="flex items-end">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <BiDownload size={20} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalStudents}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BiUser className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Attendance</p>
              <p className="text-3xl font-bold text-blue-600">
                {avgAttendance}%
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <AiOutlinePercentage className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Excellent (≥90%)</p>
              <p className="text-3xl font-bold text-green-600">
                {excellentCount}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <AiOutlineCheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">At Risk 75%</p>
              <p className="text-3xl font-bold text-red-600">{atRiskCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AiOutlineAlert className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and View Mode */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <BiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded ${
                viewMode === "table"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              } transition-colors`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`px-4 py-2 rounded ${
                viewMode === "cards"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              } transition-colors`}
            >
              Card View
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Roll No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total Classes
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Present
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Absent
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Late
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Attendance %
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Trend
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {student.rollNo}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {student.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-semibold text-gray-900">
                          {student.totalClasses}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <AiOutlineCheckCircle
                            className="text-green-600"
                            size={16}
                          />
                          <span className="text-sm font-medium text-green-700">
                            {student.present}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <AiOutlineCloseCircle
                            className="text-red-600"
                            size={16}
                          />
                          <span className="text-sm font-medium text-red-700">
                            {student.absent}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <AiOutlineClockCircle
                            className="text-yellow-600"
                            size={16}
                          />
                          <span className="text-sm font-medium text-yellow-700">
                            {student.late}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <div
                            className={`px-4 py-2 rounded-lg border ${getPercentageBgColor(
                              student.attendancePercentage
                            )}`}
                          >
                            <span
                              className={`text-lg font-bold ${getPercentageColor(
                                student.attendancePercentage
                              )}`}
                            >
                              {student.attendancePercentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {getTrendIcon(student.trend)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <AiOutlineEye size={18} className="text-blue-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Generate Report"
                          >
                            <AiOutlineFile
                              size={18}
                              className="text-purple-600"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <BiUser size={48} className="text-gray-300" />
                        <p className="text-gray-500 font-medium">
                          No students found
                        </p>
                        <p className="text-sm text-gray-400">
                          Try adjusting your filters or search term
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Card View */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Roll: {student.rollNo}
                      </p>
                    </div>
                  </div>
                  {getTrendIcon(student.trend)}
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-1">
                    {student.courseName}
                  </p>
                  <p className="text-xs text-gray-500">{student.email}</p>
                </div>

                <div
                  className={`mb-4 p-4 rounded-lg border text-center ${getPercentageBgColor(
                    student.attendancePercentage
                  )}`}
                >
                  <p className="text-xs text-gray-600 mb-1">
                    Attendance Percentage
                  </p>
                  <p
                    className={`text-3xl font-bold ${getPercentageColor(
                      student.attendancePercentage
                    )}`}
                  >
                    {student.attendancePercentage.toFixed(1)}%
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Total</p>
                    <p className="text-lg font-bold text-gray-900">
                      {student.totalClasses}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <AiOutlineCheckCircle
                        className="text-green-600"
                        size={14}
                      />
                    </div>
                    <p className="text-lg font-bold text-green-600">
                      {student.present}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <AiOutlineCloseCircle
                        className="text-red-600"
                        size={14}
                      />
                    </div>
                    <p className="text-lg font-bold text-red-600">
                      {student.absent}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <AiOutlineClockCircle
                        className="text-yellow-600"
                        size={14}
                      />
                    </div>
                    <p className="text-lg font-bold text-yellow-600">
                      {student.late}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                    <AiOutlineEye size={16} />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-sm">
                    <AiOutlineFile size={16} />
                    Report
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center gap-3 py-12">
              <BiUser size={48} className="text-gray-300" />
              <p className="text-gray-500 font-medium">No students found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your filters or search term
              </p>
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-6 items-center justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-700">Excellent (≥90%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-700">Good (75-89%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-700">At Risk 75%</span>
          </div>
          <div className="flex items-center gap-2">
            <BiTrendingUp className="text-green-600" size={16} />
            <span className="text-gray-700">Improving</span>
          </div>
          <div className="flex items-center gap-2">
            <BiTrendingDown className="text-red-600" size={16} />
            <span className="text-gray-700">Declining</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;
