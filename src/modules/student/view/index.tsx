import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Collapse, Spin, Upload, message } from "antd";
import { Field, Form, Formik } from "formik";
import { CiCirclePlus } from "react-icons/ci";
import "react-phone-input-2/lib/style.css";
import { useParams } from "react-router";

import {
  useGetAllStudentQuery,
  useUpdateStudentMutation,
} from "@/appstore/student/api";
import { ErrorMessage } from "@/helpers/utils";
import BreadCrumb from "@/modules/@common/breadcrumb";
import PhoneInput from "react-phone-input-2";
import { TbCertificate } from "react-icons/tb";
import { LiaCertificateSolid } from "react-icons/lia";
import { ChangeStatus } from "../list/util";
// import { studentProfileInit, validationSchema } from './utils';
const { Panel } = Collapse;

const StudentView = () => {
  const params = useParams();
  const { id } = params;
  const [parent] = useAutoAnimate();

  const { data, isLoading: singleFetchLoading } = useGetAllStudentQuery({
    id,
  });

  const [updateLawStudent, { isLoading }] = useUpdateStudentMutation();

  const breadcrumbData = [
    {
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      title: "Students",
      link: "/students/list",
    },

    {
      title: "View",
    },
  ];

  const updateStudentHandler = async (values: any, resetForm: any) => {
    try {
      let res: any = await updateLawStudent(values);
      if (!res?.error) {
        message.success(`Student Updated.`);
      } else {
        ErrorMessage(res.error.data.errors);
      }
    } catch (error) {
      message.error(`Something went wrong.`);
    }
  };

  return (
    <div className="mt-3">
      <BreadCrumb data={breadcrumbData} />

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Student Details</h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>

      {data ? (
        <div className="w-full">
          <div className="flex w-full justify-end mt-2">
            <ChangeStatus record={data} />
          </div>
          <div className="grid grid-cols-1fr sm:grid-cols-1fr md:grid-cols-1fr lg:grid-cols-[1fr,400px] gap-5 mb-8 mt-4">
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div ref={parent}>
                  <label htmlFor="title" className="font-semibold">
                    First Name
                    <span className="text-danger">*</span>
                  </label>
                  <div className="w-full py-2 px-3 border text-sm rounded min-h-[45px]">
                    {data?.firstName ?? ""}
                  </div>
                </div>
                <div ref={parent}>
                  <label htmlFor="title" className="font-semibold">
                    Last Name
                    <span className="text-danger">*</span>
                  </label>
                  <div className="w-full py-2 px-3 border text-sm rounded min-h-[45px]">
                    {data?.lastName ?? ""}
                  </div>
                </div>
                <div ref={parent}>
                  <label htmlFor="contactNumber" className="font-semibold">
                    Mobile Number
                    <span className="text-danger">*</span>
                  </label>
                  <div className="w-full py-2 px-3 border text-sm rounded min-h-[45px]">
                    {data?.mobile ?? ""}
                  </div>
                </div>
                <div ref={parent}>
                  <label htmlFor="email" className="font-semibold">
                    Email
                    <span className="text-danger">*</span>
                  </label>
                  <div className="w-full py-2 px-3 border text-sm rounded min-h-[45px]">
                    {data?.email ?? ""}
                  </div>
                </div>
                <div ref={parent}>
                  <label htmlFor="schoolName" className="font-semibold">
                    School Name
                    <span className="text-danger">*</span>
                  </label>
                  <div className="w-full py-2 px-3 border text-sm rounded min-h-[45px]">
                    {data?.schoolName ?? ""}
                  </div>
                </div>
                <div ref={parent}>
                  <label htmlFor="studentId" className="font-semibold">
                    Student Id
                    <span className="text-danger">*</span>
                  </label>
                  <div className="w-full py-2 px-3 border text-sm rounded min-h-[45px]">
                    {data?.student?.studentId ?? ""}
                  </div>
                </div>
                <div ref={parent}>
                  <label htmlFor="programOfStudy" className="font-semibold">
                    Program Of Study
                    <span className="text-danger">*</span>
                  </label>
                  <div className="w-full py-2 px-3 border text-sm rounded min-h-[45px]">
                    {data?.student?.programOfStudy ?? ""}
                  </div>
                </div>
                <div ref={parent}>
                  <label htmlFor="programOfStudy" className="font-semibold">
                    School Email
                    <span className="text-danger">*</span>
                  </label>
                  <div className="w-full py-2 px-3 border text-sm rounded min-h-[45px]">
                    {data?.student?.schoolEmail ?? ""}
                  </div>
                </div>
                <div ref={parent}>
                  <label htmlFor="programOfStudy" className="font-semibold">
                    Contact Number
                    <span className="text-danger">*</span>
                  </label>
                  <div className="w-full py-2 px-3 border text-sm rounded min-h-[45px]">
                    {data?.student?.contactNumber ?? ""}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <Collapse
                  defaultActiveKey={["1"]}
                  onChange={(e: any) => console.log(e)}
                  expandIconPosition="end"
                  className="add_post"
                >
                  <Panel header="Avatar" key="1">
                    <div className="grid grid-cols-1 mb-2">
                      <label htmlFor="" className="font-medium mb-1">
                        Avatar
                      </label>
                      <div className="w-full">
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <img
                            crossOrigin="anonymous"
                            src={
                              data?.avatar && data?.avatar !== ""
                                ? data?.avatar
                                : "/images/misc/avatar-lg.png"
                            }
                            alt="avatar"
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </Panel>
                  <Panel header="Documents" key="2">
                    <div className="grid grid-cols-1 mb-2">
                      <label htmlFor="" className="font-medium mb-1">
                        Transcript
                      </label>
                      <div className="w-full">
                        <div className="flex">
                          {data?.student?.transcript && (
                            <a
                              className="btn btn-primary p-1 mr-1"
                              href={data?.student?.transcript}
                              target="_blank"
                              download
                            >
                              <TbCertificate className="text-base" />
                            </a>
                          )}
                          {data?.student?.degreeFile && (
                            <a
                              className="btn btn-primary p-1 mr-1"
                              href={data?.student?.degreeFile}
                              target="_blank"
                              download
                            >
                              <LiaCertificateSolid className="text-base" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex justify-center items-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default StudentView;
