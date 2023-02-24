import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom';
import millify from 'millify';
import styled from 'styled-components';

import priceIcon from '@mui/icons-material/MonetizationOnOutlined';
import rankIcon from '@mui/icons-material/TagOutlined';
import volumeIcon from '@mui/icons-material/ElectricBoltOutlined';
import highestIcon from '@mui/icons-material/EmojiEventsOutlined';
const Container = styled.div``

const HeaderContainer = styled.div`

`

const Title = styled.h1``

const Timespan = styled.select`

`
const StatsContainer = styled.div``
const Statistics = styled.div`
  display: flex;
  flex-direction: column;
`

const Heading = styled.h2`
  font-weight: 300;
`
const Subheading = styled.p`
  color: darkgray;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`

const Info = styled.div`
  display: flex;
  align-items: center;
`

const Symbol = styled.div`
  margin: 5px 10px;
`
const Infoname = styled.h3`
  font-weight: 300;
`
const  Infovalue = styled.h3``

const CryptoDetails = () => {

  const [currencyData,setCurrenyData] = React.useState({});
  
  const [currencyId,setCurrencyId] = React.useState('');

  const [currencyStats,setCurrencyStats] = React.useState([]);
  const currentUrl = useLocation();
  // const currencyId = currentUrl.pathname.split('/')[2];

  // console.log(currencyId)
  React.useEffect(()=>{

    // const currencyId = currentUrl.pathname.split('/')[2];
    setCurrencyId(currentUrl.pathname.split('/')[2])

    if (currencyId.length > 0){
        console.log('inside')
        const options = {
          method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${currencyId}`,
        params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h'},
        headers: {
          'X-RapidAPI-Key': '7aa40aa768msh6cd0a7f3f842e23p1023dbjsn2679d5540980',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };
      
      const getCryptoCoinData =async ()=>{
        
        try{
          const coinData =await axios.request(options)
          
          setCurrenyData(coinData.data.data.coin)
          
          console.log(currencyId);
          // console.log(coinData.data.data.coin);
          // console.log(currencyData);
        }catch(err){
          console.log(err)
        }
      }
      
      getCryptoCoinData();
    } 
  },[currencyId]);

  React.useEffect(()=>{
    currencyStats ? 
    setCurrencyStats([
      {
        icon:'B',
        infoname:'Price to USD',
        infovalue:currencyData.price
      },
      {
              icon:'B',
              infoname:'Rank',
              infovalue:currencyData.rank
      },
      {
              icon:'B',
              infoname:'24h Volume',
              infovalue:''
      },
      {
              icon:'B',
              infoname:'Market Cap',
              infovalue:currencyData.marketCap
      },
      {
              icon:'B',
              infoname:'All Time High',
              infovalue:currencyData.price
      }
    ],console.log('stats setting done'))
    :
    console.log('No currency Stats')
  },[currencyData])
  
  return (
    <Container>
      {console.log(currencyData)}

      {currencyData && currencyStats.length > 0 ? 
        <>
        <HeaderContainer>
          <Title>{currencyData.name} {currencyData.symbol}  Price</Title>
          <p>{currencyData.name} live price in US dollars. View value statistics,market cap and supply</p>
        </HeaderContainer>

          <Timespan defaultValue='7d'>
            <option value='6h'>6h</option>
            <option value='24h'>24h</option>
            <option value='7d'>7d</option>
            <option value='15d'>15d</option>
            <option value='30d'>30d</option>
          </Timespan>

          {/* chart */}
          {/* price to usd,rank,24hvol,marketcap,alltimehigh */}
          <Statistics>
            <Heading>Bitcoin Value statistics</Heading>
            <Subheading>An overview showing the stats of Bitcoin</Subheading>
            
            {console.log(currencyStats)}
            {console.log(currencyStats.length)}
            {currencyStats.length > 0 ? 
            currencyStats.map(({icon,infoname,infovalue})=>{
              return(
                <Row>
                  <Info>
                    <Symbol>{icon}</Symbol>
                    <Infoname>{infoname}</Infoname>
                  </Info>
                  <Infovalue>{millify(infovalue)}</Infovalue>
                </Row>

              )
            }):
            <>nothing to show</>
            }
          </Statistics>
          {/* no.of markets,no of exchanges,approved supply,total supply,circulationg supply */}
          {/* information of coin */}
          {/* links */}
        </>
        

        :
        <p>Loading...</p>  
      }
      
      
    </Container>
  )
}

export default CryptoDetails