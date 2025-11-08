import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import UserHeader from "../_components/header/user-header";

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <div className="flex relative h-screen overflow-hidden">
      <div className="h-screen overflow-auto w-full">
        <UserHeader toggled={toggled} setToggled={setToggled} />
        <div className="p-5 lg:p-8 pt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
