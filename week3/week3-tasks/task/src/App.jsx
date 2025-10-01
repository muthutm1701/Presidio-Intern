import { useState } from 'react'

import './App.css'
import Parent from './ReRenderTask'
import { useEffect } from 'react'

function App() {
  const [data1,setData ]=useState();
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      if (!res.ok) {
        throw new Error(`error status: ${res.status}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("failed to fetch data ", err);
    }
  };
  return (
    <>
     {/* <Parent/> */} 
    <div>{data1 ? `Welcome, ${data1.userId}` : 'Loading...'}</div>

     

    </>
  )
}

export default App
