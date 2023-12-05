import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ProductCard } from '../ProductCard';

export const ResultBox: FC<{
  data?: any;
  result: boolean;
}> = ({ data, result }) => {
  return (
    <Box
      display={'flex'}
      gap={1}
      flexDirection={'column'}
      maxWidth={'sm'}
      alignItems={'center'}
    >
      <Typography sx={{ fontSize: 30, mb: 1.5 }} color="text.secondary">
        {result
          ? `Товар сопоставленный оператором:`
          : `Подборка была отклонена оператором`}
      </Typography>
      {result && <ProductCard data={data} />}
    </Box>
  );
};
