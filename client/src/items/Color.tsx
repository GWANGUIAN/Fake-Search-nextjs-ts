import axios from 'axios';
import type { ColorResult } from 'react-color';
import { ChromePicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../redux/actions';
import type { RootState } from '../redux/reducers';
import { logger } from '../utils/logger';

interface Props {
  colorRef: React.LegacyRef<HTMLDivElement>;
  isColorOpen: boolean;
}

export default function Color({ colorRef, isColorOpen }: Props) {
  const dispatch = useDispatch();
  const { themeColor } = useSelector((state: RootState) => state.loginReducer);

  const hadleThemeColor = (e: ColorResult) => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/users/theme-color`,
        {
          themeColor: e.hex,
        },
        { withCredentials: true },
      )
      .then(() => {
        dispatch(login({ themeColor: e.hex }));
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  return (
    <div ref={colorRef} className={isColorOpen ? 'color-container' : 'hidden'}>
      <ChromePicker color={themeColor} onChange={hadleThemeColor} />
    </div>
  );
}
