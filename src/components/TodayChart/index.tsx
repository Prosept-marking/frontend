import { useMemo } from 'react';
import { Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { DailyStatsType } from '../../models/models';

export default function TodayChart({
  dailyStats,
}: {
  dailyStats: DailyStatsType;
}) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const todayStats = useMemo(() => {
    return dailyStats?.results.find((item) => item.date === today) || null;
  }, [dailyStats, today]);

  const data = useMemo(
    () => [
      {
        id: 0,
        value: todayStats?.daily_unverified_product || 0,
        color: 'lightblue',
        label: `Не размечено товаров на начало сеанса: ${todayStats?.daily_unverified_product}`,
      },
      {
        id: 1,
        value: todayStats?.verified_product || 0,
        color: 'green',
        label: `Размечено товаров: ${todayStats?.verified_product}`,
      },
      {
        id: 2,
        value: todayStats?.rejected_product || 0,
        color: 'red',
        label: `Отклонено товаров: ${todayStats?.rejected_product}`,
      },
      {
        id: 3,
        value: todayStats?.unverified_product || 0,
        color: 'blue',
        label: `Осталось неразмеченных товаров: ${todayStats?.unverified_product}`,
      },
    ],
    [todayStats],
  );

  return (
    <>
      <Typography variant="h5" component="h2" color="primary">
        Статистика по текущему дню
      </Typography>

      <PieChart
        series={[
          {
            data: data,
            innerRadius: 35,
            outerRadius: 100,
            paddingAngle: 0,
            cornerRadius: 10,
            startAngle: 0,
            endAngle: 360,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        slotProps={{
          legend: {
            direction: 'column',
            position: { vertical: 'middle', horizontal: 'left' },
            padding: 5,
            markGap: 5,
          },
        }}
        height={220}
        maxWidth={'100%'}
      />
    </>
  );
}
