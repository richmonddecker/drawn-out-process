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
    default:
      return state
  }
}