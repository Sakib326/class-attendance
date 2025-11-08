import React from "react";
import { Field } from "formik";
import { FormStepProps } from "./types";

const AcademicInfoStep: React.FC<FormStepProps> = ({ errors, touched }) => {
  return (
    <div className="grid grid-cols-1 gap-y-5 md:gap-y-8">
      <div className="form_group">
        <label htmlFor="schoolName" className="block mb-1 text-sm sm:text-base">
          Name of the School Attended
          <span className="astrisk text-red-500 ml-1">*</span>
        </label>
        <Field
          type="text"
          name="schoolName"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 ${
            errors?.schoolName && touched?.schoolName
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Enter your school name"
        />
        {errors?.schoolName && touched?.schoolName ? (
          <div className="text-red-500 text-xs mt-1">{errors?.schoolName}</div>
        ) : null}
      </div>

      <div className="form_group">
        <label
          htmlFor="enrollmentDate"
          className="block mb-1 text-sm sm:text-base"
        >
          Enrollment Date (MM/YYYY)
          <span className="astrisk text-red-500 ml-1">*</span>
        </label>
        <Field
          type="text"
          name="enrollmentDate"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 ${
            errors?.enrollmentDate && touched?.enrollmentDate
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="MM/YYYY"
        />
        {errors?.enrollmentDate && touched?.enrollmentDate ? (
          <div className="text-red-500 text-xs mt-1">
            {errors?.enrollmentDate}
          </div>
        ) : null}
      </div>

      <div className="form_group">
        <label
          htmlFor="graduationDate"
          className="block mb-1 text-sm sm:text-base"
        >
          Graduation Date (MM/YYYY)
          <span className="astrisk text-red-500 ml-1">*</span>
        </label>
        <Field
          type="text"
          name="graduationDate"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 ${
            errors?.graduationDate && touched?.graduationDate
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="MM/YYYY"
        />
        {errors?.graduationDate && touched?.graduationDate ? (
          <div className="text-red-500 text-xs mt-1">
            {errors?.graduationDate}
          </div>
        ) : null}
      </div>

      <div className="form_group">
        <label htmlFor="studyType" className="block mb-1 text-sm sm:text-base">
          Type of Study
          <span className="astrisk text-red-500 ml-1">*</span>
        </label>
        <Field
          as="select"
          name="studyType"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none bg-white ${
            errors?.studyType && touched?.studyType
              ? "border-red-500"
              : "border-gray-300"
          }`}
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml;utf8,<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>\')',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            backgroundSize: "20px",
          }}
        >
          <option value="">Select study type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </Field>
        {errors?.studyType && touched?.studyType ? (
          <div className="text-red-500 text-xs mt-1">{errors?.studyType}</div>
        ) : null}
      </div>
    </div>
  );
};

export default AcademicInfoStep;
