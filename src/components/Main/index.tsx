import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Tooltip } from '@mui/material';
import DoneIcon from '../../assets/icons/DoneIcon';
import { BasicButton } from '../BasicButton';

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
    backgroundColor: theme.palette.primary.light,
    transition: 'background-color .5s, transform 2s',
  },
}));

function createData(
  id: number,
  name: string,
  linkItem: string,
  price: number,
  dialer: string,
  receiveDate: string,
  status: boolean,
  matchItem?: string,
) {
  return { id, name, linkItem, price, dialer, receiveDate, status, matchItem };
}

const rows = [
  createData(
    1,
    'Frozen yoghurt',
    'https://github.com/orgs/Prosept-marking/projects/3/views/4',
    159,
    'OZON',
    '01.01.1980',
    true,
    'Frozen yoghurt',
  ),
  createData(
    2,
    'Ice cream sandwich',
    'https://github.com/orgs/Prosept-marking/projects/3/views/4',
    237,
    'OZON',
    '01.01.1980',
    false,
  ),
  createData(
    3,
    'Eclair',
    'https://github.com/orgs/Prosept-marking/projects/3/views/4',
    262,
    'OZON',
    '01.01.1980',
    false,
  ),
  createData(
    4,
    'Cupcake',
    'https://github.com/orgs/Prosept-marking/projects/3/views/4',
    305,
    'OZON',
    '01.01.1980',
    false,
  ),
  createData(
    5,
    'Gingerbread',
    'https://github.com/orgs/Prosept-marking/projects/3/views/4',
    356,
    'OZON',
    '01.01.1980',
    true,
    'labuda',
  ),
];

export default function Main() {
  const navigate = useNavigate();
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Наименование товара</StyledTableCell>
              <StyledTableCell align="center">Статус</StyledTableCell>
              <StyledTableCell align="center">
                Сопоставленный товар
              </StyledTableCell>
              <StyledTableCell align="center">Ссылка на товар</StyledTableCell>
              <StyledTableCell align="center">Цена</StyledTableCell>
              <StyledTableCell align="center">Дилер</StyledTableCell>
              <StyledTableCell align="center">
                Дата получения записи
              </StyledTableCell>

              <StyledTableCell align="center">
                Режим редактирования
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.status ? (
                    <Tooltip title="Cовпадение подтверждено">
                      <span>
                        <DoneIcon />
                      </span>
                    </Tooltip>
                  ) : (
                    ''
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.matchItem}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={row.linkItem}>
                    <Tooltip title={row.linkItem}>
                      <Button>url</Button>
                    </Tooltip>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                <StyledTableCell align="center">{row.dialer}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.receiveDate}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <BasicButton
                    text="Перейти в режим разметки"
                    variant="outlined"
                    onClick={() =>
                      navigate(`/compare/${row.id}`, { replace: true })
                    }
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
