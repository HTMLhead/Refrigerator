import React from 'react';
import TodoAppWrapper from './component/presenter/wrappers/TodoAppWrapper';
import Header from './component/presenter/wrappers/Header';


import Path from './routes/routes';

function App() {
  return (
    <>
      <Header />
      <TodoAppWrapper>
        <Path />
      </TodoAppWrapper>
    </>
  );
}

export default App;
