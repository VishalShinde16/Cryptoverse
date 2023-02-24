// import React from "react";
// import axios from 'axios';

// const ApiData = ()=>{
    
//     const [stats,setStats] = React.useState({});
//     const [cryptocurrencies,setCryptocurrencies] = React.useState({});

//     React.useEffect(()=>{
            
//             const options = {
//             method: 'GET',
//             url: 'https://coinranking1.p.rapidapi.com/stats',
//             // params: {referenceCurrencyUuid: 'yhjMzLPhuIDl'},
//             headers: {
//                 'X-RapidAPI-Key': '7aa40aa768msh6cd0a7f3f842e23p1023dbjsn2679d5540980',
//                 'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//             }
//         };

//         const getGlobalStatsData = async ()=>{
//             try{
                
//                 const res = await axios.request(options)
//                 setStats(res)
                
//             }catch(err){
//                 console.log(err)
//             }
//         }

//         const options2 = {
//             method: 'GET',
//             url: 'https://coinranking1.p.rapidapi.com/coins',
//             params: {
//               referenceCurrencyUuid: 'yhjMzLPhuIDl',
//               timePeriod: '24h',
//               'tiers[0]': '1',
//               orderBy: 'marketCap',
//               orderDirection: 'desc',
//               limit: '50',
//               offset: '0'
//             },
//             headers: {
//               'X-RapidAPI-Key': '7aa40aa768msh6cd0a7f3f842e23p1023dbjsn2679d5540980',
//               'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//             }
//           };
      
//           const getCurrenciesData =async ()=>{
      
//             try{
//               const currencyData = await axios.request(options2)
//               setCryptocurrencies(currencyData.data)
//               console.log(currencyData.data)
//             }catch(err){
//               console.log(err)
//             }
//           }
      
          
        
//         getGlobalStatsData();
//         getCurrenciesData();
//     },[])

//     // crypto currencies
    

//     return {stats,cryptocurrencies}

// }

// export const {stats,cryptocurrencies} = ApiData()