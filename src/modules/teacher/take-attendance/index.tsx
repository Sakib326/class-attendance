import React, { useState } from "react";
import {
  BiChevronRight,
  BiCalendar,
  BiTime,
  BiGroup,
  BiSave,
  BiX,
  BiCheck,
  BiErrorCircle,
  BiSearch,
  BiDownload,
  BiUpload,
  BiFilterAlt,
  BiUserCheck,
  BiUserX,
  BiUserMinus,
} from "react-icons/bi";

const TakeAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectAll, setSelectAll] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("CS101");

  // Modified courses data with students
  const coursesData: any = {
    CS101: {
      name: "Introduction to Computer Science",
      code: "CS101",
      classTime: "Mon, Wed 10:00 AM - 11:30 AM",
      totalStudents: 20,
      students: [
        {
          id: 1,
          rollNo: "CS101-001",
          name: "Alice Johnson",
          email: "alice@university.edu",
          status: "present",
          image: "AJ",
          lastAttendance: "95%",
        },
        {
          id: 2,
          rollNo: "CS101-002",
          name: "Bob Smith",
          email: "bob@university.edu",
          status: "present",
          image: "BS",
          lastAttendance: "88%",
        },
        {
          id: 3,
          rollNo: "CS101-003",
          name: "Carol Martinez",
          email: "carol@university.edu",
          status: "present",
          image: "CM",
          lastAttendance: "92%",
        },
        {
          id: 4,
          rollNo: "CS101-004",
          name: "David Chen",
          email: "david@university.edu",
          status: "absent",
          image: "DC",
          lastAttendance: "78%",
        },
        {
          id: 5,
          rollNo: "CS101-005",
          name: "Emma Wilson",
          email: "emma@university.edu",
          status: "present",
          image: "EW",
          lastAttendance: "100%",
        },
        {
          id: 6,
          rollNo: "CS101-006",
          name: "Frank Brown",
          email: "frank@university.edu",
          status: "late",
          image: "FB",
          lastAttendance: "85%",
        },
        {
          id: 7,
          rollNo: "CS101-007",
          name: "Grace Lee",
          email: "grace@university.edu",
          status: "present",
          image: "GL",
          lastAttendance: "90%",
        },
        {
          id: 8,
          rollNo: "CS101-008",
          name: "Henry Davis",
          email: "henry@university.edu",
          status: "absent",
          image: "HD",
          lastAttendance: "65%",
        },
        {
          id: 9,
          rollNo: "CS101-009",
          name: "Isabella Garcia",
          email: "isabella@university.edu",
          status: "present",
          image: "IG",
          lastAttendance: "98%",
        },
        {
          id: 10,
          rollNo: "CS101-010",
          name: "Jack Taylor",
          email: "jack@university.edu",
          status: "present",
          image: "JT",
          lastAttendance: "87%",
        },
        {
          id: 11,
          rollNo: "CS101-011",
          name: "Kevin Anderson",
          email: "kevin@university.edu",
          status: "present",
          image: "KA",
          lastAttendance: "94%",
        },
        {
          id: 12,
          rollNo: "CS101-012",
          name: "Lucy Parker",
          email: "lucy@university.edu",
          status: "absent",
          image: "LP",
          lastAttendance: "82%",
        },
        {
          id: 13,
          rollNo: "CS101-013",
          name: "Michael Wong",
          email: "michael@university.edu",
          status: "present",
          image: "MW",
          lastAttendance: "96%",
        },
        {
          id: 14,
          rollNo: "CS101-014",
          name: "Nina Rodriguez",
          email: "nina@university.edu",
          status: "late",
          image: "NR",
          lastAttendance: "88%",
        },
        {
          id: 15,
          rollNo: "CS101-015",
          name: "Oliver Thompson",
          email: "oliver@university.edu",
          status: "present",
          image: "OT",
          lastAttendance: "91%",
        },
        {
          id: 16,
          rollNo: "CS101-016",
          name: "Patricia Kim",
          email: "patricia@university.edu",
          status: "absent",
          image: "PK",
          lastAttendance: "75%",
        },
        {
          id: 17,
          rollNo: "CS101-017",
          name: "Quinn Foster",
          email: "quinn@university.edu",
          status: "present",
          image: "QF",
          lastAttendance: "93%",
        },
        {
          id: 18,
          rollNo: "CS101-018",
          name: "Ryan Martinez",
          email: "ryan@university.edu",
          status: "present",
          image: "RM",
          lastAttendance: "89%",
        },
        {
          id: 19,
          rollNo: "CS101-019",
          name: "Sarah Johnson",
          email: "sarah@university.edu",
          status: "late",
          image: "SJ",
          lastAttendance: "86%",
        },
        {
          id: 20,
          rollNo: "CS101-020",
          name: "Thomas Wilson",
          email: "thomas@university.edu",
          status: "present",
          image: "TW",
          lastAttendance: "97%",
        },
      ],
    },
    CS201: {
      name: "Data Structures & Algorithms",
      code: "CS201",
      classTime: "Tue, Thu 2:00 PM - 3:30 PM",
      totalStudents: 15,
      students: [
        {
          id: 1,
          rollNo: "CS201-001",
          name: "Emma Davis",
          email: "emma@university.edu",
          status: "present",
          image: "ED",
          lastAttendance: "92%",
        },
        {
          id: 2,
          rollNo: "CS201-002",
          name: "Frank Wilson",
          email: "frank@university.edu",
          status: "absent",
          image: "FW",
          lastAttendance: "85%",
        },
        {
          id: 3,
          rollNo: "CS201-003",
          name: "Grace Lee",
          email: "grace@university.edu",
          status: "present",
          image: "GL",
          lastAttendance: "90%",
        },
        {
          id: 4,
          rollNo: "CS201-004",
          name: "Henry Chen",
          email: "henry@university.edu",
          status: "late",
          image: "HC",
          lastAttendance: "87%",
        },
        {
          id: 5,
          rollNo: "CS201-005",
          name: "Isabella Kim",
          email: "isabella@university.edu",
          status: "present",
          image: "IK",
          lastAttendance: "94%",
        },
        {
          id: 6,
          rollNo: "CS201-006",
          name: "Jack Brown",
          email: "jack@university.edu",
          status: "present",
          image: "JB",
          lastAttendance: "91%",
        },
        {
          id: 7,
          rollNo: "CS201-007",
          name: "Kevin Anderson",
          email: "kevin@university.edu",
          status: "present",
          image: "KA",
          lastAttendance: "94%",
        },
        {
          id: 8,
          rollNo: "CS201-008",
          name: "Lucy Parker",
          email: "lucy@university.edu",
          status: "absent",
          image: "LP",
          lastAttendance: "82%",
        },
        {
          id: 9,
          rollNo: "CS201-009",
          name: "Michael Wong",
          email: "michael@university.edu",
          status: "present",
          image: "MW",
          lastAttendance: "96%",
        },
        {
          id: 10,
          rollNo: "CS201-010",
          name: "Nina Rodriguez",
          email: "nina@university.edu",
          status: "late",
          image: "NR",
          lastAttendance: "88%",
        },
        {
          id: 11,
          rollNo: "CS201-011",
          name: "Oliver Thompson",
          email: "oliver@university.edu",
          status: "present",
          image: "OT",
          lastAttendance: "91%",
        },
        {
          id: 12,
          rollNo: "CS201-012",
          name: "Patricia Kim",
          email: "patricia@university.edu",
          status: "absent",
          image: "PK",
          lastAttendance: "75%",
        },
        {
          id: 13,
          rollNo: "CS201-013",
          name: "Quinn Foster",
          email: "quinn@university.edu",
          status: "present",
          image: "QF",
          lastAttendance: "93%",
        },
        {
          id: 14,
          rollNo: "CS201-014",
          name: "Ryan Martinez",
          email: "ryan@university.edu",
          status: "present",
          image: "RM",
          lastAttendance: "89%",
        },
        {
          id: 15,
          rollNo: "CS201-015",
          name: "Sarah Johnson",
          email: "sarah@university.edu",
          status: "late",
          image: "SJ",
          lastAttendance: "86%",
        },
      ],
    },
    CS301: {
      name: "Database Management Systems",
      code: "CS301",
      classTime: "Mon, Wed 2:00 PM - 3:30 PM",
      totalStudents: 18,
      students: [
        {
          id: 1,
          rollNo: "CS301-001",
          name: "Grace Lee",
          email: "grace@university.edu",
          status: "present",
          image: "GL",
          lastAttendance: "90%",
        },
        {
          id: 2,
          rollNo: "CS301-002",
          name: "Henry Chen",
          email: "henry@university.edu",
          status: "late",
          image: "HC",
          lastAttendance: "87%",
        },
        {
          id: 3,
          rollNo: "CS301-003",
          name: "Isabella Kim",
          email: "isabella@university.edu",
          status: "present",
          image: "IK",
          lastAttendance: "94%",
        },
        {
          id: 4,
          rollNo: "CS301-004",
          name: "Jack Brown",
          email: "jack@university.edu",
          status: "present",
          image: "JB",
          lastAttendance: "91%",
        },
        {
          id: 5,
          rollNo: "CS301-005",
          name: "Kevin Anderson",
          email: "kevin@university.edu",
          status: "present",
          image: "KA",
          lastAttendance: "94%",
        },
        {
          id: 6,
          rollNo: "CS301-006",
          name: "Lucy Parker",
          email: "lucy@university.edu",
          status: "absent",
          image: "LP",
          lastAttendance: "82%",
        },
        {
          id: 7,
          rollNo: "CS301-007",
          name: "Michael Wong",
          email: "michael@university.edu",
          status: "present",
          image: "MW",
          lastAttendance: "96%",
        },
        {
          id: 8,
          rollNo: "CS301-008",
          name: "Nina Rodriguez",
          email: "nina@university.edu",
          status: "late",
          image: "NR",
          lastAttendance: "88%",
        },
        {
          id: 9,
          rollNo: "CS301-009",
          name: "Oliver Thompson",
          email: "oliver@university.edu",
          status: "present",
          image: "OT",
          lastAttendance: "91%",
        },
        {
          id: 10,
          rollNo: "CS301-010",
          name: "Patricia Kim",
          email: "patricia@university.edu",
          status: "absent",
          image: "PK",
          lastAttendance: "75%",
        },
        {
          id: 11,
          rollNo: "CS301-011",
          name: "Quinn Foster",
          email: "quinn@university.edu",
          status: "present",
          image: "QF",
          lastAttendance: "93%",
        },
        {
          id: 12,
          rollNo: "CS301-012",
          name: "Ryan Martinez",
          email: "ryan@university.edu",
          status: "present",
          image: "RM",
          lastAttendance: "89%",
        },
        {
          id: 13,
          rollNo: "CS301-013",
          name: "Sarah Johnson",
          email: "sarah@university.edu",
          status: "late",
          image: "SJ",
          lastAttendance: "86%",
        },
      ],
    },
    CS401: {
      name: "Software Engineering",
      code: "CS401",
      classTime: "Fri 9:00 AM - 12:00 PM",
      totalStudents: 25,
      students: [
        {
          id: 1,
          rollNo: "CS401-001",
          name: "Isabella Kim",
          email: "isabella@university.edu",
          status: "present",
          image: "IK",
          lastAttendance: "94%",
        },
        {
          id: 2,
          rollNo: "CS401-002",
          name: "Jack Brown",
          email: "jack@university.edu",
          status: "present",
          image: "JB",
          lastAttendance: "91%",
        },
        {
          id: 3,
          rollNo: "CS401-003",
          name: "Kevin Anderson",
          email: "kevin@university.edu",
          status: "present",
          image: "KA",
          lastAttendance: "94%",
        },
        {
          id: 4,
          rollNo: "CS401-004",
          name: "Lucy Parker",
          email: "lucy@university.edu",
          status: "absent",
          image: "LP",
          lastAttendance: "82%",
        },
        {
          id: 5,
          rollNo: "CS401-005",
          name: "Michael Wong",
          email: "michael@university.edu",
          status: "present",
          image: "MW",
          lastAttendance: "96%",
        },
        {
          id: 6,
          rollNo: "CS401-006",
          name: "Nina Rodriguez",
          email: "nina@university.edu",
          status: "late",
          image: "NR",
          lastAttendance: "88%",
        },
        {
          id: 7,
          rollNo: "CS401-007",
          name: "Oliver Thompson",
          email: "oliver@university.edu",
          status: "present",
          image: "OT",
          lastAttendance: "91%",
        },
        {
          id: 8,
          rollNo: "CS401-008",
          name: "Patricia Kim",
          email: "patricia@university.edu",
          status: "absent",
          image: "PK",
          lastAttendance: "75%",
        },
        {
          id: 9,
          rollNo: "CS401-009",
          name: "Quinn Foster",
          email: "quinn@university.edu",
          status: "present",
          image: "QF",
          lastAttendance: "93%",
        },
        {
          id: 10,
          rollNo: "CS401-010",
          name: "Ryan Martinez",
          email: "ryan@university.edu",
          status: "present",
          image: "RM",
          lastAttendance: "89%",
        },
        {
          id: 11,
          rollNo: "CS401-011",
          name: "Sarah Johnson",
          email: "sarah@university.edu",
          status: "late",
          image: "SJ",
          lastAttendance: "86%",
        },
      ],
    },
  };

  // Initialize students state with the first course's students
  const [students, setStudents] = useState(
    coursesData[selectedCourse].students
  );

  // Update students when course changes
  React.useEffect(() => {
    setStudents(coursesData[selectedCourse].students);
    setSelectAll(false); // Reset select all when changing courses
  }, [selectedCourse]);

  // Get current course info
  const courseInfo = coursesData[selectedCourse];

  const updateAttendance = (id: any, status: any) => {
    setStudents(
      students.map((student: any) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const toggleSelectAll = () => {
    const newStatus = !selectAll;
    setSelectAll(newStatus);
    setStudents(
      students.map((student: any) => ({
        ...student,
        status: newStatus ? "present" : "absent",
      }))
    );
  };

  const filteredStudents = students.filter((student: any) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm);
    const matchesFilter =
      filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    present: students.filter((s: any) => s.status === "present").length,
    absent: students.filter((s: any) => s.status === "absent").length,
    late: students.filter((s: any) => s.status === "late").length,
  };

  const attendancePercentage = (
    ((stats.present + stats.late) / students.length) *
    100
  ).toFixed(1);

  const getStatusColor = (status: any) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-700 border-green-300";
      case "absent":
        return "bg-red-100 text-red-700 border-red-300";
      case "late":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    // Save logic here
    console.log("Attendance saved", { students, date: selectedDate, notes });
    setShowSaveModal(false);
    alert("Attendance saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
        <BiChevronRight size={16} />
        <span className="hover:text-blue-600 cursor-pointer">My Courses</span>
        <BiChevronRight size={16} />
        <span className="font-medium text-gray-900">Take Attendance</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Take Attendance
        </h1>
        <p className="text-gray-600">
          Mark student attendance for today's class
        </p>
      </div>

      {/* Course Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Select Course:
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {Object.keys(coursesData).map((courseCode) => (
              <option key={courseCode} value={courseCode}>
                {coursesData[courseCode].name} ({courseCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {courseInfo.name}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <BiCalendar size={16} />
                <span className="font-medium">{courseInfo.code}</span>
              </div>
              <div className="flex items-center gap-2">
                <BiTime size={16} />
                <span>{courseInfo.classTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <BiGroup size={16} />
                <span>{courseInfo.totalStudents} Students</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Present</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.present}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BiUserCheck className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Absent</p>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <BiUserX className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Late</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <BiUserMinus className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {attendancePercentage}%
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BiGroup className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-3 items-center flex-wrap">
            <button
              onClick={toggleSelectAll}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectAll
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {selectAll ? "Unmark All" : "Mark All Present"}
            </button>

            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
              <BiFilterAlt size={18} className="text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="outline-none text-sm"
              >
                <option value="all">All Students</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <BiUpload size={18} />
              <span className="text-sm">Import</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <BiDownload size={18} />
              <span className="text-sm">Export</span>
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <BiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Last Attendance
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student: any) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {student.rollNo}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                        {student.image}
                      </div>
                      <span className="font-medium text-gray-900">
                        {student.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`font-semibold ${
                        parseFloat(student.lastAttendance) >= 90
                          ? "text-green-600"
                          : parseFloat(student.lastAttendance) >= 75
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {student.lastAttendance}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          student.status
                        )}`}
                      >
                        {student.status.charAt(0).toUpperCase() +
                          student.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => updateAttendance(student.id, "present")}
                        className={`p-2 rounded-lg transition-all ${
                          student.status === "present"
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600"
                        }`}
                        title="Present"
                      >
                        <BiCheck size={18} />
                      </button>
                      <button
                        onClick={() => updateAttendance(student.id, "late")}
                        className={`p-2 rounded-lg transition-all ${
                          student.status === "late"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-100 hover:bg-yellow-100 text-gray-600 hover:text-yellow-600"
                        }`}
                        title="Late"
                      >
                        <BiTime size={18} />
                      </button>
                      <button
                        onClick={() => updateAttendance(student.id, "absent")}
                        className={`p-2 rounded-lg transition-all ${
                          student.status === "absent"
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600"
                        }`}
                        title="Absent"
                      >
                        <BiX size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Class Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes about today's class..."
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
        >
          <BiSave size={20} />
          Save Attendance
        </button>
      </div>

      {/* Save Confirmation Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <BiErrorCircle className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Confirm Attendance
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to save the attendance for {selectedDate}?
              This will record {stats.present} present, {stats.absent} absent,
              and {stats.late} late students.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.present}
                  </p>
                  <p className="text-xs text-gray-600">Present</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.absent}
                  </p>
                  <p className="text-xs text-gray-600">Absent</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.late}
                  </p>
                  <p className="text-xs text-gray-600">Late</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmSave}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeAttendance;
