import { INIT_DATA, ADD_DATA, UPDATE_DATA, HANDLE_PAGE } from './action';
// action creators
const initData = data => ({
  type: INIT_DATA,
  data,
});
const addData = data => ({
  type: ADD_DATA,
  data,
});
const updateData = data => ({
  type: UPDATE_DATA,
  data,
});
const handlePage = data => ({
  type: HANDLE_PAGE,
  data,
});

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_DATA': {
      return { ...state, tasks: action.data };
    }
    case 'ADD_DATA': {
      return { ...state, tasks: [...state.tasks, action.data] };
    }
    case 'UPDATE_DATA': {
      return { ...state, tasks: [...action.data] };
    }
    case 'HANDLE_PAGE': {
      return { ...state, page: action.data };
    }
    default:
      return state;
  }
};

export { todoReducer, initData, addData, updateData, handlePage };
