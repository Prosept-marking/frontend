import { Divider, Stack } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BasicButton } from './../Button';
import { useEffect, useState } from 'react';
import { Title } from './../Title';
import { filterSearch } from '../../utils/api';
import CheckboxLabel from './../CheckboxLabel';

interface IFormProps {
  checkbox: [
    {
      label: boolean;
    },
  ];
}

const checkboxData = [
  { title: 'Продавец', label: 'diler' },
  { title: 'Цена', label: 'price' },
  { title: 'Название', label: 'name' },
  { title: 'Дата получения', label: 'date1' },
  { title: 'Дата изменения', label: 'date2' },
];

export default function FilterList() {
  const [isFiltersUsed, setFiltersUsed] = useState(true);

  useEffect(() => {
    setFiltersUsed(!isFiltersUsed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const methods = useForm<IFormProps>({ defaultValues: {} });

  const submitFilters: SubmitHandler<IFormProps> = async (info: IFormProps) => {
    // filterSearch(info);
    console.log('data submitted', info);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitFilters)}>
        <Stack
          border={1}
          borderColor="action.disabledBackground"
          justifyContent="center"
          alignItems="center"
          padding={6}
          gap={2}
          direction="row"
          flexWrap="wrap"
          position="sticky"
          borderRadius={1}
          right={0}
          top={10}
          maxHeight={870}
          sx={{ overflowY: 'auto' }}
        >
          <Title title="Фильтры" color="text.secondary" fontSize={14} />
          <Stack
            gap={5}
            justifyContent="center"
            direction="row"
            flexWrap="wrap"
          >
            {checkboxData.map((item, index) => (
              <CheckboxLabel
                key={index}
                label={item.label}
                title={item.title}
              />
            ))}
          </Stack>
          <Divider />
          <Stack direction="row" sx={{ gap: 5 }}>
            <BasicButton text="Сохранить" type="submit" isFiltersUsed />
            <BasicButton text="Сбросить" type="reset" isFiltersUsed />
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
}
