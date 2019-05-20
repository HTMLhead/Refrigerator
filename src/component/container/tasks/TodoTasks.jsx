/* eslint-disable no-nested-ternary */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { TodoContext } from '../../../context/todoContext';

import StatusTitle from '../../presenter/titles/StatusTitle';
import TaskWrapper from '../../presenter/wrappers/TaskWrapper';
import BinaryBtn from '../../presenter/buttons/BinaryBtn';
import StyledInput from '../../presenter/forms/StyledInput';
import StyledTextarea from '../../presenter/forms/StyledTextarea';
import DeadLineComponent from './DeadLineComponent';
import PriorityComponent from './PriorityComponent';

import bStateHandler from '../../../util/bStateHandler';

const BtnWrapper = styled.div``;
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
const TodoTasks = () => {
  const {
    state,
    addTask,
    updateTaskStatus,
    createRandomId,
    updateTaskBEdit,
    updateTask,
    removeTask,
  } = useContext(TodoContext);
  const [bAddTodo, setBAddTodo] = useState(false);
  const [bAddDeadLine, setBAddDeadLine] = useState(false);
  const [bAddPriority, setBAddPriority] = useState(false);
  const [deadLine, setDeadLine] = useState('마감날짜');
  const [deadLineMonth, setDeadLineMonth] = useState(0);
  const [deadLineDate, setDeadLineDate] = useState(0);
  const [priorityNum, setPriorityNum] = useState(1);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const handleTaskStatus = (e, id) => {
    updateTaskStatus(e, id);
  };

  const handleTaskUpdate = (e, id) => {
    const obj = {
      description: taskDesc,
      priority: priorityNum,
      timelimit: deadLine,
      title: taskTitle,
      bEdit: false,
    };
    updateTask(e, id, obj);
  };

  const dateSubmit = (e, status) => {
    if (status === '내일') {
      setDeadLine('내일');
      bStateHandler(e, bAddDeadLine, setBAddDeadLine);
      return;
    }
    if (status === '내일 모레') {
      setDeadLine('내일 모레');
      bStateHandler(e, bAddDeadLine, setBAddDeadLine);
      return;
    }
    if (deadLineMonth <= 12 && deadLineMonth >= 1) {
      const shortMonthArr = [2, 4, 6, 9, 11];
      if (shortMonthArr.some(v => v === deadLineMonth)) {
        if (deadLineDate <= 30 && deadLineDate >= 1) {
          setDeadLine([deadLineMonth, deadLineDate]);
          bStateHandler(e, bAddDeadLine, setBAddDeadLine);
          return;
        }
      }
      if (deadLineDate <= 31 && deadLineDate >= 1) {
        setDeadLine([deadLineMonth, deadLineDate]);
        bStateHandler(e, bAddDeadLine, setBAddDeadLine);
        return;
      }
    }
    setDeadLine('날짜입력오류');
    bStateHandler(e, bAddDeadLine, setBAddDeadLine);
  };

  const prioritySubmit = (e, priorityValue) => {
    setPriorityNum(priorityValue);
    bStateHandler(e, bAddPriority, setBAddPriority);
  };

  const submitTask = e => {
    if (taskTitle === '' || deadLine === '날짜입력오류' || deadLine === '마감날짜') {
      bStateHandler(e, bAddTodo, setBAddTodo);
      return;
    }
    const id = createRandomId();
    const obj = {
      id,
      description: taskDesc,
      priority: priorityNum,
      status: 'todo',
      timelimit: deadLine,
      title: taskTitle,
      bEdit: false,
    };
    addTask(e, obj);
    bStateHandler(e, bAddTodo, setBAddTodo);
  };
  
  return (
    <>
      <StatusTitle>Todo</StatusTitle>
      {state.tasks !== undefined
        ? state.tasks.map(v => {
            if (v.status === 'todo' && v.Edit) {
                return (
                  <TaskWrapper key={v.id}>
                    <StyledInput
                      onChange={e => setTaskTitle(e.target.value)}
                      placeholder="제목"
                    />
                    <DeadLineComponent
                      bAddDeadLine={bAddDeadLine}
                      setBAddDeadLine={setBAddDeadLine}
                      setDeadLineMonth={setDeadLineMonth}
                      setDeadLineDate={setDeadLineDate}
                      dateSubmit={dateSubmit}
                      deadLine={deadLine}
                    />
                    <PriorityComponent
                      bAddPriority={bAddPriority}
                      setBAddPriority={setBAddPriority}
                      priorityNum={priorityNum}
                      prioritySubmit={prioritySubmit}
                    />
                    <StyledTextarea
                      onChange={e => setTaskDesc(e.target.value)}
                      placeholder="자세한 설명"
                    />
                    <EditBtn onClick={e => handleTaskUpdate(e, v.id)}>제출</EditBtn>
                  </TaskWrapper>
                );
              }
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
            })
        : null}
      <BtnWrapper>
        {bAddTodo ? (
          <>
            <StyledInput
              onChange={e => setTaskTitle(e.target.value)}
              placeholder="제목"
            />
            <DeadLineComponent
              bAddDeadLine={bAddDeadLine}
              setBAddDeadLine={setBAddDeadLine}
              setDeadLineMonth={setDeadLineMonth}
              setDeadLineDate={setDeadLineDate}
              dateSubmit={dateSubmit}
              deadLine={deadLine}
            />
            <PriorityComponent
              bAddPriority={bAddPriority}
              setBAddPriority={setBAddPriority}
              priorityNum={priorityNum}
              prioritySubmit={prioritySubmit}
            />
            <StyledTextarea
              onChange={e => setTaskDesc(e.target.value)}
              placeholder="자세한 설명"
            />
            <BinaryBtn onClick={submitTask}>제출</BinaryBtn>
          </>
        ) : (
          <BinaryBtn onClick={e => bStateHandler(e, bAddTodo, setBAddTodo)}>
            + 할 일 추가
          </BinaryBtn>
        )}
      </BtnWrapper>
    </>
  );
};

export default TodoTasks;
