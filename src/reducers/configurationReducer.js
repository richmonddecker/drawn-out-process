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
    default:
      return state
  }
}