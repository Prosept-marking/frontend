// import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormContext } from 'react-hook-form';
import CheckIconDefault from '../../assets/icons/CheckIconDefault';
import CheckIconChecked from '../../assets/icons/CheckIconChecked';

interface CheckboxLabelProps {
  label: string;
  title: string;
}

const CheckboxLabel: React.FC<CheckboxLabelProps> = ({ label, title }) => {
  const { register } = useFormContext() ?? {};

  if (!register) return null;

  return (
    <FormControlLabel
      {...register(label, {})}
      label={title}
      sx={{
        height: '25px',
        margin: 0,
        ' .MuiTypography-root': {
          fontSize: 14,
        },
      }}
      control={
        <Checkbox
          color="primary"
          size="medium"
          checkedIcon={<CheckIconChecked />}
          icon={<CheckIconDefault />}
          sx={{
            '&.MuiButtonBase-root': {
              padding: '0 5px 0 0',
            },
          }}
        />
      }
    />
  );
};

export default CheckboxLabel;
