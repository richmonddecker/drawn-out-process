export default (state = {}, action) => {
  switch (action.type) {
    case "SET_NAV_SECTION":
      return {
        ...state,
        openNavSection: action.payload
      }
    case "OPEN_BARS":
      return {
        ...state,
        barsOpen: true
      }
    case "CLOSE_BARS":
      return {
        ...state,
        barsOpen: false
      }
    case "SHOW_CURSOR":
      return {
        ...state,
        cursorHidden: false
      }
    case "HIDE_CURSOR":
      return {
        ...state,
        cursorHidden: true
      }
    default:
      return state
  }
}