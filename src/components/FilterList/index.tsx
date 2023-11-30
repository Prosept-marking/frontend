import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
// import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BasicButton } from '../BasicButton';
// import { useEffect, useState } from 'react';
// import { Title } from './../Title';
// // import { filterSearch } from '../../utils/api';
// import CheckboxLabel from './../CheckboxLabel';

// interface IFormProps {
//   checkbox: [
//     {
//       label: boolean;
//     },
//   ];
// }

// const checkboxData = [
//   { title: 'Продавец', label: 'diler' },
//   { title: 'Цена', label: 'price' },
//   { title: 'Название', label: 'name' },
//   { title: 'Дата получения', label: 'date1' },
//   { title: 'Дата изменения', label: 'date2' },
// ];

// export default function FilterList() {
//   const [isFiltersUsed, setFiltersUsed] = useState(true);

//   useEffect(() => {
//     setFiltersUsed(!isFiltersUsed);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const methods = useForm<IFormProps>({ defaultValues: {} });

//   const submitFilters: SubmitHandler<IFormProps> = async (info: IFormProps) => {
//     // filterSearch(info);
//     console.log('data submitted', info);
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(submitFilters)}>
//         <Stack
//           border={1}
//           borderColor="action.disabledBackground"
//           justifyContent="center"
//           alignItems="center"
//           alignContent="center"
//           margin={5}
//           padding={3}
//           gap={2}
//           direction="row"
//           flexWrap="wrap"
//           position="sticky"
//           borderRadius={1}
//           right={0}
//           sx={{ overflowY: 'auto' }}
//         >
//           <Title title="Фильтры" color="text.secondary" fontSize={14} />
//           <Stack
//             gap={5}
//             justifyContent="center"
//             direction="row"
//             flexWrap="wrap"
//           >
//             {checkboxData.map((item, index) => (
//               <CheckboxLabel
//                 key={index}
//                 label={item.label}
//                 title={item.title}
//               />
//             ))}
//           </Stack>
//           <Divider />
//           <Stack direction="row" sx={{ gap: 5 }}>
//             <BasicButton text="Применить" type="submit" />
//             {/* <BasicButton text="Сбросить" type="reset" onClick={() => methods.reset({})}/> */}
//           </Stack>
//         </Stack>
//       </form>
//     </FormProvider>
//   );
// }

import { useForm, Controller } from 'react-hook-form';

import type { SubmitHandler, DefaultValues } from 'react-hook-form';

export type FormValues = {
  diler: string;
  date: string;
  status: string;
};

const data = [
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

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    alert(JSON.stringify(data));

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
                {data.map((item) => {
                  return (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
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
                {data.map((item) => {
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
                {data.map((item) => {
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
