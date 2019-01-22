export const setFullScreen = (full) => ({
  type: "SET_FULL_SCREEN",
  payload: full
});

export const toggleFullScreen = () => ({
  type: "TOGGLE_FULL_SCREEN"
});

export const toggleBarTabs = () => ({
  type: "TOGGLE_BAR_TABS"
});

export const toggleBarLock = () => ({
  type: "TOGGLE_BAR_LOCK"
});

export const toggleSquareScreen = () => ({
  type: "TOGGLE_SQUARE_SCREEN"
});

export const toggleKeepCategory = () => ({
  type: "TOGGLE_KEEP_CATEGORY"
});

export const toggleShuffle = () => ({
  type: "TOGGLE_SHUFFLE"
});