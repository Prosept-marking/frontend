import { styled } from '@mui/material/styles';
import {
  Button,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  tableCellClasses,
} from '@mui/material';
import { BasicButton } from '../BasicButton';
import Preloader from '../Preloader';
import DoneIcon from '../../assets/icons/DoneIcon';
import DeniedCompareIcon from '../../assets/icons/DeniedCompareIcon';
import NeedsCompareIcon from '../../assets/icons/NeedsCompareIcon';

import { DealerCardType } from '../../models/models';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

function findStatus(matched: boolean, postponed: boolean) {
  switch (matched) {
    case true:
      return (
        <Tooltip title="Cовпадение подтверждено">
          <span>
            <DoneIcon />
          </span>
        </Tooltip>
      );

    case false:
      return postponed ? (
        <Tooltip title="Сравнение отклонено">
          <span>
            <DeniedCompareIcon />
          </span>
        </Tooltip>
      ) : (
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
  count,
}: {
  data: DealerCardType[];
  count: number;
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  function countPages() {
    return Math.ceil(count / 20);
  }

  return (
    <>
      {data?.length === 0 ? (
        <Paper
          sx={{ p: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
        >
          Ничего не нашлось
        </Paper>
      ) : (
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
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
                      {findStatus(item?.matched, item?.postponed)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Название товара
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link to={item.product_url}>
                        <Tooltip title={item.product_url}>
                          <Button>url</Button>
                        </Tooltip>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.dealer_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.real_date}
                    </StyledTableCell>

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
          <Stack spacing={2} marginTop={5}>
            <Pagination
              count={countPages()}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
}
