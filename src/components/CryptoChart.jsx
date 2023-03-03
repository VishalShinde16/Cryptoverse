import React from 'react'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js'

ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement,Legend,Tooltip)

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    width: 90%;
    height:530px;
`

const CryptoChart = ({data}) => {

    const coinHistory = []
    const timestamp = []

    for(let i = 0 ; i < data.history.length; i++){
        coinHistory.push(data.history[i].price)

        timestamp.push(new Date(data.history[i].timestamp*1000).toLocaleDateString('en-GB'))
        // timestamp.push(data.history[i].timestamp)
    }

    const linedata = {
        labels:timestamp,
        datasets:[
            {
                label:'Price of Currency',
                data:coinHistory,

                backgroundColor:'#1a90ff',
                borderColor:'#1a90ff',
                pointBorderColor:'#1a90ff',
                fill:true,
                tension:0.4
            }
        ]
    }

    // const options = {
    //     scales:{
    //         y:{
    //             beginAtZero:true,    
    //         }           
    //     }
    // };

    return (
        <Container>
            <Wrapper>
                <Line data = {linedata} />
            </Wrapper>
        </Container>
    )
}

export default CryptoChart