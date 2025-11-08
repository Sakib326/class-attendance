import { MdOutlineCode, MdOutlineDashboard } from "react-icons/md";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

import { FaUserGraduate } from "react-icons/fa";

import { AiFillQuestionCircle } from "react-icons/ai";

interface propTypes {
  collapsed: boolean;
  toggled: boolean;
  setCollapsed?: (value: boolean) => void;
  setToggled?: (value: boolean) => void;
}

const SidebarComponent = ({ collapsed, toggled, setToggled }: propTypes) => {
  const { pathname } = useLocation();
  const targetPath = pathname.split("/")[1];

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

      <Menu className="">
        <MenuItem
          className={pathname == "/dashboard" ? "" : ""}
          component={<Link to="/dashboard" />}
          icon={<MdOutlineDashboard className="text-xl" />}
        >
          <span className="text-sm font-medium">Dashboard</span>
        </MenuItem>

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
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
