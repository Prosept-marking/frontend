import { Stack } from '@mui/material';
import BasicTable from '../../components/BasicTable';
import TodayChart from '../../components/TodayChart';
import {
  useGetDailyStatsQuery,
  useGetDealerStatsQuery,
} from '../../store/prosept/prosept.api';

export default function Statistics() {
  const { data: dailyData } = useGetDailyStatsQuery();
  const { data: dealerData } = useGetDealerStatsQuery();

  return (
    <>
      <Stack flexDirection={'column'} alignItems={'flex-start'}>
        {dailyData && <TodayChart dailyStats={dailyData} />}
        {dealerData && <BasicTable dealerData={dealerData.results} />}
      </Stack>
    </>
  );
}
