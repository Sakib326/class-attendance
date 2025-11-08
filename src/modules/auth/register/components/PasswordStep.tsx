import React, { useState } from "react";
import { Field } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FormStepProps } from "./types";

const PasswordStep: React.FC<FormStepProps> = ({ errors, touched }) => {
  const [type, setType] = useState("password");

  return (
    <div className="grid grid-cols-1 gap-y-5 md:gap-y-8">
      <div className="form_group relative">
        <label htmlFor="password" className="block mb-1 text-sm sm:text-base">
          Password <span className="astrisk text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <Field
            type={type}
            name="password"
            autoComplete="new-password"
            className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              errors?.password && touched?.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Password"
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => setType(type === "password" ? "text" : "password")}
          >
            {type === "password" ? (
              <AiOutlineEyeInvisible className="text-xl" />
            ) : (
              <AiOutlineEye className="text-xl" />
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Minimum 8 characters with uppercase, lowercase, number, and special
          character
        </p>
        {errors?.password && touched?.password ? (
          <div className="text-red-500 text-xs mt-1">{errors?.password}</div>
        ) : null}
      </div>

      <div className="form_group relative">
        <label
          htmlFor="confirmPassword"
          className="block mb-1 text-sm sm:text-base"
        >
          Confirm Password <span className="astrisk text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <Field
            type={type}
            name="confirmPassword"
            autoComplete="new-password"
            className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              errors?.confirmPassword && touched?.confirmPassword
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Confirm Password"
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => setType(type === "password" ? "text" : "password")}
          >
            {type === "password" ? (
              <AiOutlineEyeInvisible className="text-xl" />
            ) : (
              <AiOutlineEye className="text-xl" />
            )}
          </div>
        </div>
        {errors?.confirmPassword && touched?.confirmPassword ? (
          <div className="text-red-500 text-xs mt-1">
            {errors?.confirmPassword}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PasswordStep;
