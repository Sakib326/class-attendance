import { BsBoxArrowUpRight } from "react-icons/bs";
import { GrMenu } from "react-icons/gr";
import ProfileDropdown from "../profileDropdown";
import { Link } from "react-router-dom";

interface propTypes {
  toggled: boolean;
  setToggled?: Function | any;
}

export const UserHeader = ({ toggled, setToggled }: propTypes) => {
  return (
    <>
      <div className="sticky top-0 bg-white px-8 py-4 border-b flex items-center justify-between z-50">
        <div>
          <Link to="/dashboard">
            <img src="/images/misc/attendify.png" alt="Attendify Logo" />
          </Link>
        </div>
        <div className="font-bold flex items-center gap-3">
          <ProfileDropdown />
        </div>
      </div>
    </>
  );
};

export default UserHeader;
