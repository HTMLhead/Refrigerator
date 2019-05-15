import React from 'react';
import TodoAppWrapper from './component/presenter/TodoAppWrapper';
import Header from './component/presenter/Header';
import TodoListWrapper from './component/presenter/TodoListWrapper';
import TodoNavWrapper from './component/presenter/TodoNavWrapper';

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
