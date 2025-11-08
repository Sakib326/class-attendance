import React from "react";
import { Field } from "formik";
import { FormStepProps } from "./types";

const PersonalInfoStep: React.FC<FormStepProps> = ({ errors, touched }) => {
  return (
    <div className="grid grid-cols-1 gap-y-6">
      <div className="form_group">
        <label htmlFor="name" className="block mb-1 text-sm sm:text-base">
          Full Name (as per government ID)
          <span className="astrisk text-red-500 ml-1">*</span>
        </label>
        <Field
          type="text"
          name="name"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 ${
            errors?.name && touched?.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your full name"
        />
        {errors?.name && touched?.name ? (
          <div className="text-red-500 text-xs mt-1">{errors?.name}</div>
        ) : null}
      </div>
    </div>
  );
};

export default PersonalInfoStep;
