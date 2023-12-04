import { useEffect, useState } from 'react';
import FilterList from '../../components/FilterList';
import MainTable from '../../components/MainTable';
import {
  useGetDealerProductsQuery,
  useLazyFilterDealerProductsQuery,
} from '../../utils/api';

export default function MainPage() {
  const { data: dealerProducts } = useGetDealerProductsQuery({
    start: 1,
    size: 10,
  });

  const [dealerProductsArray, setDealerProductsArray] = useState([]);
  const [triggerFiltersQuery, { data: filteredDealerProducts }] =
    useLazyFilterDealerProductsQuery();

  useEffect(() => {
    if (dealerProducts) {
      setDealerProductsArray(dealerProducts);
    }
  }, [dealerProducts]);

  useEffect(() => {
    if (filteredDealerProducts) {
      setDealerProductsArray(filteredDealerProducts);
    }
  }, [filteredDealerProducts]);

  const handleFiltersClick = (filters: any) => {
    triggerFiltersQuery(filters);
  };

  return (
    <main className="main">
      <FilterList handleFiltersClick={handleFiltersClick} />
      <MainTable data={dealerProductsArray} />
    </main>
  );
}
