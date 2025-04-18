export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: IUser;
  tokens: ITokens;
}