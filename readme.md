
# 🌜 Redux Enhanced Slice 🌛


[![npm](https://badge.fury.io/js/redux-enhanced-slice.svg)](https://www.npmjs.com/package/redux-enhanced-slice)

[![NPM](https://nodei.co/npm/redux-enhanced-slice.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/redux-enhanced-slice/)

`redux-enhanced-slice-enhanced-slice` is an NPM package that simplifies the creation of Redux slices by providing standardized cases for handling asynchronous actions and generating selectors for accessing the slice state. 🎉


## Features ✨
- Simplifies slice creation: Easily create Redux slices with just a few lines of code.
- Handles asynchronous actions: Provides standardized cases for handling asynchronous actions, such as loading, success, and error states.
- Generates selectors: Automatically generates selector functions for accessing the slice state in a consistent manner.
- Reduces boilerplate: Minimizes the need for repetitive code, making your Redux codebase more maintainable and easier to understand.

## Motivation 🤔
Redux is a great tool for managing state in React applications, but it can be difficult to set up and maintain. `redux-enhanced-slice` aims to simplify the process of creating Redux slices by providing standardized cases for handling asynchronous actions and generating selectors for accessing the slice state. This reduces the amount of boilerplate code needed to create and maintain Redux slices, making your codebase more maintainable and easier to understand.

## Installation 💾

To install the package, run the following command:

```bash
npm install redux-enhanced-slice
```

## Usage 📚

To create a Redux slice with `redux-enhanced-slice`, simply import the package and use the `createEnhancedSlice` function. This function accepts the slice name and initial state as arguments and returns an object containing the created slice, `queryTypes`, and `selectors`.

### Example 📖

```javascript
import createEnhancedSlice from 'redux-enhanced-slice';

const { slice, queryTypes, selectors, reducer, actions } = createEnhancedSlice('users', {
  users: [],
  user: null,
}, {
  reducers: {
    setUsers: (state, action) => {
      state.queryTypes.users = action.payload;
    },
    setUser: (state, action) => {
      state.queryTypes.user = action.payload;
    },
  },
});

const { 
  fetchUsers, 
  fetchUser, 
  setPageData // Internal action for setting page data
} = slice.actions;

const { selectUsersUsers, selectUsersUser } = selectors; // pre-generated selectors for accessing state
const { setUsers, setUser } = actions; // pre-generated action creators for dispatching actions
const { users, user } = queryTypes; // pre-generated query types for accessing state types in selectors

export default reducer;
```

Behind the scenes the users reducers looks a bit like this, with the `selectUsersUser` and `selectUsersUser` reducers being automatically generated:

```javascript
 'usersUser:211951': {
  results: [],
  isLoading: false,
  hasMore: true,
  page: 0,
  errors: null
},
'userUser:211951': {
  results: null,
  isLoading: false,
  hasMore: true,
  page: 0,
  errors: null
}
```
In this example, we create a `users` slice with an initial state containing `users` and `user`. The `createEnhancedSlice` function returns the slice, queryTypes, and selectors for accessing the state. The `cases` object defines the asynchronous actions associated with the slice.


To ignore the pregenerated reducers, set `ignoreDefaultReducers` to `true` in the options object:

```javascript

const { slice, queryTypes, selectors, reducer, actions } = createEnhancedSlice('users', {
  users: [],
  user: null,
}, {
  reducers: {
    setUsers: (state, action) => {
      state.queryTypes.users = action.payload;
    },
    setUser: (state, action) => {
      state.queryTypes.user = action.payload;
    },
  },
}, {
  debug: true, // Logs the generated selectors and actions to the console
  ignoreDefaultReducers: true // When set to true, the default reducers will not be generated NB this disables the setPageData function and can cause issues with the slice
});

```

Alternatively, you can use the `extraReducers` object to add additional reducers to the slice:

```javascript
  
const { slice, queryTypes, selectors, reducer, actions } = createEnhancedSlice('users', {
  users: [],
  user: null,
}, {
  reducers: {
    setUsers: (state, action) => {
      state.queryTypes.users = action.payload;
    },
    setUser: (state, action) => {
      state.queryTypes.user = action.payload;
    },
  },
}, {
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.queryTypes.users.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.queryTypes.users.isLoading = false;
      state.queryTypes.users.results = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.queryTypes.users.isLoading = false;
      state.queryTypes.users.errors = action.payload;
    },
    [fetchUser.pending]: (state, action) => {
      state.queryTypes.user.isLoading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.queryTypes.user.isLoading = false;
      state.queryTypes.user.results = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.queryTypes.user.isLoading = false;
      state.queryTypes.user.errors = action.payload;
    },
  }
});

```



## API Reference 📑

### createEnhancedSlice

The `createEnhancedSlice` function creates a Redux slice with the given name and initial state.

#### Parameters

- `name` (string): The name of the slice, used to identify it in the Redux store.
- `initialState` (object): The initial state of the slice.
- `cases` (object): An object containing the asynchronous actions associated with the slice.
- `reducers` (object): An object containing additional reducers for the slice.
- `extraReducers` (object): An object containing extra reducers for the slice.
- `options` (object): An object containing options for the slice. 
  - `HYDRATE` (boolean): Whether to include a `HYDRATE` action in the slice. Defaults to `''`.
  - `debug` (boolean): Whether to enable debug mode. Defaults to `false`.
  - `ignoreDefaultReducers` (boolean): Whether to ignore the default reducers. Defaults to `false`.
  - `shouldUseHydrate` (boolean): By default builders use HYDRATE and to over rule this behaviour you can disable it. Defaults to `true`.

#### Returns

An object containing the created slice, `queryTypes`, and `selectors`:

- `slice` (object): The created Redux slice.
- `queryTypes` (object): Maps the initial state keys to string values.
- `selectors` (object): Contains selector functions for each key in the `queryTypes` object.
- `reducer` (function): The reducer function for the slice.
- `actions` (object): Contains action creators for each key in the `queryTypes` object.


## License 📄

MIT License



