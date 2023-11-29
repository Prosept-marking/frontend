import { Typography } from '@mui/material';
import { FC } from 'react';

export const Title: FC<{
  title: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
}> = ({ title, fontSize = 16, fontWeight = 'medium', color }) => {
  return (
    <Typography
      variant="caption"
      display="block"
      gutterBottom
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
    >
      {title}
    </Typography>
  );
};
