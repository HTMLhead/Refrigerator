import React, { useReducer, useEffect } from 'react';
import fetchData from '../util/fetchData';
import { todoReducer, initData, addData } from './todoReducer';

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

  const addTask = (e, taskState) => {
    const taskObj = {
      description: taskState.description,
      priority: taskState.priority,
      state: taskState.status,
      timelimit: taskState.timelimit,
      title: taskState.title,
    };
    dispatch(addData(taskObj));
  };

  useEffect(() => {
    fetchTask();
  }, []);
  return (
    <TodoContext.Provider value={{ state, dispatch, fetchTask, addTask }}>
      {children}
    </TodoContext.Provider>
  );
};
export { TodoProvider, TodoContext };
