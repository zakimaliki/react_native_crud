import React, { useEffect, useState } from 'react'
import { NativeBaseProvider } from 'native-base';
import FlatListComp from '../components/FlatListComp';
import axios from 'axios';


const List = () => {
    const [data , setData] = useState([])
    useEffect(()=>{
        getData();
    },[])

    // json-server --host 192.168.0.102 --watch db.json --port 3000
    const getData =()=>{
        axios.get("http://192.168.0.102:3000/User")
        .then((res)=>setData(res.data))
        .catch((err)=>console.log(err))
    }
  return (
    <NativeBaseProvider>
      <FlatListComp dataNew={data} getData={getData}/>
    </NativeBaseProvider>
  )
}

export default List