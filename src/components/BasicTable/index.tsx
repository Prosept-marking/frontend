import { styled } from '@mui/material/styles';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },

  //change curson on pointer
  '&: hover': {
    backgroundColor: theme.palette.primary.light,
    transition: 'background-color .5s, transform 2s',
  },
}));

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
  createData('Gingerbread', 356, 16, 49, 50),
  createData('Gingerbread', 356, 16, 49, 50),
  createData('Gingerbread', 356, 16, 49, 50),
  createData('Gingerbread', 356, 16, 49, 50),
  createData('Gingerbread', 356, 16, 49, 50),
  createData('Gingerbread', 356, 16, 49, 50),
  createData('Gingerbread', 356, 16, 49, 50),
  createData('Gingerbread', 356, 16, 49, 50),
  createData('Gingerbread', 356, 16, 49, 50),
  createData('Gingerbread', 356, 16, 49, 50),
  createData('Gingerbread', 356, 16, 49, 50),
  createData('Gingerbread', 356, 16, 49, 50),
];

export default function BasicTable() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom color="primary">
        Статистика сопоставлений по дилеру
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: '50vh' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Название дилера</StyledTableCell>
              <StyledTableCell align="right">Размечено товаров</StyledTableCell>
              <StyledTableCell align="right">
                Неразмечено товаров
              </StyledTableCell>
              <StyledTableCell align="right">
                Сопоставлений отклонено
              </StyledTableCell>
              <StyledTableCell align="right">
                Всего товаров в базе
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.hhh}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
