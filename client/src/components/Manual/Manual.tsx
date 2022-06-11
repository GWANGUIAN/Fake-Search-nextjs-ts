import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { css } from '@emotion/react';
import { faForward, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';

import { fontColor, fontWeight, margin, textAlign } from '../../styles/common';

const firstSlide = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const thankText = css`
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 5%;
  > span {
    color: #2260ff;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const scriptText = css`
  margin-bottom: 2%;
  font-weight: 500;
`;

const nextText = css`
  color: rgb(126, 126, 126);
  font-weight: 500;
`;

const secondSlide = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const loginImg = css`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const loginScriptBox = css`
  margin-left: 20px;
  text-align: left;
`;

const thirdSlide = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const flexCenter = css`
  display: flex;
  align-items: center;
`;

const guideImage = (width: number, height: number) => css`
  width: ${width}px;
  height: ${height}px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid rgb(209, 209, 209);
`;

const nextIcon = css`
  color: rgb(139, 139, 139);
  font-size: 1.2em;
  margin: 0 10px;
`;

const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const manualContainer = css`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: block;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  text-align: center;
  overflow: hidden;
`;

const manualBox = css`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
  max-width: 900px;
  max-height: 600px;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  border: 1px solid rgb(235, 235, 235);
  box-shadow: 0px 4px 4px rgb(187, 187, 187);
  padding: 40px;
  box-sizing: border-box;
  z-index: 10;

  .slick-prev:before {
    color: rgb(158, 158, 158);
    content: '<';
    font-size: 30px;
    font-family: 'Fredoka One', cursive;
  }

  .slick-next:before {
    color: rgb(158, 158, 158);
    font-size: 30px;
    content: '>';
    font-family: 'Fredoka One', cursive;
  }

  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0;
  }

  .slick-slider {
    position: absolute;
    display: flex;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(255, 255, 255);
    max-width: 800px;
    max-height: 600px;
    width: 80%;
    height: 80%;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }
`;

const closeBtn = css`
  position: absolute;
  right: 30px;
  bottom: 30px;
  font-weight: 500;
  color: rgb(105, 105, 105);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Manual1 = () => (
  <div css={firstSlide}>
    <div>
      <div css={thankText}>
        <span>FAKESEARCH</span>에 방문해주셔서 감사합니다.
      </div>
      <div css={scriptText}>
        FAKESEARCH는 드라마, 영화 등에서 활용할 수 있도록 <br />
        검색어와 검색 데이터를 커스터마이징할 수 있는 서비스입니다.
      </div>
      <div css={nextText}>페이지를 넘겨 매뉴얼을 확인해주세요</div>
    </div>
  </div>
);

const Manual2 = () => (
  <div css={secondSlide}>
    <img css={loginImg} src="img/로그인 모달.png" alt="modal-login" />
    <div css={loginScriptBox}>
      <div css={margin(0, 10, 0, 0)}>
        검색 페이지 설정을 위해
        <br />
        로그인을 진행해주세요.
      </div>
      <div css={fontColor('rgb(116, 116, 116)')}>
        간단하게 게스트 로그인이 가능합니다.
      </div>
    </div>
  </div>
);

const Manual3 = () => (
  <div css={thirdSlide}>
    <div css={flexCenter}>
      <img
        css={guideImage(200, 300)}
        src="img/사이트 이름 및 테마 색성 설정.png"
        alt="img/setting-siteName"
      />
      <FontAwesomeIcon icon={faForward} css={nextIcon} />
      <img
        css={guideImage(300, 200)}
        src="img/사이트,테마 설정 완료.png"
        alt="img/setting-siteName"
      />
    </div>
    <div css={margin(50, 0, 0, 0)}>
      <span>설정 {'>'} 사이트 이름 및 테마 색상 설정 </span>에서 검색 사이트의
      이름과 색상을 변경 할 수 있습니다.
    </div>
  </div>
);

const Manual4 = () => (
  <div css={flexColumnCenter}>
    <div css={flexCenter}>
      <img
        css={guideImage(300, 200)}
        src="img/자동 검색어 설정.png"
        alt="img/setting-auto"
      />
      <FontAwesomeIcon icon={faForward} css="icon-next" />
      <img
        css={guideImage(300, 200)}
        src="img/자동 검색어 완료.png"
        alt="img/setting-auto"
      />
    </div>
    <div css={margin(50, 0, 0, 0)}>
      <span>설정 {'>'} 자동 완성 검색어 설정 </span>에서 검색 창에 표시되는
      검색어를 추가/삭제 할 수 있습니다.
    </div>
  </div>
);

const Manual5 = () => (
  <div css={flexColumnCenter}>
    <div css={flexCenter}>
      <img
        css={[guideImage(170, 135), margin(0, 0, 0, 10)]}
        src="img/섹션추가.png"
        alt="img/setting-search"
      />
      <img
        css={guideImage(240, 170)}
        src="img/검색페이지 설정.png"
        alt="img/setting-search"
      />
      <FontAwesomeIcon icon={faForward} css={nextIcon} />
      <img
        css={guideImage(240, 170)}
        src="img/검색페이지.png"
        alt="img/setting-search"
      />
    </div>
    <div css={margin(20, 30, 0, 0)}>
      <span css={[fontColor('rgb(75, 75, 75)'), fontWeight(600)]}>
        설정 {'>'} 검색 페이지 설정{' '}
      </span>
      에서 검색 페이지의 섹션을 추가하고 내용을 설정할 수 있습니다.
    </div>
    <div css={flexCenter}>
      <img
        css={[guideImage(140, 170), margin(0, 0, 0, 30)]}
        src="img/섹션 순서 변경.png"
        alt="img/setting-drag"
      />
      <div css={textAlign('left')}>
        <span css={[fontColor('rgb(75, 75, 75)'), fontWeight(600)]}>
          <FontAwesomeIcon icon={faGripVertical} />
        </span>{' '}
        아이콘을 드래그하여
        <br />
        섹션의 순서를 변경할 수 있습니다.
      </div>
    </div>
  </div>
);

interface ManualProps {
  setDate: () => void;
}

const Manual = ({ setDate }: ManualProps) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div css={manualContainer}>
      <div css={manualBox}>
        <Slider {...settings}>
          <div>
            <Manual1 />
          </div>
          <div>
            <Manual2 />
          </div>
          <div>
            <Manual3 />
          </div>
          <div>
            <Manual4 />
          </div>
          <div>
            <Manual5 />
          </div>
        </Slider>
        <span
          css={closeBtn}
          onClick={() => {
            setDate();
          }}
        >
          닫기(일주일간 보지 않기)
        </span>
      </div>
    </div>
  );
};

export default Manual;
