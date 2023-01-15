
import { useContext } from "react";
import { Product } from "../../../interfaces/app.props";
import { Row } from "../row/row";
import styles from "./table.module.css";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from "react-router-dom";
import { AppContext } from "../../context/app.context";

export interface TableProps {
    data?: Product[] | Product;
}

const Table = ({data}:TableProps): JSX.Element => {

    const { currentPage, setCurrentPage } = useContext(AppContext);
    
    return(
        <>
            <div className={styles.table}>
            {
            (Array.isArray(data) && data)?
                data.map((e:any)=>{
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
            <button onClick={()=>(currentPage !== 1)?  setCurrentPage?.(prev=>prev-1):null} className={styles.button}>
              <Link to={(currentPage !== 1)? "/page="+(currentPage-1) : "/page=1"}> 
                <ArrowLeftIcon />
              </Link>
            </button>
            <button onClick={()=>(currentPage !== 3)? setCurrentPage?.(prev=>prev+1):null} className={styles.button}>
              <Link to={currentPage !== 3? "/page="+(currentPage+1): "/page=3"}>
                <ArrowRightIcon />
              </Link>
            </button>
      </div>
      </>
    )
}

export default Table;