import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import style from './OrderHistoryPage.module.css';

const OrderHistoryPage = (): JSX.Element => {
  const statusLinksList = ['All', 'Preparing', 'In progress', 'Completed'];
  const ordersInfo = [
    {
      number: '4784437395989684',
      date: '20.12.2022',
      status: 'In progress',
    },
    {
      number: '4784437395989684',
      date: '20.12.2022',
      status: 'In progress',
    },
    {
      number: '4784437395989684',
      date: '20.12.2022',
      status: 'Preparing',
    },
    {
      number: '4784437395989684',
      date: '19.12.2022',
      status: 'In progress',
    },
    {
      number: '4784437395989684',
      date: '18.12.2022',
      status: 'Completed',
    },
  ];

  // TODO переделать!!!
  // const statusCheck = statusLinksList.map(link =>
  //   link === 'All' ? (link = true) : (link = false),
  // );

  // const [check, setCheck] = useState(statusCheck);
  const [check, setCheck] = useState<any[]>([]);
  const [ordersArray, setOrdersArray] = useState(ordersInfo);

  const handleButtonCategoryClick = (index: number, link: string): void => {
    const arrCheck = check.map((e, i) => i === index);

    setCheck(arrCheck);

    if (link === 'All') setOrdersArray(ordersInfo);
    else {
      const filterOrders = ordersInfo.find(order => link === order.status);

      if (filterOrders) {
        setOrdersArray([filterOrders]);
      }
    }
  };

  return (
    <div className={style.main}>
      <h1 className={style.title}>Order History</h1>
      <div className={style.links}>
        {statusLinksList.map((link, i) => (
          <button
            type="button"
            className={style.link}
            style={{
              background: check[i] ? '#000000' : '#D9D9D9',
              color: check[i] ? '#ffffff' : 'rgba(0, 0, 0, 0.5)',
            }}
            onClick={() => handleButtonCategoryClick(i, link)}
            key={`status_${link}`}
          >
            {link}
          </button>
        ))}
      </div>

      {ordersArray.length ? (
        <ul className={style.list}>
          {ordersArray.map((order, index) => (
            <li key={index}>
              <Link to={order.number} className={style.item}>
                <div className={style.info}>
                  <h3 className={style.number}>Order No: {order.number}</h3>
                  <p className={style.date}>{order.date}</p>
                </div>
                <div className={style.status}>{order.status}</div>

                <div className={style.images}>
                  <div className={style.image} />
                  <div className={style.image} />
                  <div className={style.image} />
                  <div className={style.image} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className={style.messageTitle}>
          <p>Unfortunately, there are no orders.</p>
          <p>As soon as you place your first order it will appear here</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
