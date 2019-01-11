export const setOpenNavSection = (section) => ({
  type: "SET_NAV_SECTION",
  payload: section
});

export const openBars = () => ({
  type: "OPEN_BARS"
});

export const closeBars = () => ({
  type: "CLOSE_BARS"
});

export const hideCursor = () => ({
  type: "HIDE_CURSOR"
});

export const showCursor = () => ({
  type: "SHOW_CURSOR"
});