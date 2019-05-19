import { INIT_DATA, ADD_DATA } from './action';
// action creators
const initData = data => ({
  type: INIT_DATA,
  data,
});
const addData = data => ({
  type: ADD_DATA,
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
    default:
      return state;
  }
};

export { todoReducer, initData, addData };
