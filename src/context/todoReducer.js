import { INIT_DATA } from './action';
// action creators
const initData = data => ({
  type: INIT_DATA,
  data,
});

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_DATA': {
      return { ...state, tasks: action.data };
    }
    default:
      return state;
  }
};

export { todoReducer, initData };
