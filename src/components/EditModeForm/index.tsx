import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../BasicButton';
import { Box } from '@mui/material';
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
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginTop={10}
      >
        <Box display={'flex'} flexDirection={'column'} gap={1}>
          <DilerCard />
          <Box display={'flex'} flexDirection={'row'} columnGap={2}>
            <BasicButton text="Вперед" variant="outlined" type="button" />
            <BasicButton text="Назад" variant="outlined" type="button" />
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={1}>
          <ProductCard />
          <Box display={'flex'} flexDirection={'row'} columnGap={2}>
            <BasicButton text="Сохранить" variant="outlined" type="button" />
            <BasicButton text="Отклонить" variant="outlined" type="button" />
          </Box>
        </Box>
      </Box>
    </>
  );
}
