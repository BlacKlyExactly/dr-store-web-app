import React, { FC, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import styled, { css } from "styled-components";
import { PageWrapper } from "../utils/templates";
import Template from "../components/Template";
import { blue, darker, red } from "../utils/colors";
import axios, { AxiosResponse } from "axios";
import { AppUserProps } from "./_app";
import serverSideProps from "utils/serverSideProps";
import { DatabaseUser } from "./api/users/[steamId]";
import encode from "utils/encode";
import gsap from "gsap";

const PageContent = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const TopRichPlayers = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    flex-direction: column;

    @media screen and (min-width: 800px){
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-content: start;
        justify-items: center;
        height: 80%;
        margin-top: 1vw;
    }
`;

type TopRichProps = {
    isSingleInstance?: boolean
}

const TopRich = styled.div<TopRichProps>`
    position: relative;
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 30px 0;

    @media screen and (min-width: 800px){
        flex-direction: row;
        width: 90%;
        margin: 0.8vw 0.5vw;

        ${({ isSingleInstance }) => isSingleInstance && css`
            width: 48%;
        `}
    }
`;

const TopRichPlace = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: ${red};
    border-radius: 50vw;
    font-size: 25px;
    color: white;

    @media screen and (min-width: 800px){
        width: 4.2vw;
        height: 4.2vw;
        font-size: 90%;
    }

    @media screen and (min-width: 1200px){
        font-size: 150%;
    }
`;

const TopRichNickHolder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 78px;
    border-radius: 50vw;
    background: ${darker};
    margin-left: 25px;
    color: ${red};
    font-size: 20px;

    @media screen and (min-width: 800px){
        height: 4.2vw;
        font-size: 80%;
    }

    @media screen and (min-width: 1200px){
        font-size: 110%;
    }
`;

const TopRichCoinsHolder = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;
    margin-left: 50px;
    width: 70%;
    height: 70px;
    color: white;
    background: ${blue};
    font-size: 20px;
    border-radius: 50vw;
    overflow: hidden;

    @media screen and (min-width: 800px){
        margin-left: -2vw;
        height: 4.4vw;
        width: 60%;
        font-size: 90%;
    }

    @media screen and (min-width: 1200px){
        font-size: 120%;
    }
`;

const Rich: FC<AppUserProps> = ({ userData, isLoged }) => {
    const { data, error, isLoading } = useQuery<DatabaseUser[]>('rich', () =>
        axios.get(
            "/api/users/all",
            { headers: { Authorization: `${process.env.NEXT_PUBLIC_API_AUTH_TYPE} ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}` }}
        ).then(( response: AxiosResponse ) => response.data)
    )

    const players = useRef<HTMLDivElement>(null);
    const loggedPlayer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.from(
            [ ...players.current.children, loggedPlayer.current ],
            {
                delay: 1,
                opacity: 0,
                y: 15,
                duration: 0.5,
                stagger: 0.1
            }
        )
    }, [ isLoading ])

    const getLogedUser = ( ) => {
        if(!data || !userData) return;

        const user = data.find(({ steamID }) => steamID === userData.steamId);
        
        return {
            place: data.indexOf(user) + 1,
            coins: user?.coins
        }
    }

    return(
        <Template userData={userData} isLoged={isLoged}>
            <PageWrapper>
                <Helmet>
                    <title>{process.env.NEXT_PUBLIC_SITE_NAME || "Panel"} | Bogaci</title>
                    <meta 
                        name="description"
                        content="
                            Tutaj zobaczysz najbogatsze osoby
                            na serwerze, oraz swoją pozycję,
                            jeśli jesteś zalogowany!. Przegoń wszystkich,
                            żeby wylądować na samej górze tabeli!
                        "
                    />
                </Helmet>
                <PageContent>
                    <TopRichPlayers ref={players}>
                        {isLoading && !error && <p>Ładowanie topki...</p>}
                        {error && <p>Błąd ładowania topki :(</p>}

                        {!error && data?.slice(0, 10).map(({ coins, name }, index: number) => (
                            <RichPlayer
                                place={index + 1}
                                name={encode(name)}
                                coins={coins}
                                key={index}
                            />
                        ))}
                    </TopRichPlayers>
                    {(userData && data) ? (
                        <RichPlayer
                            place={getLogedUser()?.place}
                            name="TY"
                            coins={getLogedUser()?.coins}
                            isSingleInstance
                        />
                    ) : <p>Aby zobaczyć swoją pozycję<br/>Musisz się zalogować</p>}
                </PageContent>
            </PageWrapper>
        </Template>
    )
};

const RichPlayer: FC<RichPlayerProps> = ({ name, place, coins, isSingleInstance }) => {
    return(
        <TopRich isSingleInstance={isSingleInstance}>
            <TopRichPlace>{place}</TopRichPlace>
            <TopRichNickHolder>
                {name}
            </TopRichNickHolder>
            <TopRichCoinsHolder>
                {coins}
            </TopRichCoinsHolder>
        </TopRich>
    )
}

export const getServerSideProps = serverSideProps;

type RichPlayerProps = {
    name: string,
    place: number,
    coins: number,
    isSingleInstance?: boolean
}

export default Rich;