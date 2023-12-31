import Paper from '@mui/material/Paper';
import { FC } from 'react';
import { Box, CardContent, Typography } from '@mui/material';

export const ProductCard: FC<{
  onClick?: (event: React.MouseEvent) => void;
  id?: number;
  data?: {
    article?: number;
    ean_13?: number;
    name_1c?: string;
    cost?: number;
    recommended_price?: number;
    category_id?: number;
  };
}> = ({ data, onClick, id }) => {
  return (
    <Paper
      className="productCard"
      onClick={onClick}
      sx={{
        maxWidth: 450,
        '&: hover': {
          boxShadow: '0 0 15px green',
          transition: 'background-color .5s, transform 2s',
          cursor: 'pointer',
        },
        '&.productCard_active': {
          backgroundColor: '#9fceb8',
        },
      }}
      elevation={5}
    >
      <CardContent>
        <Box display={'flex'} gap={1} flexDirection={'column'} maxWidth={'sm'}>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography
              className="productCard__text"
              sx={{ fontSize: 14 }}
              color="text.disabled"
            >
              id: {id}
            </Typography>
            <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.disabled">
              Название товара (1С):
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
              {data?.name_1c}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 14 }} color="text.disabled">
            Артикул товара: {data?.article}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.disabled">
            Код товара (см. EAN 13): {data?.ean_13}
          </Typography>
          <Typography color="text.secondary">
            Стоимость: {data?.cost}
          </Typography>
          <Typography color="text.secondary">
            Рекомендованная цена: {data?.recommended_price}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.disabled">
            Категория товара: {data?.category_id}
          </Typography>
        </Box>
      </CardContent>
    </Paper>
  );
};
