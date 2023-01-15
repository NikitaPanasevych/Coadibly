import React, { useContext, useEffect, useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import {  Product  } from '../interfaces/app.props';
import { AppContext } from './context/app.context';
import { ModalContent } from './components/modal/modal';
import styles from "./app.module.css";
import Table from './components/table/table';
import {  Navigate, Route, Routes } from 'react-router-dom';
import Error from './components/error/erroe';




export default function App() {

  const [data, setData] = useState<Product | Product[]>();
  const [error, setError] = useState<boolean>(false);
  const [ id, setId ] = useState<string>("");
  const { modalId, openedModal } = useContext(AppContext);


  useEffect(()=>{
    let endpoints = [
      "https://reqres.in/api/products?page=1/",
      "https://reqres.in/api/products?page=2/"
    ]
    id === ""?
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      (data) => 
      {
        const data3: Product[] = [ ...data[0].data.data, ...data[1].data.data ];
        setData(data3);
      }
    )
    :
    axios.get("https://reqres.in/api/products/"+ id)
    .then((response: AxiosResponse) => {
      setError(false)
      setData(response.data.data);
    })
    .catch(e => {
      if (e.response.status === 404) {
        setError(true);
      }
    });
  },[id]);

  return (
    <div className={styles.container}>
      {
        openedModal && (
        (Array.isArray(data) && data)? 
        data?.map((e)=>{
          if(modalId === e.id){
            return(
                <ModalContent
                  key={e.id} 
                  id={e.id} 
                  name={e.name} 
                  color={e.color} 
                  year={e.year} 
                  pantone_value={e.pantone_value} 
                />
            )
          }
          return null;
        })
        :
        <ModalContent
          key={data?.id} 
          id={data?.id} 
          name={data?.name} 
          color={data?.color} 
          year={data?.year} 
          pantone_value={data?.pantone_value}
        />)
      }
      <input className={styles.input} type="number" value={id} placeholder='type id' onChange={(event:any)=>setId?.(event.target.value)} />
      <div className={styles.table}>
      {
        (!error || id === "")?
        (id === "" && Array.isArray(data))?
        <Routes>
        <Route path="/" element={<Navigate to="/page=1" replace />} />
          <Route path="/page=1" element={<Table data={data?.slice(0, 5)} />} />
          <Route path="/page=2" element={<Table data={data?.slice(5, 10)} />} />
          <Route path="/page=3" element={<Table data={data?.slice(10, 12)} />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
      :
        <Table 
          data={data}
        />
      :
      <Error />
      }
      </div>
    </div>
  );
}
