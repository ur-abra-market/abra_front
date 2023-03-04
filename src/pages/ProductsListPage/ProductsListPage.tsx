import React, { FC, useEffect, useState } from "react";

import _ from "lodash";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import addImg from "assets/img/icons/addImg.png";
import additIcon from "assets/img/icons/additIcon.png";
import deleteImg from "assets/img/icons/deleteImg.png";
import star from "assets/img/icons/Star 1.png";
import { ReactComponent as TileLayout } from "assets/img/icons/tileLayout.svg";
import { ReactComponent as TableLayout } from "assets/img/icons/tableLayout.svg";
import viewIcon from "assets/img/icons/viewIcon.png";
import { ReactComponent as VectorUp } from "assets/img/icons/Vector.svg";
import { ReactComponent as VectorDown } from "assets/img/icons/VectorDown.svg";
import FiltersList from "components/FiltersList";
import Loader from "components/Loader";
import Modal from "components/new-components/Modal";
import Table from "components/table";
import {
  checkboxStyles,
  selectStyles,
  tableStyleClasses
} from "pages/ProductsListPage/constantsOfClassesStyles";
import style from "pages/ProductsListPage/ProductsListPage.module.css";
import {
  deleteProducts,
  manageProductsService
} from "store/reducers/manageProductsSlice";
import { paginate } from "utils/paginate";
import { Checkbox, Input, Search, Select } from "../../components/ui-kit";
import ShowPage from "../../components/ShowPage";
import Pagination from "../../components/ui/Pagination";

