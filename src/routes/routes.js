import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TodoList from '../component/presenter/wrappers/TodoList';
import DoneList from '../component/presenter/wrappers/DoneList';
import TodoNav from '../component/presenter/wrappers/TodoNav';
import { TodoProvider } from '../context/todoContext';

const Path = () => {
  return (
    <TodoProvider>
      <Router>
        <TodoNav />
        <Route path="/" exact component={TodoList} />
        <Route path="/todo" exact component={TodoList} />
        <Route path="/done" exact component={DoneList} />
      </Router>
    </TodoProvider>
  );
};

export default Path;
