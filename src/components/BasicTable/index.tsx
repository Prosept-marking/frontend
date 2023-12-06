import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  hhh: number,
) {
  return { name, calories, fat, carbs, hhh };
}

const rows = [
  createData('Frozen yoghurt', 159, 6, 24, 50),
  createData('Ice cream sandwich', 237, 9, 37, 50),
  createData('Eclair', 262, 16, 24, 50),
  createData('Cupcake', 305, 3, 67, 50),
  createData('Gingerbread', 356, 16, 49, 50),
];

export default function BasicTable() {
  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Статистика сопоставлений по дилеру
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название дилера</TableCell>
              <TableCell align="right">Размечено товаров</TableCell>
              <TableCell align="right">Неразмечено товаров</TableCell>
              <TableCell align="right">Сопоставлений отклонено</TableCell>
              <TableCell align="right">Всего товаров в базе</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.hhh}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
