import styled from 'styled-components';

const DoneIcon = styled.div`
  padding: 5%;
  position: relative
  border: 0.3rem solid #fff;
  border-radius: 5px;
  margin: 1%;
  &::after {
    content: '';
    position :absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%) rotate(45deg);
    border-radius: 3px;
    padding-right: 24%;
    padding-bottom: 48%
    border-bottom: 0.3rem solid #fff;
    border-right: 0.3rem solid #fff
  }
`;

export default DoneIcon;
