import { useEffect, useState } from 'react';
import FilterList from '../../components/FilterList';
import MainTable from '../../components/MainTable';
import { useLazyFilterDealerProductsQuery } from '../../store/prosept/prosept.api';

import Preloader from '../../components/Preloader';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function MainPage() {
  const [limit, setLimit] = useState<number>(1);

  const [
    triggerFiltersQuery,
    { data: filteredDealerProducts, isFetching: isLoadingFiltered },
  ] = useLazyFilterDealerProductsQuery();

  const filterValues = useSelector((state: RootState) => state.prosept.filters);

  useEffect(() => {
    if (filterValues !== null) {
      triggerFiltersQuery({ ...filterValues, limit: limit, page_size: 20 });
    }
  }, [filterValues]);

  useEffect(() => {
    if (filterValues !== null) {
      triggerFiltersQuery({ ...filterValues, limit: limit, page_size: 20 });
    }
  }, [limit]);

  const handleFiltersClick = (filters: any) => {
    triggerFiltersQuery(filters);
  };

  const handleFiltersReset = () => {
    triggerFiltersQuery({ ...filterValues, limit: limit, page_size: 20 });
  };

  return (
    <main className="main">
      <FilterList
        handleFiltersClick={handleFiltersClick}
        handleFiltersReset={handleFiltersReset}
      />
      <MainTable
        data={filteredDealerProducts?.results || []}
        count={filteredDealerProducts?.count || 1}
        setLimit={setLimit}
        isLoadingFiltered={isLoadingFiltered}
      />
    </main>
  );
}
