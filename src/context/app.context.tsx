import { createContext, ReactNode, useState } from "react";


export interface IAppContext{
    modalId?: number;
    openedModal: boolean;
    currentPage: number;
    setCurrentPage?: (newCurrentPage: number | ((prev : number) => number)) => void;
    setOpenedModal?: (newOpenedModal: boolean) => void;
    setModalId? : (modalId: number | undefined) => void;
}

export const AppContext = createContext<IAppContext>({modalId: 0, openedModal: false, currentPage: 1})

export const AppContextProvider = ({children,  modalId, openedModal, currentPage }:IAppContext & {children: ReactNode}): JSX.Element => {

    const [modalIdState, setModalIdState] = useState<number | undefined>(modalId);
    const [openedModalState, setOpenedModalState] = useState<boolean>(openedModal);
    const [currentPageState, setCurrentPageState] = useState<number>(currentPage)


    const setModalId = (newSearch: number | undefined) => {
        setModalIdState(newSearch);
    };
    const setOpenedModal = (newModal: boolean) => {
        setOpenedModalState(newModal);
    };
    const setCurrentPage = (newCurrentPage: number | ((prev : number) => number)) => {
        setCurrentPageState(newCurrentPage);
    };

    return(
        <AppContext.Provider value={
            {
                modalId: modalIdState,
                currentPage: currentPageState,
                openedModal: openedModalState,
                setOpenedModal,
                setCurrentPage,
                setModalId,
            }}>
            {children}
        </AppContext.Provider>
    )
}