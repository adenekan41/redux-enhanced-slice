export interface SliceState<T> {
  results: T;
  isLoading: boolean;
  page?: number;
  hasMore?: boolean;
  errors?: any;
}

export type ObjectKeys<T extends unknown> = keyof T;
export type InitialStateSlice<T extends unknown, S extends string> = {
  [K in ObjectKeys<T> as SliceString<S, K>]: SliceState<T[K]>;
};

/* ------------------------------- Slice Types ------------------------------ */
export type SliceString<U extends string, T> = `${U}${Capitalize<T & string>}` &
  string;
export type SliceSelector<
  T extends unknown,
  S extends string
> = `select${Capitalize<SliceString<S, T>>}`;
export type SliceEnum<K, S extends string> = Readonly<{
  [U in ObjectKeys<K>]: SliceString<S, U>;
}>;

export type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
