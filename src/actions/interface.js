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

export const setInvalidUrl = (value) => ({
  type: "SET_INVALID_URL",
  payload: value
});

export const setCurrentElement = (category, element) => ({
  type: "SET_CURRENT_ELEMENT",
  payload: {category, element}
});

export const setCurrentPassivity = (passivity) => ({
  type: "SET_CURRENT_PASSIVITY",
  payload: {passivity}
})

export const setCurrentInteractivity = (interactivity) => ({
  type: "SET_CURRENT_INTERACTIVITY",
  payload: {interactivity}
})

export const setCurrentCategory = (category) => ({
  type: "SET_CURRENT_CATEGORY",
  payload: {category}
});

export const setNext = (category, element) => ({
  type: "SET_NEXT",
  payload: {category, element}
});

export const setPrevious = (category, element) => ({
  type: "SET_PREVIOUS",
  payload: {category, element}
});

export const setSlideshow = (setting) => ({
  type: "SET_SLIDESHOW",
  payload: setting
})

export const resetTimer = () => ({
  type: "RESET_TIMER"
})

export const incrementTimer = () => ({
  type: "INCREMENT_TIMER"
})
