/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/prefer-add-event-listener */
import type {
  ProfileInfo,
  ProfileState,
  ProfileSubInfo,
  ProfileSubInfoContent,
} from '../../types/state';

interface ElOfSubinfoProps {
  el: ProfileSubInfoContent;
}

const ElOfSubinfo = ({ el }: ElOfSubinfoProps) => (
  <div className="el-subinfo">
    {el.image !== '' ? (
      <img
        src={el.image}
        alt="img-subinfo"
        className="img-subinfo"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '../../img/no-image-column.png';
        }}
      />
    ) : (
      <div className="img-subinfo">
        설정된 이미지가
        <br />
        존재하지 않습니다.
      </div>
    )}

    <div className="title-subinfo-content">{el.title}</div>
  </div>
);

interface BoxOfSubinfoProps {
  el: ProfileSubInfo;
}

const BoxOfSubinfo = ({ el }: BoxOfSubinfoProps) => (
  <div className="box-subinfo">
    <div className="box-subinfo-title">
      <div className="title-subinfo">{el.title}</div>
    </div>
    <div className="box-subinfo-content">
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
    <div className="title-detail-text">{el.title}</div>
    <div className="content-detail-text">{el.content}</div>
  </>
);

interface Props {
  profileData: ProfileState;
}

const Profile = ({ profileData }: Props) => (
  <div className="profile-container">
    <div className="box-maininfo">
      <div className="text-name">{profileData.name}</div>
      <div className="text-job">{profileData.job}</div>
    </div>
    <div className="box-detail">
      <div className="section-title">프로필</div>
      <div className="box-detail-profile">
        {profileData.profileImg !== '' ? (
          <img
            src={profileData.profileImg}
            alt="img-profile"
            className="img-profile"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '../../img/no-image-column.png';
            }}
          />
        ) : (
          <div className="img-profile">
            설정된 이미지가
            <br />
            존재하지 않습니다.
          </div>
        )}
        <div className="box-detail-text">
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
