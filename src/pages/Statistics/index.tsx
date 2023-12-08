import { Stack } from '@mui/material';
import BasicTable from '../../components/BasicTable';
import TodayChart from '../../components/TodayChart';
import {
  useGetDailyStatsQuery,
  useGetDealerStatsQuery,
} from '../../store/prosept/prosept.api';
import Preloader from '../../components/Preloader';

export default function Statistics() {
  const { data: dailyData, isFetching: isDailyDataLoading } =
    useGetDailyStatsQuery();
  const { data: dealerData, isFetching: isDealerDataLoading } =
    useGetDealerStatsQuery();

  console.log(isDealerDataLoading);
  return (
    <>
      <Stack flexDirection={'column'} alignItems={'flex-start'}>
        {isDailyDataLoading ? (
          <Preloader />
        ) : (
          dailyData && <TodayChart dailyStats={dailyData} />
        )}
        {isDealerDataLoading ? (
          <Preloader />
        ) : (
          dealerData && <BasicTable dealerData={dealerData.results} />
        )}
      </Stack>
    </>
  );
}
