import React,{ useState,useEffect } from 'react'
import styled from 'styled-components'
import productoService from './services/productos'
import categoriaService from './services/categorias'
import Navbar from './components/Navbar'
import ListaProductos from './components/ListaProductos'

const App = () => {
  const [productos,setProductos] = useState([])
  const [categorias,setCategorias] = useState([])

  useEffect(() => {
    productoService.getProductos().then(productos => setProductos(productos))
    categoriaService.getCategorias().then(categorias => setCategorias(categorias))
  },[])

  return (
    <AppContainer>
      <Navbar/>
      <Content>
        <ListaProductos productos={productos} categorias={categorias}/>
      </Content>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
`

const Content = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

export default App;
