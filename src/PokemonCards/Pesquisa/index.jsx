import * as React from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Filtro from './Filtro';
import FilterListIcon from '@mui/icons-material/FilterList';
import Pokebola from '../../assets/Pokebola.svg'
import { useState } from 'react';

export default function Pesquisa({ setBuscaNome, setFiltroBusca, totalCards }) {

  const theme = useTheme()

  const [busca, setBusca] = useState('')
  
  const handleChange = (e) => {
    const value = e.target.value
    setBusca(value)
    setBuscaNome(value)
}

  return (
    <Box>
      <Box sx={{
        margin:'0',
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:'5rem',
        [theme.breakpoints.down('sm')]: {
          display:'flex',
          flexDirection:'column',
          gap:'15px'
        }
      }}>
        <TextField sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
          },
          borderRadius: '36px',
          border: '2px solid #ABABAB',
          width: '403px',
          height: '56px',
          [theme.breakpoints.down('md')]: {
            width:'250px'
          },

          [theme.breakpoints.down('sm')]: {
            width:'300px'
          }
        }}
          placeholder="Pesquise um pokémon"
          value={busca}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{
                  backgroundColor: '#E1E9EF',
                  color: '#636566',
                  borderRadius: '30px',
                  padding: '9px',
                  margin:'0',
                  width:'20px',
                  height:'20px',
                  [theme.breakpoints.down('md')]: {
                    padding:'7px',
                  }
                  
                }} />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            fontFamily:'Inter',
            fontWeight:'600',
            gap:'6px',
            
          }}>
          <FilterListIcon sx={{ color:'#AFAFB0', width:'59px', height:'39px' }}/>
          <p>Filtrar por:</p>
          <Filtro setFiltroBusca={setFiltroBusca}/>
        </Box>
      </Box>
      <Box sx={{ 
        margin:'30px 0',
        fontFamily:'Montserrat',
        fontWeight:'600',
        display:'flex',
        gap:'7px'
       }}>
          <img src={Pokebola} alt="pokebola" />
          <p>Total: {totalCards || 0} Pokémons</p>
        </Box>
    </Box>
  );
}
