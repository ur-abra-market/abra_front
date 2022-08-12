import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { active } from '../../../store/reducers/paginateSlice';
// import { productService } from '../../../store/reducers/productSlice';
import './pagination.module.css';
import styles from './pagination.module.css'

const Pagination = ({ activePage, amountPages }) => {

  const dispatch = useDispatch();
   
  // const activePage = useSelector((state) => state.paginate.activePage);
  // const amountPages = useSelector((state) => state.paginate.amountPages);
  // const statusProduct = useSelector((state) => state.product.statusProduct);
  // const categoryProduct = useSelector((state) => state.product.categoryProduct);
  
  const arrPages = Array(amountPages - 2).fill(2);
  const pages = amountPages > 2 ? arrPages.map((_, i) => i + 2) : [];
  
  const buttons = pages.map((p) => {
    let currentClass = '';
    if (activePage === p) currentClass = 'activePage';
    if (Math.abs(activePage - p) > 2) currentClass = 'invisible';
    return (
      <div className={`cursor ${currentClass}`} key={p} onClick={() => handlePage(p)}>
        {p}
      </div>
    );
  });
   
  const handlePage = (page) => {
    dispatch(active(page)); 
    // const dataProduct = {type: statusProduct, category: categoryProduct}   
    // dispatch(productService(dataProduct));
  };

  return (
    <div className={styles.Paginator}>
      <div
        className={styles.Paginator__left}
        onClick={() => (activePage > 1 ? handlePage(activePage - 1) : false)}
      >
        <div className={styles.Paginator__left_arrow}></div>
      </div>
      <div className={styles.Paginator__numbers}>
        <div className={`cursor ${activePage === 1 ? 'activePage' : ''}`} onClick={() => handlePage(1)}>
          1
        </div>

        <div className={amountPages < 5 || activePage < 5 ? 'invisible' : ''}>...</div>
        {buttons}
        <div className={amountPages < 5 || amountPages - activePage < 4 ? 'invisible' : ''}>...</div>
        
        <div
          className={`cursor ${activePage === amountPages ? 'activePage' : ''}`}
          onClick={() => handlePage(amountPages)}
        >
          {amountPages}
        </div>
      </div>
      <div
        className={styles.Paginator__right}
        onClick={() => (activePage < amountPages ? handlePage(activePage + 1) : false)}
      >
        <div className={styles.Paginator__right_arrow}></div>
      </div>
    </div>
  );
};
 export default Pagination;
