import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { material, brand } from '../../../../store/reducers/filterSlice'
import './SearchFilter.css'

const SearchFilter = (props) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const brands = useSelector((state) => state.filter.brands)
  const materials = useSelector((state) => state.filter.materials)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (text.trim() !== '') {
      if (props.typeSearch === 'material') dispatch(material([...materials, text]))
      if (props.typeSearch === 'brand') dispatch(brand([...brands, text]))
    }    
  }

  return (
    <form className={style.searchFilter} onSubmit={handleSubmit}>
      <input
        type="text"
        className={style.searchFilter__text}
        value={text}
        placeholder="Search"
        onChange={(e) => setText(e.target.value)}
      />
      <input type="submit" hidden />
    </form>
  )
}

export default SearchFilter
