import { useEffect, useState } from 'react';
import FilterList from '../../components/FilterList';
import MainTable from '../../components/MainTable';
import {
  useGetDealerProductsQuery,
  useLazyFilterDealerProductsQuery,
} from '../../store/prosept/prosept.api';
import { FILTERS_KEY } from '../../utils/constants';
import { DealerCardType } from '../../models/models';
import Preloader from '../../components/Preloader';

export default function MainPage() {
  const [limit, setLimit] = useState<number>(1);

  const { data: dealerProducts, isLoading: isLoadingInitial } =
    useGetDealerProductsQuery({
      start: limit,
      page_size: 20,
    });

  const [dealerProductsArray, setDealerProductsArray] = useState<
    DealerCardType[]
  >([]);

  const [
    triggerFiltersQuery,
    { data: filteredDealerProducts, isLoading: isLoadingFiltered },
  ] = useLazyFilterDealerProductsQuery();

  const filtersString = localStorage.getItem(FILTERS_KEY);

  useEffect(() => {
    if (dealerProducts) {
      setDealerProductsArray(dealerProducts.results);
    }
  }, [dealerProducts]);

  useEffect(() => {
    if (filteredDealerProducts) {
      setDealerProductsArray(filteredDealerProducts.results);
    }
  }, [filteredDealerProducts]);

  useEffect(() => {
    if (filtersString !== null) {
      const filters = JSON.parse(filtersString);
      triggerFiltersQuery(filters);
    }
  }, [filtersString]);

  const handleFiltersClick = (filters: any) => {
    triggerFiltersQuery(filters);
  };

  const handleFiltersReset = () => {
    setDealerProductsArray(dealerProducts?.results ?? []);
  };

  console.log(dealerProducts?.count);

  return (
    <main className="main">
      {isLoadingInitial || isLoadingFiltered ? (
        <Preloader />
      ) : (
        <>
          <FilterList
            handleFiltersClick={handleFiltersClick}
            handleFiltersReset={handleFiltersReset}
          />
          <MainTable
            data={dealerProductsArray}
            count={dealerProducts?.count || 1}
            setLimit={setLimit}
          />
        </>
      )}
    </main>
  );
}
