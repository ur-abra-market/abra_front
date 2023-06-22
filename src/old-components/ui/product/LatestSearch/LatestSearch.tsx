import React, { FC } from 'react';

import style from './LatestSearch.module.scss';

interface LatestSearchProps {
  latestSearchData: any[];
}
const LatestSearch: FC<LatestSearchProps> = ({ latestSearchData }) => {
  return (
    <div className={style.wrapper}>
      <h2>Latest searches</h2>
      <div className={style.list}>
        {latestSearchData.map(({ search_query }, i) => (
          <div className={style.item} key={`search-${i}`}>
            {search_query}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestSearch;
