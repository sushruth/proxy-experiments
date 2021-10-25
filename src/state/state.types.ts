export type State = {
  main: {
    values?: { value: number }[];
  };
  loading: boolean;
};

export type Actions =
  | {
      type: "ConcatenateValues";
      payload: {
        values: number[];
      };
    }
  | {
      type: "ReplaceAllValues";
      payload: {
        values: number[];
      };
    };
