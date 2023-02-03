import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { material } from '../../../../store/reducers/filterSlice'
import SearchFilter from '../SearchFilter'
import './FilterMaterial.module.css'

const FilterMaterial = () => {
  const dispatch = useDispatch()
  const materialList = ['Cotton', 'Chiffon', 'Linen', 'Biflex', 'Silk', 'Satin']
  const materials = useSelector((state) => state.filter.materials)
  const len = materialList.map((m) => materials.includes(m.toLowerCase())).filter(e => !e)
    
  const changeState = (ctx) => {
    const arrCheck = materialList.map((m) => materials.includes(m.toLowerCase())).map((e, i) => materialList[i] === ctx ? !e : e)        
    const materialArr = materialList.filter((_, i) => arrCheck[i]).map((m) => m.toLowerCase())    
    dispatch(material(materialArr))         
  }

  return (
    <div className='FilterMaterial'>
      <h4 className='FilterMaterial__title'>Material</h4>
      <SearchFilter typeSearch='material'/>
      <div className='FilterMaterial__btns' style={{gap: len < materialList.length ? '24px' : '0px'}}>
        <div className='FilterMaterial__list'>
          {materialList.filter((m) => materials.includes(m.toLowerCase())).map((m) => (
            <div 
              className='FilterMaterial__list_item filter-item_active'
              style={{background: '#000000', color: '#ffffff'}}
              onClick={() => changeState(m)}
              key={`material_${m}`}>{m}</div>
          ))}        
        </div>
        <div className={len ? 'FilterMaterial__list' : 'none'}>
          {materialList.filter((m) => !materials.includes(m.toLowerCase())).map((m) => (
            <div 
              className='FilterMaterial__list_item'
              style={{background: '#e5e5e5', color: '#000000'}}
              onClick={() => changeState(m)}
              key={`material_${m}`}>{m}</div>
          ))}        
        </div>
      </div>
    </div>
  )
}

export default FilterMaterial
