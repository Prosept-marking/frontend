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
import { useGetDealersQuery } from '../../store/prosept/prosept.api';
import { useActions } from '../../hooks/actions';
import { useEffect } from 'react';
import { FormValues } from '../../models/models';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const filtersDate = [
  { value: '', label: 'Снять выбор' },
  { value: '1', label: 'День' },
  { value: '7', label: 'Неделя' },
  { value: '30', label: 'Месяц' },
];

const filtersStatus = [
  { value: '', label: 'Снять выбор' },
  { value: 'matched', label: 'Есть сопоставление' },
  { value: 'unprocessed', label: 'Нет сопоставления' },
  { value: 'postponed', label: 'Выборка отклонена' },
];

let defaultValues: DefaultValues<FormValues> = {
  dealer_id: '',
  days: '',
  combined_status: '',
};

export default function FilterList({
  handleFiltersClick,
  handleFiltersReset,
}: {
  handleFiltersClick: (data: FormValues) => void;
  handleFiltersReset: () => void;
}) {
  const { handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues,
  });

  const filterValues = useSelector((state: RootState) => state.prosept.filters);

  useEffect(() => {
    if (filterValues) {
      defaultValues = filterValues;
    }
  }, [filterValues]);

  const { data: dealersFilters } = useGetDealersQuery();
  const { setFilters, clearFilters } = useActions();

  const onSubmit: SubmitHandler<FormValues> = (filterData) => {
    handleFiltersClick(filterData);
    setFilters(filterData);
  };

  const resetFilters = () => {
    clearFilters();
    handleFiltersReset();
    defaultValues = { dealer_id: '', days: '', combined_status: '' };
    reset(defaultValues);
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
                <MenuItem value="">Снять выбор</MenuItem>
                {dealersFilters?.results.map((item: any) => {
                  return (
                    <MenuItem key={item.pk} value={item.pk}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
            name="dealer_id"
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
            name="combined_status"
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
            name="days"
            control={control}
          />
        </FormControl>

        <BasicButton text="Поиск" type="submit" />
        <BasicButton
          text="Сбросить"
          type="reset"
          onClick={() => resetFilters()}
        />
      </Stack>
    </form>
  );
}
