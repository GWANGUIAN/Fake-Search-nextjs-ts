/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/prefer-add-event-listener */
import { css } from '@emotion/react';

import { alignItems, flex, flexColumn } from '../../styles/common';
import type {
  ProfileInfo,
  ProfileState,
  ProfileSubInfo,
  ProfileSubInfoContent,
} from '../../types/state';

const profileContainer = css`
  display: flex;
  flex-direction: column;
  margin: 15px 10px;
  background-color: #e4e4ed;
  border-radius: 20px;
  padding: 20px 20px 10px 20px;
  border: 2px solid rgb(233, 233, 233);
  @media (max-width: 550px) {
    padding: 10px 10px 5px 10px;
  }
`;

const mainInfoBox = css`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  @media (max-width: 550px) {
    padding: 0px 5px;
  }
`;

const nameText = css`
  font-size: 1.35em;
  font-weight: 700;
  margin-right: 15px;
  @media (max-width: 550px) {
    font-size: 1.1em;
    font-weight: 700;
    margin-right: 10px;
  }
`;

const jobText = css`
  font-size: 1.2em;
  font-weight: 500;
  color: rgb(75, 75, 75);
  @media (max-width: 550px) {
    font-size: 0.9em;
  }
`;

const detailBox = css`
  background-color: white;
  margin: 10px 0px;
  border-radius: 20px;
  padding: 20px 30px 20px 30px;
  border: 2px solid rgb(233, 233, 233);
  @media (max-width: 550px) {
    padding: 10px 20px 10px 20px;
  }
`;

const titleSection = css`
  font-size: 1.25em;
  font-weight: 700;
  margin: 0px 0px 10px 3px;
  @media (max-width: 550px) {
    font-size: 1em;
  }
`;

const profileImage = css`
  width: 150px;
  height: 200px;
  object-fit: cover;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 5px;
  margin-right: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 0.8em;
  font-weight: 600;
  color: rgb(88, 88, 88);
  @media (max-width: 550px) {
    width: 120px;
    height: 160px;
  }
`;

const detailTextBox = css`
  padding-top: 10px;
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 3px;
  column-gap: 10px;
  margin-bottom: auto;
`;

const detailTextTitle = css`
  font-weight: 500;
  display: flex;
  align-items: center;
  @media (max-width: 550px) {
    font-size: 0.9em;
  }
`;

const detailContentTitle = css`
  display: flex;
  align-items: center;
  @media (max-width: 550px) {
    font-size: 0.9em;
  }
`;

const subInfoBox = css`
  background-color: white;
  margin: 5px 0px;
  border-radius: 20px;
  padding: 20px 30px 20px 30px;
  border: 2px solid rgb(233, 233, 233);
  @media (max-width: 550px) {
    padding: 10px 20px 10px 20px;
  }
`;

const subInfoTitle = css`
  font-size: 1.25em;
  font-weight: 700;
  margin: 0px 0px 10px 3px;
  @media (max-width: 550px) {
    font-size: 1em;
  }
`;

const subInfoContentBox = css`
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const subInfoImage = css`
  width: 130px;
  height: 180px;
  object-fit: cover;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 5px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 0.8em;
  font-weight: 600;
  color: rgb(88, 88, 88);
  @media (max-width: 550px) {
    width: 100px;
    height: 140px;
  }
`;

const subInfoContentTitle = css`
  margin-top: 3px;
  font-size: 0.95em;
  font-weight: 500;
  @media (max-width: 550px) {
    font-size: 0.85em;
  }
`;

interface ElOfSubinfoProps {
  el: ProfileSubInfoContent;
}

const ElOfSubinfo = ({ el }: ElOfSubinfoProps) => (
  <div css={[flexColumn, alignItems('center')]}>
    {el.image !== '' ? (
      <img
        src={el.image}
        alt="img-subinfo"
        css={subInfoImage}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '../../img/no-image-column.png';
        }}
      />
    ) : (
      <div css={subInfoImage}>
        설정된 이미지가
        <br />
        존재하지 않습니다.
      </div>
    )}

    <div css={subInfoContentTitle}>{el.title}</div>
  </div>
);

interface BoxOfSubinfoProps {
  el: ProfileSubInfo;
}

const BoxOfSubinfo = ({ el }: BoxOfSubinfoProps) => (
  <div css={subInfoBox}>
    <div>
      <div css={subInfoTitle}>{el.title}</div>
    </div>
    <div css={subInfoContentBox}>
      {el.content.map((element, id) => (
        <ElOfSubinfo key={id} el={element} />
      ))}
    </div>
  </div>
);

interface ElofDetailTextProps {
  el: ProfileInfo;
}

const ElOfDetilText = ({ el }: ElofDetailTextProps) => (
  <>
    <div css={detailTextTitle}>{el.title}</div>
    <div css={detailContentTitle}>{el.content}</div>
  </>
);

interface Props {
  profileData: ProfileState;
}

const Profile = ({ profileData }: Props) => (
  <div css={profileContainer}>
    <div css={mainInfoBox}>
      <div css={nameText}>{profileData.name}</div>
      <div css={jobText}>{profileData.job}</div>
    </div>
    <div css={detailBox}>
      <div css={titleSection}>프로필</div>
      <div css={flex}>
        {profileData.profileImg !== '' ? (
          <img
            src={profileData.profileImg}
            alt="img-profile"
            css={profileImage}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '../../img/no-image-column.png';
            }}
          />
        ) : (
          <div css={profileImage}>
            설정된 이미지가
            <br />
            존재하지 않습니다.
          </div>
        )}
        <div css={detailTextBox}>
          {profileData.info.map((el, id) => (
            <ElOfDetilText key={id} el={el} />
          ))}
        </div>
      </div>
    </div>
    {profileData.subinfo.map((el, id) => (
      <BoxOfSubinfo el={el} key={id} />
    ))}
  </div>
);

export default Profile;
