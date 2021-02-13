import React, { FC, useContext, useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import gsap from "gsap";
import Swal from "sweetalert2";
import { faHandRock, faHandScissors, faHandPaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { RpsContext } from "../";
import { GlobalContext } from "../../../utils/globalContext";
import useCoins from "../../../hooks/useCoins";
import useRps, { SocketData, SocketTimeData } from "../../../hooks/useRps";
import { blue, darkest, red } from "../../../utils/colors";
import { Window, MainPanel, Button } from "../../../utils/templates";
import canPlay from "../../../utils/canPlay";
import { RpsGameState, RpsPlayer, RpsMark } from "../../../rps";
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

const SearchText = styled.h1`
    color: ${red};
    font-size: 200%;

    span{
        color: ${blue};
    }
`;

const TimeText = styled.p`
    margin-top: 1%;
    color: ${red};
    font-size: 200%;
    margin-bottom: 20px;

    span{
        color: ${blue};
    }

    @media screen and (min-width: 800px){
        font-size: 250%;
    }
`;

const YourAvatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 10%;
    left: 10%;
`;

const EnemyAvatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 10%;
    right: 10%;
`;

const AvatarImage = styled.img`
    height: 70px;
    width: 70px;

    @media screen and (min-width: 800px){
        height: clamp(70px, 1.5vw, 150px);
        width: clamp(70px, 2vw, 150px);
    }
`;

const AvatarName = styled.p`
    font-size: 18px;
    color: ${red};
    margin: 10px 10px;

    @media screen and (min-width: 800px){
        font-size: clamp(18px, 1.7vw, 50px);
    }
`;

const Marks = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

type MarkProps = {
    isMarkSelected: boolean
}

const Mark = styled.button<MarkProps>`
    width: 80px;
    height: 80px;
    border-radius: 50vw;
    border: .15vw solid ${blue};
    background: ${darkest};
    margin: 0 10px;
    color: ${blue};
    font-size: 20px;
    transition:
        .1s color,
        .1s background;
    cursor: pointer;

    &:hover{
        color: white;
        background: ${blue};
    }

    ${({ isMarkSelected }) => isMarkSelected && css`
        background: ${red};
        color: white;
        border: .15vw solid ${red};
    `}
`;

const getTime = ( time: number ): { minutes: string, seconds: string } => {
    if(time < 0){
        return {
            minutes: "00",
            seconds: "00"
        }
    }

    const timeMinutes: number = Math.floor(time / 60);
    const timeSeconds: number = time - timeMinutes * 60;

    const minutes: string = timeMinutes < 10 ? `0${timeMinutes}` : `${timeMinutes}`;
    const seconds: string = timeSeconds < 10 ? `0${timeSeconds}` : `${timeSeconds}`;

    return{
        minutes,
        seconds,
    }
}

const RpsPlayWindow: FC = () => {
    const { rate } = useContext(RpsContext);
    const { userData } = useContext(GlobalContext);

    const [ windowTl ] = useState<GSAPTimeline>(gsap.timeline({ paused: true }));
    const [ time, setTime ] = useState<number>(0);
    const [ timerState, setTimerState ] = useState<boolean>(false);
    const [ gameTime, setGameTime ] = useState<number>(30);
    const [ game, setGame ] = useState<RpsPlayer[]>([]);

    const { data, mutate } = useCoins(userData);
    
    const { addToQueue, removeFromQueue, setMark, removeGame } = useRps(userData, 
        ({ currentGame }: SocketData ) => setGame(currentGame),
        ({ currentGame }: SocketData ) => setGame(currentGame),
        ({ currentGame }: SocketData ) => setGame(currentGame),
        ({ timeGame }: SocketTimeData ) => setGameTime(timeGame),
        ( currentGame: RpsPlayer[] ) => setGame(currentGame),
    )

    const windowPanel = useRef<HTMLDivElement>(null);
    const mainPanel = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mainPanel.current && windowTl.from(windowPanel.current, { opacity: 0, duration: 0.22, display: "none" })
            .from(mainPanel.current, { opacity: 0, y: 10, duration: 0.22 })
            .from(mainPanel.current.children, { opacity: 0, x: 10, duration: 0.3, stagger: 0.1 })
            .reverse();
    }, [ ])

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if(timerState){
            interval = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }

        return () => interval && clearInterval(interval);
    }, [ timerState, time ])

    useEffect(() => {
        const player: { enemy: RpsPlayer, you: RpsPlayer } | undefined = getPlayer();
        if(!player) return;

        const { you, enemy } = player;

        if(game && you.mark === RpsMark.None && enemy.mark === RpsMark.None){
            setTime(0);
            setTimerState(false);
        }

        if(you.state !== RpsGameState.None){
            switch(you.state){
                case RpsGameState.Win: {
                    Swal.fire({
                        title: "Wygrałeś!",
                        text: `Zyskujesz ${((rate * 2) / 2).toFixed()} fajek.`
                    })

                    mutate({ coins: data + ((rate * 2) / 2).toFixed() });
                    break;
                }

                case RpsGameState.Lose: {
                    Swal.fire({
                        title: "Przegrałeś!",
                        text: `Tracisz ${rate} fajek. :/`
                    })

                    mutate({ coins: data - rate });
                    break;
                }

                case RpsGameState.Draw: {
                    Swal.fire({
                        title: "Remis!",
                        text: "Odzyskujesz fajki."
                    })

                    break;
                }
            }

            endGame();
            removeGame(you);
        }
    }, [ game ])

    const getPlayer = (): { enemy: RpsPlayer, you: RpsPlayer } | undefined => {
        if(!game || !( game instanceof Array )) return;

        const [ p1, p2 ] = game;
        if(!p1 || !p2) return;

        return p1.id !== userData.steamId ? {
            enemy: p1,
            you: p2
        } : {
            enemy: p2,
            you: p1
        }
    }

    const endGame = () => {
        setTimerState(false);
        setTime(0);

        handleOpenCloseClick(true);
    }

    const handleOpenCloseClick = ( close: boolean ) => windowTl.reversed(close);

    const open = () => {
        if(!canPlay(userData, rate, data)) return;

        addToQueue();
        setTimerState(true);
        handleOpenCloseClick(false);
    }

    const close = () => {
        if(game) return;

        removeFromQueue();
        setTimerState(false);
        setTime(0);
        handleOpenCloseClick(true);
    }

    const marks: Mark[] = [
        { icon: faHandRock, mark: RpsMark.Rock },
        { icon: faHandPaper, mark: RpsMark.Paper },
        { icon: faHandScissors, mark: RpsMark.Scissors },
    ]

    const setPlayerMark = (( mark: RpsMark ) => {
        const player: { enemy: RpsPlayer, you: RpsPlayer } | undefined = getPlayer(); 
        ( player && player.you.mark === RpsMark.None ) && setMark(mark);
    })

    return(
        <>
            <Button 
                background={blue}
                onClick={() => open()}
            >
                Szukaj
            </Button>
            <Window 
                ref={windowPanel} 
                onClick={e => handleOutsideClick(close, windowPanel, e.target)}
            >
                <MainPanel ref={mainPanel}>
                    {
                        getPlayer()?.you ? (
                            <>
                                <YourAvatar>
                                    <AvatarImage src={userData?.avatar}/>
                                    <AvatarName>{userData?.name}</AvatarName>
                                </YourAvatar>
                                <EnemyAvatar>
                                    <AvatarImage src={getPlayer()?.enemy.avatar}/>
                                    <AvatarName>{getPlayer()?.enemy && getPlayer()?.enemy.name}</AvatarName>
                                </EnemyAvatar>
                                <TimeText>
                                    {getTime(gameTime).minutes}<span>:{getTime(gameTime).seconds}</span>
                                </TimeText>
                                <Marks>
                                    {marks.map(({ icon, mark }: Mark) => (
                                        <Mark 
                                            key={mark}
                                            onClick={() => setPlayerMark(mark)}
                                            isMarkSelected={getPlayer()?.you.mark === mark}
                                        >
                                            <FontAwesomeIcon icon={icon}/>
                                        </Mark>
                                    ))}
                                </Marks>
                            </>
                        ): 
                        (   
                            <>
                                <SearchText>
                                    Szukanie przeciwnika <span>...</span><br/>
                                </SearchText>
                                <TimeText>
                                    {getTime(time).minutes}<span>:{getTime(time).seconds}</span>
                                </TimeText>
                            </>
                        )
                    }
                    <Buttons>
                        {!game && (
                            <Button 
                                background={red}
                                onClick={() => close()}
                            >
                                PRZERWIJ
                            </Button>
                        )}
                    </Buttons>
                </MainPanel>
            </Window>
        </>
    )
}

type Mark = {
    icon: FontAwesomeIconProps['icon'],
    mark: RpsMark
}

export default RpsPlayWindow;