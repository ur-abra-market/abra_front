import React, { FC } from 'react';

import style from './LatestSearch.module.css';

interface LatestSearchProps {
  latestSearchData: any[];
}
const LatestSearch: FC<LatestSearchProps> = ({ latestSearchData }) => {
  return (
    <div className={style.latestSearch}>
      <h2>Latest searches</h2>
      <div className={style.latestSearch__list}>
        {latestSearchData.map(({ search_query }, i) => (
          <div className={style.latestSearch__list_item} key={`search-${i}`}>
            {search_query}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestSearch;
