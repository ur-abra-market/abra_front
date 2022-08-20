import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { paginate } from '../../../../utils/paginate';
import Search from '../../../common/Search';
import api from './fakeAPI';
import style from './productsList.module.css';
import _ from 'lodash';
import ShowPage from '../../../common/ShowPage';
import Pagination from '../../../ui/pagination/pagination';
import searchIcon from '../../../../assets/img/icons/searchIcon.png';
import FiltersList from '../../../common/filtersList/filtersList';
import Table from '../../../common/table/table';
import tileLayout from '../../../../assets/img/icons/tileLayout.png';
import tableLayout from '../../../../assets/img/icons/tableLayout.png';
import addImg from '../../../../assets/img/icons/addImg.png';
import deleteImg from '../../../../assets/img/icons/deleteImg.png';
import star from '../../../../assets/img/icons/Star 1.png';
import viewIcon from '../../../../assets/img/icons/viewIcon.png';
import additIcon from '../../../../assets/img/icons/additIcon.png';

const ProductsList = (params) => {
    const activePage = useSelector((state) => state.paginate.activePage);
    const amountPages = useSelector((state) => state.paginate.amountPages);
    const amountItems = useSelector((state) => state.paginate.amountItems);
    const pageSize = amountItems;

    const [products, setProducts] = useState();
    const [selectedProductsStatus, setSelectedProductsStatus] = useState('All Products');
    const [sortBy, setSortBy] = useState({ path: 'name', direction: 'asc' });
    const [layout, setLayout] = useState('tableLayout')

    useEffect(() => {
        api.products.fetchAll().then((data) => setProducts(data));
    }, []);

    const handleSwitchMainCheckbox = (tagret) =>{
        const inputs = document.querySelectorAll('.checkbox')
        inputs.forEach((input) => input.checked = tagret.checked)
    }

    const columns = {
        check : { name: <input type='checkbox' onClick={ (e) => handleSwitchMainCheckbox(e.target)}/>, component: (product) => ( <input type='checkbox' className='checkbox'/> )},
        orderNumber: { path: 'SKU', name: 'SKU' },
        detail: { path: 'picture', name: 'Picture' },
        name: { path: 'name', name: 'Name' },
        creationDate: { path: 'creationDate', name: 'Creation Date' },
        status: { path: 'status', name: 'Status' },
        price: { path: 'price', name: 'Price' },
        balaceUnits: { path: 'balaceUnits', name: 'Balace, units' },
        visibility: { path: 'visibility', name: 'Visibility' }
    };

    const tableStyleClasses = {
        table: `${style.table}`,
        tableHeader: `${style.tableHeader}`,
        tableRow: `${style.tableRow}`,
        tableData: `${style.tableData}`,
        tableData_inactive: `${style.tableData_inactive}`
    }
    const searchClasses = {
        search__wrap: `${style.search__wrap}`,
        search__input: `${style.search__input}`,
    };

    const handleLayoutSet = () => {
        setLayout((prevState) =>
        prevState === 'tableLayout' ? 'tileLayout' : 'tableLayout'
      );
    }

    const handleProductsStatusSelect = (value) => {
        setSelectedProductsStatus(value);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (!products)  {
        return (<h2 className={style.loading}>Loading...</h2>)
    }
    else {
        const filteredProducts = (selectedProductsStatus === "All Products") ? 
            products :
            products.filter(
                (order) => 
                    order.status === selectedProductsStatus
            );
        const sortedProducts = _.orderBy(filteredProducts, [sortBy.path], [sortBy.direction]);
        const orderCrop = paginate(sortedProducts, activePage, pageSize);

        return (
            <>
            <div className={style.searchAndLayout}>
                <Search
                    placeholder={'Search'}
                    searchIcon={searchIcon}
                    classes={searchClasses}
                />
                <div className={style.layouts}>
                    <img className={layout==='tileLayout' ? `${style.activeLayout}` : `${style.inactiveLayout}`} onClick={handleLayoutSet} src={tileLayout} alt="tileLayoutImg" />
                    <img className={layout==='tableLayout' ? `${style.activeLayout}` : `${style.inactiveLayout}`} onClick={handleLayoutSet} src={tableLayout} alt="tableLayoutImg" />
                </div>
            </div>
            <div className={style.selectAndPaginationWrapper}>
                <ShowPage/>
                <Pagination
                    activePage={activePage}
                    amountPages={amountPages}
                />
            </div>
            { layout==='tableLayout' ? (
            <div className={style.contentWrapper}>
                <div className={style.contentHeader}>
                    <div className={style.filtersWrapper}>
                        <FiltersList
                            filters={[
                                "All Products",
                                "On Sale",
                                "Off-sale"
                                ]}
                            className={style.filteredProducts}
                            activeClassName={style.filteredProducts__active}
                            onItemSelect={handleProductsStatusSelect}
                            selectedItem={selectedProductsStatus}
                        />
                    </div>
                    <div className={style.actionsWrapper}>
                        <div className={style.action}>
                            <img src={addImg} alt="img" />
                            <div className={style.subtitle}>Add a new product</div>
                        </div>
                        <div className={style.action}>
                            <img src={deleteImg} alt="img" />
                            <div className={style.subtitle}>Recently deleted</div>
                        </div>
                    </div>
                </div>
                <Table
                    onSort={handleSort}
                    selectedSort={sortBy}
                    columns={columns}
                    data={orderCrop}
                    classes={tableStyleClasses}>
                </Table>
            </div>
            ) :
            (
                <div className={style.cardsWrapper}>
                {products.map((item) => (
                    <div className={style.productCard} key={item.id}>
                        {/* <img src={item.picture} alt='product img'></img> */}
                        <div className={style.picture}></div>
                        <div className={style.viewAndAdditWrapper}>
                            <div className={style.iconBackground}><img src={viewIcon} alt='viewIcon'/></div>
                            <div className={style.iconBackground}><img src={additIcon} alt='additIcon'/></div>
                        </div>
                        <div className={style.productName}>{item.name}</div>
                        <div className={style.priceAndConditions}>
                            <div className={style.productPrice}>{item.price}</div>
                            <div className={style.condition}>/from 4 pcs</div>
                        </div>
                        <div className={style.otherInfo}>
                            <div className={style.rating}>
                                <img src={star} alt="star" />
                                <img src={star} alt="star" />
                                <img src={star} alt="star" />
                                <img src={star} alt="star" />
                                <img src={star} alt="star" />
                            </div>
                            <div className={style.productCreationDate}>{item.creationDate}</div>
                        </div> 
                    </div>
                ))}
                </div>
            )
            }
            <div className={style.selectAndPaginationWrapper}>
                <ShowPage/>
                <Pagination
                    activePage={activePage}
                    amountPages={amountPages}
                />
            </div>

            </>
            
        );
    }
}
 
export default ProductsList;