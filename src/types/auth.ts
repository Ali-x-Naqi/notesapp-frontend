export interface AuthTokens {
  access: string;
  refresh: string;
  username: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthFormErrors {
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  non_field_errors?: string;
}
