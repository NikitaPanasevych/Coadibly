import { createContext, ReactNode, useState } from "react";


export interface IAppContext{
    modalId: number;
    openedModal: boolean;
    setOpenedModal?: (newOpenedModal: boolean) => void;
    setModalId? : (modalId: number) => void;
}

export const AppContext = createContext<IAppContext>({modalId: 0, openedModal: false})

export const AppContextProvider = ({children,  modalId, openedModal }:IAppContext & {children: ReactNode}): JSX.Element => {

    const [modalIdState, setModalIdState] = useState<number>(modalId);
    const [openedModalState, setOpenedModalState] = useState<boolean>(openedModal);


    const setModalId = (newSearch: number) => {
        setModalIdState(newSearch);
    };
    const setOpenedModal = (newModal: boolean) => {
        setOpenedModalState(newModal);
    };

    return(
        <AppContext.Provider value={
            {
                modalId: modalIdState,
                openedModal: openedModalState,
                setOpenedModal,
                setModalId,
            }}>
            {children}
        </AppContext.Provider>
    )
}