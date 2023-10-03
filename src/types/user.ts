export interface ISigninData {
  login: string;
  password: string;
}

export interface ISignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
}

export interface IUserEdit {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export interface IUserEditPassword {
  oldPassword: string
  newPassword: string
}
