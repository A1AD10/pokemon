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
    values: { xs: 0, sm: 426, md: 769, lg: 1440, xl: 1536 }
  }
});

export default function PokemonCards() {
  const [cards, setCards] = useState([]);
  const [erro, setErro] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [buscaNome, setBuscaNome] = useState('');
  const [filtro, setFiltro] = useState('');
  const [filtroBusca, setFiltroBusca] = useState('');
  const [totalCards, setTotalCards] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalCard, setModalCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pronto, setPronto] = useState(true);

  const itensPorPagina = 20;

  const handleChange = (_, value) => setPagina(value);

  const handleOpen = (card) => {
    setModalCard(card);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // 🔁 Resetar página quando filtros mudarem
  useEffect(() => {
    setPronto(false);
    setPagina(1);
  }, [buscaNome, filtro, filtroBusca]);

  // 🚀 Fetch controlado
  useEffect(() => {
    if (!pronto && pagina !== 1) return;

    const carregar = async () => {
      setLoading(true);
      setErro(null);

      try {
        const url = new URL("https://lingering-shadow-f96d.aladio285.workers.dev/");
        url.searchParams.set("page", pagina);
        url.searchParams.set("pageSize", itensPorPagina);
        if (buscaNome) url.searchParams.set("name", buscaNome);
        if (filtro) url.searchParams.set("type", filtro);
        if (filtroBusca) url.searchParams.set("rarity", filtroBusca);

        const resp = await fetch(url.toString());
        const data = await resp.json();

        setCards(data.data);
        setTotalCards(data.totalCount);
        setPronto(true);

      } catch (e) {
        setErro("Erro ao buscar cartas");
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [pagina, buscaNome, filtro, filtroBusca, pronto]);

  return (
    <ThemeProvider theme={theme}>
      <Pesquisa setBuscaNome={setBuscaNome} setFiltroBusca={setFiltroBusca} totalCards={totalCards} />

      {erro && <Typography color="error" align="center">{erro}</Typography>}
      {loading && <Typography align="center">Carregando...</Typography>}

      <Box display="flex" justifyContent="center">
        <Box component="ul" sx={{ listStyle: 'none', display: 'flex', gap: 2, flexWrap: 'wrap', p: 0 }}>
          {cards.map(card => (
            <li key={card.id}>
              <Cards card={card} handleOpen={handleOpen} />
            </li>
          ))}
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ backgroundColor: '#fff', borderRadius: 2, width: 500, m: 'auto', mt: '5%', p: 2 }}>
          {modalCard && (
            <>
              <Typography variant="h5" align="center">{modalCard.name}</Typography>
              <CardMedia component="img" image={modalCard.images.small} sx={{ width: '40%', m: 'auto' }} />
              <Box display="flex" justifyContent="center" gap={2} mt={2}>
                <InfoBox label="PODER" value={modalCard.hp} />
                <InfoBox label="EVOLUI PARA" value={modalCard.evolvesTo || 'Não evolui'} />
                <InfoBox label="NÍVEL" value={modalCard.level || 'Desconhecido'} />
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Box display="flex" justifyContent="center" my={4}>
        <Pagination
          count={Math.ceil(totalCards / itensPorPagina)}
          page={pagina}
          onChange={handleChange}
          shape="rounded"
        />
      </Box>
    </ThemeProvider>
  );
}
