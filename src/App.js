import React from 'react';
import TodoAppWrapper from './component/presenter/wrappers/TodoAppWrapper';
import Header from './component/presenter/wrappers/Header';
import TodoListWrapper from './component/presenter/wrappers/TodoListWrapper';
import TodoNavWrapper from './component/presenter/wrappers/TodoNavWrapper';

function App() {
  return (
    <>
      <Header />
      <TodoAppWrapper>
        <TodoNavWrapper />
        <TodoListWrapper />
      </TodoAppWrapper>
    </>
  );
}

export default App;
