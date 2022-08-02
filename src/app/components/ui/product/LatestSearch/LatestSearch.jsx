import React from 'react'
import './LatestSearch.css'


const LatestSearch = () => {
  const dataSearch = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9', 'Tag 10', 'Tag 11', 'Tag 12', 'Tag 13', 'Tag 14', 'Tag 15']  
  return (
    <div className='LatestSearch'>
      <h2>Latest searches</h2>
      <div className='LatestSearch__list'>
        {dataSearch.map((e, i) => (
          <div className='LatestSearch__list_item' key={`search-${i}`}>
            {e}
          </div>          
        ))}
      </div>

    </div>
  )
}

export default LatestSearch