import { Box, Typography } from '@mui/material';
import Pokebola from '../../assets/Pokebola.svg';
import { useTheme } from '@emotion/react';

export default function InfoBox({ label, value }) {
    const theme = useTheme();

    const containerEstilos = {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '5px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '0',
        },
    };

    const labelEstilos = {
        [theme.breakpoints.down('md')]: {
            fontWeight: '500',
            fontSize: '15px',
        },
        [theme.breakpoints.down('sm')]: {
            fontWeight: '500',
            fontSize: '18px',
        },
    };

    const valueEstilos = {
        [theme.breakpoints.down('md')]: {
            fontSize: '13px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        },
    };

    return (
        <Box sx={containerEstilos}>
            <Typography variant="h6" sx={labelEstilos}>
                <img src={Pokebola} alt="pokebola" /> {label}
            </Typography>
            <Typography variant="h4" sx={valueEstilos}>
                {value}
            </Typography>
        </Box>
    );
}
