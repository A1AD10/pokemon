
import { Box, MenuItem, Select, FormControl } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useState } from "react";

export default function Filtro({ setFiltroBusca }) {

  const [valorSelecionado, setValorSelecionado] = useState('');

  const theme = useTheme()

  const handleChange = (event) => {
    const novoValor = event.target.value
    setValorSelecionado(novoValor)
    setFiltroBusca(novoValor)
  };

  return(
    <Box>
      <FormControl sx={{ width:'570px',
        [theme.breakpoints.down('md')]: {
          width:'200px'
        }
      }}>
        <Select
          value={valorSelecionado || ""}
          onChange={handleChange}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="fire">Fogo</MenuItem>
          <MenuItem value="water">Água</MenuItem>
          <MenuItem value="grass">Planta</MenuItem>
          <MenuItem value="electric">Elétrico</MenuItem>
          <MenuItem value="psychic">Psíquico</MenuItem>
          <MenuItem value="fighting">Luta</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="fairy">Fada</MenuItem>
          <MenuItem value="dragon">Dragão</MenuItem>
          <MenuItem value="dark">Sombrio</MenuItem>
          <MenuItem value="metal">Metálico</MenuItem>

          <MenuItem value="common">Comum</MenuItem>
          <MenuItem value="uncommon">Incomum</MenuItem>
          <MenuItem value="rare">Rara</MenuItem>
          <MenuItem value="ultrarare">Ultra rara</MenuItem>
          <MenuItem value="legendary">Lendária</MenuItem>
          <MenuItem value="promo">Promoção</MenuItem>
          <MenuItem value="secret">Secreta</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}