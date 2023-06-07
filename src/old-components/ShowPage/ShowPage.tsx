import { useState, MouseEvent } from 'react';

import { useAppDispatch } from '../../common/hooks';
import { amount } from '../../store/reducers/paginateSlice';

import style from './ShowPage.module.css';

import { ArrowDownIcon } from 'assets/icons'; // 24px

const ShowPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const list = ['20', '40', '60', '80', '100'];
  const [option, setOption] = useState(list[0]);
  const [listSwitch, setListSwitch] = useState(false);
  const styleList = {
    height: listSwitch ? 'fit-content' : '0px',
  };

  const switchList = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const nameClass = e.currentTarget.className;

    // TODO !!!!!
    if (!nameClass.includes('ShowPage')) {
      setTimeout(() => {
        setListSwitch(false);
      }, 100);
    }
  };

  return (
    <div className={style.show_page} onMouseOut={e => switchList(e)} onBlur={() => 0}>
      <div className={style.show_page_select}>
        <div className={style.show_page_text}>{`Show by ${option}`}</div>
        <div
          role="presentation"
          className={style.show_page_img}
          onClick={() => setListSwitch(!listSwitch)}
        >
          <ArrowDownIcon />
        </div>
      </div>
      <ul className={style.show_page_list} style={styleList}>
        {list.map(e => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            className={style.show_page_list_item}
            key={`option_${e}`}
            onClick={() => {
              setOption(e);
              setListSwitch(!listSwitch);
              dispatch(amount(+e));
            }}
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowPage;
