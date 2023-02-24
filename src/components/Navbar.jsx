import React from 'react'

import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const Container = styled.div`
    background-color: #00142a;
    height: 100vh;
    padding: 15px 0;
    position: fixed;
    left: 0;
    
`

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 5px 15px;
    /* background-color: teal; */
    
`

const LogoImage = styled.img`
    height: 40px;
`

const LogoText = styled.h2`
    color: #1a90ff;
    font-weight: 600;
`


const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 40px 0px;
`

const MenuItem =styled.div`
    /* background-color: skyblue; */
    display: flex;
    align-items: center;
    gap:10px;
    
    transition: 0.5s all ease;
    color:'#909193';
    cursor: pointer;

    &:hover{
        color:white;
    }

`

const navlinkstyle = ({isActive})=>{
    return{
            textDecoration:'none',
            backgroundColor:isActive ? '#1a90ff':'#00142a',
            color:isActive ? 'white':'gray',
            margin: '5px 0px',
            padding: '5px 5px 5px 20px'
    }
}

const Navbar = () => {
  return (
    <Container>
        <LogoContainer>
            <LogoImage src='https://i.ibb.co/Z11pcGG/cryptocurrency.png'/>
            <LogoText>Cryptoverse</LogoText>
        </LogoContainer>
        <MenuContainer>
            
            <NavLink to='/' style={navlinkstyle}>
                <MenuItem ><HomeOutlinedIcon/> Home</MenuItem>
            </NavLink>
            
            <NavLink to='/cryptocurrencies' style={navlinkstyle}>
                <MenuItem><TrendingUpIcon/> Cryptocurrencies</MenuItem>
            </NavLink>
            
            <NavLink to='/exchanges' style={navlinkstyle}>
                <MenuItem><CurrencyExchangeOutlinedIcon/> Exchanges</MenuItem>
            </NavLink>
            
            <NavLink to='/news' style={navlinkstyle}>
                <MenuItem><LightbulbOutlinedIcon/> News</MenuItem>
            </NavLink>
            

        </MenuContainer>
    </Container>
  )
}

export default Navbar