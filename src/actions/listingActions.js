export const populateListing = listings => dispatch => {
  dispatch({
    type: "POPULATE_LISTINGS",
    payload: listings
  });
};
