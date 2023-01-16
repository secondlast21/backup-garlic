import { Middleware } from "redux";

const clientMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const { types, client, shouldCallAPI = () => true } = action;

    if (!types) {
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      types.some((type) => typeof type !== "string")
    ) {
      throw new Error("Types expect array of 3 strings.");
    }

    if (typeof client !== "function") {
      throw new Error("client is expected as function");
    }

    if (!shouldCallAPI(getState())) {
      // eslint-disable-next-line consistent-return
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch({
      type: requestType,
    });

    return client(getState(), dispatch)
      .then((response) =>
        dispatch({
          type: successType,
          payload: response.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: failureType,
          payload: error,
        })
      );
  };

export default clientMiddleware;
