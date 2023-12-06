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
  combined_status: string;
  name_1c_owner?: string | null;
  pk_owner_product?: number | null;
};

export type FormValues = {
  dealer_id?: string | '';
  days?: string | '';
  combined_status?: string | '';
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
    combined_status: string;
    name_1c_owner?: string | null;
    pk_owner_product?: number | null;
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
  combined_status: string;
  name_1c_owner?: string | null;
  pk_owner_product?: number | null;
};

export type OwnerProductsMatchType = {
  owner_id: number;
  article?: number;
  ean_13?: number;
  name_1c?: string;
  cost?: number;
  recommended_price?: number;
  category_id?: number;
};

export type ProductRelationCreateType = {
  dealer_product: number;
  owner_product: number;
};
