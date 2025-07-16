import { useEffect } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import {
  setProdutos,
  adicionarAoCarrinho,
  toggleFavorito
} from './store/slices/produtoSlice'
import { Produto } from './types'

function App() {
  const dispatch = useDispatch()
  const { produtos, carrinho, favoritos } = useSelector(
    (state: RootState) => state.produto
  )

  function handleAdicionar(produto: Produto) {
    const jaNoCarrinho = carrinho.some((p) => p.id === produto.id)

    if (jaNoCarrinho) {
      alert('Produto já está no carrinho!')
    } else {
      dispatch(adicionarAoCarrinho(produto))
    }
  }

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/ebac_sports')
      .then((res) => res.json())
      .then((res) => dispatch(setProdutos(res)))
  }, [dispatch])

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={(produto) => dispatch(toggleFavorito(produto))}
          adicionarAoCarrinho={handleAdicionar}
        />
      </div>
    </>
  )
}

export default App
