import React from 'react';
import styled from 'styled-components';
import NavBtn from '../buttons/NavBtn';

const TodoNavWrapper = styled.div`
  padding-top: 10%;
  display: flex;
  flex-direction: column
  width: 30%;
  height: 90vh;
  background-color: #272727;
`;

const TodoNav = () => {
  return (
    <TodoNavWrapper>
      <NavBtn>할 일</NavBtn>
      <NavBtn>한 일</NavBtn>
    </TodoNavWrapper>
  );
};

export default TodoNav;
