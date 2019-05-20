import React from 'react';
import styled from 'styled-components';
import DoneTasks from '../../container/tasks/DoneTask';

const DoneListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 90vh;
  background-color: #1e1e1e;
  padding: 3%;
`;

const DoneList = () => {
  return (
    <DoneListWrapper>
      <DoneTasks />
    </DoneListWrapper>
  );
};

export default DoneList;
