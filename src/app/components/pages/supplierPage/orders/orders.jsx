import React, { useEffect, useState } from 'react';
import { Button } from '../../../common/buttons';
import Table from '../../../common/table/table';
import api from './fakeAPI';
import style from './orders.module.css';

const Orders = ({ onSort, selectedSort, onToggleBookMark, onDelete, ...rest }) => {
    const [orders, setOrders] = useState();
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
                // className='btn btn-danger btn-sm m-2'
                // onClick={() => onDelete(order.orderNumber)}
            >
                <div className={style.buttonDetailsWrapper_points}>
                    <div className={style.buttonDetails_points}></div>
                </div>
            </button>
        )}
    };

    const tableStyleClasses = {
        table: `${style.table}`,
        tableHeader: `${style.tableHeader}`,
        tableRow: `${style.tableRow}`,
        tableData: `${style.tableData}`,
    }

    return (
        <>
        <div className={style.buttonsWrapper}>
            <Button
                value="New"
                className={style.filterOrdersBtn}
            />
            <Button
                value="All Orders"
                className={style.filterOrdersBtn}
            />
            <Button
                value="Shipped"
                className={style.filterOrdersBtn}
            />
            <Button
                value="Delivered"
                className={style.filterOrdersBtn}
            />
            <Button
                value="Cancelled"
                className={style.filterOrdersBtn}
            />
        </div>
        <div className={style.tableWrapper}>
            <Table
                onSort={onSort}
                selectedSort={selectedSort}
                columns={columns}
                data={orders}
                classes={tableStyleClasses}>
            </Table>
        </div>
        </>
        
    );
}
 
export default Orders;