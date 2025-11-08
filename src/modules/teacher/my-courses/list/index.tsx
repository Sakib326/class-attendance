import React, { useState } from 'react';
import { 
  BiSearch, 
  BiCalendar, 
  BiUser, 
  BiTime,
  BiChevronRight,
  BiShow,
  BiBarChart,
  BiBook,
  BiFilterAlt
} from 'react-icons/bi';

const MyCourses = () => {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Sample course data
  const courses = [
    {
      id: 1,
      name: 'Introduction to Computer Science',
      code: 'CS101',
      department: 'Computer Science',
      classTime: 'Mon, Wed 10:00 AM - 11:30 AM',
      students: 45,
      totalClasses: 30,
      completedClasses: 18,
      averageAttendance: 87,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Data Structures & Algorithms',
      code: 'CS201',
      department: 'Computer Science',
      classTime: 'Tue, Thu 2:00 PM - 3:30 PM',
      students: 38,
      totalClasses: 30,
      completedClasses: 18,
      averageAttendance: 92,
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'Database Management Systems',
      code: 'CS301',
      department: 'Computer Science',
      classTime: 'Mon, Wed 2:00 PM - 3:30 PM',
      students: 42,
      totalClasses: 30,
      completedClasses: 18,
      averageAttendance: 85,
      color: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Web Development',
      code: 'CS202',
      department: 'Computer Science',
      classTime: 'Fri 10:00 AM - 1:00 PM',
      students: 35,
      totalClasses: 15,
      completedClasses: 9,
      averageAttendance: 90,
      color: 'bg-orange-500'
    },
    {
      id: 5,
      name: 'Digital Signal Processing',
      code: 'ECS301',
      department: 'Electronic and Communication Systems',
      classTime: 'Mon, Wed 9:00 AM - 10:30 AM',
      students: 40,
      totalClasses: 30,
      completedClasses: 16,
      averageAttendance: 88,
      color: 'bg-pink-500'
    },
    {
      id: 6,
      name: 'Communication Systems',
      code: 'ECS302',
      department: 'Electronic and Communication Systems',
      classTime: 'Tue, Thu 11:00 AM - 12:30 PM',
      students: 38,
      totalClasses: 30,
      completedClasses: 17,
      averageAttendance: 91,
      color: 'bg-indigo-500'
    }
  ];

  const departments = ['all', ...new Set(courses.map(c => c.department))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(search.toLowerCase()) ||
                         course.code.toLowerCase().includes(search.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || course.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
        <BiChevronRight size={16} />
        <span className="font-medium text-gray-900">My Courses</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
        <p className="text-gray-600">Manage your courses and track student attendance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BiBook className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.reduce((sum, c) => sum + c.students, 0)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BiUser className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Classes Today</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <BiCalendar className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Attendance</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(courses.reduce((sum, c) => sum + c.averageAttendance, 0) / courses.length)}%
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <BiBarChart className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-3 items-center w-full md:w-auto">
            <div className="flex items-center gap-2">
              <BiFilterAlt size={18} className="text-gray-500" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
              >
                Table
              </button>
            </div>
          </div>

          <div className="relative w-full md:w-80">
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Course Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
              <div className={`${course.color} h-2`}></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h3>
                    <p className="text-sm text-gray-600">{course.code}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                    {course.department}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <BiTime size={16} className="mr-2" />
                    <span>{course.classTime}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BiUser size={16} className="mr-2" />
                    <span>{course.students} Students</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">
                      {course.completedClasses}/{course.totalClasses} Classes
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${course.color} h-2 rounded-full transition-all`}
                      style={{ width: `${(course.completedClasses / course.totalClasses) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Attendance</span>
                    <span className={`text-lg font-bold ${course.averageAttendance >= 90 ? 'text-green-600' : course.averageAttendance >= 75 ? 'text-orange-600' : 'text-red-600'}`}>
                      {course.averageAttendance}%
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <BiShow size={16} />
                    View Details
                  </button>
                  <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <BiCalendar size={16} />
                    Attendance
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                  <th className="px-2 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Code</th>
                  <th className="px-2 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Department</th>
                  <th className="px-2 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Class Time</th>
                  <th className="px-2 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Students</th>
                  <th className="px-2 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Progress</th>
                  <th className="px-2 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Attendance</th>
                  <th className="px-2 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-4">
                      <div className="flex items-center">
                        <div className={`w-1 h-12 ${course.color} rounded-full mr-3`}></div>
                        <div className="font-medium text-gray-900">{course.name}</div>
                      </div>
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-600">{course.code}</td>
                    <td className="px-2 py-4">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {course.department}
                      </span>
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-600">{course.classTime}</td>
                    <td className="px-2 py-4 text-sm text-gray-600">{course.students}</td>
                    <td className="px-2 py-4">
                      <div className="w-32">
                        <div className="text-xs text-gray-600 mb-1">
                          {course.completedClasses}/{course.totalClasses}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${course.color} h-2 rounded-full`}
                            style={{ width: `${(course.completedClasses / course.totalClasses) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <span className={`font-semibold ${course.averageAttendance >= 90 ? 'text-green-600' : course.averageAttendance >= 75 ? 'text-orange-600' : 'text-red-600'}`}>
                        {course.averageAttendance}%
                      </span>
                    </td>
                    <td className="px-2 py-4">
                     
                        <button className="p-2 hover:bg-green-50 rounded-lg transition-colors flex items-center" title="Take Attendance">
                          <BiCalendar size={25} className="text-green-600" /><span className='text-sm text-gray-600'>Take Attendance </span>
                        </button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <BiBook size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default MyCourses;