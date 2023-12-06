import { useEffect, useState } from 'react';
import FilterList from '../../components/FilterList';
import MainTable from '../../components/MainTable';
import { useLazyFilterDealerProductsQuery } from '../../store/prosept/prosept.api';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useActions } from '../../hooks/actions';

export default function MainPage() {
  const [limit, setLimit] = useState<number>(1);
  const [page, setPage] = useState(1);

  const [
    triggerFiltersQuery,
    { data: filteredDealerProducts, isFetching: isLoadingFiltered },
  ] = useLazyFilterDealerProductsQuery();

  const filterValues = useSelector((state: RootState) => state.prosept.filters);

  const { setDealerProducts } = useActions();

  useEffect(() => {
    if (filterValues !== null) {
      triggerFiltersQuery({ ...filterValues, limit: limit, page_size: 20 });
    }
    if (filteredDealerProducts !== undefined) {
      setDealerProducts(filteredDealerProducts);
    }
  }, [filterValues, limit, filteredDealerProducts]);

  const handleFiltersClick = (filters: any) => {
    setLimit(1);
    triggerFiltersQuery(filters);
    setPage(1);
  };

  const handleFiltersReset = () => {
    triggerFiltersQuery({ ...filterValues, limit: limit, page_size: 20 });
    setPage(1);
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
        limit={limit}
        isLoadingFiltered={isLoadingFiltered}
        page={page}
        setPage={setPage}
      />
    </main>
  );
}
