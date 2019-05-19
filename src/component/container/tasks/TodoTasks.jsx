/* eslint-disable no-nested-ternary */
import React, { useContext, useState } from 'react';
import { TodoContext } from '../../../context/todoContext';

import DeadLine from '../deadLine/DeadLine';
import StatusTitle from '../../presenter/titles/StatusTitle';
import TaskTitle from '../../presenter/titles/TaskTitle';
import BinaryBtn from '../../presenter/buttons/BinaryBtn';
import StyledInput from '../../presenter/forms/StyledInput';
import StyledTextarea from '../../presenter/forms/StyledTextarea';
import SetterBtn from '../../presenter/buttons/SetterBtn';
import SetterContentWrapper from '../../presenter/wrappers/SetterContentWrapper';

import bStateHandler from '../../../util/bStateHandler';

const TodoTasks = () => {
  const { state, addTask } = useContext(TodoContext);
  const [bAddTodo, setBAddTodo] = useState(false);
  const [bAddDeadLine, setBAddDeadLine] = useState(false);
  const [bAddPriority, setBAddPriority] = useState(false);
  const [deadLine, setDeadLine] = useState('마감날짜');
  const [deadLineMonth, setDeadLineMonth] = useState(0);
  const [deadLineDate, setDeadLineDate] = useState(0);
  const [priorityNum, setPriorityNum] = useState(0);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const initInnerModal = () => {
    setBAddDeadLine(false);
    setBAddPriority(false);
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
          setDeadLine(`${deadLineMonth}. ${deadLineDate}`);
          bStateHandler(e, bAddDeadLine, setBAddDeadLine);
          return;
        }
      }
      if (deadLineDate <= 31 && deadLineDate >= 1) {
        setDeadLine(`${deadLineMonth} 월 ${deadLineDate} 일`);
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
    if (taskTitle === '') {
      bStateHandler(e, bAddTodo, setBAddTodo);
      return;
    }
    const obj = {
      description: taskDesc,
      priority: priorityNum,
      status: 'todo',
      timelimit: deadLine,
      title: taskTitle,
    };
    addTask(e, obj);
    bStateHandler(e, bAddTodo, setBAddTodo);
  };
  return (
    <>
      <StatusTitle>Todo</StatusTitle>
      {state.tasks ? state.tasks.map(v => <TaskTitle>{v.title}</TaskTitle>) : null}
      <BtnWrapper onClickCapture={initInnerModal}>
        {bAddTodo ? (
          <>
            <DeadLine />
            <StyledInput
              onChange={e => setTaskTitle(e.target.value)}
              placeholder="제목"
            />
            {bAddDeadLine ? (
              <SetterBtn>
                <SetterContentWrapper>
                  <SetterBtn onClick={e => dateSubmit(e, '내일')} inner>
                    내일
                  </SetterBtn>
                  <SetterBtn onClick={e => dateSubmit(e, '내일 모레')} inner>
                    내일 모레
                  </SetterBtn>
                  <StyledInput
                    onChange={e => setDeadLineMonth(e.target.value)}
                    inner
                    placeholder="월"
                  />
                  <StyledInput
                    onChange={e => setDeadLineDate(e.target.value)}
                    inner
                    placeholder="일"
                  />
                  <BinaryBtn onClick={e => dateSubmit(e, 'Date')}>제출</BinaryBtn>
                </SetterContentWrapper>
              </SetterBtn>
            ) : (
              <SetterBtn onClick={e => bStateHandler(e, bAddDeadLine, setBAddDeadLine)}>
                {deadLine}
              </SetterBtn>
            )}
            {bAddPriority ? (
              <SetterBtn>
                <SetterContentWrapper>
                  <SetterBtn onClick={e => prioritySubmit(e, 3)} inner bgColor="red">
                    빨강:최우선
                  </SetterBtn>
                  <SetterBtn onClick={e => prioritySubmit(e, 2)} inner bgColor="yellow">
                    노랑:중간
                  </SetterBtn>
                  <SetterBtn onClick={e => prioritySubmit(e, 1)} inner bgColor="green">
                    초록:최하위
                  </SetterBtn>
                </SetterContentWrapper>
              </SetterBtn>
            ) : (
              <SetterBtn
                onClick={e => bStateHandler(e, bAddPriority, setBAddPriority)}
                bgColor={
                  priorityNum === 3 ? 'red' : priorityNum === 2 ? 'yellow' : 'green'
                }
              >
                우선순위
              </SetterBtn>
            )}

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
