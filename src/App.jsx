import React from 'react'
import './App.css'
import { Box } from '@mui/material'
import PokemonCards from './PokemonCards'
import Cabecalho from './Cabecalho'

function App() {
  return (
    <Box sx={{ padding:'0 8%' }}>
      <Cabecalho />
      <PokemonCards />
    </Box>
  )
}

export default App
