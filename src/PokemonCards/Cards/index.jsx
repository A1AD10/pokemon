import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Cards({ card, handleOpen }) {

    const theme = useTheme();

    const estilosCard = {
        width: '260px',
        height: '250px',
        borderRadius: 6,
        border: '2px solid rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(175, 175, 176, 0.308)',
        },
    };

    const estilosResponsivos = {
        [theme.breakpoints.down('md')]: {
            width: '260px',
            height: '260px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '330px',
            height: '260px',
        },
    };

    return (
        <Card
            onClick={() => handleOpen(card)}
            sx={{ ...estilosCard, ...estilosResponsivos }}
        >
            <CardMedia
                sx={{
                    height: '170px',
                    objectFit: 'cover',
                    backgroundPosition: 'unset',
                }}
                image={card.images.small}
            />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
                marginTop: '17px',
            }}>
                <Box>
                    <CardContent sx={{ padding: 0 }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '14px' }}>
                            {card.name}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ padding: 0 }}>
                        <Typography variant="body2">
                            Tipo {card.types.join(', ')}
                        </Typography>
                    </CardContent>
                </Box>
                <CardContent sx={{ padding: 0 }}>
                    <Typography>
                        <img src={card.set.images.symbol} alt="símbolo" style={{ width: '15px' }} />
                    </Typography>
                    <Typography variant="body2">
                        {card.rarity || 'Desconhecida'}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}
