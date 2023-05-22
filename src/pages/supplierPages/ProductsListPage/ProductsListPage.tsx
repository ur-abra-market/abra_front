import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import ShowPage from '../../../old-components/ShowPage';
import { Checkbox, Input, ISelectOption, Search, Select } from '../../../ui-kit';

import EditIcon from 'assets/img/icons/editIcon.svg';
import imageProduct from 'assets/img/icons/imageProduct.svg';
import star from 'assets/img/icons/Star 5].svg';
import { ReactComponent as TableLayout } from 'assets/img/icons/tableLayout.svg';
import { ReactComponent as TileLayout } from 'assets/img/icons/tileLayout.svg';
import { ReactComponent as VectorUp } from 'assets/img/icons/Vector.svg';
import { ReactComponent as VectorDown } from 'assets/img/icons/VectorDown.svg';
import ViewIcon from 'assets/img/icons/viewIcon.svg';
import Modal from 'components/Modal';
import Table from 'old-components/table';
import Pagination from 'old-components/ui/Pagination';
import { tableStyleClasses } from 'pages/supplierPages/ProductsListPage/constantsOfClassesStyles';
import style from 'pages/supplierPages/ProductsListPage/ProductsListPage.module.css';
import {
  deleteProducts,
  manageProductsService,
} from 'store/reducers/manageProductsSlice';

