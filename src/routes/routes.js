import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TodoList from '../component/presenter/wrappers/TodoList';
import { TodoProvider } from '../context/todoContext';

const Path = () => {
  return (
    <TodoProvider>
      <Router>
        <Route path="/" exact component={TodoList} />
      </Router>
    </TodoProvider>
  );
};

export default Path;
