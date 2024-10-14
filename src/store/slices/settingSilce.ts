import { createSlice } from '@reduxjs/toolkit';

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    collapsed: false,
    isFullscreen: false,
  },
  reducers: {
    // 展开菜单
    onCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    // 全屏模式
    onFullscreen: (state, { payload }) => {
      state.isFullscreen = payload;
    },
  },
});

// 每个 case reducer 函数会生成对应的 Action creators
export const { onCollapsed, onFullscreen } = settingSlice.actions;

export default settingSlice.reducer;
