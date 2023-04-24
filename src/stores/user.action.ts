import type { LoginParams } from '../interface/user/login';

import { LocalStorageConstants } from '@/utils/constants';

import { apiAccount, apiLogin, apiLogout } from '../api/user.api';
import { setUserItem } from './user.store';
import { createAsyncAction } from './utils';

export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async dispatch => {
    const { result, status } = await apiLogin(payload);

    if (status && result && result.token) {
      localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN_KEY, result.token);
      localStorage.setItem(LocalStorageConstants.REFRESH_TOKEN_KEY, result.refreshToken);

      dispatch(
        setUserItem({
          logged: true,
        }),
      );

      return true;
    }

    return false;
  };
});

export const loadProfile = createAsyncAction<string, boolean>(token => {
  return async dispatch => {
    const { result, status } = await apiAccount(token);

    if (result && status) {
      dispatch(
        setUserItem({
          userId: result.id,
          username: result.username,
          roles: result.roles.map(role => role.code),
        }),
      );

      return true;
    }

    return false;
  };
});
