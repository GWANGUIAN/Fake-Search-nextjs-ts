import { css } from '@emotion/react';
import {
  faMinusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeProfile, resetProfile } from '../redux/actions';
import type { RootState } from '../redux/reducers';
import {
  alignItems,
  flex,
  hidden,
  sectionDeleteBtn,
  sectionOpenBtn,
  sectionTitle,
} from '../styles/global';
import type {
  ProfileInfo,
  ProfileSubInfo,
  ProfileSubInfoContent,
} from '../types/state';
import { logger } from '../utils/logger';
import ImageUpload from './ImageUpload';

const profileSetContainer = css`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid rgb(212, 212, 212);
  box-shadow: 0px 2px 5px rgb(187, 187, 187);
  border-radius: 10px;
  width: 100%;
  margin: 5px auto;
  box-sizing: border-box;
  padding: 5px 10px;
  overflow-x: hidden;
`;

const mainInfoBox = css`
  display: flex;
  height: 50px;
  align-items: center;
  padding-left: 5px;
`;

const profileNameInput = css`
  font-size: 1.2em;
  font-weight: 500;
  width: 100px;
`;

const profileJobInput = css`
  font-size: 1.1em;
  font-weight: 500;
  color: rgb(149, 149, 149);
  width: 100px;
`;

const detailInfoBox = css`
  display: flex;
  align-items: center;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 2px;
  }
  &::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: gray;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgb(214, 214, 214);
    border-radius: 10px;
  }
`;

const profileImage = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0px 3px 10px 0;
  border-radius: 10px;
  position: relative;
`;

const profileImageLine = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 160px;
  @media (max-width: 753px) {
    height: 160px;
    width: 120px;
  }
`;

const profileImageDeleteBtn = css`
  color: rgb(78, 78, 78);
  cursor: pointer;
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 1.2em;
  background-color: white;
  border-radius: 50%;
`;

const detailTextBox = css`
  display: grid;
  grid-template-columns: auto auto auto;
  row-gap: 3px;
  column-gap: 5px;
  margin-bottom: auto;
  padding-left: 10px;
`;

const detailTilte = css`
  width: 80px;
  font-weight: 450;
  font-size: 1.1em;
  color: rgb(59, 59, 59);
`;

const detailContent = css`
  width: 80px;
  font-weight: 400;
  color: rgb(63, 63, 63);
`;

const detailDeleteBtn = css`
  margin: auto 0;
  cursor: pointer;
  color: rgb(78, 78, 78);
`;

const detailAddBtn = css`
  grid-column: 1 / 4;
  border: inherit;
  outline: inherit;
  cursor: pointer;
  height: 35px;
  border-radius: 5px;
  color: rgb(85, 85, 85);
  font-size: 1.05em;
  font-weight: 500;
  margin: 0 auto;
  background-color: inherit;
  &:hover {
    background-color: rgb(245, 245, 245);
  }
`;

const subInfoBox = css`
  border-top: 1px solid rgb(212, 212, 212);
  margin: 5px;
  padding: 5px 0px;
`;

const subInfTitleBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px 0px 10px;
`;

const subInfoTitle = css`
  font-size: 1.15em;
  font-weight: 450;
  color: rgb(63, 63, 63);
  width: 70px;
  margin-bottom: 5px;
`;

const subInfoDeleteBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const subInfoDeleteBtn = css`
  margin: auto 05px auto 0;
  color: rgb(78, 78, 78);
`;

const subInfoContentBox = css`
  display: flex;
  justify-items: center;
  margin: 5px 0px;
  @media (max-width: 753px) {
    overflow-x: auto;
    &::-webkit-scrollbar {
      height: 2px;
    }
    &::-webkit-scrollbar-thumb {
      height: 17%;
      background-color: gray;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: rgb(214, 214, 214);
      border-radius: 10px;
    }
  }
`;

const elOfSubInfo = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const subInfoImage = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
`;

const subInfoImageLine = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 120px;
  border-radius: 10px;
  @media (max-width: 753px) {
    height: 130px;
    width: 110px;
    p {
      display: none;
    }
  }
`;

const subInfoImageDeleteBtn = css`
  position: absolute;
  cursor: pointer;
  color: rgb(78, 78, 78);
  top: 3px;
  right: 3px;
  background-color: white;
  border-radius: 50%;
