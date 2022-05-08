/* eslint-disable  @typescript-eslint/no-explicit-any */
import { css } from '@emotion/react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect } from 'react';
import type {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { GoogleLogin } from 'react-google-login';

import { logger } from '../../utils/logger';

const container = css`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: block;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  text-align: center;
`;

const hidden = css`
  display: none;
`;

const loginBox = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 10%;
  height: 30%;
  min-width: 320px;
  min-height: 330px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const loginButtonBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const naverBtn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    box-shadow: 0px 2px 2px rgb(221, 221, 221);
  }
`;

const kakoBtn = css`
  width: 200px;
  cursor: pointer;
  margin-bottom: 10px;
  border: 1px solid #fee500;
  border-radius: 7px;
  &:hover {
    box-shadow: 0px 2px 2px rgb(221, 221, 221);
  }
`;

const googleBtn = css`
  width: 200px;
  cursor: pointer;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  margin-bottom: 10px;
  &:hover {
    box-shadow: 0px 2px 2px rgb(221, 221, 221);
  }
`;

const guesstBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 45px;
  cursor: pointer;
  background-color: rgb(246, 246, 246);
  border: 1px solid rgb(224, 224, 224);
  border-radius: 5px;
  &:hover {
    box-shadow: 0px 2px 2px rgb(221, 221, 221);
  }
`;

const userIcon = css`
  color: rgb(82, 82, 82);
  font-size: 1.2em;
  margin-right: 5px;
`;

const guestText = css`
  color: rgb(82, 82, 82);
  font-size: 0.8em;
  font-weight: 600;
  margin-left: 5px;
`;

declare global {
  interface Window {
    naver: any;
    Kakao: any;
  }
}

interface LoginProps {
  login: React.LegacyRef<HTMLDivElement>;
  loginModal: boolean;
}

const Login = ({ login, loginModal }: LoginProps) => {
  const initializeNaverLogin = () => {
    const naverScript = document.createElement('script');
    naverScript.src =
      'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
    naverScript.type = 'text/javascript';
    document.head.append(naverScript);

    naverScript.addEventListener('load', () => {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: process.env.NEXT_APP_NAVER_CLIENT_ID,
        callbackUrl: process.env.NEXT_APP_REDIRECT_URI,
        isPopup: false,
        loginButton: { color: 'white', type: 3, height: '47' },
      });
      naverLogin.init();
      naverLogin.logout();
    });
  };

  const kakaoLoginHandler = () => {
    const { Kakao } = window;
    Kakao.Auth.login({
      scope: '',
      success: () => {
        Kakao.API.request({
          url: '/v2/user/me',
          success(res: { id: string }) {
            axios
              .post(
                `${process.env.REACT_APP_SERVER_API}/users/kakao-login`,
                {
                  identification: res.id,
                },
                { withCredentials: true },
              )
              .then(() => {
                window.location.replace('/');
              })
              .catch((error) => {
                logger.error(error);
              });
          },
        });
      },
    });
  };

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    const { googleId } = response as GoogleLoginResponse;
    axios
      .post(
        `${process.env.REACT_APP_SERVER_API}/users/google-login`,
        {
          identification: googleId,
        },
        { withCredentials: true },
      )
      .then(() => {
        window.location.replace('/');
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  const onFailure = (error: Error) => {
    logger.error(error);
  };

  const guestLogin = () => {
    axios
      .post(`${process.env.NEXT_APP_SERVER_API}/users/guest-login`, '', {
        withCredentials: true,
      })
      .then(() => {
        window.location.replace('/');
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  useEffect(() => {
    // if (typeof window !== 'undefined') {
    //   window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    // }

    void initializeNaverLogin();
  }, []);

  const handleClick = () => {
    const naverLoginButton = document.getElementById(
      'naverIdLogin_loginButton',
    );

    if (naverLoginButton) {
      naverLoginButton.click();
    }
  };

  return (
    <div css={loginModal ? container : hidden}>
      <div css={loginBox} ref={login}>
        <div css={loginButtonBox}>
          <div css={naverBtn}>
            <div id="naverIdLogin" css={hidden} />
          </div>
          <img
            src="img/btn-login-naver.png"
            alt="naver-login"
            onClick={handleClick}
            css={naverBtn}
          />
          <img
            src="img/btn-login-kakao.png"
            alt="naver-kakao"
            css={kakoBtn}
            onClick={kakaoLoginHandler}
          />
          <GoogleLogin
            clientId={process.env.NEXT_APP_GOOGLE_CLIENT_ID as string}
            render={(renderProps) => (
              <img
                src="img/btn-login-google.png"
                alt="naver-google"
                css={googleBtn}
                onClick={renderProps.onClick}
              />
            )}
            responseType={'id_token'}
            onSuccess={(e) => onSuccess(e)}
            onFailure={onFailure}
          />
          <div css={guesstBtn} onClick={guestLogin}>
            <FontAwesomeIcon icon={faUserPlus} css={userIcon} />
            <span css={guestText}>게스트 로그인</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
