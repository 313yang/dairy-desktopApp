import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Label, LinkButton } from 'style/styledComponents';
import styled from 'styled-components';
import BoxButton from 'renderer/components/BoxButton';
import { authService } from 'lib/fbase';
import { ErrorModal, SuccessModal } from 'renderer/components/modals/Modals';
import googleButton from '../../images/google_social_button.svg';
import githubButton from '../../images/github_social_button.svg';

// import { GithubAuthProvider } from 'firebase/auth';
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SocialButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  margin: 30px auto;
`;
const SocialButtons = styled.div`
  display: flex;
  width: 100%;
  > p {
    margin: 30px auto;
    font-size: 16px;
  }
`;
const SocialButton = styled.button.attrs({ type: 'button' })<{ bgUrl: string }>`
  background: ${({ bgUrl }) => `center  no-repeat url(${bgUrl})`};
  width: 50%;
  height: 100px;
`;

const Auth = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const signinInit = {
    email: '',
    password: '',
  };
  const [form, setForm] = useState(signinInit);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { email, password } = form;
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [loginError, setLoginError] = useState('');
  const handleError = (text: string) => {
    setIsError(true);
    setErrorMsg(text);
  };
  const handleSuccess = (text: string) => {
    setIsSuccess(true);
    setSuccessMsg(text);
  };
  const handleOnChange = (event) => {
    setLoginError('');
    const {
      target: { name, value },
    } = event;
    if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log('1');
    try {
      if (type === 'join') {
        createUserWithEmailAndPassword(authService, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user, getAuth());
            if (user) handleSuccess('회원가입이 완료됐습니다 ^^*');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode?.includes('email-already-in-use')) {
              console.log(
                errorCode,
                errorCode?.includes('email-already-in-use')
              );
              return handleError('이미 존재하는 이메일입니다.');
            }
          });
      } else {
        signInWithEmailAndPassword(authService, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            if (user) navigate('/home');
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            if (errorCode === 'auth/user-not-found')
              setLoginError('이메일이 존재하지 않아요');
            else if (errorCode === 'auth/wrong-password')
              setLoginError('비밀번호가 일치하지 않아요');
          });
      }
    } catch (error) {
      console.log('error:::', error);
    }
  };

  const onSocialLogin = async ({ target }) => {
    //   const { name } = target;
    //   let provider;
    //   if (name === 'google') {
    //     provider = new firebaseInstance()?.auth.GoogleAuthProvider();
    //   } else if (name === 'github') {
    //     provider = new firebaseInstance()?.auth.GithubAuthProvider();
    //   }
    //   await authService?.signInWithPopup(provider);
  };

  return (
    <Container>
      <ErrorModal
        show={isError}
        onClose={() => setIsError(false)}
        msg={errorMsg}
      />
      <SuccessModal
        show={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          navigate('/auth/login');
        }}
        msg={successMsg}
      />
      <Form onSubmit={handleOnSubmit}>
        <Label style={{ letterSpacing: 1.5 }}>
          이메일 &nbsp;:
          <Input
            name="email"
            type="email"
            placeholder="xxx@xxx.xxx"
            required
            value={email}
            onChange={handleOnChange}
          />
        </Label>
        <Label>
          비밀번호 :
          <Input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            required
            value={password}
            onChange={handleOnChange}
          />
        </Label>
        {type === 'join' && (
          <Label>
            비번확인 :
            <Input
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              required
              value={passwordConfirm}
              onChange={handleOnChange}
            />
          </Label>
        )}
        {loginError && <p>{loginError}</p>}
        {type === 'join' &&
          password.length > 0 &&
          passwordConfirm.length > 0 &&
          password !== passwordConfirm && <p>비밀번호가 일치하지 않아요!</p>}
        <BoxButton
          width="500px"
          text={type === 'login' ? '로그인' : '회원가입'}
        />
      </Form>
      <SocialButtonContainer>
        <p>- 또는 -</p>
        <SocialButtons>
          <SocialButton
            bgUrl={googleButton}
            name="google"
            onClick={onSocialLogin}
          />

          <SocialButton
            bgUrl={githubButton}
            name="github"
            onClick={onSocialLogin}
          />
        </SocialButtons>
        <p>으로 시작하기</p>
      </SocialButtonContainer>
      {type === 'login' ? (
        <LinkButton onClick={() => navigate('/auth/join')}>
          아직 회원이 아니신가요?
        </LinkButton>
      ) : (
        <LinkButton onClick={() => navigate('/auth/login')}>
          이미 회원이신가요?
        </LinkButton>
      )}
    </Container>
  );
};
export default Auth;
