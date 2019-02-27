export default (state = {}, action) => {
  switch (action.type) {
    case "SET_FULL_SCREEN":
      return {
        ...state,
        fullScreen: action.payload
      }
    case "TOGGLE_FULL_SCREEN":
      return {
        ...state,
        fullScreen: !state.fullScreen
      }
    case "TOGGLE_BAR_TABS":
      return {
        ...state,
        barTabs: !state.barTabs
      }
    case "TOGGLE_BAR_LOCK":
      return {
        ...state,
        barLock: !state.barLock
      }
    case "TOGGLE_SQUARE_SCREEN":
      return {
        ...state,
        squareScreen: !state.squareScreen
      }
    case "TOGGLE_KEEP_CATEGORY":
      return {
        ...state,
        keepCategory: !state.keepCategory
      }
    case "TOGGLE_SHUFFLE":
      return {
        ...state,
        shuffle: !state.shuffle
      }
    case "TOGGLE_INFO":
      return {
        ...state,
        info: !state.info
      }
    default:
      return state
  }
}