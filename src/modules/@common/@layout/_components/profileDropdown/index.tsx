import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "@/appstore/auth/auth_api";
import { useMemo } from "react";
import { useAuth } from "@/modules/auth/contexts/AuthContext";

const IMAGE_URL_PREFIX = import.meta.env.VITE_IMAGE_URL as string;

export const ProfileDropdown = () => {
  const { logout } = useAuth();
  const { data: profileData } = useGetProfileQuery({});

  const getFullImageUrl = (url?: string) => {
    if (!url) return undefined;
    if (/^https?:\/\//.test(url)) return url;
    return IMAGE_URL_PREFIX + url;
  };
  const avatarUrl = useMemo(
    () => getFullImageUrl(profileData?.photo),
    [profileData]
  );

  const getName = profileData && profileData?.name?.split("");
  const items: MenuProps["items"] = [
    {
      label: (
        <Link to="/settings/profile">
          <div className="flex items-center gap-3 bg-[f5f6fa]">
            <div className="flex justify-center items-center font-bold w-[40px] h-[40px] bg-primary rounded-full text-white overflow-hidden">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                getName && getName[0]
              )}
            </div>
            <div>
              <span className="font-bold block">{profileData?.name}</span>
              <span className=" block">{profileData?.email}</span>
            </div>
          </div>
        </Link>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link to="/settings/profile">
          <div className="flex items-center gap-2 font-semibold">
            <AiOutlineUser className="text-xl" />
            <span className="text-[13px]"> View Profile</span>
          </div>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link to="/settings/password">
          <button>
            <div className="flex items-center gap-2 font-semibold">
              <IoIosSettings className="text-xl" />
              <span className="text-[13px]"> Account Setting</span>
            </div>
          </button>
        </Link>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          onClick={(e) => {
            logout();
            e.preventDefault();
          }}
          className="block w-100"
        >
          <div className="flex items-center gap-2 font-semibold">
            <FiLogOut className="text-xl" />
            <span className="text-[13px]">SignOut</span>
          </div>
        </button>
      ),
      key: "4",
    },
  ];
  return (
    <div className="w-[34px] h-[34px] flex bg-primary text-white items-center justify-center rounded-full cursor-pointer">
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottomRight"
        overlayClassName="profile_dropdown"
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-full h-full object-cover rounded-full"
                style={{ width: 34, height: 34 }}
              />
            ) : (
              <AiOutlineUser className="text-white" />
            )}
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
