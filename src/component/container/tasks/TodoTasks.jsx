import React, { useContext } from 'react';
import styled from 'styled-components';
import { TodoContext } from '../../../context/todoContext';

const State = styled.div`
  color: #fff;
  width: 20%;
  margin: 5%;
  padding: 3%;
  border: 0.2rem solid #fff;
  font-size: 2rem;
  text-align: center;
`;
const TaskTitle = styled.div`
  color: #fff;
  width: 100%;
  padding: 2%;
  border-bottom: 0.1rem solid #272727;
  font-size: 1.3rem;
`;
const TaskAddBtn = styled.div`
  color: #fff;
  padding: 2%;
  font-size: 1.3rem;
  cursor: pointer;
  &:hover {
    width: 20%;
    border-bottom: 0.2rem solid #fff;
  }
`;
const TodoTasks = () => {
  const { state } = useContext(TodoContext);
  return (
    <>
      <State>Todo</State>
      {state.tasks ? state.tasks.map(v => <TaskTitle>{v.title}</TaskTitle>) : null}
      <TaskAddBtn>+ 할 일 추가</TaskAddBtn>
    </>
  );
};

export default TodoTasks;
