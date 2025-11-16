import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#C3C5C9', // light blue
        },
        secondary: {
            main: '#C3C5C9', // pink
        },
        background: {
            default: '#0B0E11',
            paper: '#181A20'
        },
        error: { main: '#F6465D' },
        success: { main: '#2EBD85' },
        divider: '#333b47',
        grey: { 50: '#697282', 100: '#262931' }
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});
