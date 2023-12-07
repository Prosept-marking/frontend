import { styled } from '@mui/material/styles';
import { DealerStatsResultsDataType } from '../../models/models';

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

type BasicTableProps = {
  dealerData: DealerStatsResultsDataType[];
};

export default function BasicTable({ dealerData }: BasicTableProps) {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom color="primary">
        Статистика сопоставлений по дилерам
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
            {dealerData &&
              dealerData.map((item) => (
                <StyledTableRow
                  key={item.saller_name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {item.saller_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.verified_product}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.unverified_product}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.rejected_product}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.all_product}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
