import Button from '@mui/material/Button';
import { FC } from 'react';

export const BasicButton: FC<{
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  variant?: 'text' | 'contained' | 'outlined' | undefined;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
}> = ({ text, type, onClick, variant = 'contained', color = 'primary' }) => {
  return (
    <Button
      sx={{
        fontSize: 14,
        textTransform: 'none',
      }}
      variant={variant}
      type={type}
      onClick={onClick}
      color={type === 'reset' ? 'error' : color}
    >
      {text}
    </Button>
  );
};
