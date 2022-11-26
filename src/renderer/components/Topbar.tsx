import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import goBack from '../../images/next_icon.svg';
import lightMode from '../../images/light.svg';
import faceIcon from '../../images/user.svg';
import logoutBox from '../../images/logout_box.svg';
import { Button } from 'style/styledComponents';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  position: absolute;
  width: 100%;
  position: relative;
  > .loginBox {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background: center no-repeat url(${logoutBox});
    background-size: 100%;
    width: 100px;
    height: 100%;
    top: 70px;
    left: 50px;
  }
`;

const Topbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showLogoutBox, setShowLogoutBox] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setShowLogoutBox(false);
        navigate('/');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Container>
      {pathname?.includes('auth') ? (
        <Button onClick={() => navigate('/')}>
          <img
            style={{ transform: 'rotate(-180deg)' }}
            src={goBack}
            alt="goback icon"
          />
        </Button>
      ) : (
        <>
          {pathname === '/home' ? (
            <>
              {showLogoutBox && (
                <div className="loginBox">
                  <Button onClick={logout}>로그아웃</Button>
                </div>
              )}
              <Button onClick={() => setShowLogoutBox(true)}>
                <img src={faceIcon} alt="goback icon" />
              </Button>
            </>
          ) : (
            <div />
          )}
        </>
      )}

      <Button>
        <img src={lightMode} alt="goback icon" />
      </Button>
    </Container>
  );
};
export default Topbar;
