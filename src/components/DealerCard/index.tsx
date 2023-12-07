import {
  Button,
  Paper,
  CardActions,
  CardContent,
  Typography,
  Skeleton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { DealerCardType } from '../../models/models';

export const DealerCard = ({
  data,
  isLoading,
}: {
  data?: DealerCardType;
  isLoading: boolean;
}) => {
  return isLoading ? (
    <Skeleton variant="rounded" width={450} height={280} />
  ) : !data ? (
    <Typography variant="h5" component="div">
      Данные не загружены
    </Typography>
  ) : (
    <Paper elevation={10} sx={{ maxWidth: 450 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Id: {data.pk}
        </Typography>
        <Typography variant="h5" component="div">
          {data.product_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Цена: {data.price}
        </Typography>
        <Typography variant="body2">
          Дата получения записи: {data.date}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Дилер: {data.dealer_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={data.product_url} target="_blank">
          <Button size="small" variant="outlined">
            Ссылка на товар
          </Button>
        </Link>
      </CardActions>
    </Paper>
  );
};
