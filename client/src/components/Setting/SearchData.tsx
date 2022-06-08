/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable sonarjs/cognitive-complexity */
import { css } from '@emotion/react';
import {
  faCheckCircle,
  faGripVertical,
  faTimesCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import ImageSet from '../../items/ImageSet';
import MusicSet from '../../items/MusicSet';
import NewsSet from '../../items/NewsSet';
import Preview from '../../items/Preview';
import ProfileSet from '../../items/ProfileSet';
import {
  changeImage,
  changeMusic,
  changeNews,
  changeProfile,
  resetImage,
  resetMusic,
  resetNews,
  resetProfile,
} from '../../redux/actions';
import type { RootState } from '../../redux/reducers';
import {
  alignItems,
  background,
  displayNone,
  flex,
  flexCenter,
  flexNum,
  fontColor,
  hidden,
  margin,
  pointer,
} from '../../styles/global';
import type {
  SearchDataConfig,
  SearchWordList,
  SearchWordOption,
} from '../../types';
import checkAutoComplete from '../../utils/checkAutoComplete';
import { logger } from '../../utils/logger';

const searchDataContainer = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
`;

const controlBox = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid rgb(190, 190, 190);
  padding: 0px 50px;
  @media (max-width: 700px) {
    flex-direction: column;
    padding: 5px 10px;
  }
`;

const firstSubControlBox = css`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 700px) {
    width: 100%;
    margin: 15px 0;
  }
`;

const secondSubControlBox = css`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const searchWordText = css`
  min-width: 50px;
  flex: 1.3;
  text-align: center;
  font-size: 1.1em;
  @media (max-width: 800px) {
    margin-right: 10px;
  }
`;

const searchWordInput = css`
  flex: 4;
  &::placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const saveButton = (bgColor: string) => css`
  flex: 0.8;
  margin: 0px 10px;
  box-shadow: none;
  border: none;
  outline: inherit;
  cursor: pointer;
  width: 50px;
  min-width: 50px;
  height: 35px;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  font-size: 1.05em;
  font-weight: 500;
  background-color: ${bgColor};
`;

const previewButton = css`
  flex: 5;
  min-width: 60px;
  margin-left: auto;
  text-align: right;
  span {
    cursor: pointer;
    color: rgb(168, 168, 168);
    font-weight: 500;
  }
  span:hover {
    font-weight: 1000;
  }
`;

const addWordButton = css`
  flex: 2;
  margin-left: auto;
  text-align: center;
  cursor: pointer;
  min-width: 100px;
  color: rgb(39, 39, 39);
  font-weight: 500;
  &:hover {
    font-weight: 1000;
  }
`;

const deleteWordButton = css`
  flex: 0.5;
  margin-left: auto;
  text-align: center;
  cursor: pointer;
  min-width: 30px;
  color: rgb(251, 110, 110);
  font-weight: 500;
  &:hover {
    font-weight: 1000;
  }
`;

const sectionBox = css`
  flex: 6;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const addSectionButton = css`
  text-align: right;
  font-size: 1.05em;
  font-weight: 420;
  margin-bottom: 10px;
  span {
    cursor: pointer;
  }
`;

const settingSection = css`
  &::-webkit-scrollbar {
    width: 10px;
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
  input {
    border: none;
  }
  input[type='text']:hover {
    border: 1px solid rgb(165, 165, 165);
    border-radius: 2px;
  }
  input[type='text']:focus {
    outline: inherit;
    border: 1px solid rgb(165, 165, 165);
    border-radius: 2px;
  }
  textarea {
    resize: none;
    border: none;
  }
  textarea:hover {
    border: 1px solid rgb(165, 165, 165);
    border-radius: 2px;
  }
  textarea:focus {
    outline: inherit;
    border: 1px solid rgb(165, 165, 165);
    border-radius: 2px;
  }
`;

const noDataBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 90%;
  font-size: 1.1em;
  color: rgb(180, 180, 180);
  @media (max-width: 600px) {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const dragButton = css`
  font-size: 1.1em;
  margin-right: 10px;
  color: rgb(105, 105, 105);
`;

const modalSectionContainer = (color: string) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  width: 200px;
  height: 120px;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgb(187, 187, 187);
  background-color: white;
  margin-top: 5px;
  padding: 10px;
  right: 12px;
  z-index: 1;
  border: 1px solid ${color};
  div {
    text-align: left;
    margin: 3px 0px;
  }
  input[type='checkbox'] {
    transform: scale(1.5);
  }
`;

const modalBackground = css`
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

const addContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: white;
  max-width: 400px;
  max-height: 230px;
  width: 90%;
  height: 100%;
  border-radius: 15px;
  border: 1px solid rgb(235, 235, 235);
  box-shadow: 0px 4px 4px rgb(187, 187, 187);
  padding: 20px;
  box-sizing: border-box;
`;

const closeButton = css`
  flex: 1;
  align-items: center;
  text-align: right;
  font-size: 1.3em;
  color: rgb(134, 134, 134);
  * {
    cursor: pointer;
  }
`;

const addInputBox = css`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const newWordInput = css`
  width: 80%;
  height: 50px;
  text-align: center;
  font-size: 1.2em;
  color: rgb(82, 82, 82);
  font-family: 'Noto Sans KR';
  border: 2px solid rgb(156, 156, 156);
  border-radius: 5px;
  margin: 0 auto;
  &:focus {
    outline: inherit;
  }
`;

const message = css`
  margin-bottom: 20px;
  color: rgb(251, 110, 110);
  font-size: 0.9em;
  cursor: default;
`;

const addSearchWordButton = (isActive: boolean, bgColor: string) => css`
  border: inherit;
  outline: inherit;
  ${isActive && pointer}
  width: 70px;
  height: 35px;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  font-size: 1.05em;
  font-weight: 500;
  margin: 0 auto;
  background-color: ${isActive ? bgColor : 'rgb(190, 190, 190)'};
  &:hover {
    background-color: inherit;
  }
`;

const saveModalContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 200px;
  height: 130px;
  border-radius: 15px;
  border: 1px solid rgb(235, 235, 235);
  box-shadow: 0px 4px 4px rgb(187, 187, 187);
  padding: 20px;
  box-sizing: border-box;
  z-index: 10;
  opacity: 1;
  transition: opacity 500ms;
`;

const hiddenAnimation = css`
  opacity: 0;
  visibility: hidden;
  transition: opacity 500ms, visibility 500ms;
`;

const saveIcon = css`
  color: rgb(96, 214, 106);
  font-size: 2em;
  margin-bottom: 10px;
`;

const deleteConfirmContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 180px;
  border-radius: 15px;
  border: 1px solid rgb(235, 235, 235);
  box-shadow: 0px 4px 4px rgb(187, 187, 187);
  padding: 20px;
  box-sizing: border-box;
  z-index: 10;
`;

const deleteIcon = css`
  flex: 1;
  color: rgb(121, 121, 121);
  font-size: 2em;
  margin-bottom: 10px;
`;

const commonDeleteButton = css`
  box-shadow: none;
  border: none;
  outline: inherit;
  cursor: pointer;
  width: 50px;
  min-width: 50px;
  height: 35px;
  margin-right: 10px;
  border-radius: 10px;
  color: rgb(255, 255, 255);
  font-size: 1.05em;
  font-weight: 500;
  &:hover {
    background-color: inherit;
  }
`;

const cancelHover = css`
  &:hover {
    background-color: rgb(192, 192, 192);
  }
`;

const acceptHover = css`
  &:hover {
    background-color: inherit;
  }
`;

const deleteModalContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 180px;
  border-radius: 15px;
  border: 1px solid rgb(235, 235, 235);
  box-shadow: 0px 4px 4px rgb(187, 187, 187);
  padding: 20px;
  box-sizing: border-box;
  z-index: 10;
  opacity: 1;
  transition: opacity 500ms;
`;

const deleteCompleteIcon = css`
  color: rgb(231, 131, 140);
  font-size: 2em;
  margin-bottom: 25px;
`;

interface ConfirmProps {
  setIsConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  deleteSearchData: () => void;
  themeColor: string;
}

const ConfirmDelete = ({
  setIsConfirmDelete,
  deleteSearchData,
  themeColor,
}: ConfirmProps) => (
  <div css={deleteConfirmContainer}>
    <FontAwesomeIcon icon={faTrash} css={deleteIcon}></FontAwesomeIcon>
    <div css={flexNum(1)}>해당 검색어를 삭제하시겠습니까?</div>
    <div css={[flexNum(1), flexCenter, alignItems('center')]}>
      <button
        css={[
          commonDeleteButton,
          background('rgb(192, 192, 192)'),
          cancelHover,
        ]}
        onClick={() => {
          setIsConfirmDelete(false);
        }}
      >
        취소
      </button>
      <button
        css={[
          commonDeleteButton,
          background('rgb(255, 255, 255)'),
          acceptHover,
        ]}
        style={{
          backgroundColor: themeColor,
        }}
        onClick={deleteSearchData}
      >
        확인
      </button>
    </div>
  </div>
);

interface ModalDeleteProps {
  isModalDelete: boolean;
}

const ModalDelete = ({ isModalDelete }: ModalDeleteProps) => (
  <div css={[deleteModalContainer, !isModalDelete && hiddenAnimation]}>
    <FontAwesomeIcon
      icon={faCheckCircle}
      css={deleteCompleteIcon}
    ></FontAwesomeIcon>
    <div css={fontColor('rgb(80, 80, 80)')}>삭제되었습니다.</div>
  </div>
);

interface ModalSaveProps {
  isModalSave: boolean;
}

const ModalSave = ({ isModalSave }: ModalSaveProps) => (
  <div css={[saveModalContainer, !isModalSave && hiddenAnimation]}>
    <FontAwesomeIcon icon={faCheckCircle} css={saveIcon}></FontAwesomeIcon>
    <div css={fontColor('rgb(80, 80, 80)')}>저장 완료</div>
  </div>
);

interface AddSearchWordProps {
  themeColor: string;
  setIsModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
  getSeachDataList: () => Promise<void>;
}

const AddSeachWord = ({
  themeColor,
  setIsModalAdd,
  getSeachDataList,
}: AddSearchWordProps) => {
  const [searchWord, setSearchWord] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [alertText, setAlertText] = useState(
    '검색어는 최대 16자까지 가능합니다. (자음,모음 불가)',
  );

  const addSearhData = async () => {
    if (searchWord !== '' && isChecked) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/search`,
        { word: searchWord },
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        await setAlertText('이미 등록된 단어입니다.');
        await setIsChecked(false);
      } else if (res.status === 201) {
        await setSearchWord('');
        await axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_API}/auto`, {
            withCredentials: true,
          })
          .then(() => {
            void getSeachDataList();
            setIsModalAdd(false);
          });
      }
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    setAlertText(
      '자동완성 검색어는 최대 16자까지 가능합니다. (자음,모음 불가)',
    );

    if (e.target.value === '') {
      setIsChecked(true);
    } else {
      setIsChecked(checkAutoComplete(e.target.value));
    }
  };

  return (
    <div css={modalBackground}>
      <div css={addContainer}>
        <div
          css={closeButton}
          onClick={() => {
            setIsModalAdd(false);
          }}
        >
          <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
        </div>
        <div css={addInputBox}>
          <input
            type="text"
            css={newWordInput}
            value={searchWord}
            onChange={handleCheck}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                void addSearhData();
              }
            }}
          />
          <div css={[message, isChecked && hidden]}>{alertText}</div>
          <button
            css={addSearchWordButton(
              isChecked && searchWord !== '',
              themeColor,
            )}
            onClick={() => {
              void addSearhData();
            }}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

