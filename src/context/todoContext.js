/* eslint-disable no-param-reassign */
import React, { useReducer, useEffect } from 'react';
import fetchData from '../util/fetchData';
import { todoReducer, initData, addData, updateData, handlePage } from './todoReducer';

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

  const handleShowingStatus = status => {
    dispatch(handlePage(status));
  };

  const createRandomId = () => {
    const ranNum = Math.floor(Math.random() * 100);
    const idArrays = state.tasks.map(obj => obj.id);
    if (idArrays.includes(ranNum)) {
      return createRandomId();
    }
    return String(ranNum);
  };

  const addTask = (e, taskState) => {
    const taskObj = {
      id: taskState.id,
      description: taskState.description,
      priority: taskState.priority,
      status: taskState.status,
      timelimit: taskState.timelimit,
      title: taskState.title,
      bEdit: taskState.bEdit,
    };
    dispatch(addData(taskObj));
  };

  const removeTask = (e, id) => {
    const target = state.tasks.filter(v => {
      return v.id !== id;
    });
    dispatch(updateData(target));
  };

  const updateTask = (e, id, taskState) => {
    const target = state.tasks.map(v => {
      if (v.id === id) {
        v.description = taskState.description;
        v.priority = taskState.priority;
        v.timelimit = taskState.timelimit;
        v.title = taskState.title;
        v.bEdit = false;
        return v;
      }
      return v;
    });
    dispatch(updateData(target));
  };

  const updateTaskBEdit = (e, id) => {
    const target = state.tasks.map(v => {
      if (id === v.id) {
        v.bEdit = true;
        return v;
      }
      return v;
    });
    dispatch(updateData(target));
  };

  const updateTaskStatus = (e, id) => {
    const target = state.tasks.map(v => {
      if (v.id === id) {
        v.status = v.status === 'todo' ? 'done' : 'todo';
        return v;
      }
      return v;
    });
    dispatch(updateData(target));
  };

  const sortTasks = () => {
    const sortedTask = state.tasks.sort((befTask, curTask) => {
      return curTask.priority - befTask.priority;
    });
    dispatch(updateData(sortedTask));
  };
  const checkDeadLine = () => {
    const now = new Date();
    const nowDate = now.getDate();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    state.tasks.map(v => {
      if (v.timelimit === '내일') {
        v.timelimit = [nowMonth + 1, nowDate + 1];
        return v;
      }
      if (v.timelimit === '내일 모레') {
        v.timelimit = [nowMonth + 1, nowDate + 2];
        return v;
      }
      const deadLine = new Date(nowYear, v.timelimit[0] - 1, v.timelimit[1]);
      if (deadLine < now) {
        v.timelimit = '기간 만료';
        return v;
      }
      return v;
    });
  };

  useEffect(() => {
    if (state.tasks === undefined) return;
    sortTasks();
    checkDeadLine();
  }, [state.tasks]);
  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        fetchTask,
        addTask,
        updateTask,
        updateTaskStatus,
        createRandomId,
        updateTaskBEdit,
        removeTask,
        handleShowingStatus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export { TodoProvider, TodoContext };
