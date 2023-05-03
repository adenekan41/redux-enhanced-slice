
# 🌜 Redux Enhanced Slice 🌛

`redux-enhanced-slice` is an NPM package that simplifies the creation of Redux slices by providing standardized cases for handling asynchronous actions and generating selectors for accessing the slice state. 🎉


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

const { slice, queryTypes, selectors } = createEnhancedSlice('users', {
  users: [],
  user: null,
}, {
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { 
  fetchUsers, 
  fetchUser, 
  setPageData // Internal action for setting page data
} = slice.actions;

const { selectUsersUsers, selectUsersUser } = selectors; // pre-generated selectors for accessing state

const { users, user } = queryTypes; // pre-generated query types for accessing state types in selectors
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

## API Reference 📑

### createEnhancedSlice

The `createEnhancedSlice` function creates a Redux slice with the given name and initial state.

#### Parameters

- `name` (string): The name of the slice, used to identify it in the Redux store.
- `initialState` (object): The initial state of the slice.

#### Returns

An object containing the created slice, `queryTypes`, and `selectors`:

- `slice` (object): The created Redux slice.
- `queryTypes` (object): Maps the initial state keys to string values.
- `selectors` (object): Contains selector functions for each key in the `queryTypes` object.

... STILL IN PROGRESS

## License 📄

MIT License



