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
import type {
  ProfileInfo,
  ProfileSubInfo,
  ProfileSubInfoContent,
} from '../types/state';
import { logger } from '../utils/logger';
import ImageUpload from './ImageUpload';

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
    <div css="el-subinfo">
      <div css="img-subinfo">
        <div css="img-subinfo-line">
          <ImageUpload onDrop={onDrop} imageData={el.image} />
        </div>
        {el.image !== '' && (
          <FontAwesomeIcon
            css="btn-delete-subinfo-img"
            icon={faTimesCircle}
            onClick={deleteSubinfoImg}
          />
        )}
      </div>
      <input
        type="text"
        placeholder="제목"
        value={el.title}
        css="title-subinfo-content"
        name="title"
        onChange={handleInput}
      />
      {index !== 0 && (
        <FontAwesomeIcon
          css="btn-delete-el-subinfo"
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
    <div css="box-subinfo">
      <div css="box-subinfo-title">
        <input
          type="text"
          css="title-subinfo"
          placeholder="타입"
          value={profileSubInfo.title}
          name="title"
          onChange={handleInput}
        />
        <div css="box-delete-subinfo" onClick={deleteSubinfo}>
          <FontAwesomeIcon css="btn-delete-subinfo" icon={faMinusCircle} />
          <div>삭제</div>
        </div>
      </div>
      <div css="box-subinfo-content">
        {profileSubInfo.content.map((el, index) => (
          <ElOfSubinfo key={index} el={el} index={index} id={id} />
        ))}
        {profileSubInfo.content.length < 5 && (
          <button id="btn-add-subinfo-content" onClick={addSubinfoContent}>
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
        css="title-detail-text"
        name="title"
        onChange={handleInput}
      />
      <input
        type="text"
        placeholder="내용"
        value={profileInfo.content}
        css="content-detail-text"
        name="content"
        onChange={handleInput}
      />
      <FontAwesomeIcon
        css={id === 0 ? 'btn-delete-detail unvisible' : 'btn-delete-detail'}
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
    <div css="profileset-container">
      <div css="box-section-title">
        <div css="section-title">프로필</div>
        <div
          css="btn-open"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? '닫기' : '열기'}
        </div>
        <div
          css="btn-delete-section"
          onClick={() => {
            dispatch(resetProfile());
          }}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen && (
        <>
          <div css="box-maininfo">
            <input
              type="text"
              placeholder="이름"
              value={name}
              name="name"
              onChange={handleInput}
            ></input>
            <input
              type="text"
              placeholder="직업"
              value={job}
              name="job"
              onChange={handleInput}
            ></input>
          </div>
          <div css="box-detail">
            <div css="img-profile">
              <div css="img-profile-line">
                <ImageUpload imageData={profileImg} onDrop={onDrop} />
              </div>
              {profileImg !== '' && (
                <FontAwesomeIcon
                  css="btn-delete-profileImg"
                  icon={faTimesCircle}
                  onClick={deleteProfile}
                />
              )}
            </div>
            <div css="box-detail-text">
              {info.map((profileInfo: ProfileInfo, id: number) => (
                <ElOfDetilText key={id} profileInfo={profileInfo} id={id} />
              ))}
              {info.length < 5 && (
                <button id="btn-add-detail" onClick={addInfo}>
                  + 정보 추가
                </button>
              )}
            </div>
          </div>
          {subinfo.map((profileSubInfo: ProfileSubInfo, id: number) => (
            <BoxOfSubinfo profileSubInfo={profileSubInfo} key={id} id={id} />
          ))}
          {subinfo.length < 2 && (
            <button id="btn-add-subinfo" onClick={addSubinfo}>
              + 기타 정보 추가
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileSet;
