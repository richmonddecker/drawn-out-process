export default (state = {}, action) => {
  if (action.payload === undefined) {
    return state;
  }
  const {category, element, ...p} = action.payload;
  switch (action.type) {
    case "SET_PARAMETER":
      return {
        ...state,
        [category]: {
          ...state[category],
          [element]: {
            ...state[category][element],
            parameters: {
              ...state[category][element].parameters,
              [p.parameter]: p.value
            }
          }
        }
      };
    case "SET_PARAMETERS":
      return {
        ...state,
        [category]: {
          ...state[category],
          [element]: {
            ...state[category][element],
            parameters: {
              ...state[category][element].parameters,
              ...p.parameters
            }
          }
        }
      };
    case "SET_ATTRIBUTE":
      return {
        ...state,
        [category]: {
          ...state[category],
          [element]: {
            ...state[category][element],
            changes: {
              ...state[category][element].changes,
              [p.attribute]: p.value
            }
          }
        }
      };
    case "SET_ATTRIBUTES":
      return {
        ...state,
        [category]: {
          ...state[category],
          [element]: {
            ...state[category][element],
            changes: {
              ...state[category][element].changes,
              ...p.attributes
            }
          }
        }
      };
    case "RESET_ATTRIBUTES":
      return {
        ...state,
        [category]: {
          ...state[category],
          [element]: {
            ...state[category][element],
            attributes: {
              ...state[category][element].attributes,
              ...state[category][element].changes
            },
            changes: {}
          }
        }
      };
    default:
      return state
  }
}