`;

const subInfoContentTitle = css`
  width: 120px;
  text-align: center;
  margin-top: 3px;
  color: rgb(80, 80, 80);
`;

const subInfoElementDeleteBtn = css`
  margin: 10px 0;
  cursor: pointer;
  color: rgb(78, 78, 78);
`;

const subInfoContentAddBtn = css`
  border: inherit;
  outline: inherit;
  cursor: pointer;
  height: 35px;
  width: 80px;
  min-width: 60px;
  border-radius: 5px;
  color: rgb(85, 85, 85);
  font-size: 1.05em;
  font-weight: 500;
  margin: auto 2px;
  background-color: inherit;
  &:hover {
    background-color: rgb(245, 245, 245);
  }
`;

const subInfoAddBtn = css`
  border: none;
  outline: inherit;
  cursor: pointer;
  height: 35px;
  width: 150px;
  border-radius: 5px;
  color: rgb(85, 85, 85);
  font-size: 1.05em;
  font-weight: 500;
  margin: 0 auto;
  background-color: inherit;
  &:hover {
    background-color: rgb(245, 245, 245);
  }
`;

interface PropsOfElOfSubInfo {
  el: ProfileSubInfoContent;
  id: number;
  index: number;
}

const ElOfSubinfo = ({ el, id, index }: PropsOfElOfSubInfo) => {
  const dispatch = useDispatch();
  const { subinfo } = useSelector((state: RootState) => state.profileReducer);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = [...subinfo];
    data[id].content[index] = {
      ...data[id].content[index],
      [e.target.name]: e.target.value,
    };
    dispatch(changeProfile({ subinfo: data }));
  };

  const deleteSubinfoContent = () => {
    const data = [...subinfo];
    data[id].content.splice(index, 1);
    dispatch(changeProfile({ subinfo: data }));
  };

  const onDrop = (pictureFiles: File[]) => {
    const body = new FormData();
    body.append('files', pictureFiles[0]);
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/post/upload_files`, body, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        const data = [...subinfo];
        data[id].content[
          index
        ].image = `${process.env.REACT_APP_SERVER_API}/${res.data.filename}`;
        dispatch(
          changeProfile({
            subinfo: data,
          }),
        );
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  const deleteSubinfoImg = () => {
    const data = [...subinfo];
    data[id].content[index].image = '';
    dispatch(
      changeProfile({
        subinfo: data,
      }),
    );
  };

  return (
    <div css={elOfSubInfo}>
      <div css={subInfoImage}>
        <div css={subInfoImageLine}>
          <ImageUpload onDrop={onDrop} imageData={el.image} />
        </div>
        {el.image !== '' && (
          <FontAwesomeIcon
            css={subInfoImageDeleteBtn}
            icon={faTimesCircle}
            onClick={deleteSubinfoImg}
          />
        )}
      </div>
      <input
        type="text"
        placeholder="제목"
        value={el.title}
        css={subInfoContentTitle}
        name="title"
        onChange={handleInput}
      />
      {index !== 0 && (
        <FontAwesomeIcon
          css={subInfoElementDeleteBtn}
          icon={faMinusCircle}
          onClick={deleteSubinfoContent}
        />
      )}
    </div>
  );
};

interface PropsOfSubInfo {
  profileSubInfo: ProfileSubInfo;
  id: number;
}

const BoxOfSubinfo = ({ profileSubInfo, id }: PropsOfSubInfo) => {
  const dispatch = useDispatch();
  const { subinfo } = useSelector((state: RootState) => state.profileReducer);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = [...subinfo];
    data[id] = { ...data[id], [e.target.name]: e.target.value };
    dispatch(changeProfile({ subinfo: data }));
  };

  const deleteSubinfo = () => {
    const data = [...subinfo];
    data.splice(id, 1);
    dispatch(changeProfile({ subinfo: data }));
  };

  const addSubinfoContent = () => {
    const data = [...subinfo];
    data[id].content.push({ image: '', title: '' });
    dispatch(changeProfile({ subinfo: data }));
  };

  return (
    <div css={subInfoBox}>
      <div css={subInfTitleBox}>
        <input
          type="text"
          css={subInfoTitle}
          placeholder="타입"
          value={profileSubInfo.title}
          name="title"
          onChange={handleInput}
        />
        <div css={subInfoDeleteBox} onClick={deleteSubinfo}>
          <FontAwesomeIcon css={subInfoDeleteBtn} icon={faMinusCircle} />
          <div>삭제</div>
        </div>
      </div>
      <div css={subInfoContentBox}>
        {profileSubInfo.content.map((el, index) => (
          <ElOfSubinfo key={index} el={el} index={index} id={id} />
        ))}
        {profileSubInfo.content.length < 5 && (
          <button css={subInfoContentAddBtn} onClick={addSubinfoContent}>
            + 추가
          </button>
        )}
      </div>
    </div>
  );
};

