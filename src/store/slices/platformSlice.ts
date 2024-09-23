import { PlatformEnum } from '@/settings/enum';
import { createSlice } from '@reduxjs/toolkit';

export const platformSlice = createSlice({
  name: PlatformEnum.NAME,
  initialState: {
    // 当前位置-平台类型id ( 1:总平台 | 2:公司平台 | 3:项目平台  )
    [PlatformEnum.TYPE]: '',
    // 总平台详情
    [PlatformEnum.SUBJECT]: '',
    // 公司平台详情
    [PlatformEnum.COMPANY]: '',
    // 项目平台详情
    [PlatformEnum.PROJECT]: '',
  },
  reducers: {
    // getUserInfo: (state) => {
    //   state.user_info = localStorageGet(CacheEnum.USER_INFO);
    // },
    // setUserInfo: (state, { payload }: { payload: User.UserInfo }) => {
    //   localStorageSet(CacheEnum.USER_INFO, payload);
    //   localStorageSet(CacheEnum.TOKEN, payload.token);
    //   state.user_info = payload;
    //   state.token = payload.token;
    // },
    // loginOut: (state) => {
    //   state.token = '';
    // },
  },
});

// 每个 case reducer 函数会生成对应的 Action creators
export const {} = platformSlice.actions;

export default platformSlice.reducer;
