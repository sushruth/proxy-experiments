import { createState } from "../proxy-state/proxy-state";
import { mutator } from "./mutator";
import { initState } from "./state.init";

export const { state, useUpdates, dispatch } = createState(initState, mutator);
