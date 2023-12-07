import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ProductCard } from '../ProductCard';
import Preloader from '../Preloader';

export const ResultBox: FC<{
  data?: any;
  result: boolean;
  isLoadindRelationData?: boolean;
}> = ({ data, result, isLoadindRelationData }) => {
  return (
    <Box
      display={'flex'}
      gap={1}
      flexDirection={'column'}
      maxWidth={'sm'}
      alignItems={'center'}
    >
      <Typography
        sx={{ fontSize: 30, mb: 1.5 }}
        color={result ? 'text.secondary' : 'error'}
      >
        {result
          ? `Товар сопоставленный оператором:`
          : `Подборка была отклонена оператором`}
      </Typography>
      {isLoadindRelationData ? (
        <Preloader />
      ) : (
        result && <ProductCard data={data} />
      )}
    </Box>
  );
};
