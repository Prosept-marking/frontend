import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../BasicButton';
import { Box, Stack } from '@mui/material';
import { DilerCard } from '../DilerCard';
import { ProductCard } from '../ProductCard';

export default function EditModeForm() {
  const navigate = useNavigate();

  return (
    <>
      <BasicButton
        text="Вернуться на главную"
        variant="outlined"
        type="button"
        onClick={() => {
          navigate('/', { replace: true });
        }}
      />
      <Stack
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-around'}
        alignItems={'center'}
        marginTop={10}
        border={1}
        borderColor="action.disabledBackground"
        borderRadius={1}
        padding={5}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={5}
          justifyContent={'space-between'}
        >
          <DilerCard />
          <BasicButton
            text="Следующий товар"
            variant="outlined"
            type="button"
          />
          {/* <BasicButton text="Предыдущий товар" variant="outlined" type="button" /> */}
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={1} maxWidth={'sm'}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <Box display={'flex'} flexDirection={'row'} columnGap={2}>
            <BasicButton
              text="Сохранить выбор"
              variant="outlined"
              type="button"
            />
            <BasicButton
              text="Отклонить подборку"
              variant="outlined"
              type="button"
            />
          </Box>
        </Box>
      </Stack>
    </>
  );
}
