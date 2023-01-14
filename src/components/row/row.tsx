import { useContext } from "react";
import { Product } from "../../../interfaces/app.props";
import { AppContext } from "../../context/app.context";
import styles from "./row.module.css";


export const Row = ({id, name, color, year}: Product) => {

    const {  setModalId, setOpenedModal } = useContext(AppContext)

    return(
        <div  
        className={styles.row}
        style={{backgroundColor: color}} 
        onClick={()=>
            {
                setModalId?.(id);
                setOpenedModal?.(true);
            }}
        >
            <span>Id: {id}</span>
            <span>Name: {name}</span>
            <span>Year: {year}</span>
        </div>
    )
}