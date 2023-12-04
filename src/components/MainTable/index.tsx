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

import NeedsCompareIcon from '../../assets/icons/NeedsCompareIcon';
import { DealerCardType } from '../../models/models';
import Preloader from '../Preloader';

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

function findStatus(status: boolean) {
  switch (status) {
    case true:
      return (
        <Tooltip title="Cовпадение подтверждено">
          <span>
            <DoneIcon />
          </span>
        </Tooltip>
      );

    case false:
      return (
        <Tooltip title="Необходимо подтверждение">
          <span>
            <NeedsCompareIcon />
          </span>
        </Tooltip>
      );
  }
}

export default function MainTable({
  data,
  isLoadingInitial,
  isLoadingFiltered,
}: {
  data: DealerCardType[];
  isLoadingInitial: boolean;
  isLoadingFiltered: boolean;
}) {
  const navigate = useNavigate();

  return (
    <>
      {isLoadingInitial || isLoadingFiltered ? (
        <Preloader />
      ) : data?.length === 0 ? (
        <Paper
          sx={{ p: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
        >
          Ничего не нашлось
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Наименование товара</StyledTableCell>
                <StyledTableCell align="center">Статус</StyledTableCell>
                <StyledTableCell align="center">
                  Сопоставленный товар
                </StyledTableCell>
                <StyledTableCell align="center">
                  Ссылка на товар
                </StyledTableCell>
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
              {data?.map((item: DealerCardType) => (
                <StyledTableRow key={item.pk}>
                  <StyledTableCell component="th" scope="row">
                    {item.product_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {findStatus(item?.matched)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.matched}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={item.product_url}>
                      <Tooltip title={item.product_url}>
                        <Button>url</Button>
                      </Tooltip>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.dealer_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.date}</StyledTableCell>

                  <StyledTableCell align="center">
                    <BasicButton
                      text="Перейти в режим разметки"
                      variant="outlined"
                      onClick={() =>
                        navigate(`/compare/${item.pk}`, { replace: true })
                      }
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
