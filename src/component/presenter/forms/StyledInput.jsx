import styled from 'styled-components';

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

export default StyledInput;
