import React, { FC, useContext, useRef, useState, useEffect, useReducer, Reducer } from "react";
import gsap from "gsap";
import Swal, { SweetAlertIcon } from 'sweetalert2';
import styled, { css } from "styled-components";
import useCoins from "../../../hooks/useCoins";
import { GlobalContext } from "../../../utils/globalContext";
import { RouletteColor, RouletteContext } from "..";
import { blue, darkest, red } from "../../../utils/colors";
import { Window, MainPanel, Button } from "../../../utils/templates";
import canPlay from "../../../utils/canPlay";
import handleOutsideClick from "utils/handleOutsideClick";

const Buttons = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;

    @media screen and (min-width: 800px){
        flex-direction: row;
        margin-top: 0;
    }
`;

const RandomizePanel = styled.div`
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: ${darkest};
    width: 90%;
    height: 210px;
    z-index: 106;
    border: .2vw solid ${red};

    &::before,
    &::after
    {
        content: "";
        top: 0;
        position: absolute;
        width: 15%;
        height: 100%;
        z-index: 105;
        background: ${darkest};
    }

    &::before{
        left: -5%;
    }

    &::after{
        right: -5%;
    }

    @media screen and (min-width: 800px){
        width: 70%;
        height: 30%;
        margin-bottom: 4vw;
    }
`;

const RandomizePanelMarker = styled.span`
    position: absolute;
    width: 3px;
    height: 80%;
    background: #FFE713;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.45);
    z-index: 50;
`;

const RandomizedPanelBlocks = styled.div`
    overflow: hidden;
    display: flex;
    align-items: center;
    align-self: flex-start;
    height: 100%;
    width: 3000px;

    @media screen and (min-width: 800px){
        width: 600vw;
    }
`;

const Currency = styled.p`
    margin-top: 5%;

    span{
        color: ${red}
    }
`;

type RandomizePanelBlockProps = {
    rouletteColor: RouletteColor,
}

const RandomizedBlock = styled.div<RandomizePanelBlockProps>`
    width: 108.55px;
    height: 108.55px;
    margin: 2px;

    @media screen and (min-width: 800px){
        width: 8vw;
        height: 8vw;
        margin: 2px;
    }

    ${({ rouletteColor }) => rouletteColor && css`
        background: ${(rouletteColor === 1 && "red") || (rouletteColor === 2 && "green") || "black"};
    `};
