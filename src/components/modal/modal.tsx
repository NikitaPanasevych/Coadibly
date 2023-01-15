import { useContext } from "react";
import { Product } from "../../../interfaces/app.props";
import { AppContext } from "../../context/app.context";
import styles from "./modal.module.css";
import { Modal } from "@mui/material";



export const ModalContent = ({name,id,color,year,pantone_value}:Product) => {

    const { setOpenedModal, openedModal } = useContext(AppContext);
    const handleClose = () => setOpenedModal?.(false);

    return(
            <Modal
            open={openedModal}
            onClose={handleClose}
            >
                <div className={styles.modal} style={{backgroundColor: color}} >
                    <div>
                        <span>Id: {id}</span>
                        <span>Name: {name}</span>
                        <span>Color: {color}</span>
                        <span>Year: {year}</span>
                        <span>Pantone value: {pantone_value}</span>
                    </div>
                </div>
            </Modal>
    )
}