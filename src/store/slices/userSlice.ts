import { UserEnum } from '@/settings/enum';
import { createSlice } from '@reduxjs/toolkit';

// export const asyncLoginOut = createAsyncThunk('user/loginOut', async () => {
//   return new Promise<boolean>((resolve) => {
//     localStorageRemove(CacheEnum.USER_INFO);
//     localStorageRemove(CacheEnum.TOKEN);
//     resolve(true);
//   });
// });
export const userSlice = createSlice({
  name: UserEnum.NAME,
  initialState: {
    [UserEnum.USER_INFO]: {},
    [UserEnum.TOKEN]: '',
  },
  reducers: {
    setUserInfo: (state, { payload }: { payload: User.UserInfo }) => {
      state.user_info = payload;
      state.token = payload.token;
    },
    loginOut: (state) => {
      state.user_info = {};
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(asyncLoginOut.fulfilled, (state) => {
    //   state.user_info = null;
    //   state.token = null;
    // });
  },
});

// 每个 case reducer 函数会生成对应的 Action creators
export const { setUserInfo, loginOut } = userSlice.actions;

export default userSlice.reducer;
