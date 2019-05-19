import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { TodoContext } from '../../../context/todoContext';

import DeadLine from '../deadLine/DeadLine';

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
const BinaryBtn = styled.div`
  text-align: center;
  display: block;
  color: #fff;
  padding: 2%;
  font-size: 1.3rem;
  cursor: pointer;
  &:hover {
    border-bottom: 0.2rem solid #fff;
  }
`;

const StyledInput = styled.input`
  display: inline-block;
  outline: none;
  margin: 1%;
  padding: 1%;
  border: 0.1rem solid #272727;
  background-color: #000;
  color: #fff;
  border-radius: 0.1rem;
  font-size: 1.3rem;
  position: relative;
  width: ${props => (props.inner ? '20%' : '50%')};
`;
const StyledTextarea = styled.textarea`
  outline: none;
  margin: 1%;
  padding: 1%;
  border: 0.1rem solid #272727;
  background-color: #000;
  color: #fff;
  border-radius: 0.1rem;
  font-size: 1.3rem;
  position: relative;
  width: 100%;
`;
const SetterBtn = styled.div`
  position:relative;
  display:inline-block;
  cursor: pointer;
  font-size: 1.3rem;
  background-color: ${props => (props.bgColor ? props.bgColor : '#000')};
  outline: none;
  width: ${props => (props.inner ? '100%' : '20%')}
  padding: 1%;
  margin: 1%;
  color: ${props => (props.bgColor ? '#000' : '#757575')};
  border: 0.1rem solid #272727;
  &:hover {
    color:#fff;
  }
`;

const DateSetterWrapper = styled.div`
  background-color: #000;
  z-index: 3;
  position: absolute;
  width: 150%;
  top: 0;
  left: 0;
  padding: 3%;
  border: 0.1rem solid #272727;
`;

const BtnWrapper = styled.div``;

const bStateHandler = (e, state, setter) => {
  setter(!state);
};

const TodoTasks = () => {
  const { state, addTask } = useContext(TodoContext);
  const [bAddTodo, setBAddTodo] = useState(true);
  const [bAddDeadLine, setBAddDeadLine] = useState(true);
  const [bAddPriority, setBAddPriority] = useState(true);
  const [deadLine, setDeadLine] = useState('마감날짜');
  const [deadLineMonth, setDeadLineMonth] = useState(0);
  const [deadLineDate, setDeadLineDate] = useState(0);
  const [priorityNum, setPriorityNum] = useState(0);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

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
      <State>Todo</State>
      {state.tasks ? state.tasks.map(v => <TaskTitle>{v.title}</TaskTitle>) : null}
      <BtnWrapper>
        {bAddTodo ? (
          <>
            <DeadLine />
            <StyledInput
              onChange={e => setTaskTitle(e.target.value)}
              placeholder="제목"
            />
            {bAddDeadLine ? (
              <SetterBtn>
                <DateSetterWrapper>
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
                </DateSetterWrapper>
              </SetterBtn>
            ) : (
              <SetterBtn onClick={e => bStateHandler(e, bAddDeadLine, setBAddDeadLine)}>
                {deadLine}
              </SetterBtn>
            )}
            {bAddPriority ? (
              <SetterBtn>
                <DateSetterWrapper>
                  <SetterBtn onClick={e => prioritySubmit(e, 3)} inner bgColor="red">
                    빨강:최우선
                  </SetterBtn>
                  <SetterBtn onClick={e => prioritySubmit(e, 2)} inner bgColor="yellow">
                    노랑:중간
                  </SetterBtn>
                  <SetterBtn onClick={e => prioritySubmit(e, 1)} inner bgColor="green">
                    초록:최하위
                  </SetterBtn>
                </DateSetterWrapper>
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
