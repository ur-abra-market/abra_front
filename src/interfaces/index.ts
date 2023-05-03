export interface IAccountInfoData {
  firstName: string;
  lastName: string;
  tel: string;
  code: string;
}
export interface IProduct {
  grade: IGrade;
  category_id: number;
  category_path: string;
  product_name: string;
  is_favorite: boolean;
  tags: string[];
  colors: any[];
  sizes: any[];
  monthly_actual_demand: number;
  daily_actual_demand: number;
  prices: IPrice[];
  supplier_info?: any;
}

export interface IGrade {
  grade_average: string;
  count: number;
}

export interface IPrice {
  value: string;
  min_quantity: number;
  discount: string;
  start_date: string;
  end_date: string;
}

export interface IRequestProduct {
  product_id: number;
}

export interface IRequestPopularProduct {
  product_id: number;
  page_num: number;
  page_size: number;
}

export interface IImageProduct {
  image_url: string;
  serial_number: number;
}

export interface GradeDetail {
  grade: number;
  count: number;
}

export interface IGradeProduct {
  grade_average(grade_average: any): number;
  grade: IGrade;
  grade_details: GradeDetail[];
}

export interface IGradeProductRequest extends IRequestProduct {}
export interface IImageProductRequest extends IRequestProduct {}
export interface IRequestSimilarProduct extends IRequestPopularProduct {}

export interface ISimilarProduct {
  id: number;
  name: string;
  description: string;
  total_orders: number;
  grade_average: string;
  date_added: string;
  with_discount: number;
  price_include_discount: string;
  min_quantity: number;
  value_price: number;
  is_favorite: boolean;
}

export interface IShortCardProduct extends ISimilarProduct {
  image_url?: string;
}

export interface IResponse<T> {
  result: T;
}
export interface IPopularProduct extends ISimilarProduct {}
