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
import { useGetDilersQuery } from '../../utils/api';

export type FormValues = {
  diler: string;
  date: string;
  status: string;
};

const filters = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const defaultValues: DefaultValues<FormValues> = {
  diler: '',
  date: '',
  status: '',
};

export default function FilterList() {
  const { handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues,
  });

  const { data } = useGetDilersQuery();
  console.log(data);

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
                  console.log(item);
                  return (
                    <MenuItem key={item.dealer_id} value={item.dealer_id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
            name="diler"
            control={control}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Статус</InputLabel>
          <Controller
            render={({ field }) => (
              <Select {...field} label="Статус">
                {filters.map((item) => {
                  return (
                    <MenuItem key={item.value} value={item.value}>
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
                {filters.map((item) => {
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
