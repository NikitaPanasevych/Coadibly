import React, { useContext, useEffect, useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import {  Product  } from '../interfaces/app.props';
import { Row } from './components/row/row';
import { AppContext } from './context/app.context';
import { ModalContent } from './components/modal/modal';
import styles from "./app.module.css";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';



export default function App() {

  const [data, setData] = useState<Product[] | Product>();
  const [ id, setId ] = useState<string>("");

  const { modalId, openedModal, setOpenedModal } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);


  useEffect(()=>{
    axios.get("https://reqres.in/api/products/" + id)
    .then((response: AxiosResponse) => {
      console.log(response.data.data)
      setData(response.data.data);
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
          (Array.isArray(data) && data)?
            data.map((e:any)=>{
              {
                return(
                <Row 
                  key={e.id} 
                  id={e.id} 
                  name={e.name} 
                  color={e.color} 
                  year={e.year} 
                  pantone_value={e.pantone_value} 
                />
                )
              }
            })
          :
          <Row 
            key={data?.id} 
            id={data?.id} 
            name={data?.name} 
            color={data?.color} 
            year={data?.year} 
            pantone_value={data?.pantone_value} 
          />
        }
      </div>
      <div className={styles.buttonContainer}>
          <ArrowLeftIcon className={styles.button} onClick={()=>(currentPage !== 1)? setCurrentPage((prev)=>prev-1) : null} />
          <ArrowRightIcon className={styles.button} onClick={()=>(currentPage !== 2)? setCurrentPage((prev)=>prev+1) : null} />
      </div>
    </div>
  );
}
