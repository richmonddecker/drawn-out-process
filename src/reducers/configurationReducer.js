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
    default:
      return state
  }
}