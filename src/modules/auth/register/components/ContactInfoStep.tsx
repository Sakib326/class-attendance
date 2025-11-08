import React from "react";
import { Field } from "formik";
import { FormStepProps } from "./types";

const ContactInfoStep: React.FC<FormStepProps> = ({ errors, touched }) => {
  return (
    <div className="grid grid-cols-1 gap-y-5 md:gap-y-8">
      <div className="form_group">
        <label htmlFor="mobile" className="block mb-1 text-sm sm:text-base">
          Phone Number
          <span className="astrisk text-red-500 ml-1">*</span>
        </label>
        <Field
          type="text"
          name="mobile"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 ${
            errors?.mobile && touched?.mobile
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Enter your phone number"
        />
        {errors?.mobile && touched?.mobile ? (
          <div className="text-red-500 text-xs mt-1">{errors?.mobile}</div>
        ) : null}
      </div>

      <div className="form_group">
        <label htmlFor="email" className="block mb-1 text-sm sm:text-base">
          Personal Email Address
          <span className="astrisk text-red-500 ml-1">*</span>
        </label>
        <Field
          type="email"
          name="email"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 ${
            errors?.email && touched?.email
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Enter your personal email"
        />
        {errors?.email && touched?.email ? (
          <div className="text-red-500 text-xs mt-1">{errors?.email}</div>
        ) : null}
      </div>

      <div className="form_group">
        <label
          htmlFor="schoolEmail"
          className="block mb-1 text-sm sm:text-base"
        >
          School Email Address (if available)
        </label>
        <Field
          type="email"
          name="schoolEmail"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 ${
            errors?.schoolEmail && touched?.schoolEmail
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Enter your school email"
        />
        {errors?.schoolEmail && touched?.schoolEmail ? (
          <div className="text-red-500 text-xs mt-1">{errors?.schoolEmail}</div>
        ) : null}
      </div>

      <div className="form_group">
        <label htmlFor="address" className="block mb-1 text-sm sm:text-base">
          Mailing Address
          <span className="astrisk text-red-500 ml-1">*</span>
        </label>
        <Field
          as="textarea"
          name="address"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none min-h-[80px] ${
            errors?.address && touched?.address
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Enter your mailing address"
          rows={3}
        />
        {errors?.address && touched?.address ? (
          <div className="text-red-500 text-xs mt-1">{errors?.address}</div>
        ) : null}
      </div>
    </div>
  );
};

export default ContactInfoStep;
