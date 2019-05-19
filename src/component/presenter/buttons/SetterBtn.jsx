import styled from 'styled-components';

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

export default SetterBtn;
