import { Outlet } from "react-router-dom";
import Header from "../_components/header";
import SidebarComponent from "../_components/sidebar";
import { useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

const PrivateLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <div className="flex relative h-screen overflow-hidden">
      <div className="h-screen relative">
        <button
          className="hidden lg:block absolute z-[100] right-[-12px] top-[45px]"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <FiArrowRightCircle className="text-2xl text-gray-500" />
          ) : (
            <FiArrowLeftCircle className="text-2xl text-gray-500" />
          )}
        </button>

        <SidebarComponent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          toggled={toggled}
          setToggled={setToggled}
        />
      </div>
      <div className="h-screen overflow-auto w-full">
        <Header toggled={toggled} setToggled={setToggled} />
        <div className="p-5 lg:p-8 pt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default PrivateLayout;
