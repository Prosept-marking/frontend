import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditButton from '../../components/EditButton/EditButton';
import FilterList from '../../components/FilterList';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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
    cursor: 'pointer',
  },

  '&: active': {
    backgroundColor: theme.palette.warning.light,
  },
}));

function createData(
  name: string,
  linkItem: string,
  price: number,
  dialer: string,
  receiveDate: string,
  status: string,
  matchItem: string,
) {
  return { name, linkItem, price, dialer, receiveDate, status, matchItem };
}

const rows = [
  createData(
    'Frozen yoghurt',
    'www',
    159,
    'OZON',
    '01.01.1980',
    'no',
    'Frozen yoghurt',
  ),
  createData(
    'Ice cream sandwich',
    'www',
    237,
    'OZON',
    '01.01.1980',
    'no',
    'labuda',
  ),
  createData('Eclair', 'www', 262, 'OZON', '01.01.1980', 'no', 'labuda'),
  createData('Cupcake', 'www', 305, 'OZON', '01.01.1980', 'no', 'labuda'),
  createData('Gingerbread', 'www', 356, 'OZON', '01.01.1980', 'no', 'labuda'),
];

function handleTableRowClick() {}

export default function Main() {
  return (
    <main className="main">
      <FilterList />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Наименование товара</StyledTableCell>
              <StyledTableCell align="right">Ссылка на товар</StyledTableCell>
              <StyledTableCell align="right">Цена</StyledTableCell>
              <StyledTableCell align="right">Дилер</StyledTableCell>
              <StyledTableCell align="right">
                Дата получения записи
              </StyledTableCell>
              <StyledTableCell align="right">
                Статус (размечен или нет)
              </StyledTableCell>
              <StyledTableCell align="right">
                Товар для сопоставления
              </StyledTableCell>
              <StyledTableCell align="right">
                Режим редактирования
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name} onClick={handleTableRowClick}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.linkItem}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.dialer}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.receiveDate}
                </StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">{row.matchItem}</StyledTableCell>
                <StyledTableCell align="right">
                  <EditButton caption="Перейти в режим разметки" />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
