import React from 'react';
import styled from 'styled-components';
import NavBtn from '../buttons/NavBtn';
import DoingIcon from '../icons/DoingIcon';
import DoneIcon from '../icons/DoneIcon';

const TodoNavWrapper = styled.div`
  padding-top: 10%;
  display: flex;
  flex-direction: column
  width: 30%;
  height: 90vh;
  background-color: #272727;
`;
const NavBtnContent = styled.span`
  font-size: 1.7rem;
  display: flex;
  align-items: center;
  margin-left: 5%;
`;

const TodoNav = () => {
  return (
    <TodoNavWrapper>
      <NavBtn>
        <DoingIcon />
        <NavBtnContent>할 일</NavBtnContent>
      </NavBtn>
      <NavBtn>
        <DoneIcon />
        <NavBtnContent>한 일</NavBtnContent>
      </NavBtn>
    </TodoNavWrapper>
  );
};

export default TodoNav;
