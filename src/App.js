import React from 'react';
import TodoAppWrapper from './component/presenter/wrappers/TodoAppWrapper';
import Header from './component/presenter/wrappers/Header';
import TodoNav from './component/presenter/wrappers/TodoNav';

import Path from './routes/routes';

function App() {
  return (
    <>
      <Header />
      <TodoAppWrapper>
        <TodoNav />
        <Path />
      </TodoAppWrapper>
    </>
  );
}

export default App;
