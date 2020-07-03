import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    margin-right: 10px;
    border: 0;
    background: #5859;
    height: 50px;
    width: 100px;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
  }
`;
export const Infos = styled.div`

  margin: 0 auto;
  height: 500px;

  div {
      display: flex;
      flex-direction: column;
  }

  span {
     font-size: 20px;
     font-weight: bold;
     color: #585798;
  }

`;

export default styled;