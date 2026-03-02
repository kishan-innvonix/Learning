
export interface FormInputParams {
  type: string,
  label: string,
  id: string,
  register: object,
  fieldName: string,
  value?: string,
  error: object,
}

export interface NewPasswordForm {
    newPassword: string,
    confirmPassword: string
}

export interface ForgotPasswordForm {
    email?: string,
    otp?: number,
}