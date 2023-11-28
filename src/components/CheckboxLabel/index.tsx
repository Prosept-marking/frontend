// import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormContext } from 'react-hook-form';

interface CheckboxLabelProps {
  label: string;
  title: string;
}

function Icon() {
  return (
    <svg width="25" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="1.5"
        y=".5"
        width="22"
        height="23"
        rx="3.5"
        fill="#fff"
        stroke="#797981"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="25" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="1.5"
        y=".5"
        width="22"
        height="23"
        rx="3.5"
        fill="#fff"
        stroke="#007d42"
      />
      <path
        d="M10.304 15.919L6.385 12a1 1 0 0 0-1.414 1.414l3.92 3.919a1.999 1.999 0 0 0 2.828 0l9.252-9.252a1 1 0 0 0-1.414-1.414l-9.253 9.252z"
        fill="#007d42"
      />
    </svg>
  );
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
          checkedIcon={<CheckIcon />}
          icon={<Icon />}
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
