import type { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';

export interface SliceState<T> {
  results: T;
  isLoading?: boolean;
  page?: number;
  hasMore?: boolean;
  errors?: any;
}
export type NoInfer<T> = [T][T extends any ? 0 : never];
export type ObjectKeys<T extends unknown> = keyof T;
export type IgnoreDefaultReducers<
  T extends unknown,
  J extends unknown,
  Z
> = Z['ignoreDefaultReducers' & keyof Z] extends true ? J : T;
export type InitialStateSlice<T, S extends string, Z> = {
  [K in ObjectKeys<T> as SliceString<S, K>]: IgnoreDefaultReducers<
    SliceState<T[K]>,
    T[K],
    Z
  >;
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
/**
 * Because we are using the `createSlice` function from `@reduxjs/toolkit`, we need to define the `CaseReducer` type.
 * and map it to the actions, not the best solution but it works.
 */
export type SliceConsolidateReducers<Z extends unknown, S extends string> = {
  [U in keyof Z]: ActionCreatorWithOptionalPayload<
    Parameters<Z[U] extends (...args: any) => any ? Z[U] : never>[1]['payload'],
    `${S}/${U & string}`
  >;
};

export type RootState = ReturnType<any>;
export type ApiEndpointQuery<T, S> = any[];
