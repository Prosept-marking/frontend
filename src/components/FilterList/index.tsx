import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';

import { BasicButton } from '../BasicButton';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler, DefaultValues } from 'react-hook-form';
import { useGetDealersQuery } from '../../utils/api';

export type FormValues = {
  dealer: string;
  date: string;
  status: string;
};

const filtersDate = [
  { value: 'day', label: 'День' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
];

const filtersStatus = [
  { value: 'true', label: 'Есть сопоставление' },
  { value: 'false', label: 'Нет сопоставления' },
];

export const defaultValues: DefaultValues<FormValues> = {
  dealer: '',
  date: '',
  status: '',
};

export default function FilterList() {
  const { handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues,
  });

  const { data } = useGetDealersQuery();
  sessionStorage.setItem('дилеры', JSON.stringify(data?.results));

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        border={1}
        borderColor="action.disabledBackground"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        margin={5}
        padding={3}
        gap={5}
        direction="row"
        flexWrap="wrap"
        position="sticky"
        borderRadius={1}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Дилер</InputLabel>
          <Controller
            render={({ field }) => (
              <Select {...field} label="Дилер">
                {data?.results.map((item: any) => {
                  return (
                    <MenuItem key={item.dealer_id} value={item.dealer_id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
            name="dealer"
            control={control}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Статус</InputLabel>
          <Controller
            render={({ field }) => (
              <Select {...field} label="Статус">
                {filtersStatus.map((item) => {
                  return (
                    <MenuItem key={item.label} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
            name="status"
            control={control}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Дата</InputLabel>
          <Controller
            render={({ field }) => (
              <Select {...field} label="Дата">
                {filtersDate.map((item) => {
                  return (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
            name="date"
            control={control}
          />
        </FormControl>

        <BasicButton text="Поиск" type="submit" />
        <BasicButton
          text="Сбросить"
          type="reset"
          onClick={() => {
            reset(defaultValues);
          }}
        />
      </Stack>{' '}
    </form>
  );
}
