import * as React from "react";
import { useCallback } from "react";
import { dispatch, state, useUpdates } from "./state/state";

export const MyComponent = () => {
  const { values, loading } = useUpdates(() => {
    return {
      values: state.main.values,
      loading: state.loading,
    };
  });

  const onClick = useCallback(
    () =>
      dispatch({
        type: "ConcatenateValues",
        payload: {
          values: [6, 8, 9],
        },
      }),
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul>
        {values?.map((v, i) => (
          <li key={i}>{v.value}</li>
        ))}
      </ul>
      <button onClick={onClick}>Change the values</button>
    </>
  );
};
