import * as Yup from "yup";

export const studentProfileInit = {
  firstName: "",
  lastName: "",
  username: "",
  programOfStudy: "",
  schoolName: "",
  studentId: "",
  contactNumber: "",
  roleType: "STUDENT",
  isInformationMatched: false,
  transcript: null,
  degreeFile: null,
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  studentId: Yup.string().required("Student id is required"),
  schoolName: Yup.string().required("School name is required"),
  programOfStudy: Yup.string().required("Program is required"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .min(9, "Contact number not valid"),
  isInformationMatched: Yup.boolean().oneOf(
    [true],
    "Please confirm that the provided information is correct"
  ),
  transcript: Yup.mixed()
    .required("Please upload a file")
    .test(
      "fileType",
      "Invalid file type. Please upload a file of type: jpeg, png, webp, or pdf",
      function (value): boolean {
        if (!value) return false;

        const file: File = value as File;
        const allowedFileTypes = [
          "image/jpeg",
          "image/png",
          "image/webp",
          "application/pdf",
        ];
        return allowedFileTypes.includes(file.type);
      }
    )
    .test(
      "fileSize",
      "File size must be less than 2MB",
      function (value): boolean {
        if (!value) return false;

        const file: File = value as File;
        const maxSize = 2 * 1024 * 1024;
        return file.size <= maxSize;
      }
    ),
  degreeFile: Yup.mixed()
    .nullable()
    .test(
      "fileType",
      "Invalid file type. Please upload a file of type: jpeg, png, webp, or pdf",
      function (value): boolean {
        if (!value) return true;

        const file: File = value as File;
        const allowedFileTypes = [
          "image/jpeg",
          "image/png",
          "image/webp",
          "application/pdf",
        ];
        return allowedFileTypes.includes(file.type);
      }
    )
    .test(
      "fileSize",
      "File size must be less than 2MB",
      function (value): boolean {
        if (!value) return true;

        const file: File = value as File;
        const maxSize = 2 * 1024 * 1024;
        return file.size <= maxSize;
      }
    ),
});
