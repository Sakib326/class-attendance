import React, { useState } from "react";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaFilter,
} from "react-icons/fa";
import { MdEmail, MdPerson, MdSchool, MdClass } from "react-icons/md";

const TeacherList = () => {
  // Sample data for demonstration
  const initialTeachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      departments: ["Computer Science", "Mathematics"],
      assignedCourses: ["Data Structures", "Algorithms"],
      password: "password123",
      showPassword: false,
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@university.edu",
      departments: ["Physics"],
      assignedCourses: ["Quantum Mechanics", "Classical Physics"],
      password: "physics2024",
      showPassword: false,
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      email: "emily.davis@university.edu",
      departments: ["Computer Science", "Engineering"],
      assignedCourses: ["Web Development", "Database Systems"],
      password: "webdev123",
      showPassword: false,
    },
  ];

  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);

  // Form state for adding/editing teachers
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    departments: [],
    assignedCourses: [],
    password: "",
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

  const courseOptions = [
    "Data Structures",
    "Algorithms",
    "Web Development",
    "Database Systems",
    "Quantum Mechanics",
    "Classical Physics",
    "Calculus",
    "Linear Algebra",
  ];

  // Filter teachers based on search and department
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" ||
      teacher.departments.includes(selectedDepartment);
    return matchesSearch && matchesDepartment;
  });

  // Toggle password visibility
  const togglePasswordVisibility = (id: any) => {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === id
          ? { ...teacher, showPassword: !teacher.showPassword }
          : teacher
      )
    );
  };

  // Handle form input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (e: any, field: any) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option: any) => option.value
    );
    setFormData((prev: any) => ({
      ...prev,
      [field]: options,
    }));
  };

  // Add new teacher
  const handleAddTeacher = (e: any) => {
    e.preventDefault();
    const newTeacher = {
      id: teachers.length + 1,
      ...formData,
      showPassword: false,
    };
    setTeachers([...teachers, newTeacher]);
    setFormData({
      name: "",
      email: "",
      departments: [],
      assignedCourses: [],
      password: "",
    });
    setShowAddForm(false);
  };

  // Edit teacher
  const handleEditTeacher = (teacher: any) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      departments: teacher.departments,
      assignedCourses: teacher.assignedCourses,
      password: teacher.password,
    });
  };

  // Update teacher
  const handleUpdateTeacher = (e: any) => {
    e.preventDefault();
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === editingTeacher.id ? { ...teacher, ...formData } : teacher
      )
    );
    setEditingTeacher(null);
    setFormData({
      name: "",
      email: "",
      departments: [],
      assignedCourses: [],
      password: "",
    });
  };

  // Delete teacher
  const handleDeleteTeacher = (id: any) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Teacher Management
          </h1>
          <p className="text-gray-600">
            Manage teachers, departments, and assigned courses
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <MdPerson className="text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Teachers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {teachers.length}
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
                <MdClass className="text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Courses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courseOptions.length}
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
                  type="email"
                  placeholder="Search teachers by name or email..."
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

            {/* Add Teacher Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              Add Teacher
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingTeacher) && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
            </h2>
            <form
              onSubmit={editingTeacher ? handleUpdateTeacher : handleAddTeacher}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MdPerson className="inline mr-1" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MdEmail className="inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Departments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MdSchool className="inline mr-1" />
                    Departments
                  </label>
                  <select
                    multiple
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                    value={formData.departments}
                    onChange={(e) => handleMultiSelectChange(e, "departments")}
                  >
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Hold Ctrl/Cmd to select multiple
                  </p>
                </div>

                {/* Assigned Courses */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MdClass className="inline mr-1" />
                    Assigned Courses
                  </label>
                  <div className="border border-gray-300 rounded-lg p-3 h-32 overflow-y-auto">
                    {courseOptions.map((course: any) => (
                      <div key={course} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`course-${course}`}
                          value={course}
                          checked={formData.assignedCourses.includes(course)}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev: any) => ({
                              ...prev,
                              assignedCourses: e.target.checked
                                ? [...prev.assignedCourses, value]
                                : prev.assignedCourses.filter(
                                    (c: any) => c !== value
                                  ),
                            }));
                          }}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`course-${course}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {course}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Password */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {editingTeacher ? "Update Teacher" : "Add Teacher"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingTeacher(null);
                    setFormData({
                      name: "",
                      email: "",
                      departments: [],
                      assignedCourses: [],
                      password: "",
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

        {/* Teachers Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Courses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {teacher.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MdEmail className="text-gray-400" />
                          {teacher.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {teacher.departments.map((dept, index) => (
                          <span
                            key={dept}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            <MdSchool className="mr-1" />
                            {dept}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {teacher.assignedCourses.map((course, index) => (
                          <span
                            key={course}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            <MdClass className="mr-1" />
                            {course}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 font-mono">
                          {teacher.showPassword ? teacher.password : "••••••••"}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(teacher.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          {teacher.showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEditTeacher(teacher)}
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200 flex items-center gap-1"
                        >
                          <FaEdit />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center gap-1"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredTeachers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👨‍🏫</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No teachers found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedDepartment !== "All"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by adding your first teacher"}
              </p>
              {!searchTerm && selectedDepartment === "All" && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                >
                  <FaPlus />
                  Add Teacher
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
