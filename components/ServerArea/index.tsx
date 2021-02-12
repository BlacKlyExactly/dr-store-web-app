import React, { FC, useRef, useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faInfo, faPlayCircle, faReply } from "@fortawesome/free-solid-svg-icons";
import Area from "../Area";
import { red } from "utils/colors";
import gsap from "gsap";

import { 
    Content,
    ServerActionButton, 
    ServerActionButtons, 
    ServerAdress, 
    ServerName, 
    ServerPlayersBar, 
    ServerPlayersBarState 
} from "./style";

const getPercentage = ( players: number, maxplayers: number ): string => {
    const percentage: number = players / maxplayers * 100;
    return `${percentage.toFixed()}%`;
}

const ServerArea: FC<ServerAreaProps> = ({ host, port, serverShortName }) => {
    const { data, error, isLoading } = useQuery('server', () =>
        axios.get(`/api/server/${host}:${port}`).then((response: AxiosResponse) => response.data)
    );

    const content = useRef<HTMLDivElement>(null);

    useEffect(() => {
        content.current && gsap.from(
            content.current.children,
            {
               delay: 1.2,
               duration: 0.8,
               stagger: 0.2,
               opacity: 0,
               y: 10, 
               ease: "power4.out"
            }
        )
    }, [ isLoading ])

    const router: NextRouter = useRouter();

    const serverActionButtons: ActionButton[] = [
        { path: `https://www.gametracker.com/server_info/${host}:${port}`, icon: faInfo },
        { path: `steam://connect/${host}:${port}`, icon: faReply }
    ];

    return(
        <Area
            width="100%"
            height="60%"
            icon={faPlayCircle}
            iconColor={red}
            center
        >
            {isLoading && <p>Ładowanie danych o serwerze...</p>}
            {error && <p>Błąd ładowania danych o serwerze :(</p>}

            {data && (
                <Content ref={content}>
                    <ServerName>
                        {serverShortName}
                    </ServerName>
                    <ServerPlayersBar percentage={data.raw.numplayers / data.maxplayers * 100}>
                        <ServerPlayersBarState>
                            {data.raw.numplayers}/{data.maxplayers} - {getPercentage(data.raw.numplayers, data.maxplayers)}
                        </ServerPlayersBarState>
                    </ServerPlayersBar>
                    <ServerActionButtons>
                        {serverActionButtons.map(({ path, icon }: ActionButton) => (
                            <ServerActionButton onClick={() => router.push(path)} key={path}>
                                <FontAwesomeIcon icon={icon}/>
                            </ServerActionButton>
                        ))}
                    </ServerActionButtons>
                    <ServerAdress>{host}<span>:{port}</span></ServerAdress>
                </Content>
            )}
        </Area>
    )
}

type ActionButton = {
    path: string,
    icon: FontAwesomeIconProps['icon']
}

type ServerAreaProps = {
    host: number | string,
    port: number | string,
    serverShortName: string
}

export default ServerArea;