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