interface ModalSectionProps {
  themeColor: string;
  boxModal: React.LegacyRef<HTMLDivElement>;
  isOpenModalSection: boolean;
}

const ModalSection = ({
  themeColor,
  boxModal,
  isOpenModalSection,
}: ModalSectionProps) => {
  const dispatch = useDispatch();
  const { view: isProfileView } = useSelector(
    (state: RootState) => state.profileReducer,
  );
  const { view: isNewsView } = useSelector(
    (state: RootState) => state.newsReducer,
  );
  const { view: isImageView } = useSelector(
    (state: RootState) => state.imageReducer,
  );
  const { view: isMusicView } = useSelector(
    (state: RootState) => state.musicReducer,
  );

  const hadleView = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'profile': {
        dispatch(changeProfile({ view: e.target.checked }));

        break;
      }

      case 'news': {
        dispatch(changeNews({ view: e.target.checked }));

        break;
      }

      case 'image': {
        dispatch(changeImage({ view: e.target.checked }));

        break;
      }

      case 'music': {
        dispatch(changeMusic({ view: e.target.checked }));

        break;
      }
      // No default
    }
  };

  return (
    <div
      ref={boxModal}
      css={isOpenModalSection ? modalSectionContainer(themeColor) : displayNone}
    >
      <div>
        <input
          type="checkbox"
          id="profile"
          checked={isProfileView}
          onChange={hadleView}
        />
        <label htmlFor="profile" css={[margin(0, 0, 10, 0), pointer]}>
          프로필
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          id="news"
          checked={isNewsView}
          onChange={hadleView}
        />
        <label htmlFor="news" css={[margin(0, 0, 10, 0), pointer]}>
          뉴스
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          id="image"
          checked={isImageView}
          onChange={hadleView}
        />
        <label htmlFor="image" css={[margin(0, 0, 10, 0), pointer]}>
          이미지
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          id="music"
          checked={isMusicView}
          onChange={hadleView}
        />
        <label htmlFor="music" css={[margin(0, 0, 10, 0), pointer]}>
          음악
        </label>
      </div>
    </div>
  );
};