export const CATEGORY_SELECT: ISelectOption[] = [
  { label: 'S', value: '1' },
  { label: 'M', value: '2' },
  { label: 'L', value: '3' },
  { label: 'XL', value: '4' },
];
export const STATUS_SELECT: ISelectOption[] = [
  { label: 'On Sale', value: '1' },
  { label: 'Off-sale', value: '2' },
];
// interface ItemType {
//   id: number;
//   price: number;
//   image: string;
//   name: string;
// }
const ProductsListPage: FC = (): JSX.Element => {
  // const navigate = useNavigate();
  const activePage = useAppSelector(state => state.paginate.page_num);
  const amountPages = useAppSelector(state => state.paginate.amountPages);
  // const pageSize = useAppSelector(state => state.paginate.page_size);

  // const [selectedProductsStatus] = useState('All Products');
  const [sortBy, setSortBy] = useState({
    path: 'is_active',
    direction: 'desc',
  } as const);
  const [layout, setLayout] = useState('tableLayout');
  const [restFilters, setRestFilters] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  // const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  // const { isLoading, products } = useAppSelector(state => state.manageProducts);

  useEffect(() => {
    dispatch(manageProductsService());
  }, [dispatch]);

  const handleChangeModalActive = (): void => {
    setModalActive(!modalActive);
  };

  const handleSwitchMainCheckbox = (): void => {};

  const columns = {
    check: {
      name: <input type="checkbox" onClick={handleSwitchMainCheckbox} />,
      // component: (product: any) => (
      //   <input
      //     type="checkbox"
      //     className="checkbox"
      //     onClick={changeCheckbox}
      //     id={product.id}
      //   />
      // ),
    },
    orderNumber: { path: 'id', name: 'SKU' },
    detail: { path: 'image_url', name: 'Picture' },
    name: { path: 'name', name: 'Name' },
    creationDate: { path: 'datetime', name: 'Creation Date' },
    status: { path: 'with_discount', name: 'Status' },
    price: { path: 'price', name: 'Price' },
    balaceUnits: { path: 'balance', name: 'Balace, units' },
    visibility: { path: 'is_active', name: 'Visibility' },
  };

  const name = ['Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dre...'];
  // eslint-disable-next-line no-magic-numbers
  const price = [8.5];
  const data: { image: string; price: number; name: string; id: number }[] = [
    // eslint-disable-next-line no-magic-numbers
    ...Array(20),
  ].map((_, index) => ({
    id: index + 1,
    name: name[index % name.length],
    price: price[index % price.length],
    image: imageProduct,
  }));

  function getCheckedCheckboxes(): void {
    const checkedCheckbox = document.querySelectorAll('input.checkbox:checked');
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
    setLayout(prevState => (prevState === 'tableLayout' ? 'tileLayout' : 'tableLayout'));
  };
  // const filters = {
  //   'All Products': 'All Products',
  //   'On-sale': '1',
  //   'Off-sale': '0',
  // };
  // const handleProductsStatusSelect = (value: any): void => {
  //   let fieldValue = value;
  //
  //   if (value === 'Off-sale') fieldValue = '0';
  //   if (value === 'On-sale') fieldValue = '1';
  //   setSelectedProductsStatus(fieldValue);
  // };

  const handleSort = (item: any): void => {
    setSortBy(item);
  };

  // if (isLoading) return <Loader />;

  // const prod = products || [];
  // const filteredProducts =
  //   selectedProductsStatus === 'All Products'
  //     ? [...prod].sort((prev, next) => prev.is_active - next.is_active)
  //     : prod.filter(order => order.with_discount.toString() === selectedProductsStatus);
  // //const sortedProducts = _.orderBy(filteredProducts, [sortBy.path], [sortBy.direction]);
  // //const orderCrop = paginate(sortedProducts, activePage, pageSize);

  return (
    <>
      <div className={style.search_and_layout}>
        <div className={style.search_with_rest_filters}>
          <Search placeholder="Search by Name or SKU" className={style.search} />
          <span
            role="presentation"
            className={style.rest_filters}
            onClick={handleRestFiltersSet}
          >
            Show filters
          </span>
          {!restFilters ? (
            <VectorDown onClick={handleRestFiltersSet} />
          ) : (
            <>
              <VectorUp onClick={handleRestFiltersSet} className={style.vector_up} />
              <div className={style.reset_link}>Reset Filters</div>
            </>
          )}
        </div>
        <div className={style.layouts}>
          <TileLayout
            onClick={handleLayoutSet}
            className={
              layout === 'tileLayout'
                ? `${style.active_layout}`
                : `${style.inactive_layout}`
            }
          />
          <TableLayout
            onClick={handleLayoutSet}
            className={
              layout === 'tableLayout'
                ? `${style.active_layout}`
                : `${style.inactive_layout}`
            }
          />
        </div>
      </div>
      {restFilters && (
        <div className={style.rest_filters_wrapper}>
          <div className={style.filter}>
            <div className={style.filter_name}>Creation Date</div>
            <Input
              type="date"
              className={style.filter_input_date}
              placeholder="Select the Date"
            />
          </div>
          <div className={style.filter}>
            <div className={style.filter_name}>Sort by:</div>
            <Select options={CATEGORY_SELECT} padding="23px" className={style.select} />
          </div>

          <div className={style.filter}>
            <Select options={STATUS_SELECT} padding="23px" className={style.select} />
          </div>
          <Checkbox
            label="Include Hidden"
            variant="notification"
            className={style.checkbox}
          />
        </div>
      )}
      <div className={style.select_and_pagination_wrapper}>
        <ShowPage />
        <Pagination activePage={activePage} amountPages={amountPages} />
      </div>
      {layout === 'tableLayout' ? (
        <div className={style.content_wrapper}>
          <Table
            onSort={handleSort}
            selectedSort={sortBy}
            columns={columns}
            data={data}
            classes={tableStyleClasses}
          />
          <Modal showModal={modalActive} closeModal={setModalActive}>
            <h1 className={style.modal_header}>
              Are you sure you want to delete the selected items?
            </h1>
            <div className={style.buttons_wrapper}>
              <div
                role="presentation"
                className={style.modal_button}
                onClick={getCheckedCheckboxes}
              >
                YES
              </div>
              <div
                role="presentation"
                className={style.modal_button}
                onClick={handleChangeModalActive}
              >
                NO
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <div className={style.cards_wrapper}>
          {data?.map(item => (
            <div className={style.product_card} key={item.id}>
              <img src={item.image} alt="product img" />
              <div className={style.view_and_edit_wrapper}>
                <div className={style.icon_background}>
                  <img src={ViewIcon} alt="ViewIcon" />
                </div>
                <div className={style.icon_background}>
                  <img src={EditIcon} alt="EditIcon" />
                </div>
              </div>
              <div className={style.product_name}>{item.name}</div>
              <div className={style.price_and_conditions}>
                <div className={style.product_price}>{`$${item.price}/pc`}</div>
                <div className={style.condition}>/from 4 pcs</div>
              </div>
              <div className={style.other_info}>
                <div className={style.rating}>
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ShowPage />
      <div className={style.select_and_pagination_wrapper}>
        <Pagination activePage={activePage} amountPages={amountPages} />
      </div>
    </>
  );
};

export default ProductsListPage;
