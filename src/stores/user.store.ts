import type { Locale, UserState } from '@/interface/user/user';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { LocalStorageConstants } from '@/utils/constants';
import { getGlobalState } from '@/utils/getGloabal';
import { RoleCode } from '@/utils/roles';

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
  permission: {
    isAdmin: false,
    isLeader: false,
    isCS: false,
    isSeller: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      if (action.payload.roles) {
        action.payload.permission = {
          isAdmin: action.payload.roles.includes(RoleCode.ADMIN),
          isLeader: action.payload.roles.includes(RoleCode.LEADER),
          isCS: action.payload.roles.includes(RoleCode.CS),
          isSeller: action.payload.roles.includes(RoleCode.SELLER),
        };
      }

      Object.assign(state, action.payload);
    },
  },
});

export const { setUserItem } = userSlice.actions;

export default userSlice.reducer;
