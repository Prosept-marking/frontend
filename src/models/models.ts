export type DealerCardType = {
  pk: number;
  dealer_name: string;
  product_key: string;
  price: string;
  product_url: string;
  product_name: string;
  real_date: string;
  matched: boolean;
  postponed: boolean;
};

export type FormValues = {
  dealer_id?: string | '';
  days?: string | '';
  matched?: string | '';
  postponed?: string | '';
};

export interface ProductRelationItem {
  id: number;
}

export type DealersType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    pk: number;
    dealer_id: number;
    name: string;
  }>;
};

export type DealerProductsType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    pk: number;
    dealer_name: string;
    product_key: string;
    price: string;
    product_url: string;
    product_name: string;
    date: string;
    matched: boolean;
    postponed: boolean;
    real_date: string;
  }>;
};

export type DealerProductIdType = {
  pk: number;
  dealer_name: string;
  product_key: string;
  price: string;
  product_url: string;
  product_name: string;
  date: string;
  matched: boolean;
  postponed: boolean;
  real_date: string;
};
