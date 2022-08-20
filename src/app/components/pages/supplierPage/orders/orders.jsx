import React, { useEffect, useState } from 'react';
import FiltersList from '../../../common/filtersList/filtersList';
import Table from '../../../common/table/table';
import api from './fakeAPI';
import style from './orders.module.css';
import _ from 'lodash';
import Pagination from '../../../ui/pagination/pagination';
import { paginate } from '../../../../utils/paginate';
import { useSelector } from 'react-redux';
import ShowPage from '../../../common/ShowPage';
import Search from '../../../common/Search';
import searchIcon from '../../../../assets/img/icons/searchIcon.png';


const Orders = () => {
    const activePage = useSelector((state) => state.paginate.activePage);
    const amountPages = useSelector((state) => state.paginate.amountPages);
    const amountItems = useSelector((state) => state.paginate.amountItems);
    const pageSize = amountItems;

    const [orders, setOrders] = useState();
    const [selectedOrdersStatus, setSelectedOrdersStatus] = useState("All Orders");
    const [sortBy, setSortBy] = useState({ path: 'name', direction: 'asc' });
    const [openedAdditioninfo, setOpenedAdditioninfo] = useState(false);
    const [selectedAdditioninfo, setSelectedAdditioninfo] = useState('');

    useEffect(() => {
        api.orders.fetchAll().then((data) => setOrders(data));
    }, []);

    const columns = {
        creationDate : { path: 'creationDate', name: 'Creation date' },
        orderNumber: { path: 'orderNumber', name: 'Order Number' },
        detail: { path: 'detail', name: 'Detail' },
        status: { path: 'status', name: 'Status' },
        shippingDate: { path: 'shippingDate', name: 'Shipping date' },
        trackingNumber: { path: 'trackingNumber', name: 'Tracking number' },
        orderValue: { path: 'orderValue', name: 'Order value' },
        inMoreDetail: {  name: 'In more details',           
            component: (order) => (
            <button className={style.buttonDetails}
                id={'button_id_' + order.orderNumber}
                onClick={() => { setSelectedAdditioninfo(order.orderNumber); setOpenedAdditioninfo(!openedAdditioninfo)}}
                onMouseOut={(e) => setOpenedAdditioninfo(false)}
                // className='btn btn-danger btn-sm m-2'
                // onClick={() => onDelete(order.orderNumber)}
            >
                <div className={style.buttonDetailsWrapper_points}>
                    <div className={style.buttonDetails_points}></div>
                </div>
                {(selectedAdditioninfo===order.orderNumber) ? 
                (<div id={'button_id_info' + order.orderNumber} 
                    className={openedAdditioninfo ? style.infoVisible : style.infoInvisible}>
                    <div >Addition info</div>
                </div>) :
                <></>}
            </button>
        )}
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

    const handlePOrderStatusSelect = (value) => {
        setSelectedOrdersStatus(value);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (!orders)  {
        return (<h2 className={style.loading}>Loading...</h2>)
    }
    else {
        const filteredOrders = (selectedOrdersStatus === "All Orders") ? 
            orders :
            orders.filter(
                (order) => 
                    order.status === selectedOrdersStatus
            );
        const sortedOrders = _.orderBy(filteredOrders, [sortBy.path], [sortBy.direction]);
        const orderCrop = paginate(sortedOrders, activePage, pageSize);

        return (
            <>
            <Search
                placeholder={'Search'}
                searchIcon={searchIcon}
                classes={searchClasses}
            />
            <div className={style.selectAndPaginationWrapper}>
                <ShowPage/>
                <Pagination
                    activePage={activePage}
                    amountPages={amountPages}
                />
            </div>
            <div className={style.contentWrapper}>
                <div className={style.filtersWrapper}>
                    <FiltersList
                        filters={[
                            "All Orders",
                            "New",
                            "Shipped",
                            "Delivered",
                            "Cancelled"]}
                        className={style.filterOrders}
                        activeClassName={style.filterOrders__active}
                        onItemSelect={handlePOrderStatusSelect}
                        selectedItem={selectedOrdersStatus}
                    />
                </div>
                <Table
                    onSort={handleSort}
                    selectedSort={sortBy}
                    columns={columns}
                    data={orderCrop}
                    classes={tableStyleClasses}>
                </Table>
            </div>
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
 
export default Orders;