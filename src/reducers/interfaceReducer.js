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
        element: action.payload.element,
        title: action.payload.title
      }
    case "SET_CURRENT_CATEGORY":
      return {
        ...state,
        category: action.payload.category,
        element: null
      }
    case "SET_CURRENT_PASSIVITY":
      return {
        ...state,
        passivity: action.payload.passivity
      }
    case "SET_CURRENT_INTERACTIVITY":
      return {
        ...state,
        interactivity: action.payload.interactivity,
        info: !action.payload.interactivity ? false : state.info
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
    case "SET_SLIDESHOW":
      return {
        ...state,
        slideshow: action.payload,
        timer: 0
      }
    case "RESET_TIMER":
      return {
        ...state,
        timer: 0
      }
    case "INCREMENT_TIMER":
      return {
        ...state,
        timer: state.timer + 1
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