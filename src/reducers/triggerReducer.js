export default (state = {}, action) => {
  switch (action.type) {
    case "PULL_TRIGGER":
      return {
        ...state,
        [action.payload]: true
      }
    case "RESET_TRIGGER":
    	return {
    		...state,
    		[action.payload]: false
    	}
    default:
      return state
  }
}