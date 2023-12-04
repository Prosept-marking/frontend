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
import { useEffect, useState } from 'react';
import { FILTERS_KEY } from '../../utils/constants';
import { FormValues } from '../../models/models';

const filtersDate = [
  { value: '', label: 'Снять выбор' },
  { value: 'day', label: 'День' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
];

const filtersStatus = [
  { value: '', label: 'Снять выбор' },
  { value: 'true', label: 'Есть сопоставление' },
  { value: 'false', label: 'Нет сопоставления' },
];

export const defaultValues: DefaultValues<FormValues> = {
  dealer_id: '',
  date: '',
  matched: '',
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

  const { data: dealersFilters } = useGetDealersQuery();
  const { setFilters, clearFilters } = useActions();

  const onSubmit: SubmitHandler<FormValues> = (filterData) => {
    handleFiltersClick(filterData);
    setFilters(filterData);
  };

  const resetFilters = () => {
    reset(defaultValues);
    handleFiltersReset();
    clearFilters();
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
            name="matched"
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
          onClick={() => resetFilters()}
        />
      </Stack>
    </form>
  );
}
