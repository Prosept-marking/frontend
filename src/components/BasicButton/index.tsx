import Button from '@mui/material/Button';
import { FC } from 'react';

export const BasicButton: FC<{
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
}> = ({ text, type, onClick }) => {
  return (
    <Button
      sx={{
        fontSize: 14,
        textTransform: 'none',
      }}
      variant="contained"
      type={type}
      onClick={onClick}
      color={type === 'reset' ? 'error' : 'primary'}
    >
      {text}
    </Button>
  );
};
