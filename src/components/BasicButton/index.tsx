import Button from '@mui/material/Button';
import { FC } from 'react';

export const BasicButton: FC<{
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  variant?: 'text' | 'contained' | 'outlined' | undefined;
}> = ({ text, type, onClick, variant = 'contained' }) => {
  return (
    <Button
      sx={{
        fontSize: 14,
        textTransform: 'none',
        '&:hover': {
          color: 'white',
          backgroundColor: 'primary.dark',
        },
      }}
      variant={variant}
      type={type}
      onClick={onClick}
      color={type === 'reset' ? 'error' : 'primary'}
    >
      {text}
    </Button>
  );
};
