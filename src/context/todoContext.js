import React, { useReducer, useEffect } from 'react';
import fetchData from '../util/fetchData';
import { todoReducer, initData } from './todoReducer';

const TodoContext = React.createContext();

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    page: 'todo',
  });

  const fetchTask = async () => {
    const dataUrl = 'http://localhost:5000/task/init';
    const jsonHeader = {
      'Content-Type': 'application/json',
    };
    const body = {
      code: 'summerCoding',
    };
    const tasks = await fetchData(dataUrl, 'POST', jsonHeader, JSON.stringify(body));
    dispatch(initData(tasks.tasks));
  };

  useEffect(() => {
    fetchTask();
  }, []);
  return (
    <TodoContext.Provider value={{ state, dispatch, fetchTask }}>
      {children}
    </TodoContext.Provider>
  );
};
// title, description, state, limitdate, priority
export { TodoProvider, TodoContext };
