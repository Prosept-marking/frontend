import { useEffect, useState } from 'react';
import FilterList from '../../components/FilterList';
import MainTable from '../../components/MainTable';
import {
  useGetDealerProductsQuery,
  useLazyFilterDealerProductsQuery,
} from '../../utils/api';

export default function MainPage() {
  const { data: dealerProducts, isLoading: isLoadingInitial } =
    useGetDealerProductsQuery({
      start: 1,
      size: 10,
    });

  const [dealerProductsArray, setDealerProductsArray] = useState([]);
  const [
    triggerFiltersQuery,
    { data: filteredDealerProducts, isLoading: isLoadingFiltered },
  ] = useLazyFilterDealerProductsQuery();

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

  const handleFiltersReset = () => {
    setDealerProductsArray(dealerProducts);
  };

  return (
    <main className="main">
      <FilterList
        handleFiltersClick={handleFiltersClick}
        handleFiltersReset={handleFiltersReset}
      />
      <MainTable
        data={dealerProductsArray}
        isLoadingInitial={isLoadingInitial}
        isLoadingFiltered={isLoadingFiltered}
      />
    </main>
  );
}
