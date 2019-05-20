/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { TodoContext } from '../../../context/todoContext';

import StatusTitle from '../../presenter/titles/StatusTitle';
import TaskWrapper from '../../presenter/wrappers/TaskWrapper';

const TaskTitle = styled.div`
  display: block;
`;
const TaskDesc = styled.div`
  margin-right: 10%;
  display: block;
  top: 0;
  left: 10%;
  width: 80%;
`;
const TaskTimeLimit = styled.div`
  display: inline-block;
  float: right;
  margin-right: 3rem;
`;
const TaskPriority = styled.div`
  display: inline-block;
  float: right;
  margin-right: 1rem;
`;
const CheckBtn = styled.div`
  position: absolute;
  left: 0%;
  border: 0.3rem solid #fff;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  &:hover {
    background-color: #fff;
  }
`;
const EditBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 2rem;
`;
const RemoveBtn = styled.div`
  position: absolute;
  top: 0;
  right: 4rem;
  width: 3rem;
  height: 2rem;
`;
const DoneTask = () => {
  const { state, updateTaskStatus, updateTaskBEdit, removeTask } = useContext(
    TodoContext,
  );

  const handleTaskStatus = (e, id) => {
    updateTaskStatus(e, id);
  };

  return (
    <>
      <StatusTitle>Done</StatusTitle>
      {state.tasks !== undefined
        ? state.tasks.map(v => {
            if (v.status === 'done') {
              return (
                <TaskWrapper key={v.id}>
                  <CheckBtn onClick={e => handleTaskStatus(e, v.id)} />
                  <TaskTitle>{v.title}</TaskTitle>
                  <TaskDesc>{v.description}</TaskDesc>
                  <TaskTimeLimit>
                    데드라인 :{' '}
                    {typeof v.timelimit === 'string'
                      ? v.timelimit
                      : `${v.timelimit[0]} 월 ${v.timelimit[1]} 일`}
                  </TaskTimeLimit>
                  <TaskPriority>우선순위 : {v.priority}</TaskPriority>
                  <RemoveBtn onClick={e => removeTask(e, v.id)}>제거</RemoveBtn>
                  <EditBtn onClick={e => updateTaskBEdit(e, v.id)}>수정</EditBtn>
                </TaskWrapper>
              );
            }
            return null;
          })
        : null}
    </>
  );
};

export default DoneTask;
