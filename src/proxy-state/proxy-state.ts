import { useEffect, useMemo, useReducer, useRef } from "react";
import { getHandler } from "./get-handler";
import { forceUpdateMap, updater } from "./globals";
import { DeepReadonly, Dispatch, Mutator } from "./types";

export function createState<S extends object, A>(
  init: S,
  mutator?: Mutator<S, A>
) {
  const state = new Proxy(init, getHandler<S>());

  function useUpdates<T>(selector: () => T): T {
    const [state, forceUpdate] = useReducer((v) => !v, true);
    const isDone = useRef(false);
    const traces = useRef<Set<string>>(new Set());

    useEffect(
      () => () => {
        for (const trace of traces.current) {
          forceUpdateMap.get(trace)?.delete(forceUpdate);
        }
      },
      []
    );

    const value = useMemo(() => {
      if (!isDone.current) {
        updater.count = -1;
        updater.traces = [];
      }

      const result = selector();

      if (!isDone.current) {
        traces.current = new Set(updater.traces);

        for (const trace of traces.current) {
          const updaters = forceUpdateMap.get(trace);
          if (!updaters) {
            forceUpdateMap.set(trace, new Set([forceUpdate]));
          } else {
            updaters.add(forceUpdate);
          }
        }

        updater.count = -1;
        updater.traces = [];
        isDone.current = true;
      }

      return result;
    }, [state]);

    return value;
  }

  const dispatch: Dispatch<A> = async (action: A) => {
    await mutator?.(state, action, dispatch);
  };

  return {
    state: state as DeepReadonly<S>,
    useUpdates,
    dispatch,
  };
}
