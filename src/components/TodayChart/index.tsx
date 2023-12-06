import { Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  {
    id: 0,
    value: 10,
    color: 'lightblue',
    label: 'Не размечено товаров на начало сеанса',
  },
  { id: 1, value: 15, color: 'green', label: 'Размечено товаров' },
  { id: 2, value: 20, color: 'red', label: 'Отклонено товаров' },
  { id: 3, value: 20, color: 'blue', label: 'Осталось неразмеченных товаров' },
];

export default function TodayChart() {
  return (
    <>
      <Typography variant="h5" component="div">
        Статистика по текущему дню
      </Typography>

      <PieChart
        series={[
          {
            data: data,
            innerRadius: 35,
            outerRadius: 100,
            paddingAngle: 5,
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
            padding: 0,
          },
        }}
        height={300}
        maxWidth={1200}
      />
    </>
  );
}
