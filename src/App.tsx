import React, { useContext, useEffect, useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import { All } from '../interfaces/app.props';
import { Row } from './components/row/row';
import { AppContext } from './context/app.context';
import { ModalContent } from './components/modal/modal';
import styles from "./app.module.css";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';



export default function App() {

  const [data, setData] = useState<All>();
  const [ search, setSearch ] = useState<string>("");

  const { modalId, openedModal, setOpenedModal } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
   const indexOfLastRow = currentPage * rowsPerPage;
   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
   const currentRows = data?.data.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(()=>{
    axios.get("https://reqres.in/api/products/")
    .then((response: AxiosResponse) => {
      setData(response.data);
  });
  },[data]);

  return (
    <div className={styles.container}>
      {
        openedModal &&
        data?.data.map((e)=>{
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
          return null
        })
      }
      <input className={styles.input} type="number" value={search} placeholder='type id' onChange={(event:any)=>setSearch?.(event.target.value)} />
      <div className={styles.table}>
        {
          (search === "")?
            currentRows?.map((e)=>{
              if(e.id.toString() === search || search === "")
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
              return null
            })
          :
          data?.data.map((e)=>{
            if(e.id.toString() === search || search === "")
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
            return null
          })
        }
      </div>
      <div className={styles.buttonContainer}>
          <ArrowLeftIcon className={styles.button} onClick={()=>(currentPage !== 1)? setCurrentPage((prev)=>prev-1) : null} />
          <ArrowRightIcon className={styles.button} onClick={()=>(currentPage !== 2)? setCurrentPage((prev)=>prev+1) : null} />
      </div>
    </div>
  );
}
