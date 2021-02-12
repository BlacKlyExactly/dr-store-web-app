import React, { FC, useRef, useEffect, useState, createContext, useContext } from "react";
import styled from "styled-components";
import { Window, MainPanel, VerticalSelect, Button } from "../../utils/templates";
import gsap from "gsap";
import { VerticalComponentProps } from "../VerticalNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { blue, red } from "utils/colors";
import LogInToUseBox from "../LogInToUseBox";
import { DatabaseUser } from "pages/api/users/[steamId]";
import SelectUser from "./pages/SelectUser";
import SelectGift from "./pages/SelectGift";
import GiftSummary from "./pages/GiftSummary";
import { StoreItem } from "items";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import handleOutsideClick from "utils/handleOutsideClick";

const CloseButton = styled.button`
    cursor: pointer;
    position: absolute;
    top: 11%;
    left: 7%;
    border: none;
    border-radius: 50vw;
    background: ${red};
    height: 50px;
    width: 50px;
    z-index: 10;
   
    @media screen and (min-width: 800px){
        left: 3%;
        top: 5%;
        height: 4vw;
        width: 4vw;
        font-size: 150%;
    }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
`;

type GiftsContextProps = {
    page: number,
    changePage: ( page: number ) => void,
    giftUser: DatabaseUser,
    setGiftUser: ( user: DatabaseUser ) => void,
    giftItem: StoreItem,
    setGiftItem: ( item: StoreItem ) => void,
}

export const Inputs = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Input = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 20px;
`;

export const GiftsContext = createContext<GiftsContextProps>({
    page: 0,
    changePage: () => {},
    giftUser: undefined as DatabaseUser,
    setGiftUser: () => {},
    giftItem: undefined as StoreItem,
    setGiftItem: () => {}
})

const pages: FC<GiftPage>[] = [
    SelectUser,
    SelectGift,
    GiftSummary,
];

const Gifts: FC<VerticalComponentProps> = ({ icon }) => {
    const [ windowTl ] = useState<GSAPTimeline>(gsap.timeline({ paused: true }));
    const [ page, setPageState ] = useState<number>(0);
    const [ giftUser, setUserState ] = useState<DatabaseUser>(undefined as DatabaseUser);
    const [ giftItem, setGiftItemState ] = useState<StoreItem>(undefined as StoreItem);

    const windowPanel = useRef<HTMLDivElement>(null);
    const mainPanel = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        mainPanel.current && windowTl.from(windowPanel.current, { opacity: 0, duration: 0.22, display: "none" })
            .from(mainPanel.current, { opacity: 0, y: 10, duration: 0.22 })
            .from(mainPanel.current.children, { opacity: 0, x: 10, duration: 0.3, stagger: 0.1 })
            .reverse();
    }, [ ])

    const close = () => {
        windowTl.reversed(true);
        
    }
    const open = () => windowTl.reversed(false);

    const changePage = ( newPage: number ) => 
        (newPage > -1 && newPage < pages.length) && setPageState(newPage);

    const setGiftUser = ( newUser: DatabaseUser ) => setUserState(newUser);
    const setGiftItem = ( newItem: StoreItem ) => setGiftItemState(newItem);

    return(
        <GiftsContext.Provider value={{
            page,
            changePage,
            giftUser,
            setGiftUser,
            giftItem,
            setGiftItem
        }}>  
            <VerticalSelect onClick={open}>
                <FontAwesomeIcon icon={icon}/>
            </VerticalSelect>
            <Window 
                ref={windowPanel}
                onClick={e => handleOutsideClick(close, windowPanel, e.target) }
            >
                <MainPanel ref={mainPanel}>
                    <LogInToUseBox />
                    {pages.map(( Page: FC<GiftPage>, index: number ) =>  <Page index={index} key={index}/>)}
                    <PageControler/>
                    <CloseButton onClick={close}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </CloseButton>
                </MainPanel>
            </Window>
        </GiftsContext.Provider>
    )
}

const PageControler: FC = () => {
    const { page, changePage } = useContext(GiftsContext);

    const canBack: boolean = page !== 0;
    const canNext: boolean = page < pages.length - 1;

    return(
        <Buttons>
            <Button 
                onClick={() => changePage(page - 1)}
                background={red}
                locked={!canBack}
            >
                Wstecz
            </Button>
            <Button 
                onClick={() => changePage(page + 1)}
                background={blue}
                locked={!canNext}
            >
                Dalej
            </Button>
        </Buttons>
    )
}

export type GiftPage = {
    index: number
}

export default Gifts;