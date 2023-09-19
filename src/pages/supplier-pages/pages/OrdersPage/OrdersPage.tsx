import React from 'react';

import style from './OrdersPage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { Title } from 'ui-kit/Title/Title';
// import FiltersList from "../../../common/filtersList/filtersList";
// import Table from "../../../common/table/table";
// import api from "./fakeAPI";
// import style from "./orders.module.scss";
// import _ from "lodash";
// import Pagination from "../../../ui/pagination/pagination";
// import { paginate } from "utils/paginate";
// import { useSelector } from "react-redux";
// import ShowPage from "../../../common/ShowPage";
// import Search from "../../../common/Search";
// import Select from "../../../common/select";
// import searchIcon from "assets/icons/files/searchIcon.png";
// import calendar from "assets/icons/files/calendar.png";
// import arrowDown from "assets/icons/files/arrow-down.png";
// import Loader from "../../../common/Loader";

export const OrdersPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.orders_container}>
      <Title>Coming soon...</Title>
    </div>
  );

  // const activePage = useSelector((state) => state.paginate.page_num);
  // const amountPages = useSelector((state) => state.paginate.amountPages);
  // const pageSize = useSelector((state) => state.paginate.page_size);

  // const [orders, setOrders] = useState();
  // const [selectedOrdersStatus, setSelectedOrdersStatus] =
  //   useState("All Orders");
  // const [sortBy, setSortBy] = useState({ path: "name", direction: "asc" });
  // const [openedAdditioninfo, setOpenedAdditioninfo] = useState(false);
  // const [selectedAdditioninfo, setSelectedAdditioninfo] = useState("");
  // const [restFilters, setRestFilters] = useState(false);

  // useEffect(() => {
  //   api.orders.fetchAll().then((data) => setOrders(data));
  // }, []);

  // const columns = {
  //   creationDate: { path: "creationDate", name: "Creation date" },
  //   orderNumber: { path: "orderNumber", name: "Order Number" },
  //   detail: { path: "detail", name: "Detail" },
  //   status: { path: "status", name: "Status" },
  //   shippingDate: { path: "shippingDate", name: "Shipping date" },
  //   trackingNumber: { path: "trackingNumber", name: "Tracking number" },
  //   orderValue: { path: "orderValue", name: "Order value" },
  //   inMoreDetail: {
  //     name: "In more details",
  //     component: (order) => (
  //       <button
  //         className={style.buttonDetails}
  //         id={"button_id_" + order.orderNumber}
  //         onClick={() => {
  //           setSelectedAdditioninfo(order.orderNumber);
  //           setOpenedAdditioninfo(!openedAdditioninfo);
  //         }}
  //         onMouseOut={(e) => setOpenedAdditioninfo(false)}
  //         // className='btn btn-danger btn-sm m-2'
  //         // onClick={() => onDelete(order.orderNumber)}
  //       >
  //         <div className={style.buttonDetailsWrapper_points}>
  //           <div className={style.buttonDetails_points}></div>
  //         </div>
  //         {selectedAdditioninfo === order.orderNumber ? (
  //           <div
  //             id={"button_id_info" + order.orderNumber}
  //             className={
  //               openedAdditioninfo ? style.infoVisible : style.infoInvisible
  //             }
  //           >
  //             <div>Addition info</div>
  //           </div>
  //         ) : (
  //           <></>
  //         )}
  //       </button>
  //     ),
  //   },
  // };

  // const tableStyleClasses = {
  //   table: `${style.table}`,
  //   tableHeader: `${style.tableHeader}`,
  //   tableRow: `${style.tableRow}`,
  //   tableData: `${style.tableData}`,
  //   tableData_inactive: `${style.tableData_inactive}`,
  // };
  // const selectStyles = {
  //   selectWrapper: `${style.selectWrapper}`,
  //   select_headerWrapper: `${style.select_headerWrapper}`,
  //   select_header: `${style.select_header}`,
  //   select_options: `${style.select_options}`,
  //   option: `${style.option}`,
  // };

  // const searchClasses = {
  //   search__wrap: `${style.search__wrap}`,
  //   search__input: `${style.search__input}`,
  //   search_photo: restFilters
  //     ? `${style.search_photo__clicked}`
  //     : `${style.search_photo}`,
  // };

  // const handleRestFiltersSet = () => {
  //   setRestFilters(!restFilters);
  // };

  // const handlePOrderStatusSelect = (value) => {
  //   setSelectedOrdersStatus(value);
  // };
  // const handleSort = (item) => {
  //   setSortBy(item);
  // };

  // if (!orders) {
  //   return <Loader />;
  // } else {
  //   const filteredOrders =
  //     selectedOrdersStatus === "All Orders"
  //       ? orders
  //       : orders.filter((order) => order.status === selectedOrdersStatus);
  //   const sortedOrders = _.orderBy(
  //     filteredOrders,
  //     [sortBy.path],
  //     [sortBy.direction]
  //   );
  //   const orderCrop = paginate(sortedOrders, activePage, pageSize);

  //   return (
  //     <>
  //       <div className={style.searchWithRestFilters}>
  //         <Search
  //           placeholder={"Search"}
  //           searchIcon={searchIcon}
  //           classes={searchClasses}
  //           onClick={handleRestFiltersSet}
  //         />
  //         {restFilters ? (
  //           <span className={style.restFilters}>Reset Filters</span>
  //         ) : (
  //           <></>
  //         )}
  //       </div>
  //       {restFilters ? (
  //         <div className={style.restFiltersWrapper}>
  //           <div className={style.filter}>
  //             <div className={style.filter_name}>Creation Date</div>
  //             <div className={style.filter_input}>
  //               <input
  //                 className={style.filter_input__date}
  //                 placeholder="Select the Date"
  //               ></input>
  //               <img
  //                 className={style.selectDate_img}
  //                 src={calendar}
  //                 alt="calendar"
  //               />
  //             </div>
  //           </div>

  //           <div className={style.filter}>
  //             <div className={style.filter_name}>Sort by:</div>
  //             <Select
  //               defaultName={"Category"}
  //               options={[1, 2, 3]}
  //               img={arrowDown}
  //               classes={selectStyles}
  //             />
  //           </div>
  //         </div>
  //       ) : (
  //         <></>
  //       )}
  //       <div className={style.selectAndPaginationWrapper}>
  //         <ShowPage />
  //         <Pagination activePage={activePage} amountPages={amountPages} />
  //       </div>
  //       <div className={style.contentWrapper}>
  //         <div className={style.filtersWrapper}>
  //           <FiltersList
  //             filters={[
  //               "All Orders",
  //               "New",
  //               "Shipped",
  //               "Delivered",
  //               "Cancelled",
  //             ]}
  //             className={style.filterOrders}
  //             activeClassName={style.filterOrders__active}
  //             onItemSelect={handlePOrderStatusSelect}
  //             selectedItem={selectedOrdersStatus}
  //           />
  //         </div>
  //         <Table
  //           onSort={handleSort}
  //           selectedSort={sortBy}
  //           columns={columns}
  //           data={orderCrop}
  //           classes={tableStyleClasses}
  //         ></Table>
  //       </div>
  //       <div className={style.selectAndPaginationWrapper}>
  //         <ShowPage />
  //         <Pagination activePage={activePage} amountPages={amountPages} />
  //       </div>
  //     </>
  //   );
  // }
}, 'supplier');
