import axios from 'axios';
import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`
const Heading = styled.h3`
  font-size: 22px;
  font-weight: 300;
  margin-bottom:10px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap:20px;
`

const Card = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
  border-radius: 5px;
  width: 31%;
  background-color: white;
  padding: 10px;
  
  cursor: pointer;

  &:hover{
    /* transform:scale(1.02);
    transition: transform 0.3s ease-in-out; */
    box-shadow: 2px 2px 6px gray;
  }
`

const Header = styled.div`
  display: flex;
`

const NewsTitle = styled.h4`
  
`
const NewsImage = styled.img`
  width: 80px;
  height:80px;
  margin-left: 10px;
`
const Description = styled.p`
  font-size: 14px;
  margin:5px 0px;
  max-width: 150ch;
`
const Time = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  /* color: gray; */
  
`

const News = (props) => {
  const count = props.count || 50

  const [newsData, setNewsData] = React.useState([]);


  let newstime = 'Fri, 03 Mar 2023 13:34:20 +0000'
  const options = {
    method: 'GET',
    url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk',
    headers: {
      'X-RapidAPI-Key': 'c35c053eeemsh9c167463237a990p199670jsna44707fb53b6',
      'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
    }
  };

  const getNews = async () => {
    try {

      const news = await axios.request(options);

      setNewsData(news.data.data);
      console.log('news')



    } catch (err) {
      console.log(err)
    }

  }

  React.useEffect(() => {
    getNews();
  }, [])

  React.useEffect(() => {
    console.log(newsData)
  }, [newsData])


  return (
    <Container>
      <Heading>Top Crypto News</Heading>

      {newsData ?

        <Wrapper>
          {newsData.slice(0,count).map((data) => {
            return (

              <Card onClick={event => window.location.href = 'https://www.coindesk.com/tag/news/'} key={data.title}>
                <Header>
                  <NewsTitle>{data.title}</NewsTitle>
                  <NewsImage src={data.thumbnail}></NewsImage>
                </Header>
                <Description>
                  {/* {newsdesc.substring(0, 150)}... */}
                  {data.description}
                </Description>
                <Time>
                  <p>{newstime.split(' ')[0] + ' ' + newstime.split(' ')[1] + ' ' + newstime.split(' ')[2] + ' ' + newstime.split(' ')[3]}</p>

                  <p>{newstime.split(' ')[4]}</p>
                </Time>
              </Card>

            )
          })}

        </Wrapper>
        :
        <p>Loading...</p>
      }
    </Container>
  )
}

export default News