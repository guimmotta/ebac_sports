import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../types'

type ProdutoState = {
  produtos: Produto[]
  carrinho: Produto[]
  favoritos: Produto[]
}

const initialState: ProdutoState = {
  produtos: [],
  carrinho: [],
  favoritos: []
}

const produtoSlice = createSlice({
  name: 'produto',
  initialState,
  reducers: {
    setProdutos(state, action: PayloadAction<Produto[]>) {
      state.produtos = action.payload
    },
    adicionarAoCarrinho(state, action: PayloadAction<Produto>) {
      const produtoExiste = state.carrinho.find(
        (p) => p.id === action.payload.id
      )
      if (!produtoExiste) {
        state.carrinho.push(action.payload)
      }
    },
    toggleFavorito(state, action: PayloadAction<Produto>) {
      const index = state.favoritos.findIndex((p) => p.id === action.payload.id)
      if (index >= 0) {
        state.favoritos.splice(index, 1)
      } else {
        state.favoritos.push(action.payload)
      }
    }
  }
})

export const { setProdutos, adicionarAoCarrinho, toggleFavorito } =
  produtoSlice.actions

export default produtoSlice.reducer
