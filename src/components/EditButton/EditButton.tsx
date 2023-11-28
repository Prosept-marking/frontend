import { Button } from '@mui/material';

export default function EditButton(props: any) {
  return (
    <Button
      variant="outlined"
      size="small"
      sx={[
        {
          '&:hover': {
            color: 'white',
            backgroundColor: 'black',
          },
        },
      ]}
    >
      {props.caption}
    </Button>
  );
}
