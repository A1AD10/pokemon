import * as React from 'react';
import { Box, createTheme, Typography} from '@mui/material';
import Logo from '../assets/Logo.svg';
import { ThemeProvider } from '@emotion/react';
import { useTheme } from '@mui/material/styles';


export default function Cabecalho() {

    const theme = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '5px solid rgba(0, 0, 0, 0.25)',
                    padding: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '145px',
                        [theme.breakpoints.down('sm')]: {
                            maxWidth:'80%',
                            display:'flex',
                            flexDirection:'column'
                        },
                    }}
                >
                    <img alt="Logo Pokemon" src={Logo} />
                    <Typography sx={{ fontFamily: 'Inter', fontWeight: '400', fontSize: '16px',
                        [theme.breakpoints.down('sm')]: {
                            fontSize:'12px'
                        },
                    }}>Documentação</Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
