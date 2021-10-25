import { Mutator } from "../proxy-state/types";
import { Actions, State } from "./state.types";

export const mutator: Mutator<State, Actions> = async (
  state,
  action,
  dispatch
) => {
  switch (action.type) {
    case "ConcatenateValues": {
      if (state.main.values?.length) {
        const newValues = action.payload.values.map((v) => ({ value: v }));
        state.main.values = state.main.values.concat(newValues);
      } else {
        await dispatch({
          type: "ReplaceAllValues",
          payload: action.payload,
        });
      }
      return;
    }
    case "ReplaceAllValues": {
      state.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      state.loading = false;

      state.main.values = action.payload.values.map((v) => ({ value: v }));
      return;
    }
  }
};
