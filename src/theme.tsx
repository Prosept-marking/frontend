import { createTheme } from '@mui/material/styles';
import './assets/fonts/fonts.css';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#007d42', // Основной зеленый цвет
      light: '#9fceb8', // Светлый синий
    },
    secondary: {
      main: '#409e72', // Зеленый вторичный цвет
    },
    error: {
      main: '#ff0200', // Цвет ошибки
    },
    background: {
      default: '#ffffff', // Цвет фона по умолчанию
      paper: '#f9fafb', // Цвет фона бумаги
    },
    text: {
      primary: '#1a1b22', // Основной цвет текста
      secondary: '#007d42 ', // Вторичный зеленый цвет текста
      disabled: '#797981', // Серый цвет текста
    },
    action: {
      disabledBackground: '#dde0e4', // Цвет для неактивного состояния. Подумать как можно назвать по-другому
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Default font for most text
    fontSize: 14,
    // Add more font styles as needed
  },
  spacing: 4,
});

export default theme;
