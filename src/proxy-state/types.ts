export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Dispatch<A> = (action: A) => Promise<unknown>;

export type Mutator<S, A> = (
  state: S,
  action: A,
  dispatch: Dispatch<A>
) => unknown | Promise<unknown>;