interface Props {
  themeColor: string;
}

const SearchData = ({ themeColor }: Props) => {
  const { view: isProfileView, order: profileOrder } = useSelector(
    (state: RootState) => state.profileReducer,
  );
  const { view: isNewsView, order: newsOrder } = useSelector(
    (state: RootState) => state.newsReducer,
  );
  const { view: isImageView, order: imageOrder } = useSelector(
    (state: RootState) => state.imageReducer,
  );
  const { view: isMusicView, order: musicOrder } = useSelector(
    (state: RootState) => state.musicReducer,
  );

  const profileReducer = useSelector(
    (state: RootState) => state.profileReducer,
  );
  const newsReducer = useSelector((state: RootState) => state.newsReducer);
  const imageReducer = useSelector((state: RootState) => state.imageReducer);
  const musicReducer = useSelector((state: RootState) => state.musicReducer);

  const dispatch = useDispatch();
  const boxModal = useRef<HTMLDivElement>(null);
  const btnSection = useRef<HTMLSpanElement>(null);
  const [searchWordList, setSearchWordList] = useState<SearchWordOption[]>([]);
  const [selected, setSelected] = useState<SearchWordOption>({
    value: '',
    label: '',
  });
  const [isOpenModalSection, setIsOpenModalSection] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalSave, setIsModalSave] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenNews, setIsOpenNews] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [isOpenMusic, setIsOpenMusic] = useState(false);
  const [isResetDrag, setIsResetDrag] = useState(false);

  const [isWindowPreview, setIsWindowPreview] = useState(false);

  const getSeachDataList = async () => {
    const res = await axios.get<SearchWordList[]>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/search`,
      {
        withCredentials: true,
      },
    );
    setSearchWordList(
      res.data.map((el) => ({
        value: el.word,
        label: el.word,
      })),
    );
  };

  const selectSearchData = async (e: SearchWordOption) => {
    setSelected(e);
    setIsResetDrag(true);
    setIsOpenProfile(false);
    setIsOpenNews(false);
    setIsOpenImage(false);
    setIsOpenMusic(false);
    const res = await axios.get<SearchDataConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/search/word`,
      {
        params: { word: e.value },
        withCredentials: true,
      },
    );
    dispatch(changeProfile(res.data.profile));
    dispatch(changeNews(res.data.news));
    dispatch(changeImage(res.data.image));
    dispatch(changeMusic(res.data.music));
    setIsResetDrag(false);
  };

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (boxModal.current === null || btnSection.current === null) {
      return;
    }

    if (
      !boxModal.current.contains(target as Node) &&
      !btnSection.current.contains(target as Node)
    ) {
      setIsOpenModalSection(false);
    }
  };

  const handleDropChange = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = [
      { order: profileOrder, type: 'profile' },
      { order: newsOrder, type: 'news' },
      { order: imageOrder, type: 'image' },
      { order: musicOrder, type: 'music' },
    ].sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      } else if (a.order < b.order) {
        return -1;
      }

      return 0;
    });
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    for (const [i, item] of items.entries()) {
      item.order = i + 1;

      switch (item.type) {
        case 'profile': {
          dispatch(changeProfile({ order: item.order }));

          break;
        }

        case 'news': {
          dispatch(changeNews({ order: item.order }));

          break;
        }

        case 'image': {
          dispatch(changeImage({ order: item.order }));

          break;
        }

        case 'music': {
          dispatch(changeMusic({ order: item.order }));

          break;
        }
      }
    }
  };

  const alertSave = () => {
    setIsModalSave(true);
    setTimeout(() => {
      setIsModalSave(false);
    }, 1000);
  };

  const submitSearchData = () => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/search`,
        {
          word: selected.value,
          profile: profileReducer,
          news: newsReducer,
          image: imageReducer,
          music: musicReducer,
        },
        { withCredentials: true },
      )
      .then(() => {
        alertSave();
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  const alertDelete = () => {
    setIsModalDelete(true);
    setTimeout(() => {
      setIsModalDelete(false);
    }, 1000);
  };

  const deleteSearchData = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_API}/search`, {
        data: { word: selected.value },
        withCredentials: true,
      })
      .then(() => {
        dispatch(resetProfile());
        dispatch(resetNews());
        dispatch(resetImage());
        dispatch(resetMusic());
        setIsConfirmDelete(false);
        setSelected({ value: '', label: '' });
        void getSeachDataList();
        alertDelete();
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  const openPreview = async () => {
    if (selected.value !== '') {
      await setIsWindowPreview(false);
      await setIsWindowPreview(true);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(resetProfile());
    dispatch(resetNews());
    dispatch(resetImage());
    dispatch(resetMusic());
    void getSeachDataList();
  }, [dispatch]);

  return (
    <div css={searchDataContainer}>
      <div css={controlBox}>
        <div css={firstSubControlBox}>
          <div css={searchWordText}>검색어</div>
          <Select
            css={searchWordInput}
            options={searchWordList}
            onChange={(e) => void selectSearchData(e!)}
            value={selected}
          />
          <button
            css={saveButton(
              selected.value !== '' ? themeColor : 'rgb(190, 190, 190)',
            )}
            onClick={submitSearchData}
          >
            저장
          </button>
        </div>
        <div css={secondSubControlBox}>
          <div css={previewButton}>
            <span
              onClick={() => {
                void openPreview();
              }}
            >
              미리보기
            </span>
          </div>
          <div css={addWordButton}>
            <span
              onClick={() => {
                setIsModalAdd(!isModalAdd);
              }}
            >
              + 검색어 추가
            </span>
          </div>
          <div
            css={deleteWordButton}
            onClick={() => {
              if (selected.value !== '') {
                setIsConfirmDelete(true);
              }
            }}
          >
            삭제
          </div>
        </div>
      </div>
      <div css={sectionBox}>
        <div css={addSectionButton}>
          <span
            ref={btnSection}
            onClick={() => {
              if (selected.value !== '') {
                setIsOpenModalSection(!isOpenModalSection);
              }
            }}
          >
            + 섹션 추가
          </span>
          <ModalSection
            themeColor={themeColor}
            boxModal={boxModal}
            isOpenModalSection={isOpenModalSection}
          />
        </div>
        <div css={settingSection}>
          {selected.value === '' && (
            <div css={noDataBox}>검색어를 선택하세요.</div>
          )}
          {!isProfileView &&
            !isNewsView &&
            !isImageView &&
            !isMusicView &&
            selected.value !== '' && (
              <div css={noDataBox}>
                설정된 데이터가 없습니다.
                <br />
                섹션을 추가하세요.
              </div>
            )}
          {!isResetDrag && (
            <DragDropContext onDragEnd={handleDropChange}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div
                    className="sections"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {[
                      {
                        type: 'profile',
                        view: isProfileView,
                        order: String(profileOrder),
                      },
                      {
                        type: 'news',
                        view: isNewsView,
                        order: String(newsOrder),
                      },
                      {
                        type: 'image',
                        view: isImageView,
                        order: String(imageOrder),
                      },
                      {
                        type: 'music',
                        view: isMusicView,
                        order: String(musicOrder),
                      },
                    ]
                      .sort((a, b) => {
                        if (a.order > b.order) {
                          return 1;
                        } else if (a.order < b.order) {
                          return -1;
                        }

                        return 0;
                      })
                      .map(({ type, view, order }, index) => (
                        <Draggable
                          key={order}
                          draggableId={order}
                          index={index}
                        >
                          {(provided) => {
                            if (type === 'profile' && view) {
                              return (
                                <div
                                  css={[flex, alignItems('center')]}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div {...provided.dragHandleProps}>
                                    <FontAwesomeIcon
                                      css={dragButton}
                                      icon={faGripVertical}
                                    />
                                  </div>
                                  <ProfileSet
                                    isOpen={isOpenProfile}
                                    setIsOpen={setIsOpenProfile}
                                  />
                                </div>
                              );
                            }

                            if (type === 'news' && view) {
                              return (
                                <div
                                  css={[flex, alignItems('center')]}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div {...provided.dragHandleProps}>
                                    <FontAwesomeIcon
                                      css={dragButton}
                                      icon={faGripVertical}
                                    />
                                  </div>
                                  <NewsSet
                                    isOpen={isOpenNews}
                                    setIsOpen={setIsOpenNews}
                                  />
                                </div>
                              );
                            }

                            if (type === 'image' && view) {
                              return (
                                <div
                                  css={[flex, alignItems('center')]}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div {...provided.dragHandleProps}>
                                    <FontAwesomeIcon
                                      css={dragButton}
                                      icon={faGripVertical}
                                    />
                                  </div>
                                  <ImageSet
                                    isOpen={isOpenImage}
                                    setIsOpen={setIsOpenImage}
                                  />
                                </div>
                              );
                            }

                            if (type === 'music' && view) {
                              return (
                                <div
                                  css={[flex, alignItems('center')]}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div {...provided.dragHandleProps}>
                                    <FontAwesomeIcon
                                      css={dragButton}
                                      icon={faGripVertical}
                                    />
                                  </div>

                                  <MusicSet
                                    isOpen={isOpenMusic}
                                    setIsOpen={setIsOpenMusic}
                                  />
                                </div>
                              );
                            }

                            return (
                              <div
                                css={[flex, alignItems('center')]}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                              ></div>
                            );
                          }}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
      {isModalAdd && (
        <AddSeachWord
          setIsModalAdd={setIsModalAdd}
          themeColor={themeColor}
          getSeachDataList={getSeachDataList}
        />
      )}
      <ModalSave isModalSave={isModalSave} />
      {isConfirmDelete && (
        <ConfirmDelete
          themeColor={themeColor}
          setIsConfirmDelete={setIsConfirmDelete}
          deleteSearchData={deleteSearchData}
        />
      )}
      <ModalDelete isModalDelete={isModalDelete} />
      {isWindowPreview && <Preview word={selected} />}
    </div>
  );
};

export default SearchData;
