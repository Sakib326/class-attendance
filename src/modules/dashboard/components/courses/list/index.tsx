import React, { useState } from "react";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaFilter,
  FaClock,
  FaUserGraduate,
} from "react-icons/fa";
import {
  MdClass,
  MdCode,
  MdSchool,
  MdPerson,
  MdSchedule,
} from "react-icons/md";

const CourseList = () => {
  // Sample data for demonstration
  const initialCourses = [
    {
      id: 1,
      courseName: "Data Structures and Algorithms",
      courseCode: "CS201",
      department: "Computer Science",
      assignedTeachers: ["Dr. Sarah Johnson", "Prof. Michael Chen"],
      schedule: "Mon, Wed 10:00-11:30 AM",
    },
    {
      id: 2,
      courseName: "Quantum Mechanics",
      courseCode: "PHY301",
      department: "Physics",
      assignedTeachers: ["Prof. Michael Chen"],
      schedule: "Tue, Thu 2:00-3:30 PM",
    },
    {
      id: 3,
      courseName: "Web Development",
      courseCode: "CS305",
      department: "Computer Science",
      assignedTeachers: ["Dr. Emily Davis", "Dr. Sarah Johnson"],
      schedule: "Mon, Wed, Fri 1:00-2:00 PM",
    },
    {
      id: 4,
      courseName: "Calculus I",
      courseCode: "MATH101",
      department: "Mathematics",
      assignedTeachers: ["Dr. Robert Wilson"],
      schedule: "Tue, Thu 9:00-10:30 AM",
    },
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  // Form state for adding/editing courses
  const [formData, setFormData] = useState<any>({
    courseName: "",
    courseCode: "",
    department: "",
    assignedTeachers: [],
    schedule: "",
  });

  // Available options
  const departmentOptions = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Engineering",
    "Chemistry",
    "Biology",
  ];

  const teacherOptions = [
    "Dr. Sarah Johnson",
    "Prof. Michael Chen",
    "Dr. Emily Davis",
    "Dr. Robert Wilson",
    "Prof. Jennifer Martinez",
  ];

  const timeSlotOptions = [
    "Mon, Wed 9:00-10:30 AM",
    "Mon, Wed 10:00-11:30 AM",
    "Mon, Wed 2:00-3:30 PM",
    "Tue, Thu 9:00-10:30 AM",
    "Tue, Thu 10:00-11:30 AM",
    "Tue, Thu 2:00-3:30 PM",
    "Mon, Wed, Fri 9:00-10:00 AM",
    "Mon, Wed, Fri 1:00-2:00 PM",
    "Mon, Wed, Fri 3:00-4:00 PM",
  ];

  // Filter courses based on search and department
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" || course.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Handle form input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update the handleTeachersChange function
  const handleTeachersChange = (teacher: any) => {
    setFormData((prev: any) => ({
      ...prev,
      assignedTeachers: prev.assignedTeachers.includes(teacher)
        ? prev.assignedTeachers.filter((t: any) => t !== teacher)
        : [...prev.assignedTeachers, teacher],
    }));
  };

  // Add new course
  const handleAddCourse = (e: any) => {
    e.preventDefault();
    const newCourse = {
      id: courses.length + 1,
      ...formData,
    };
    setCourses([...courses, newCourse]);
    setFormData({
      courseName: "",
      courseCode: "",
      department: "",
      assignedTeachers: [],
      schedule: "",
    });
    setShowAddForm(false);
  };

  // Edit course
  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setFormData({
      courseName: course.courseName,
      courseCode: course.courseCode,
      department: course.department,
      assignedTeachers: course.assignedTeachers,
      schedule: course.schedule,
    });
  };

  // Update course
  const handleUpdateCourse = (e: any) => {
    e.preventDefault();
    setCourses(
      courses.map((course) =>
        course.id === editingCourse.id ? { ...course, ...formData } : course
      )
    );
    setEditingCourse(null);
    setFormData({
      courseName: "",
      courseCode: "",
      department: "",
      assignedTeachers: [],
      schedule: "",
    });
  };

  // Delete course
  const handleDeleteCourse = (id: any) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  // Get department color for badges
  const getDepartmentColor = (department: any) => {
    const colors: any = {
      "Computer Science": "bg-blue-100 text-blue-800",
      Mathematics: "bg-green-100 text-green-800",
      Physics: "bg-purple-100 text-purple-800",
      Engineering: "bg-orange-100 text-orange-800",
      Chemistry: "bg-red-100 text-red-800",
      Biology: "bg-teal-100 text-teal-800",
    };
    return colors[department] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Course Management
          </h1>
          <p className="text-gray-600">
            Manage courses, schedules, and assigned teachers
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <MdClass className="text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Courses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <MdSchool className="text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {departmentOptions.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FaUserGraduate className="text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Teachers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teacherOptions.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                <FaClock className="text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Time Slots</p>
                <p className="text-2xl font-bold text-gray-900">
                  {timeSlotOptions.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 mt-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses by name or code..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Department Filter */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  {departmentOptions.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add Course Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              Add Course
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingCourse) && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingCourse ? "Edit Course" : "Add New Course"}
            </h2>
            <form
              onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Course Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MdClass className="inline mr-1" />
                    Course Name
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    placeholder="e.g., Data Structures and Algorithms"
                  />
                </div>

                {/* Course Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MdCode className="inline mr-1" />
                    Course Code
                  </label>
                  <input
                    type="text"
                    name="courseCode"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.courseCode}
                    onChange={handleInputChange}
                    placeholder="e.g., CS201"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MdSchool className="inline mr-1" />
                    Department
                  </label>
                  <select
                    name="department"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaClock className="inline mr-1" />
                    Class Schedule
                  </label>
                  <select
                    name="schedule"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.schedule}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Schedule</option>
                    {timeSlotOptions.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assigned Teachers */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaUserGraduate className="inline mr-1" />
                    Assigned Teachers
                  </label>
                  <div className="border border-gray-300 rounded-lg p-3 h-32 overflow-y-auto">
                    {teacherOptions.map((teacher) => (
                      <div key={teacher} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`teacher-${teacher}`}
                          checked={formData.assignedTeachers.includes(teacher)}
                          onChange={() => handleTeachersChange(teacher)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`teacher-${teacher}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {teacher}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {editingCourse ? "Update Course" : "Add Course"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCourse(null);
                    setFormData({
                      courseName: "",
                      courseCode: "",
                      department: "",
                      assignedTeachers: [],
                      schedule: "",
                    });
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                {/* Course Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {course.courseName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MdCode className="text-gray-400" />
                      <span className="font-mono">{course.courseCode}</span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDepartmentColor(
                      course.department
                    )}`}
                  >
                    <MdSchool className="mr-1" />
                    {course.department}
                  </span>
                </div>

                {/* Schedule */}
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                  <MdSchedule className="text-gray-400" />
                  <span>{course.schedule}</span>
                </div>

                {/* Assigned Teachers */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaUserGraduate className="text-gray-400" />
                    <span>Assigned Teachers:</span>
                  </div>
                  <div className="space-y-1">
                    {course.assignedTeachers.map((teacher, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <MdPerson className="text-gray-400 text-xs" />
                        <span>{teacher}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-1"
                  >
                    <FaEdit className="text-xs" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-100 transition-colors duration-200 flex items-center justify-center gap-1"
                  >
                    <FaTrash className="text-xs" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedDepartment !== "All"
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first course"}
            </p>
            {!searchTerm && selectedDepartment === "All" && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
              >
                <FaPlus />
                Add Course
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
