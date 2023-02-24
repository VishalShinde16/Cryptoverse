import React from 'react'
import styled from 'styled-components'
import {Row,Col,Statistic} from 'antd'
import axios from 'axios'
import millify from 'millify'
import { Link } from 'react-router-dom'

import Cryptocurrencies from './Cryptocurrencies'
import News from './News'



const Container = styled.div`
  padding: 20px;
  scroll-behavior: smooth;
`

const Title = styled.h2`
  margin-bottom: 20px;
  font-weight: 500;
`

const Section = styled.div`
  margin-top: 40px;
`

const SectionHeader= styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

`
const SectionTitle = styled.h2`
  /* font-weight: 500; */
`

const ShowMore = styled.h3`
  font-weight: 300;
  color:#1a90ff;
  
`

const Homepage = () => {


  const [globalStatsData,setGlobalStatsData] = React.useState({})
  React.useEffect(()=>{

    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/stats',
      // params: {referenceCurrencyUuid: 'yhjMzLPhuIDl'},
      headers: {
        'X-RapidAPI-Key': '7aa40aa768msh6cd0a7f3f842e23p1023dbjsn2679d5540980',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };

    const getGlobalStatsData = async ()=>{
      try{
        
        const res = await axios.request(options)
        setGlobalStatsData(res)
        
      }catch(err){
        console.log(err)
      }
    }

    getGlobalStatsData()
    },[])


  return (
    <Container>
      <Title>Global Crypto Stats</Title>
      
      {Object.keys(globalStatsData).length > 0 ? 
      
        <Row>
          <Col span={12}>
            <Statistic title='Total Cryptocurrencies' value={millify(globalStatsData.data.data.totalCoins)}></Statistic>
          </Col>
          <Col span={12}>
            <Statistic title='Total Exchanges' value={millify(globalStatsData.data.data.totalExchanges)}></Statistic>
          </Col>
          <Col span={12}>
            <Statistic title='Total Market Cap' value={millify(globalStatsData.data.data.totalMarketCap)}></Statistic>
          </Col>
          <Col span={12}>
            <Statistic title='Total 24h volume' value={millify(globalStatsData.data.data.total24hVolume)}></Statistic>
          </Col>
          <Col span={12}>
            <Statistic title='Total Markets' value={millify(globalStatsData.data.data.totalMarkets)}></Statistic>
          </Col>
        </Row>
        :
        <p>Loading...</p> 
      }
    

      {/*--------- all sections-----------  */}
      
      <Section>
        <SectionHeader>
          <SectionTitle>Top 10 Cryptocurrencies in the world</SectionTitle>
          <Link to='/cryptocurrencies' style={{textDecoration:'none'}}><ShowMore>Show More</ShowMore></Link>
        </SectionHeader>
        <Cryptocurrencies count={10}/>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Latest Crypto News</SectionTitle>
          <Link to='/news' style={{textDecoration:'none'}}><ShowMore>Show More</ShowMore></Link>
        </SectionHeader>
        <News/>
      </Section>
    </Container>
  )
}

export default Homepage