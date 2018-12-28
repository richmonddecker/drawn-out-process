export const setParameter = (category, element, parameter, value) => ({
  type: "SET_PARAMETER",
  payload: {category, element, parameter, value}
});

export const setParameters = (category, element, parameters) => ({
  type: "SET_PARAMETERS",
  payload: {category, element, parameters}
});

export const setAttribute = (category, element, attribute, value) => ({
  type: "SET_ATTRIBUTE",
  payload: {category, element, attribute, value}
});

export const setAttributes = (category, element, attributes) => ({
  type: "SET_ATTRIBUTES",
  payload: {category, element, attributes}
});

export const resetAttributes = (category, element) => ({
  type: "RESET_ATTRIBUTES",
  payload: {category, element}
});

