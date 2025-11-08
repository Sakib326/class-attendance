import { FormikErrors, FormikTouched } from "formik";

export interface RegisterFormValues {
  name: string;

  mobile: string;
  email: string;
  schoolEmail: string;
  address: string;

  schoolName: string;
  enrollmentDate: string;
  graduationDate: string;
  studyType: string;

  password: string;
  confirmPassword: string;
}

export interface FormStepProps {
  values: RegisterFormValues;
  errors: FormikErrors<RegisterFormValues>;
  touched: FormikTouched<RegisterFormValues>;
}
