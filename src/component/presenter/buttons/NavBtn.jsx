import styled from 'styled-components';

const NavBtn = styled.div`
  display: flex;
  padding: 5%;
  width: 100%;
  font-size: 1.3rem;
  color: #fff;
  cursor: pointer;
  &:hover {
    trainsition: background;
    background-color: #363636;
    font-weight: bold;
  }
`;

export default NavBtn;
