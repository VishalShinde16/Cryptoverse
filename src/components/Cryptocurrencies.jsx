import React from 'react'

import {Row,Col,Card} from 'antd'
import millify from 'millify'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`

const SearchCurrency = styled.input`
  padding: 5px 10px;
  border:0.5px solid lightgray;
  /* border-radius: 5px; */
  align-self: center;
  &:focus{
    /* border-color: #1a90ff; */
    outline-color: #1a90ff;
  }
`
const Cryptocurrencies = (props) => {

  
  const count = props.count ? props.count:100;

  const [currencies,setCurrencies] = React.useState({});

  const [search,setSearch] = React.useState('');

  React.useEffect(()=>{

    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '50',
        offset: '0'
      },
      headers: {
        'X-RapidAPI-Key': '7aa40aa768msh6cd0a7f3f842e23p1023dbjsn2679d5540980',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };

    const getCurrenciesData =async ()=>{

      try{
        const currencyData = await axios.request(options)
        // setCurrencies(currencyData.data)
        // console.log(currencyData.data)
        const filteredData = currencyData.data.data.coins.filter((coin)=>coin.name.toLowerCase().includes(search.toLowerCase()))
        setCurrencies({...currencies,
                  coins:filteredData}
          )

      }catch(err){
        console.log(err)
      }
    }

    getCurrenciesData();
    
  },[search])

  const currencyLogoStyle = {
    width:'30px',
    height:'30px'

  }

  // const handleChange = (event)=>{
  //   setSearch(event.target.value)
  //   const filteredData = currencies.data.coins.filter((coin)=>coin.name.toLowerCase().includes(search.toLowerCase()))
  //   // setCurrencies({...currencies.data,coins:filteredData});
  //   // console.log(filteredData)
  //   // console.log()
  //   setCurrencies({...currencies,
  //               data:{...currencies.data,
  //                       coins:filteredData}
  //               })
  //   console.log(currencies)
  // }

  return (
    <Container>
      {!props.count ? 
      <SearchCurrency placeholder='search cryptocurrency' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        :<></>
      }

      {Object.keys(currencies).length > 0 ?
        
        <Row>
          {currencies.coins.slice(0,count).map(currency =>(
            
            <Col xs={24} sm={12} lg={6} key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  title={currency.rank+'. '+currency.name}
                  extra={<img src={currency.iconUrl} alt='currency logo' style={currencyLogoStyle}/>}
                  style={{
                    width: 250,
                    marginTop:'8px'
                  }}

                  hoverable
                  >
                  <p>Price :{millify(currency.price)}</p>
                  <p>Market Cap :{millify(currency.marketCap)}</p>
                  <p>Change :{millify(currency.change)}%</p>
                </Card>
              </Link>
            </Col>

          ))}
        </Row>
      :
      <p>Loading...</p>
    }
      
    </Container>
  )
}

export default Cryptocurrencies