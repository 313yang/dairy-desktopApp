import { ipcRenderer } from 'electron';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import faceIcon from '../../images/face_icon.svg';
import loginButton from '../../images/login_button.svg';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > header {
    font-size: 69px;
    margin-bottom: 84px;
  }
`;
const ButtonBox = styled.button.attrs({ type: 'button' })`
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  > .button_box {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .text_box {
      display: flex;
      align-items: center;
      position: absolute;
      > p {
        font-size: 40px;
        margin-right: 20px;
        transition: color 0.5s ease;
      }
      > svg {
        path {
          transition: fill 0.5s ease;
        }
      }
    }
  }
  > .rainbow_box {
    position: absolute;
    width: 0;
    height: 130px;
    transition: width 0.5s ease;
    /* transform: scaley(0%, 0, 0); */
  }
  :hover {
    .button_box {
      .text_box {
        p {
          color: #fff;
        }
        > svg {
          path {
            fill: #fff;
          }
        }
      }
    }
    > .rainbow_box {
      /* transform: scaley(100%, 0, 0); */

      width: 760px;
      background: linear-gradient(
        90deg,
        #c10000 -0.9%,
        #ca8012 16.84%,
        #dbb325 33.49%,
        #577b32 52.3%,
        #1468b5 73.18%,
        #59139f 102.27%
      );
    }
  }
`;

const Main = () => {
  const navigation = useNavigate();

  return (
    <Container>
      <header>
        무지개같은 하루였어 <img src={faceIcon} alt="face icon" />
      </header>
      <ButtonBox>
        <div className="button_box">
          <img src={loginButton} alt="login button" />
          <div className="text_box">
            <p>로그인하고 일기쓰러가기</p>
            <svg
              width="40"
              height="34"
              viewBox="0 0 40 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.49442 13H29.3147C30.2751 13 31.5036 13.7754 33 15.3262V16.5C33 18.435 31.7716 19.6016 29.3147 20C20.336 19.4878 15.4558 19.0965 14.6741 18.8262C13.602 19.2104 12.3736 19.4024 10.9888 19.4024H2.74721C0.915736 19.0183 0 17.8516 0 15.9024C0 13.9675 1.83147 13 5.49442 13Z"
                fill="#222222"
              />
              <path
                d="M20.7305 0C33.556 9.16667 39.9688 15.0456 39.9688 17.6367C39.9688 21.1003 33.0221 26.4388 19.1289 33.6523C17.7096 33.3008 17 32.2331 17 30.4492V28.8477C17 28.2617 19.3177 26.8359 23.9531 24.5703C29.6953 20.8594 32.7227 18.5482 33.0352 17.6367C28.6081 13.1445 23.6211 9.04297 18.0742 5.33203L17.5273 2.67578C17.7487 1.60807 18.8164 0.716146 20.7305 0Z"
                fill="#222222"
              />
            </svg>
          </div>
        </div>

        <div className="rainbow_box" />
      </ButtonBox>
    </Container>
  );
};
export default Main;
