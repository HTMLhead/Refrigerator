import React from 'react';
import styled from 'styled-components';
import TodoTasks from '../../container/tasks/TodoTasks';

const TodoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 90vh;
  background-color: #1e1e1e;
  padding: 3%;
`;

const TodoList = () => {
  return (
    <TodoListWrapper>
      <TodoTasks />
    </TodoListWrapper>
  );
};

export default TodoList;
