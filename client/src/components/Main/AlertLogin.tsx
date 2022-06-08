import { css } from '@emotion/react';
import axios from 'axios';

import { logger } from '../../utils/logger';

const off = css`
  display: none;
`;

const container = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 20px;
  box-shadow: 0px 3px 3px rgb(187, 187, 187);
  width: 300px;
  height: 150px;
  top: 6vh;
  right: -0.5vw;
  z-index: 100;
`;

const notiText = css`
  color: rgb(44, 44, 44);
`;

const guestBtn = css`
  cursor: pointer;
  font-weight: 600;
  color: rgb(170, 170, 170);
  &:hover {
    text-decoration: underline;
  }
`;

interface AlertLoginProps {
  modal: boolean;
  el: React.LegacyRef<HTMLDivElement>;
}

const AlertLogin = ({ modal, el }: AlertLoginProps) => {
  const guestLogin = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_API}/users/guest-login`, '', {
        withCredentials: true,
      })
      .then(() => {
        window.location.replace('/');
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  return (
    <div ref={el} css={modal ? container : off}>
      <div css={notiText}>로그인 후 이용 가능합니다.</div>
      <div css={guestBtn} onClick={guestLogin}>
        게스트 로그인
      </div>
    </div>
  );
};

export default AlertLogin;
