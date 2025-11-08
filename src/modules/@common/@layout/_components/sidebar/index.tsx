import { MdLogout, MdOutlineCode, MdOutlineDashboard } from "react-icons/md";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { FaEye, FaUserAlt, FaUserGraduate, FaCalendarAlt } from "react-icons/fa";
import { AiFillQuestionCircle } from "react-icons/ai";
import { MdClass } from "react-icons/md"; // Add this import

interface propTypes {
  collapsed: boolean;
  toggled: boolean;
  setCollapsed?: (value: boolean) => void;
  setToggled?: (value: boolean) => void;
}

const SidebarComponent = ({ collapsed, toggled, setToggled }: propTypes) => {
  const { pathname } = useLocation();
  const targetPath = pathname.split("/")[1];

  const AdminMenu = () => (
    <Menu>
      <MenuItem
        className={pathname == "/dashboard" ? "" : ""}
        component={<Link to="/dashboard" />}
        icon={<MdOutlineDashboard className="text-xl" />}
      >
        <span className="text-sm font-medium">Dashboard</span>
      </MenuItem>

      <SubMenu
        className={`text-sm font-medium ${
          targetPath == "departments" ? "" : ""
        }`}
        label="Departments"
        icon={<MdOutlineCode className="text-xl" />}
      >
        <MenuItem
          className={pathname == "/dashboard/departments/list" ? "" : ""}
          component={<Link to="/dashboard/departments/list" />}
        >
          <span className="text-sm font-medium">Department List</span>
        </MenuItem>
        <MenuItem
          className={pathname == "/departments/add" ? "" : ""}
          component={<Link to="/departments/add" />}
        >
          <span className="text-sm font-medium">Add Department</span>
        </MenuItem>
      </SubMenu>

      <SubMenu
        className={`text-sm font-medium ${targetPath == "teachers" ? "" : ""}`}
        label="Teachers"
        icon={<FaUserAlt className="text-xl" />}
      >
        <MenuItem
          className={pathname == "/dashboard/teachers/list" ? "" : ""}
          component={<Link to="/dashboard/teachers/list" />}
        >
          <span className="text-sm font-medium">Teacher List</span>
        </MenuItem>
        <MenuItem
          className={pathname == "/dashboard/teachers/add" ? "" : ""}
          component={<Link to="/dashboard/teachers/add" />}
        >
          <span className="text-sm font-medium">Add Teacher</span>
        </MenuItem>
      </SubMenu>

      {/* Add this after Teachers submenu and before Students submenu */}
      <SubMenu
        className={`text-sm font-medium ${targetPath == "courses" ? "" : ""}`}
        label="Courses"
        icon={<MdClass className="text-xl" />}
      >
        <MenuItem
          className={pathname == "/dashboard/courses/list" ? "" : ""}
          component={<Link to="/dashboard/courses/list" />}
        >
          <span className="text-sm font-medium">Course List</span>
        </MenuItem>
        <MenuItem
          className={pathname == "/dashboard/courses/add" ? "" : ""}
          component={<Link to="/dashboard/courses/add" />}
        >
          <span className="text-sm font-medium">Add Course</span>
        </MenuItem>
      </SubMenu>

      <SubMenu
        className={`text-sm font-medium ${
          targetPath == "students" ? "" : ""
        }`}
        label="Students"
        icon={<FaUserGraduate className="text-xl" />}
      >
        <MenuItem
          className={pathname == "/students/list" ? "" : ""}
          component={<Link to="/students/list" />}
        >
          <span className="text-sm font-medium">All Student</span>
        </MenuItem>
        <MenuItem
          className="/students/add"
          component={<Link to={"/student/add"}></Link>}
        >
          <span className="text-sm font-medium">Add New Student</span>
        </MenuItem>
      </SubMenu>

      <SubMenu
        className={`text-sm font-medium ${targetPath == "attendance" ? "" : ""}`}
        label="Attendance"
        icon={<FaCalendarAlt className="text-xl" />}
      >
        <MenuItem
          className={pathname == "/dashboard/attendance/view" ? "" : ""}
          component={<Link to="/dashboard/attendance/view" />}
        >
          <span className="text-sm font-medium">View Attendance</span>
        </MenuItem>
        <MenuItem
          className={pathname == "/dashboard/attendance/summary" ? "" : ""}
          component={<Link to="/dashboard/attendance/summary" />}
        >
          <span className="text-sm font-medium">Attendance Summary</span>
        </MenuItem>
      </SubMenu>
    </Menu>
  );

  const TeacherMenu = () => (
    <Menu>
      <MenuItem
        className={pathname == "/teacher/dashboard" ? "" : ""}
        component={<Link to="/teacher/dashboard" />}
        icon={<MdOutlineDashboard className="text-xl" />}
      >
        <span className="text-sm font-medium">Dashboard</span>
      </MenuItem>
      <MenuItem
        className={pathname == "/teacher/my-courses" ? "" : ""}
        component={<Link to="/teacher/my-courses" />}
        icon={<MdOutlineDashboard className="text-xl" />}
      >
        <span className="text-sm font-medium">My Courses</span>
      </MenuItem>
      <MenuItem
        className={pathname == "/teacher/take-attendance" ? "" : ""}
        component={<Link to="/teacher/take-attendance" />}
        icon={<img src="/attendance1.png" className="text-xl" />}
      >
        <span className="text-sm font-medium">Take Attendance</span>
      </MenuItem>
      <MenuItem
        className={pathname == "/teacher/view-attendance" ? "" : ""}
        component={<Link to="/teacher/view-attendance" />}
        icon={<FaEye className="text-xl" />}
      >
        <span className="text-sm font-medium">View Attendance</span>
      </MenuItem>
      <MenuItem
        className={pathname == "/teacher/profile" ? "" : ""}
        component={<Link to="/teacher/profile" />}
        icon={<FaUserAlt className="text-xl" />}
      >
        <span className="text-sm font-medium">Profile</span>
      </MenuItem>
      <MenuItem
        className={pathname == "/teacher/login" ? "" : ""}
        component={<Link to="/teacher/login" />}
        icon={<MdLogout className="text-xl" />}
      >
        <span className="text-sm font-medium">Logout</span>
      </MenuItem>

      <SubMenu
        className={`text-sm font-medium ${targetPath == "attendance" ? "" : ""}`}
        label="Attendance"
        icon={<FaCalendarAlt className="text-xl" />}
      >
        <MenuItem
          className={pathname == "/teacher/attendance/view" ? "" : ""}
          component={<Link to="/teacher/attendance/view" />}
        >
          <span className="text-sm font-medium">View Attendance</span>
        </MenuItem>
        <MenuItem
          className={pathname == "/teacher/attendance/summary" ? "" : ""}
          component={<Link to="/teacher/attendance/summary" />}
        >
          <span className="text-sm font-medium">Attendance Summary</span>
        </MenuItem>
      </SubMenu>
    </Menu>
  );

  return (
    <Sidebar
      collapsed={collapsed}
      onBackdropClick={() => setToggled?.(false)}
      toggled={toggled}
      breakPoint="lg"
      className="shrink-0 h-screen overflow-auto scroll custom"
    >
      <div className="flex justify-center sticky top-0 z-50 p-2 !bg-[#FEEFE7]">
        {!collapsed ? (
          <div className="relative px-4 py-2 w-[280px]">
            <Link to="/dashboard">
              <img src="/images/misc/attendify.png" alt="Attendify Logo" />
            </Link>
          </div>
        ) : (
          <div className="relative px-2 py-1 w-[120px]">
            <Link to="/dashboard">
              <img src="/images/misc/logo_sm.png" alt="Attendify Logo" />
            </Link>
          </div>
        )}
      </div>

      {targetPath === "teacher" ? <TeacherMenu /> : <AdminMenu />}
    </Sidebar>
  );
};

export default SidebarComponent;
