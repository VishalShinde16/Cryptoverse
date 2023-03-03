import React from 'react'
import axios from 'axios';
import styled from 'styled-components';
import millify from 'millify';

// news-f62b2b553f1e42ce938058b1773c804c
const Container = styled.div`
padding: 10px;

`

const Heading = styled.div`
  /* background-color: aqua; */
  flex: 1;
  /* border:1px solid black; */
  display: flex;
  font-weight: 300;
  /* margin-bottom: 10px; */
`

const Wrapper = styled.div`
  border: 1px solid lightgray;
  background-color: white;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 0.5px solid lightgray;

  &:hover{
    box-shadow: 2px 2px lightgray;
    border-bottom: none;
  }
`

const Name = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap:10px;

  &:hover{
    transform: scale(1.02);
  }
`

const Markets = styled.div`
flex: 1;
display: flex;
justify-content: center;
`

const Volume = styled.div`
flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`

const Exchanges = () => {

  const [exchanges, setExchanges] = React.useState([]);

  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      limit: '50',
      offset: '0',
      orderBy: '24hVolume',
      orderDirection: 'desc'
    },
    headers: {
      'X-RapidAPI-Key': '7aa40aa768msh6cd0a7f3f842e23p1023dbjsn2679d5540980',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  const getExchanges = async () => {
    try {

      const exchangesData = await axios.request(options);

      setExchanges(exchangesData.data.data.exchanges);
      console.log('exchanges')
      console.log(exchangesData)


    } catch (err) {
      console.log(err)
    }

  }

  React.useEffect(() => {
    getExchanges()
  }, [])

  React.useEffect(() => {
    console.log(exchanges)

  }, [exchanges])

  return (
    <Container>
      <Row>
        <Heading style={{justifyContent: 'flex-start'}}>Exchanges</Heading>
        <Heading style={{justifyContent: 'center'}}>No of Markets</Heading>
        <Heading style={{justifyContent: 'flex-end'}}>24h Trade Volume and current price</Heading>
      </Row>

      <Wrapper>
        {exchanges.length > 0 ?
          exchanges.map((currency) => (
            <a href={currency.coinrankingUrl} style={{textDecoration:'none',color:'black'}}>
            <Row key={currency.uuid}>
              <Name>
                {currency.rank}. 
                <img src={currency.iconUrl} alt='icon' width='40px' height='40px'/>
                {currency.name}
              </Name>
              <Markets>{currency.numberOfMarkets}</Markets>
              <Volume>
                {millify(currency['24hVolume'])}
                <p style={{ color: 'gray' }}>{millify(currency.price)}</p>
              </Volume>
            </Row>
            </a>
          ))
          :
          <p>no exchanges</p>
        }

      </Wrapper>
    </Container>
  )
}

export default Exchanges