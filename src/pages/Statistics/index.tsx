import { Stack } from '@mui/material';
import BasicTable from '../../components/BasicTable';
import TodayChart from '../../components/TodayChart';

export default function Statistics() {
  return (
    <>
      <Stack flexDirection={'column'} alignItems={'flex-start'}>
        <TodayChart />
        <BasicTable />
      </Stack>
    </>
  );
}
