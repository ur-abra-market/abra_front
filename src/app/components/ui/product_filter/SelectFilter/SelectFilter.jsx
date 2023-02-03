import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ascending, category, sort} from '../../../../store/reducers/filterSlice'
import arrowDown from '../../../../assets/img/icons/arrow-down.png'
import style from './SelectFilter.module.css'
import PropTypes from 'prop-types'


const SelectFilter = ({typeSelect}) => {  
  const dispatch = useDispatch()

  const listSort = ['Sort By Rating (From High to Low)', 'Sort By Rating (From Low to High)', 'Sort By Price (From High to Low)', 'Sort By Price (From Low to High)']
  const typeSort = ['rating', 'rating', 'price', 'price']

  const listCategory = ['All Categories', 'Clothes and Accessories']
  const typeCategory = ['', '1']

  const [listSwitch, setListSwitch] = useState(false)  
  const [list, setList] = useState([]) 
  
  const choiceSort = useSelector((state) => state.filter.sort_type)
  const choiceCategory = useSelector((state) => state.filter.category)
  const choiceAscending = useSelector((state) => state.filter.ascending)

  useEffect(() => {
    if (typeSelect === 'sort') 
      setList(listSort)
     
    if (typeSelect === 'category') 
      setList(listCategory)
        
  }, [])

  const option = () => {    
    if (typeSelect === 'sort') {
      if (choiceSort === 'rating') 
        return !choiceAscending ? listSort[0] : listSort[1]
      
      if (choiceSort === 'price') 
        return !choiceAscending ? listSort[2] : listSort[3]
             
    }  
    if (typeSelect === 'category') {
      const index = typeCategory.findIndex(e => e === choiceCategory)
      return index < 0 ? listCategory[0] : listCategory[index]
    }          
    setListSwitch(false)
  }
  
  const basic = option().split(/[()]/)[0]
  const remains = option().split(/[()]/)[1] 

  const styleList = {
    height: listSwitch ? 'fit-content' : '0px'
  } 
    
  const switchList = (e) => {
    e.preventDefault()
    const nameClass = e.relatedTarget.className
    if (!nameClass.includes('SelectFilter')) {
      setTimeout(() => {
        setListSwitch(false)
      }, 100)
    }
  }

  const handlerOption = (value, index) => {    
    if (listSort.includes(value)) dispatch(sort(typeSort[index]))
    if (listCategory.includes(value)) dispatch(category(typeCategory[index])) 
    if (remains === 'From High to Low') dispatch(ascending(true))  
    if (remains === 'From Low to High') dispatch(ascending(false))      
  }

  return (
    <div className={style.selectFilter} onMouseOut={(e) => switchList(e)}>
      <div
        className={style.selectFilter__select}
        onClick={() => setListSwitch(!listSwitch)}
      >
        <div className={style.selectFilter_text}>
          <div>{basic}</div>
          <div className={style.selectFilter_text_remains}>
            {remains ? `(${remains})` : ''}
          </div>
        </div>
        <div className={style.selectFilter_img}>
          <img src={arrowDown} alt="arrow-down" />
        </div>
      </div>
      <ul className={style.selectFilter__list} style={styleList}>
        {list.map((e, i) => (
          <li
            className={style.selectFilter__list_item}
            key={`option_${e}`}
            onClick={() => handlerOption(e, i)}
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  )
}

SelectFilter.propTypes = {
typeSelect: PropTypes.any,

}

export default SelectFilter