interface PropsOfProfileDetail {
  profileInfo: ProfileInfo;
  id: number;
}

function ElOfDetilText({ profileInfo, id }: PropsOfProfileDetail) {
  const dispatch = useDispatch();
  const { info } = useSelector((state: RootState) => state.profileReducer);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = [...info];
    data[id] = { ...data[id], [e.target.name]: e.target.value };
    dispatch(changeProfile({ info: data }));
  };

  const deleteInfo = () => {
    const data = [...info];
    data.splice(id, 1);
    dispatch(changeProfile({ info: data }));
  };

  return (
    <>
      <input
        type="text"
        placeholder="정보"
        value={profileInfo.title}
        css={detailTilte}
        name="title"
        onChange={handleInput}
      />
      <input
        type="text"
        placeholder="내용"
        value={profileInfo.content}
        css={detailContent}
        name="content"
        onChange={handleInput}
      />
      <FontAwesomeIcon
        css={id === 0 ? hidden : detailDeleteBtn}
        icon={faMinusCircle}
        onClick={deleteInfo}
      />
    </>
  );
}

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileSet = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useDispatch();
  const { job, info, name, subinfo, profileImg } = useSelector(
    (state: RootState) => state.profileReducer,
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeProfile({ [e.target.name]: e.target.value }));
  };

  const addInfo = () => {
    const data = [...info];
    data.push({ title: '', content: '' });
    dispatch(changeProfile({ info: data }));
  };

  const addSubinfo = () => {
    const data = [...subinfo];
    data.push({
      title: '',
      content: [{ image: '', title: '' }],
    });
    dispatch(changeProfile({ subinfo: data }));
  };

  const onDrop = (pictureFiles: File[]) => {
    const body = new FormData();
    body.append('files', pictureFiles[0]);
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/post/upload_files`, body, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        dispatch(
          changeProfile({
            profileImg: `${process.env.REACT_APP_SERVER_API}/${res.data.filename}`,
          }),
        );
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  const deleteProfile = () => {
    dispatch(changeProfile({ profileImg: '' }));
  };

  return (
    <div css={profileSetContainer}>
      <div css={[flex, alignItems('center')]}>
        <div css={sectionTitle}>프로필</div>
        <div
          css={sectionOpenBtn}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? '닫기' : '열기'}
        </div>
        <div
          css={sectionDeleteBtn}
          onClick={() => {
            dispatch(resetProfile());
          }}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen && (
        <>
          <div css={mainInfoBox}>
            <input
              type="text"
              placeholder="이름"
              value={name}
              name="name"
              css={profileNameInput}
              onChange={handleInput}
            ></input>
            <input
              type="text"
              placeholder="직업"
              value={job}
              name="job"
              css={profileJobInput}
              onChange={handleInput}
            ></input>
          </div>
          <div css={detailInfoBox}>
            <div css={profileImage}>
              <div css={profileImageLine}>
                <ImageUpload imageData={profileImg} onDrop={onDrop} />
              </div>
              {profileImg !== '' && (
                <FontAwesomeIcon
                  css={profileImageDeleteBtn}
                  icon={faTimesCircle}
                  onClick={deleteProfile}
                />
              )}
            </div>
            <div css={detailTextBox}>
              {info.map((profileInfo: ProfileInfo, id: number) => (
                <ElOfDetilText key={id} profileInfo={profileInfo} id={id} />
              ))}
              {info.length < 5 && (
                <button css={detailAddBtn} onClick={addInfo}>
                  + 정보 추가
                </button>
              )}
            </div>
          </div>
          {subinfo.map((profileSubInfo: ProfileSubInfo, id: number) => (
            <BoxOfSubinfo profileSubInfo={profileSubInfo} key={id} id={id} />
          ))}
          {subinfo.length < 2 && (
            <button css={subInfoAddBtn} onClick={addSubinfo}>
              + 기타 정보 추가
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileSet;
