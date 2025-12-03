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
    const [loading, setLoading] = useState(false); // 1. ADICIONADO: Variável de loading

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

    // 2. REMOVIDO: Bloco `itemAtual` (A filtragem/paginação é feita pela API agora)
    // Onde era usado `itemAtual`, agora usaremos `cards`

    const apiKey = '862ea40d-ee22-4d4b-9137-7905835d8970'

    useEffect(() => {
        const requisicaoCards = async () => {
            setLoading(true);
            setErro(null); // Limpar erro antes de nova requisição

            try {
                const pageSize = itensPorPagina;
                const currentPage = pagina;

                // 3. CONSTRUÇÃO DA URL AJUSTADA
                const queryParams = [`page=${currentPage}`, `pageSize=${pageSize}`];

                if (buscaNome) {
                    // Adiciona o filtro de nome para a API. O '*' permite busca parcial.
                    queryParams.push(`q=name:*${buscaNome}*`);
                }
                // OBS: FiltroBusca (tipo/raridade) seria implementado aqui de forma similar, se necessário.

                const url = `https://api.pokemontcg.io/v2/cards?${queryParams.join('&')}`; // Usando /v2 e parâmetros corretos

                // 3. REQUISIÇÃO COM O API KEY NO CABEÇALHO
                const resp = await fetch(url, {
                    headers: {
                        'X-Api-Key': apiKey, // 🚨 ESSENCIAL: Key deve ir no header
                    }
                });

                if (resp.status === 200) {
                    const obj = await resp.json();

                    setCards(obj.data);
                    setTotalCards(obj.totalCount);
                } else {
                    setErro(`Erro ${resp.status}: Não foi possível buscar as cartas.`);
                }

            } catch (e) {
                console.error('Erro na requisição:', e);
                setErro('Erro de rede na requisição');
            } finally {
                setLoading(false);
            }
        };

        requisicaoCards();

        // 3. DEPENDÊNCIA ATUALIZADA: `buscaNome` aciona nova busca
    }, [apiKey, pagina, itensPorPagina, buscaNome]);


    return (
        <ThemeProvider theme={theme}>
            <Pesquisa setBuscaNome={setBuscaNome} setFiltroBusca={setFiltroBusca} totalCards={totalCards} />

            {/* Opcional: Mostrar erro se houver */}
            {erro && <Typography color="error" align="center" variant="h6">{erro}</Typography>}

            {/* Opcional: Mostrar Loading */}
            {loading && <Typography align="center">Carregando Cartas...</Typography>}

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
                    {cards.map((card) => ( // 2. AJUSTADO: Usando 'cards' diretamente
                        <li key={card.id} style={{ margin: '10px' }}>
                            <Cards card={card} handleOpen={handleOpen} />
                        </li>
                    ))}
                </Box>
            </Box>

            {/* O Modal continua inalterado */}
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
                                    }} />

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
                        margin: '30px 0',
                    },

                    [theme.breakpoints.down('sm')]: {
                        '& .MuiPaginationItem-root': { fontSize: '10px', margin: '-4px' },
                    }
                }}
                    count={Math.ceil(totalCards / itensPorPagina)} shape="rounded" page={pagina} onChange={handleChange}
                />
            </Box>

        </ThemeProvider>
    )
}