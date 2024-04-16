export interface IDate {
  created_at: string;
  updated_at: string;
}

export interface IProductProperties extends IDate {
  has_optional_value: boolean;
  id: number;
  name: string;
  values: IProductPropertiesValues[];
}

export interface IProductPropertiesValues extends IDate {
  id: number;
  property_type_id: number;
  value: string;
}
