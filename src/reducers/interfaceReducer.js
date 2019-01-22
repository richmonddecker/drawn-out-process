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
    case "SET_INVALID_URL":
      return {
        ...state,
        invalidUrl: action.payload
      }
    case "SET_CURRENT_ELEMENT":
      return {
        ...state,
        category: action.payload.category,
        element: action.payload.element
      }
    case "SET_CURRENT_CATEGORY":
      return {
        ...state,
        category: action.payload.category,
        element: null
      }
    case "SET_NEXT":
      return {
        ...state,
        next: action.payload
      }
    case "SET_PREVIOUS":
      return {
        ...state,
        previous: action.payload
      }
    default:
      return state
  }
}