import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
        
`;

export const Main = styled.div`
    margin:  0 auto;
    
    display: flex;
    justify-content: center;
    width: 500px;
    height: 400px;
    flex-direction: column;
    border: 1px solid #9a9a9a;
    padding: 50px;

    form {
        display: flex;
        flex-direction: column;
    }
    input {
        border: 0;
        background: #DDDDDD;
        border-radius: 10px;
        height: 36px;
        margin-bottom: 10px;
        padding: 16px;
    }
    button {
        border: 0;
        height: 72px;
        background: #243E80;
        color: #fff;
        border-radius: 10px;
        margin-top: 16px;
        cursor: pointer;
    }
`;

export default styled;