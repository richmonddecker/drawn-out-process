export default (state = {}, action) => {
  switch (action.type) {
    case "SET_NAV_SECTION":
      return {
        ...state,
        openNavSection: action.payload
      }
    default:
      return state
  }
}