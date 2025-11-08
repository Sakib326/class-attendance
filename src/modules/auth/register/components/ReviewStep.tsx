import React from "react";
import { FormStepProps } from "./types";

const ReviewStep: React.FC<FormStepProps> = ({ values }) => {
  return (
    <div className="grid grid-cols-1 gap-y-4 bg-gray-50 p-4 sm:p-6 rounded-lg text-sm sm:text-base">
      <h3 className="font-semibold text-base sm:text-lg mb-2">
        Review Your Information
      </h3>

      <div className="mb-2">
        <h4 className="font-medium text-gray-700">Personal Information</h4>
        <p>
          <span className="font-medium">Full Name:</span> {values.name}
        </p>
      </div>

      <div className="mb-2">
        <h4 className="font-medium text-gray-700">Contact Information</h4>
        <p>
          <span className="font-medium">Phone Number:</span> {values.mobile}
        </p>
        <p>
          <span className="font-medium">Personal Email:</span> {values.email}
        </p>
        {values.schoolEmail && (
          <p>
            <span className="font-medium">School Email:</span>{" "}
            {values.schoolEmail}
          </p>
        )}
        <p>
          <span className="font-medium">Mailing Address:</span>{" "}
          <span className="whitespace-pre-line">{values.address}</span>
        </p>
      </div>

      <div className="mb-2">
        <h4 className="font-medium text-gray-700">Academic Information</h4>
        <p>
          <span className="font-medium">School Name:</span> {values.schoolName}
        </p>
        <p>
          <span className="font-medium">Enrollment Date:</span>{" "}
          {values.enrollmentDate}
        </p>
        <p>
          <span className="font-medium">Graduation Date:</span>{" "}
          {values.graduationDate}
        </p>
        <p>
          <span className="font-medium">Study Type:</span> {values.studyType}
        </p>
      </div>

      <div className="mb-2">
        <h4 className="font-medium text-gray-700">Login Information</h4>
        <p>
          <span className="font-medium">Password:</span> ********
        </p>
      </div>

      <p className="text-xs sm:text-sm text-gray-500 italic mt-2">
        Please double-check all information for accuracy before submitting.
      </p>
    </div>
  );
};

export default ReviewStep;
