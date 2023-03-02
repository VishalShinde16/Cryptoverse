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

`
const Wrapper = styled.div`
    width: 850px;
    height:600px;
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
                label:'price of crytpo',
                data:coinHistory,

                backgroundColor:'aqua',
                borderColor:'black',
                pointBorderColor:'aqua',
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
            <div>CryptoChart</div>
            <Wrapper>
                <Line data = {linedata} />
            </Wrapper>
        </Container>
    )
}

export default CryptoChart