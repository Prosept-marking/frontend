export type DealerCardType = {
  pk: number;
  dealer_name: number;
  product_key: string;
  price: string;
  product_url: string;
  product_name: string;
  real_date: string;
  matched: boolean;
  postponed: boolean;
};

export type FormValues = {
  dealer_id?: string | undefined;
  day?: string | undefined;
  matched?: string | undefined;
  postponed?: string | undefined;
};

export interface ProductRelationItem {
  id: number;
}
