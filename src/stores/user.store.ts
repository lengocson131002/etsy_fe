import type { Locale, UserState } from '@/interface/user/user';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';
import { LocalStorageConstants } from '@/utils/constants';

const initialState: UserState = {
  ...getGlobalState(),
  noticeCount: 0,
  locale: (localStorage.getItem(LocalStorageConstants.LOCALE_KEY)! || 'en_US') as Locale,
  newUser: JSON.parse(localStorage.getItem(LocalStorageConstants.IS_NEW_USER_KEY)!) ?? true,
  logged: localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY) ? true : false,
  menuList: [],
  username: undefined,
  userId: undefined,
  roles: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUserItem } = userSlice.actions;

export default userSlice.reducer;
