import styled from 'styled-components';

const Header = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 10vh;
  background-color: #272727;
  &::after {
    content: '';
    position: absolute;
    height: 0.1vh;
    bottom: 0;
    width: 100%;
    box-shadow: 0px 5px 5px #000;
  }
`;

export default Header;
