export type DealerCardType = {
  pk: number;
  dealer_name: number;
  product_key: string;
  price: string;
  product_url: string;
  product_name: string;
  date: string;
  matched: boolean;
};

export type FormValues = {
  dealer_id: string;
  date: string;
  matched: string;
};

export interface ProductRelationItem {
  id: number;
}
