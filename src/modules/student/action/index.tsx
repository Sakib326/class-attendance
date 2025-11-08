import { useDeleteStudentMutation } from "@/appstore/student/api";
import { ErrorMessage } from "@/helpers/utils";
import { Popconfirm, Tooltip, message } from "antd";
import { FaRegEye } from "react-icons/fa";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const StudentAction = ({ record }: any) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <Link to={`/students/${record?.idx}`}>
        <FiEye className="text-base" />
      </Link>
    </div>
  );
};

export default StudentAction;