const ProductsListPage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const activePage = useAppSelector(state => state.paginate.page_num);
  const amountPages = useAppSelector(state => state.paginate.amountPages);
  const pageSize = useAppSelector(state => state.paginate.page_size);

  const [selectedProductsStatus, setSelectedProductsStatus] = useState("All Products");
  const [sortBy, setSortBy] = useState({
    path: "is_active",
    direction: "desc"
  });
  const [layout, setLayout] = useState("tableLayout");
  const [restFilters, setRestFilters] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, products } = useAppSelector(state => state.manageProducts);

  useEffect(() => {
    dispatch(manageProductsService());
  }, []);

  const changeCheckbox = (): void => {
    setChecked(!checked);
  };

  const handleChangeModalActive = (): void => {
    setModalActive(!modalActive);
  };

  const handleSwitchMainCheckbox = (tagret: any) => {
    // TODO переделать
    // const inputs = document.querySelectorAll('.checkbox');
    //
    // inputs.forEach(input => {
    //   input.checked = tagret.checked;
    // });
  };

  const columns = {
    check: {
      name: <input type="checkbox" onClick={e => handleSwitchMainCheckbox(e.target)} />,
      component: (product: any) => (
        <input
          type="checkbox"
          className="checkbox"
          onClick={changeCheckbox}
          id={product.id}
        />
      )
    },
    orderNumber: { path: "id", name: "SKU" },
    detail: { path: "image_url", name: "Picture" },
    name: { path: "name", name: "Name" },
    creationDate: { path: "datetime", name: "Creation Date" },
    status: { path: "with_discount", name: "Status" },
    price: { path: "price", name: "Price" },
    balaceUnits: { path: "balance", name: "Balace, units" },
    visibility: { path: "is_active", name: "Visibility" }
  };

  function getCheckedCheckboxes(): void {
    const checkedCheckbox = document.querySelectorAll("input.checkbox:checked");
    const selectedItems = [];

    for (let index = 0; index < checkedCheckbox.length; index += 1)
      selectedItems.push(checkedCheckbox[index].id);

    getDeletedItems(selectedItems);
    handleChangeModalActive();
  }

  const getDeletedItems = (items: any): void => {
    dispatch(deleteProducts(items));
  };

  const handleRestFiltersSet = (): void => {
    setRestFilters(!restFilters);
  };

  const handleLayoutSet = (): void => {
    setLayout(prevState => (prevState === "tableLayout" ? "tileLayout" : "tableLayout"));
  };
  const filters = {
    "All Products": "All Products",
    "On-sale": "1",
    "Off-sale": "0"
  };
  const handleProductsStatusSelect = (value: any): void => {
    let fieldValue = value;

    if (value === "Off-sale") fieldValue = "0";
    if (value === "On-sale") fieldValue = "1";
    setSelectedProductsStatus(fieldValue);
  };

  const handleSort = (item: any): void => {
    setSortBy(item);
  };

  if (isLoading) return <Loader />;

  const prod = products || [];
  const filteredProducts =
    selectedProductsStatus === "All Products"
      ? [...prod].sort((prev, next) => prev.is_active - next.is_active)
      : prod.filter(order => order.with_discount.toString() === selectedProductsStatus);
  // @ts-ignore
  const sortedProducts = _.orderBy(filteredProducts, [sortBy.path], [sortBy.direction]);
  const orderCrop = paginate(sortedProducts, activePage, pageSize);

  return (
    <>
      <div className={style.searchAndLayout}>
        <div className={style.searchWithRestFilters}>
          <Search
            placeholder="Search by Name or SKU"
            className={style.search}
          />
          <span className={style.rest_filters} onClick={handleRestFiltersSet}>Show filters</span>
          {!restFilters
            ? <VectorDown onClick={handleRestFiltersSet} />
            : <>
              <VectorUp onClick={handleRestFiltersSet} className={style.vectorUp} />
              <a className={style.reset_link}>Reset Filters</a>
            </>}
        </div>
        <div className={style.layouts}>
          <TileLayout onClick={handleLayoutSet} className={layout === "tileLayout"
            ? `${style.activeLayout}`
            : `${style.inactiveLayout}`} />
          <TableLayout onClick={handleLayoutSet} className={layout === "tableLayout"
            ? `${style.activeLayout}`
            : `${style.inactiveLayout}`} />
        </div>
      </div>
      {restFilters ? (
        <div className={style.restFiltersWrapper}>
          <div className={style.filter}>
            <div className={style.filter_name}>Creation Date</div>
            <Input type="date" className={style.filter_input__date} placeholder="Select the Date" />
          </div>
          <div className={style.filter}>
            <div className={style.filter_name}>Sort by:</div>
            <Select
              options={[{ label: "dasda", value: 1 }]}
            />
          </div>

          <div className={style.filter}>
            <Select
               options={[{label:'On Sale', value:6}]}
            />
          </div>
          <Checkbox label="Include Hidden"  size='sm' />
        </div>
      ) : (
        <></>
      )}
      <div className={style.selectAndPaginationWrapper}>
        <ShowPage />
        <Pagination activePage={activePage} amountPages={amountPages} />
      </div>
      {layout === "tableLayout" ? (
        <div className={style.contentWrapper}>
          <div className={style.contentHeader}>
            <div className={style.filtersWrapper}>
              <FiltersList
                filters={filters}
                className={style.filteredProducts}
                activeClassName={style.filteredProducts__active}
                onItemSelect={handleProductsStatusSelect}
                selectedItem={selectedProductsStatus}
              />
            </div>
            <div className={style.actionsWrapper}>
              <div className={style.action} onClick={handleChangeModalActive}>
                Delete items
              </div>
              <div className={style.action}>
                <img src={addImg} alt="img" />
                <div
                  role="presentation"
                  className={style.subtitle}
                  onClick={() => {
                    navigate("../add-product");
                  }}
                >
                  Add a new product
                </div>
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
            classes={tableStyleClasses}
          />
          <Modal active={modalActive}>
            <h1 className={style.modalHeader}>
              Are you sure you want to delete the selected items?
            </h1>
            <div className={style.buttons_wrapper}>
              <div className={style.modal_button} onClick={getCheckedCheckboxes}>
                YES
              </div>
              <div className={style.modal_button} onClick={handleChangeModalActive}>
                NO
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <div className={style.cardsWrapper}>
          {products?.map(item => (
            <div className={style.productCard} key={item.id}>
              {/* <img src={item.picture} alt='product img'></img> */}
              <div className={style.picture} />
              <div className={style.viewAndAdditWrapper}>
                <div className={style.iconBackground}>
                  <img src={viewIcon} alt="viewIcon" />
                </div>
                <div className={style.iconBackground}>
                  <img src={additIcon} alt="additIcon" />
                </div>
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
      )}
      <div className={style.selectAndPaginationWrapper}>
        <Pagination activePage={activePage} amountPages={amountPages} />
      </div>
    </>
  );
};

export default ProductsListPage;
