import { FC } from 'react';

import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import router from '../routes';
import theme from '../theme';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
};

export default App;
