import Paper from '@mui/material/Paper';
import { FC } from 'react';
import { Box, CardContent, Typography } from '@mui/material';

export const ProductCard: FC<{
  article?: number;
  ean_13?: number;
  name_1c?: string;
  cost?: number;
  recommended_price?: number;
  category_id?: number;
}> = ({
  article = 1,
  ean_13 = 245,
  name_1c = 'Антисептик невымываемый PROSEPT ULTRA концентрат 1:10 / 1 л',
  cost = 700,
  recommended_price = 800,
  category_id = 567.8,
}) => {
  return (
    <Paper
      sx={{
        maxWidth: 450,
        '&: hover': {
          boxShadow: '0 0 15px green',
          transition: 'background-color .5s, transform 2s',
          cursor: 'pointer',
        },
        '&: active': {
          boxShadow: '0 0 15px red',
          transition: 'background-color .5s, transform 2s',
        },
      }}
      elevation={5}
    >
      <CardContent>
        <Box display={'flex'} gap={1} flexDirection={'column'} maxWidth={'sm'}>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary">
              Название товара (1С):
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
              {name_1c}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Артикул товара: {article}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Код товара (см. EAN 13): {ean_13}
          </Typography>
          <Typography color="text.primary">Стоимость: {cost}</Typography>
          <Typography color="text.primary">
            Рекомендованная цена: {recommended_price}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Категория товара: {category_id}
          </Typography>
        </Box>
      </CardContent>
    </Paper>
  );
};

// артикул товара (article)
// код товара (ean_13)
// название товара (name_1c)
// стоимость (cost)
// рекомендованная цена (recommended_price)
// категория товара (category_id)
