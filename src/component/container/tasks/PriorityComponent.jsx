/* eslint-disable no-nested-ternary */
import React from 'react';

import SetterBtn from '../../presenter/buttons/SetterBtn';
import SetterContentWrapper from '../../presenter/wrappers/SetterContentWrapper';
import bStateHandler from '../../../util/bStateHandler';

const PriorityComponent = ({
  bAddPriority,
  setBAddPriority,
  priorityNum,
  prioritySubmit,
}) => {
  return bAddPriority ? (
    <SetterBtn>
      <SetterContentWrapper>
        <SetterBtn onClick={e => prioritySubmit(e, '3')} inner bgColor="red">
          빨강:최우선, 3
        </SetterBtn>
        <SetterBtn onClick={e => prioritySubmit(e, '2')} inner bgColor="yellow">
          노랑:중간, 2
        </SetterBtn>
        <SetterBtn onClick={e => prioritySubmit(e, '1')} inner bgColor="green">
          초록:최하위, 1
        </SetterBtn>
      </SetterContentWrapper>
    </SetterBtn>
  ) : (
    <SetterBtn
      onClick={e => bStateHandler(e, bAddPriority, setBAddPriority)}
      bgColor={priorityNum === '3' ? 'red' : priorityNum === '2' ? 'yellow' : 'green'}
    >
      우선순위
    </SetterBtn>
  );
};

export default PriorityComponent;
