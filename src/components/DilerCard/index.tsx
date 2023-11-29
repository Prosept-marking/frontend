import Paper from '@mui/material/Paper';
import { FC } from 'react';
import { Button, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const DilerCard: FC<{
  id?: number;
  product_name?: string;
  price?: number;
  date?: string;
  link?: string;
  dealer_id?: string;
}> = ({
  id = 234,
  product_name = 'Просепт ХМФ-БФ антисептик универсальный (5 л)',
  price = 904.0,
  date = '2023-07-11',
  link = 'https://www.bafus.ru/100166663/',
  dealer_id = '3933',
}) => {
  return (
    <Paper>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Id: {id}
        </Typography>
        <Typography variant="h5" component="div">
          {product_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Цена: {price}
        </Typography>
        <Typography variant="body2">Дата получения: {date}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Дилер: {dealer_id}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={link}>
          <Button size="small">Ссылка на товар</Button>
        </Link>
      </CardActions>
    </Paper>
  );
};

// product_key - уникальный номер позиции;
// price - цена;
// product_url - адрес страницы, откуда собраны данные;
// product_name - заголовок продаваемого товара;
// date - дата получения информации;
// dealer_id - идентификатор дилера (внешний ключ к marketing_dealer)
