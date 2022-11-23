import React from 'react'
import style from './LatestSearch.module.css'
import PropTypes from 'prop-types'

const LatestSearch = ({latestSearchData}) => {

  return (
    <div className={style.latestSearch}>
      <h2>Latest searches</h2>
      <div className={style.latestSearch__list}>
        {latestSearchData.map((e, i) => (
          <div className={style.latestSearch__list_item} key={`search-${i}`}>
            {e}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestSearch


LatestSearch.propTypes = {
  latestSearchData: PropTypes.array.isRequired
}