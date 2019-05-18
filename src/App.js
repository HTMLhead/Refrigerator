import React from 'react';
import TodoAppWrapper from './component/presenter/wrappers/TodoAppWrapper';
import Header from './component/presenter/wrappers/Header';
import TodoListWrapper from './component/presenter/wrappers/TodoListWrapper';
import TodoNav from './component/presenter/wrappers/TodoNav';

function App() {
  return (
    <>
      <Header />
      <TodoAppWrapper>
        <TodoNav />
        <TodoListWrapper />
      </TodoAppWrapper>
    </>
  );
}

export default App;
