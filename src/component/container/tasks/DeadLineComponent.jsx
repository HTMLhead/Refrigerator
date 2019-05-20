import React from 'react';

import SetterBtn from '../../presenter/buttons/SetterBtn';
import SetterContentWrapper from '../../presenter/wrappers/SetterContentWrapper';
import StyledInput from '../../presenter/forms/StyledInput';
import bStateHandler from '../../../util/bStateHandler';
import BinaryBtn from '../../presenter/buttons/BinaryBtn';

const DeadLineComponent = ({
  bAddDeadLine,
  setBAddDeadLine,
  setDeadLineMonth,
  setDeadLineDate,
  dateSubmit,
  deadLine,
}) => {
  if (!bAddDeadLine) {
    return (
      <SetterBtn onClick={e => bStateHandler(e, bAddDeadLine, setBAddDeadLine)}>
        {typeof deadLine === 'string' ? deadLine : `${deadLine[0]}월 ${deadLine[1]}일`}
      </SetterBtn>
    );
  }
  return (
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
  );
};

export default DeadLineComponent;
