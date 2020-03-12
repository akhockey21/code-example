export default (
  state = {
    listings: null
  },
  action
) => {
  switch (action.type) {
    case "POPULATE_LISTINGS":
      return {
        listings: action.payload
      };
    default:
      return state;
  }
};
