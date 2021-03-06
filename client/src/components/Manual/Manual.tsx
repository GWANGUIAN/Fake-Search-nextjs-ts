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
        <span>FAKESEARCH</span>??? ?????????????????? ???????????????.
      </div>
      <div css={scriptText}>
        FAKESEARCH??? ?????????, ?????? ????????? ????????? ??? ????????? <br />
        ???????????? ?????? ???????????? ????????????????????? ??? ?????? ??????????????????.
      </div>
      <div css={nextText}>???????????? ?????? ???????????? ??????????????????</div>
    </div>
  </div>
);

const Manual2 = () => (
  <div css={secondSlide}>
    <img css={loginImg} src="img/????????? ??????.png" alt="modal-login" />
    <div css={loginScriptBox}>
      <div css={margin(0, 10, 0, 0)}>
        ?????? ????????? ????????? ??????
        <br />
        ???????????? ??????????????????.
      </div>
      <div css={fontColor('rgb(116, 116, 116)')}>
        ???????????? ????????? ???????????? ???????????????.
      </div>
    </div>
  </div>
);

const Manual3 = () => (
  <div css={thirdSlide}>
    <div css={flexCenter}>
      <img
        css={guideImage(200, 300)}
        src="img/????????? ?????? ??? ?????? ?????? ??????.png"
        alt="img/setting-siteName"
      />
      <FontAwesomeIcon icon={faForward} css={nextIcon} />
      <img
        css={guideImage(300, 200)}
        src="img/?????????,?????? ?????? ??????.png"
        alt="img/setting-siteName"
      />
    </div>
    <div css={margin(50, 0, 0, 0)}>
      <span>?????? {'>'} ????????? ?????? ??? ?????? ?????? ?????? </span>?????? ?????? ????????????
      ????????? ????????? ?????? ??? ??? ????????????.
    </div>
  </div>
);

const Manual4 = () => (
  <div css={flexColumnCenter}>
    <div css={flexCenter}>
      <img
        css={guideImage(300, 200)}
        src="img/?????? ????????? ??????.png"
        alt="img/setting-auto"
      />
      <FontAwesomeIcon icon={faForward} css="icon-next" />
      <img
        css={guideImage(300, 200)}
        src="img/?????? ????????? ??????.png"
        alt="img/setting-auto"
      />
    </div>
    <div css={margin(50, 0, 0, 0)}>
      <span>?????? {'>'} ?????? ?????? ????????? ?????? </span>?????? ?????? ?????? ????????????
      ???????????? ??????/?????? ??? ??? ????????????.
    </div>
  </div>
);

const Manual5 = () => (
  <div css={flexColumnCenter}>
    <div css={flexCenter}>
      <img
        css={[guideImage(170, 135), margin(0, 0, 0, 10)]}
        src="img/????????????.png"
        alt="img/setting-search"
      />
      <img
        css={guideImage(240, 170)}
        src="img/??????????????? ??????.png"
        alt="img/setting-search"
      />
      <FontAwesomeIcon icon={faForward} css={nextIcon} />
      <img
        css={guideImage(240, 170)}
        src="img/???????????????.png"
        alt="img/setting-search"
      />
    </div>
    <div css={margin(20, 30, 0, 0)}>
      <span css={[fontColor('rgb(75, 75, 75)'), fontWeight(600)]}>
        ?????? {'>'} ?????? ????????? ??????{' '}
      </span>
      ?????? ?????? ???????????? ????????? ???????????? ????????? ????????? ??? ????????????.
    </div>
    <div css={flexCenter}>
      <img
        css={[guideImage(140, 170), margin(0, 0, 0, 30)]}
        src="img/?????? ?????? ??????.png"
        alt="img/setting-drag"
      />
      <div css={textAlign('left')}>
        <span css={[fontColor('rgb(75, 75, 75)'), fontWeight(600)]}>
          <FontAwesomeIcon icon={faGripVertical} />
        </span>{' '}
        ???????????? ???????????????
        <br />
        ????????? ????????? ????????? ??? ????????????.
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
          ??????(???????????? ?????? ??????)
        </span>
      </div>
    </div>
  );
};

export default Manual;
