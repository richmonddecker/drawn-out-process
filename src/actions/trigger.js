export const pullTrigger = (name) => ({
  type: "PULL_TRIGGER",
  payload: name
});

export const resetTrigger = (name) => ({
  type: "RESET_TRIGGER",
  payload: name
})