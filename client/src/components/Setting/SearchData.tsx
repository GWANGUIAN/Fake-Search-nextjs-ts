/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable sonarjs/cognitive-complexity */
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
import type {
  SearchDataConfig,
  SearchWordList,
  SearchWordOption,
} from '../../types';
import checkAutoComplete from '../../utils/checkAutoComplete';
import { logger } from '../../utils/logger';

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
  <div className="confirmdelete-container">
    <FontAwesomeIcon icon={faTrash} className="icon-delete"></FontAwesomeIcon>
    <div className="text-delete">해당 검색어를 삭제하시겠습니까?</div>
    <div className="box-btn-delete">
      <button
        className="btn-delete-cancel"
        onClick={() => {
          setIsConfirmDelete(false);
        }}
      >
        취소
      </button>
      <button
        className="btn-delete-accept"
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
  <div
    className={
      isModalDelete ? 'modaldelete-container' : 'modaldelete-container hidden'
    }
  >
    <FontAwesomeIcon
      icon={faCheckCircle}
      className="icon-delete-complete"
    ></FontAwesomeIcon>
    <div className="text-delete-complete">삭제되었습니다.</div>
  </div>
);

interface ModalSaveProps {
  isModalSave: boolean;
}

const ModalSave = ({ isModalSave }: ModalSaveProps) => (
  <div
    className={
      isModalSave ? 'modalsave-container' : 'modalsave-container hidden'
    }
  >
    <FontAwesomeIcon
      icon={faCheckCircle}
      className="icon-save"
    ></FontAwesomeIcon>
    <div className="text-save">저장 완료</div>
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
    <div className="bg-modal">
      <div className="add-container">
        <div
          className="btn-close"
          onClick={() => {
            setIsModalAdd(false);
          }}
        >
          <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
        </div>
        <div className="box-input-add">
          <input
            type="text"
            id="input-new-word"
            value={searchWord}
            onChange={handleCheck}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                void addSearhData();
              }
            }}
          />
          <div id={isChecked ? 'message-hidden' : 'message'}>{alertText}</div>
          <button
            id={
              isChecked && searchWord !== ''
                ? 'btn-add-seachword'
                : 'btn-add-seachword-none'
            }
            style={{
              backgroundColor:
                isChecked && searchWord !== ''
                  ? themeColor
                  : 'rgb(190, 190, 190)',
            }}
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
      className={
        isOpenModalSection
          ? 'modalsection-container'
          : 'modalsection-container hidden'
      }
      style={{ border: `1px solid ${themeColor}` }}
    >
      <div>
        <input
          type="checkbox"
          id="profile"
          className="profile-check-box"
          checked={isProfileView}
          onChange={hadleView}
        />
        <label htmlFor="profile" className="text-profile">
          프로필
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          id="news"
          className="news-check-box"
          checked={isNewsView}
          onChange={hadleView}
        />
        <label htmlFor="news" className="text-news">
          뉴스
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          id="image"
          className="image-check-box"
          checked={isImageView}
          onChange={hadleView}
        />
        <label htmlFor="image" className="text-image">
          이미지
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          id="music"
          className="music-check-box"
          checked={isMusicView}
          onChange={hadleView}
        />
        <label htmlFor="music" className="text-music">
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
    <div className="searchdata-container">
      <div className="box-control">
        <div className="box-subcontrol1">
          <div id="text-searchWord">검색어</div>
          <Select
            id="input-seachWord"
            options={searchWordList}
            onChange={() => {
              void selectSearchData;
            }}
            value={selected}
          />
          <button
            id="btn-save"
            style={{
              backgroundColor:
                selected.value !== '' ? themeColor : 'rgb(190, 190, 190)',
            }}
            onClick={submitSearchData}
          >
            저장
          </button>
        </div>
        <div className="box-subcontrol2">
          <div id="btn-preview">
            <span
              onClick={() => {
                void openPreview();
              }}
            >
              미리보기
            </span>
          </div>
          <div id="btn-add-word">
            <span
              onClick={() => {
                setIsModalAdd(!isModalAdd);
              }}
            >
              + 검색어 추가
            </span>
          </div>
          <div
            id="btn-delete-word"
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
      <div className="box-section">
        <div id="btn-add-section">
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
        <div className="setting-section">
          {selected.value === '' && (
            <div className="box-no-data">검색어를 선택하세요.</div>
          )}
          {!isProfileView &&
            !isNewsView &&
            !isImageView &&
            !isMusicView &&
            selected.value !== '' && (
              <div className="box-no-data">
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
                                  className="box-drag"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div {...provided.dragHandleProps}>
                                    <FontAwesomeIcon
                                      className="btn-drag"
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
                                  className="box-drag"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div {...provided.dragHandleProps}>
                                    <FontAwesomeIcon
                                      className="btn-drag"
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
                                  className="box-drag"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div {...provided.dragHandleProps}>
                                    <FontAwesomeIcon
                                      className="btn-drag"
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
                                  className="box-drag"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div {...provided.dragHandleProps}>
                                    <FontAwesomeIcon
                                      className="btn-drag"
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
                                className="box-drag"
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
