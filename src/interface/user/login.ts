/** user's role */

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  refreshToken: string;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
