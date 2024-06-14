export interface InfoAccountTypeCard {
  type: string;
  title: string;
  description: string;
}

export interface ISignup {
  token: string;
  name: string;
  email: string;
  phone_number: string | undefined;
  password: string;
}

export interface ILogin {
  identity: string;
  password: string;
  country: string;
}

export interface IRequestEditAccount {
  token: string | undefined;
  data: IEditAccount;
}

export interface IEditAccount {
  name: string;
  email: string;
  phone_number: string | undefined;
  profile_image: any;
}
