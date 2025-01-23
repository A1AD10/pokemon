import { useEffect, useState } from "react";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Pagination, Modal } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pesquisa from "./Pesquisa";
import Cards from "./Cards";
import InfoBox from "./InfoBox";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 426,
            md: 769,
            lg: 1440,
            xl: 1536,
        },
    },
    typography: {
        h4: { fontFamily: 'Inter', fontWeight: 400, fontSize: '15px' },
        h5: { fontFamily: 'Montserrat, sans-serif', fontWeight: 800 },
        h6: { fontFamily: 'Inter', fontWeight: 500, display: 'flex', gap: '9px' },
        body2: { fontFamily: 'Inter, sans-serif', fontWeight: 500, color: 'text.secondary', fontSize: '12px', paddingBottom: '0' }
    }
})


export default function PokemonCards() {
    const [cards, setCards] = useState([])
    const [erro, setErro] = useState(null)
    const [pagina, setPagina] = useState(1)
    const [buscaNome, setBuscaNome] = useState('')
    const [filtro, setFiltro] = useState('')
    const [filtroBusca, setFiltroBusca] = useState('')
    const [totalCards, setTotalCards] = useState(0)
    const [open, setOpen] = useState(false);
    const [modalCard, setModalCard] = useState(null)

    const itensPorPagina = 20

    const handleOpen = (card) => {
        setModalCard(card)
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleChange = (e, valor) => {
        setPagina(valor)
    }

    const itemAtual = cards
        .filter(card => card.name.toLowerCase().includes(buscaNome.toLowerCase()))
        .filter(card => {
            if (filtroBusca === '') return true;
            return (
                card.types.some(type => type.toLowerCase().includes(filtroBusca.toLowerCase())) ||
                (card.rarity && card.rarity.toLowerCase().includes(filtroBusca.toLowerCase()))
            );
        })
        .slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina)


    const apiUrl = 'https://api.pokemontcg.io/v2/cards'
    const apiKey = '862ea40d-ee22-4d4b-9137-7905835d8970'

    useEffect(() => {
        const requisicaoCards = async () => {
            try {

                const filtroQuery = filtro ? `q=rarity:${filtro.toLowerCase()}+types:${filtro.toLowerCase()}` : '';
                const url = filtroQuery ? `${apiUrl}?${filtroQuery}` : apiUrl;

                const resp = await fetch(url, {
                    headers: { 'X-Api-Key': apiKey }
                });

                if (resp.status === 200) {
                    const obj = await resp.json()
                    setCards(obj.data)
                    setTotalCards(obj.data.length)
                } else {
                    setErro('Erro ao buscar as cartas')
                }

            } catch (e) {
                console.error('Erro na requisição:', e)
                setErro('Erro na requisição')
            }
        }
        requisicaoCards();
    }, [filtroBusca])


    return (
        <ThemeProvider theme={theme}>
            <Pesquisa setBuscaNome={setBuscaNome} setFiltroBusca={setFiltroBusca} totalCards={totalCards} />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box component="ul"
                    sx={{
                        listStyle: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap',
                        [theme.breakpoints.down('md')]: {
                            gap: '10px',
                        },
                        [theme.breakpoints.down('sm')]: {
                            gap: '5px',
                        }
                    }}>
                    {itemAtual.map((card) => (
                        <li key={card.id} style={{ margin: '10px' }}>
                            <Cards card={card} handleOpen={handleOpen} />
                        </li>
                    ))}
                </Box>
            </Box>

            <Box>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                    sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',

                        '& .MuiBox-root': {
                            backgroundColor: 'white', borderRadius: '13px', width: 500,
                            [theme.breakpoints.down('md')]: {
                                maxWidth: '350px'
                            },
                            [theme.breakpoints.down('sm')]: {
                                maxWidth: '260px'
                            }
                        }
                    }}>

                    <Box>
                        {modalCard && (
                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <Typography sx={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: '600',
                                    fontSize: '25px',
                                    padding: '10px 0',
                                    backgroundColor: '#AFAFB0',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    textAlign: 'center',
                                    borderTopLeftRadius: '8px',
                                    borderTopRightRadius: '8px',
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: '17px',
                                        width: '100%'
                                    }
                                }}>
                                    {modalCard.name}
                                </Typography>

                                <CardMedia component="img" image={modalCard.images.small} alt={modalCard.name}
                                    sx={{
                                        margin: '25px 0', width: '40%', height: '40%', objectFit: 'contain',
                                        [theme.breakpoints.down('sm')]: {
                                            width: '60%',
                                            height: 'auto'
                                        }
                                    }}/>

                                <Box sx={{
                                    display: 'flex', margin: '3rem 0',
                                    [theme.breakpoints.down('md')]: {
                                        flexDirection: 'column',
                                        gap: '10px',
                                        margin: '12px 0'
                                    },

                                    [theme.breakpoints.down('sm')]: {
                                        flexDirection: 'column',
                                        gap: '10px',
                                        margin: '12px 0'
                                    },
                                }}>
                                    <InfoBox label="PODER" value={modalCard.hp} />
                                    <InfoBox label="EVOLUI PARA" value={modalCard.evolvesTo || 'Não evolui mais'} />
                                    <InfoBox label="NÍVEL" value={modalCard.level || 'Desconhecido'} />
                                </Box>

                            </Box>
                        )}
                    </Box>
                </Modal>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '50px 0' }}>
                <Pagination sx={{
                    '& .MuiPaginationItem-root': { fontSize: '15px' },
                    [theme.breakpoints.down('md')]: {
                        margin: '30px 0'
                    }
                }}
                    count={Math.ceil(totalCards / itensPorPagina)} shape="rounded" page={pagina} onChange={handleChange}
                />
            </Box>
            
        </ThemeProvider>
    )
}

