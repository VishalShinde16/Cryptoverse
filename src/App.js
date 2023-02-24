import React from 'react'
import { Routes,Route } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './components/Navbar'

import Homepage from './components/Homepage'
import Exchanges from './components/Exchanges'
import Cryptocurrencies from './components/Cryptocurrencies'
import CryptoDetails from './components/CryptoDetails'
import News from './components/News'

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    /* background-color: aqua; */
    overflow: hidden;
    background-color: #f1f2f5;
`
const NavbarSection = styled.div`
    flex:1;
    background-color: #00142a;
    
`
const MainSection = styled.div`
    flex: 4;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`

const App = () => {
  return (
    <Container>
        <NavbarSection>
            <Navbar/>
        </NavbarSection>
        <MainSection>
            <Routes>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/exchanges' element={<Exchanges/>}/>
                <Route path='/cryptocurrencies' element={<Cryptocurrencies/>}/>
                <Route path='/crypto/:coinID' element={<CryptoDetails/>}/>
                <Route path='/news' element={<News/>}/>

            </Routes>
        </MainSection>
    </Container>
  )
}

export default App