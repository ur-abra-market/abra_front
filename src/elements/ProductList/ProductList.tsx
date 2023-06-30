import { useState } from 'react';

import style from './ProductList.module.scss';
import { ViewGrid, ViewList } from './ViewIcons/ViewIcons';

import { ProductCard, ProductCardFull } from 'elements';
import PaginatorProduct from 'old-components/ui/TypesView/product/PaginatorProduct';
import { ButtonInfo } from 'ui-kit';

export type ViewType = 'grid' | 'list';

export const ProductList = (): JSX.Element => {
  // const dataArr = useAppSelector(state => state.productPaginate.productsPage);

  const [selectedView, setSelectedView] = useState<ViewType>('grid');

  const data = [
    {
      id: 3651,
      name: 'Why lead condition individual analysis.',
      description: 'What white fall individual century imagine recently.',
      datetime: '2023-06-28T09:07:02.025924+00:00',
      grade_average: 4.9,
      total_orders: 0,
      uuid: '145b5369-0a1a-4f0b-9fec-26df2fc3d751',
      is_active: true,
      supplier: {
        id: 14,
        license_number: '7164018933195',
        grade_average: 4.4,
        additional_info:
          'Behavior bag probably window seven high war. Above myself decide institution hand loss the. Put end land represent room office site. Teach walk discuss loss. Force agreement sport but catch structure. Draw difficult operation especially line from.',
        user: {
          id: 30,
          datetime: '2023-06-28T09:06:43.709813+00:00',
          phone_number: '9738476023429',
          first_name: 'Chad',
          last_name: 'Chandler',
          full_name: 'Chad Chandler',
          email: '290060stephanie45@example.net',
          is_verified: true,
          is_deleted: false,
          is_supplier: true,
        },
      },
      images: [
        {
          id: 11047,
          image_url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlLPA81SVi6SpC3wjtHFAhLekjl50IrC9pml04-6Qj&s',
          // image_url: 'https://picsum.photos/id/197/220/220',
          order: 1,
        },
      ],
      prices: [
        {
          id: 3651,
          value: 3893.36,
          discount: 0.13,
          min_quantity: 64,
          start_date: '2023-06-28T09:07:02.026840+00:00',
          end_date: '2026-01-07T09:07:02.026842+00:00',
        },
      ],
    },
    {
      id: 3651,
      name: 'Why lead condition individual analysis.',
      description: 'What white fall individual century imagine recently.',
      datetime: '2023-06-28T09:07:02.025924+00:00',
      grade_average: 4.9,
      total_orders: 0,
      uuid: '145b5369-0a1a-4f0b-9fec-26df2fc3d751',
      is_active: true,
      supplier: {
        id: 14,
        license_number: '7164018933195',
        grade_average: 4.4,
        additional_info:
          'Behavior bag probably window seven high war. Above myself decide institution hand loss the. Put end land represent room office site. Teach walk discuss loss. Force agreement sport but catch structure. Draw difficult operation especially line from.',
        user: {
          id: 30,
          datetime: '2023-06-28T09:06:43.709813+00:00',
          phone_number: '9738476023429',
          first_name: 'Chad',
          last_name: 'Chandler',
          full_name: 'Chad Chandler',
          email: '290060stephanie45@example.net',
          is_verified: true,
          is_deleted: false,
          is_supplier: true,
        },
      },
      images: [
        {
          id: 11047,
          image_url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlLPA81SVi6SpC3wjtHFAhLekjl50IrC9pml04-6Qj&s',
          // image_url: 'https://picsum.photos/id/197/220/220',
          order: 1,
        },
      ],
      prices: [
        {
          id: 3651,
          value: 3893.36,
          discount: 0.13,
          min_quantity: 64,
          start_date: '2023-06-28T09:07:02.026840+00:00',
          end_date: '2026-01-07T09:07:02.026842+00:00',
        },
      ],
    },
    {
      id: 3651,
      name: 'Why lead condition individual analysis.',
      description: 'What white fall individual century imagine recently.',
      datetime: '2023-06-28T09:07:02.025924+00:00',
      grade_average: 4.9,
      total_orders: 0,
      uuid: '145b5369-0a1a-4f0b-9fec-26df2fc3d751',
      is_active: true,
      supplier: {
        id: 14,
        license_number: '7164018933195',
        grade_average: 4.4,
        additional_info:
          'Behavior bag probably window seven high war. Above myself decide institution hand loss the. Put end land represent room office site. Teach walk discuss loss. Force agreement sport but catch structure. Draw difficult operation especially line from.',
        user: {
          id: 30,
          datetime: '2023-06-28T09:06:43.709813+00:00',
          phone_number: '9738476023429',
          first_name: 'Chad',
          last_name: 'Chandler',
          full_name: 'Chad Chandler',
          email: '290060stephanie45@example.net',
          is_verified: true,
          is_deleted: false,
          is_supplier: true,
        },
      },
      images: [
        {
          id: 11047,
          image_url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlLPA81SVi6SpC3wjtHFAhLekjl50IrC9pml04-6Qj&s',
          // image_url: 'https://picsum.photos/id/197/220/220',
          order: 1,
        },
      ],
      prices: [
        {
          id: 3651,
          value: 3893.36,
          discount: 0.13,
          min_quantity: 64,
          start_date: '2023-06-28T09:07:02.026840+00:00',
          end_date: '2026-01-07T09:07:02.026842+00:00',
        },
      ],
    },
    {
      id: 4527,
      name: 'Still feeling.',
      description: 'Friend hotel realize though class space whom best.',
      datetime: '2023-06-28T09:07:06.372268+00:00',
      grade_average: 4.9,
      total_orders: 0,
      uuid: '80119d46-6ec2-40dd-93b0-7e6e542dd194',
      is_active: true,
      supplier: {
        id: 3,
        license_number: '7373043118059',
        grade_average: 3.2,
        additional_info:
          'Reveal fire near agency. Argue life son red simply. Song edge government if state oil. Miss word computer evidence trade. Their right model piece performance wrong yard.',
        user: {
          id: 7,
          datetime: '2023-06-28T09:06:43.709813+00:00',
          phone_number: '3327920322606',
          first_name: 'Jason',
          last_name: 'Mclaughlin',
          full_name: 'Jason Mclaughlin',
          email: '460540lindsayrussell@example.org',
          is_verified: true,
          is_deleted: false,
          is_supplier: true,
        },
      },
      images: [
        {
          id: 13645,
          image_url: 'https://picsum.photos/id/192/220/220',
          order: 1,
        },
        {
          id: 13646,
          image_url: 'https://placekitten.com/220/220?image=8',
          order: 1,
        },
        {
          id: 13647,
          image_url: 'https://picsum.photos/id/368/220/220',
          order: 1,
        },
      ],
      prices: [
        {
          id: 4527,
          value: 8585.18,
          discount: 0.49,
          min_quantity: 14,
          start_date: '2023-06-28T09:07:06.373414+00:00',
          end_date: '2023-11-05T09:07:06.373416+00:00',
        },
      ],
    },
  ];

  return (
    <div className={style.wrapper}>
      <div className={style.control}>
        <div className={style.control_btns}>
          <ViewGrid selectedView={selectedView} setSelectedView={setSelectedView} />
          <ViewList selectedView={selectedView} setSelectedView={setSelectedView} />
          <div className={style.control_category}>{`< Clothes and Accessories`}</div>
        </div>
        <PaginatorProduct />
      </div>
      <div className={style.list}>
        {data.map((product, index) =>
          selectedView === 'list' ? (
            <ProductCardFull key={`product-${index}`} product={product} />
          ) : (
            <ProductCard key={`product-${index}`} product={product} />
          ),
        )}
      </div>
      <div className="control">
        {/* <ShowPageProduct /> */}
        <PaginatorProduct />
      </div>
      <div className={style.info_btn}>
        <ButtonInfo />
      </div>
    </div>
  );
};
