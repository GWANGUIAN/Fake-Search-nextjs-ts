import { css } from '@emotion/react';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../redux/reducers';
import { logger } from '../utils/logger';

const withDrawalContainer = css`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: block;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  text-align: center;
`;

const confirmBox = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  max-width: 380px;
  width: 90%;
  height: 90%;
  max-height: 200px;
  border-radius: 15px;
  border: 1px solid rgb(235, 235, 235);
  box-shadow: 0px 4px 4px rgb(187, 187, 187);
  padding: 20px;
  box-sizing: border-box;
  z-index: 10;
`;

const withDrawalText = css`
  margin-top: 3%;
  flex: 1;
  font-size: 1.15em;
  font-weight: 600;
`;

const deleteInfo = css`
  flex: 1;
  font-size: 0.8em;
`;

const buttonBox = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const buttonCss = (isAccept: boolean, bgColor: string) => css`
  box-shadow: none;
  border: none;
  outline: inherit;
  cursor: pointer;
  width: 50px;
  min-width: 50px;
  height: 35px;
  margin-left: 10px;
  border-radius: 10px;
  color: rgb(255, 255, 255);
  font-size: 1.05em;
  font-weight: 500;
  background-color: ${bgColor};
  &:hover {
    background-color: ${isAccept
      ? 'inherit'
      : 'background-color: rgb(192, 192, 192)'};
  }
`;

interface Props {
  setConfirmWithdrawal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Withdrawal = ({ setConfirmWithdrawal }: Props) => {
  const { themeColor } = useSelector((state: RootState) => state.loginReducer);

  const submitWithrawal = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_API}/users/withdrawal`, {
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
    <div css={withDrawalContainer}>
      <div css={confirmBox}>
        <div css={withDrawalText}>탈퇴 하시겠습니까?</div>
        <div css={deleteInfo}>
          탈퇴 후, 계정 정보가 삭제되며,
          <br />
          모든 데이터는 복구가 불가능 합니다.
        </div>
        <div css={buttonBox}>
          <button
            css={buttonCss(false, 'rgb(192, 192, 192)')}
            onClick={() => {
              setConfirmWithdrawal(false);
            }}
          >
            취소
          </button>
          <button
            css={buttonCss(true, themeColor as string)}
            style={{
              backgroundColor: themeColor,
            }}
            onClick={submitWithrawal}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
