import { AuthorizeEnum } from '@/settings/enum';
import { createSlice } from '@reduxjs/toolkit';

/**
 * 权限 / 授权信息状态管理
 */
export const authorizeSlice = createSlice({
  name: AuthorizeEnum.NAME,
  initialState: {
    [AuthorizeEnum.LEVEL]: [null, null, null],
  },
  reducers: {
    setAuthLevel: (state, { payload }: { payload: { level: number; info: any } }) => {
      const { level, info } = payload;
      state[AuthorizeEnum.LEVEL].splice(level - 1, 1, info);
    },
    removeAuthLevel: (state, { payload }: { payload: { level: number } }) => {
      const { level } = payload;
      state[AuthorizeEnum.LEVEL].splice(level - 1);
    },
    cleanState: (state) => {
      state[AuthorizeEnum.LEVEL] = [null, null, null];
    },
  },
});

// 每个 case reducer 函数会生成对应的 Action creators
export const { setAuthLevel, cleanState, removeAuthLevel } = authorizeSlice.actions;

export default authorizeSlice.reducer;
