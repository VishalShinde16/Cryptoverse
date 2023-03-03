import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom';
import millify from 'millify';
import styled from 'styled-components';

import CryptoChart from './CryptoChart'

import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CachedIcon from '@mui/icons-material/Cached';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
//#1a90ff

const Container = styled.div`
  padding: 20px;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`

const Title = styled.h1`
  color: #1a90ff;
`

const Timespan = styled.select`
  width: 15%;
  padding: 5px 10px;
  border: 1px solid lightgray;
  margin: 10px 20px;
`
const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
`
const Statistics = styled.div`
  display: flex;
  flex-direction: column;

`

const Heading = styled.h2`
  font-weight: 300;
`
const Subheading = styled.p`
  color: darkgray;
  margin-bottom: 20px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  width: 100%;

`

const Info = styled.div`
  display: flex;
  align-items: center;
`

const Symbol = styled.div`
  margin: 5px 10px;
  color:gray;
`
const Infoname = styled.h4`
  font-weight: 300;
`
const Infovalue = styled.h3``

const LinkContainer = styled.div`
  padding: 20px;
  margin-top: 20px;
`

const CryptoDetails = () => {

  const [currencyData, setCurrenyData] = React.useState({});

  const [currencyId, setCurrencyId] = React.useState('');
  const [currencyHistory,setCurrencyHistory] = React.useState({});
  const [currencyStats, setCurrencyStats] = React.useState([]);
  const [otherStats, setOtherStats] = React.useState([]);

  const [timePeriod, setTimePeriod] = React.useState('24h');
  const [links, setLinks] = React.useState([]);

  const currentUrl = useLocation();
  // const currencyId = currentUrl.pathname.split('/')[2];

  // console.log(currencyId)
  React.useEffect(() => {

    // const currencyId = currentUrl.pathname.split('/')[2];
    setCurrencyId(currentUrl.pathname.split('/')[2])

    if (currencyId.length > 0) {
      console.log('inside')
      const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${currencyId}`,
        params: { referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: `${timePeriod}` },
        headers: {
          'X-RapidAPI-Key': '7aa40aa768msh6cd0a7f3f842e23p1023dbjsn2679d5540980',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };

      const options2 = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${currencyId}/history`,
        params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: `${timePeriod}`},
        headers: {
          'X-RapidAPI-Key': '7aa40aa768msh6cd0a7f3f842e23p1023dbjsn2679d5540980',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };

      const getCryptoCoinData = async () => {

        try {
          const coinData = await axios.request(options)

          setCurrenyData(coinData.data.data.coin)

          console.log(currencyId);
          console.log(coinData.data.data.coin);
          // console.log(currencyData);
        } catch (err) {
          console.log(err)
        }
      }

      const getCoinHistory = async()=>{

        try{
          const coinHistory = await axios.request(options2)
  
          setCurrencyHistory(coinHistory.data.data)
          console.log('heyhistory')
          console.log(coinHistory)
        }catch(err){
          console.log(err)
        }
      }
      

      getCoinHistory();
      getCryptoCoinData();
    }
  }, [timePeriod, currencyId]);

  React.useEffect(() => {

    Object.keys(currencyData).length > 0 ?
      setCurrencyStats([
        {
          icon: <MonetizationOnOutlinedIcon />,
          infoname: 'Price to USD',
          infovalue: currencyData.price
        },
        {
          icon: <TagOutlinedIcon />,
          infoname: 'Rank',
          infovalue: currencyData.rank
        },
        {
          icon: <MonetizationOnOutlinedIcon />,
          infoname: '24h Volume',
          infovalue: currencyData["24hVolume"]
        },
        {
          icon: <ElectricBoltOutlinedIcon />,
          infoname: 'Market Cap',
          infovalue: currencyData.marketCap
        },
        {
          icon: <EmojiEventsOutlinedIcon />,
          infoname: 'All Time High',
          infovalue: currencyData.price
        }
      ])
      :
      <p>nothing</p>

    Object.keys(currencyData).length > 0 ?
      setOtherStats([
        {
          icon: <TrendingUpIcon />,
          infoname: 'Number of Markets',
          infovalue: currencyData.numberOfMarkets
        },
        {
          icon: <CachedIcon />,
          infoname: 'Number of Exchanges',
          infovalue: currencyData.numberOfExchanges
        },
        {
          icon: <ErrorOutlineOutlinedIcon />,
          infoname: 'Approved Supply',
          infovalue: currencyData.supply.confirmed ? 'Yes' : 'No'
        },
        {
          icon: <ErrorOutlineOutlinedIcon />,
          infoname: 'Total Supply',
          infovalue: currencyData.supply.total
        },
        {
          icon: <ErrorOutlineOutlinedIcon />,
          infoname: 'Circulating Supply',
          infovalue: currencyData.supply.circulating
        }
      ])
      :
      <p>nothing2</p>

    Object.keys(currencyData).length > 0 ? setLinks(currencyData.links) : console.log('no links available')

  }, [currencyData])

  function handleTimePeriod(event) {
    console.log(event.target.value)
    setTimePeriod(event.target.value)
  }


  return (
    <Container>
      {console.log(currencyData)}

      {currencyData && currencyStats.length > 0 ?
        <>
          <HeaderContainer>
            <Title>{currencyData.name} {currencyData.symbol}  Price</Title>
            <p>{currencyData.name} live price in US dollars. View value statistics,market cap and supply</p>
          </HeaderContainer>
          
          <Timespan defaultValue='24h' onChange={handleTimePeriod}>
            <option value='3h'>3h</option>
            <option value='12h'>12h</option>
            <option value='24h'>24h</option>
            <option value='7d'>7d</option>
            <option value='30d'>30d</option>
            <option value='1y'>1y</option>
            <option value='3y'>3y</option>
            <option value='5y'>5y</option>

          </Timespan>

          {/* chart */}
          <Heading style={{margin:'5 20px'}}>{currencyData.name} Price Chart</Heading>
          {Object.keys(currencyHistory).length > 0 ? <CryptoChart data = {currencyHistory}/>:<p> no currency history as data length is {Object.keys(currencyHistory).length} </p>}
      
          {/* price to usd,rank,24hvol,marketcap,alltimehigh */}
          <StatsContainer>

            <Statistics>
              <Heading>{currencyData.name} Value statistics</Heading>
              <Subheading>An overview showing the stats of {currencyData.name}</Subheading>

              {console.log(currencyStats)}
              {console.log(currencyStats.length)}
              {currencyStats.length > 0 ?
                currencyStats.map(({ icon, infoname, infovalue }) => {
                  return (
                    <Row key={infoname}>
                      <Info>
                        <Symbol>{icon}</Symbol>
                        <Infoname>{infoname}</Infoname>
                      </Info>
                      <Infovalue>{millify(infovalue)}</Infovalue>
                    </Row>

                  )
                }) :
                <>nothing to show</>
              }
            </Statistics>
            {/* no.of markets,no of exchanges,approved supply,total supply,circulationg supply */}
            <Statistics>
              <Heading>Other statistics</Heading>
              <Subheading>An overview showing the stats of Bitcoin</Subheading>

              {console.log(currencyStats)}
              {console.log(currencyStats.length)}
              {otherStats.length > 0 ?
                otherStats.map(({ icon, infoname, infovalue }) => {
                  return (
                    <Row key={infoname}>
                      <Info>
                        <Symbol>{icon}</Symbol>
                        <Infoname>{infoname}</Infoname>
                      </Info>
                      <Infovalue>{millify(infovalue)}</Infovalue>
                    </Row>

                  )
                }) :
                <>nothing to show</>
              }
            </Statistics>
          </StatsContainer>
          {/* information of coin */}
          {/* links */}
          <LinkContainer>
            <Heading style={{margin:'20px 0 10px 0'}}>Bitcoin Links</Heading>
            {
              links.length > 0 ?
                links.map(({ name, type, url }) => {
                  return (

                    <Row key={url} style={{padding:'20px'}}>
                      <Infoname>{type}</Infoname>
                      <a href={url}>{name}</a>
                    </Row>
                  )
                })
                :
                <p>No links available</p>
            }

          </LinkContainer>

        </>


        :
        <p>Loading...</p>
      }


    </Container>
  )
}

export default CryptoDetails