`;

const getMultipler = ( color: RouletteColor ): number=>  color === RouletteColor.Green ? 15 : 2;

const getColorFromNumber = ( number: number ): RouletteColor => {
    if(number <= 47.5) return RouletteColor.Black;
    else if(number <= 52.5) return RouletteColor.Green;
    else if(number > 52.5) return RouletteColor.Red;
    else return RouletteColor.None;
}

const generateBlocks = (): RouletteColor[] => {
    let blocks: RouletteColor[] = [];

    for(let block = 0; 60 > block; block++){
        blocks = ([...blocks, getColorFromNumber(Math.floor(Math.random() * 100) + 1)]);
    }
    
    return blocks;
}

type TimelinesReducer = {
    windowTl: GSAPTimeline,
    rouletteTl: GSAPTimeline,
}

const RoulettePlayWindow: FC = () => {
    const { color, rate, setRouletteRate } = useContext(RouletteContext);
    const { userData } = useContext(GlobalContext);

    const [ rouletteBlocks, setRouletteBlocks ] = useState<RouletteColor[]>();

    const [ timelines ] = 
        useReducer<Reducer<TimelinesReducer, TimelinesReducer>>(
            ( state, newState ) => ({ ...state, ...newState }), {
                windowTl: gsap.timeline({ paused: true, ease: "expo.inOut" }),
                rouletteTl: gsap.timeline({ ease: "expo.inOut" })
            }
        )
    
    const { data, mutateNoRefetch, refetch } = useCoins(userData);

    const { windowTl, rouletteTl } = timelines;

    const windowPanel = useRef<HTMLDivElement>(null);
    const mainPanel = useRef<HTMLDivElement>(null);
    const blocks = useRef<HTMLDivElement>(null);

    const handleOpenCloseClick = () => windowTl.reversed(!windowTl.reversed());

    const updateCoins = () => {
        const winningBlock: RouletteColor = rouletteBlocks[3];
    
        const coins: number = 
            color === winningBlock ?
                data + (getMultipler(color) * rate - rate) : data - rate;
        
        mutateNoRefetch({ coins });
    }

    const openWindow = () => {
        if(!canPlay(userData, rate, data))
            return;

        if(color == RouletteColor.None){
            Swal.fire({
                title: "Wybierz kolor zanim zaczniesz grać na ruletce!",
                icon: "error"
            })

            return;
        }

        setRouletteBlocks(generateBlocks());
        handleOpenCloseClick();
    }

    const closeWindow = () => {
        if(rouletteTl.progress() !== 1.0) return;

        ( data < rate ) && setRouletteRate(data);

        handleOpenCloseClick();
    }

    const skipAnimation = () => {
        if(rouletteTl.progress() >= 0.9) return;
        rouletteTl.progress(0.9);
    }

    const playAgain = () => {
        if(rouletteTl.progress() !== 1.0) return;

        if(data && data < rate){
            Swal.fire({
                title: "Nie masz tylu fajek, aby zagrać!",
                text: "Przykro mi :(",
                icon: "error"
            })

            return;
        }

        setRouletteBlocks(generateBlocks());
    }

    useEffect(() => {
        mainPanel.current && windowTl.from(windowPanel.current, { opacity: 0, duration: 0.22, display: "none" })
            .from(mainPanel.current, { opacity: 0, y: 10, duration: 0.22 })
            .from(mainPanel.current.children, { opacity: 0, x: 10, duration: 0.3, stagger: 0.1 })
            .reverse();
    }, [ ])

    useEffect(() => {
        if(rouletteBlocks){
            updateCoins();

            rouletteTl.from(blocks.current, { x: `-100%`, duration: 12 })
                .then(async () => {
                    const winningBlock: RouletteColor = rouletteBlocks[3];
                    const icon: SweetAlertIcon = winningBlock === color ? "success" : "error";

                    const title: string = winningBlock === color ? 
                        `Wygrałeś ${getMultipler(color) * rate - rate}` : `Przegrałeś ${rate} fajek`;

                    const text: string = winningBlock === color ? "Gratulacje :D" : "Unlucky :/";

                    Swal.fire({
                        icon,
                        title,
                        text
                    })

                    refetch();
                });
        }
    }, [ rouletteBlocks ])

    return(
        <>
            <Window 
                ref={windowPanel}
                onClick={ e => handleOutsideClick(close, windowPanel, e.target) }
            >
                <MainPanel ref={mainPanel}>
                    <RandomizePanel>
                        <RandomizePanelMarker/>
                        <RandomizedPanelBlocks ref={blocks}>
                            {rouletteBlocks && rouletteBlocks.map(( selectedColor: RouletteColor, index: number ) => (
                                <RandomizedBlock 
                                    key={index}
                                    rouletteColor={selectedColor}
                                />
                            ))}
                        </RandomizedPanelBlocks>
                    </RandomizePanel>
                    <Buttons>
                        <Button
                            background={red}
                            onClick={closeWindow}
                        >
                            ZAMKNIJ
                        </Button>
                        <Button 
                            background={blue}
                            onClick={skipAnimation}
                        >
                            POMIŃ
                        </Button>
                        <Button 
                            background={darkest}
                            onClick={playAgain}
                        >
                            Zagraj za ({rate})
                        </Button>
                    </Buttons>
                    {data && <Currency>Posiadasz jeszcze <span>{data} fajek</span></Currency>}
                </MainPanel>
            </Window>
            <Button 
                background={blue}
                onClick={openWindow}
            >
                Losuj
            </Button>
        </>
    )
}

export default RoulettePlayWindow;