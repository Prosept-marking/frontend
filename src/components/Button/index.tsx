import Button from '@mui/material/Button';
import { FC } from 'react';

export const BasicButton: FC<{
  text: string;
  isFiltersUsed?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  handleClick?: () => void;
}> = ({ text, isFiltersUsed, type, handleClick }) => {
  return (
    <Button
      sx={{
        fontSize: 14,
        textTransform: 'none',
      }}
      variant="contained"
      type={type}
      disabled={!isFiltersUsed}
      onClick={handleClick}
      color={type === 'reset' ? 'error' : 'primary'}
    >
      {text}
    </Button>
  );
};
