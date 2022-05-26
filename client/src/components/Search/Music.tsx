/* eslint-disable unicorn/prefer-add-event-listener */
/* eslint-disable unicorn/no-null */
import type { MusicState } from '../../types/state';

interface Props {
  musicData: MusicState;
}

const Music = ({ musicData }: Props) => (
  <div className="music-container">
    <div className="section-title">음악</div>
    <div className="title-song">{musicData.title}</div>
    <div className="box-music-info">
      <div className="text-artist">{musicData.artist}</div>
      <div className="text-date">{musicData.date}</div>
    </div>
    {musicData.album !== '' ? (
      <img
        className="img-album"
        alt="img-album"
        src={musicData.album}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '../../img/no-image-row.png';
        }}
      />
    ) : (
      <div className="img-album">
        설정된 이미지가
        <br />
        존재하지 않습니다.
      </div>
    )}
    <div className="title-song-info">곡 정보</div>
    <div className="text-song-info">{musicData.info}</div>
    <div className="btn-more-music">음악 정보 더보기 &#10132;</div>
  </div>
);

export default Music;
