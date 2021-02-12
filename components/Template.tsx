import React, { FC, useEffect } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { AppUserProps } from "pages/_app";
import styled from "styled-components";
import { blue } from "utils/colors";
import { GlobalContext } from "utils/globalContext";
import Area from "./Area";
import HamburgerMenu from "./HamburgerMenu";
import HorizontalNav from "./HorizontalNav";
import ServerArea from "./ServerArea/";
import VerticalNav from "./VerticalNav";
import socket from "utils/socket";
import useNotificaions from "hooks/useNotifications";

const InfoAreas = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: 110%;
    width: 100%;
    height: 100vh;
    margin-top: 80px;

    @media screen and (min-width: 800px){
      position: absolute;
      width: 25%;
      height: 84%;
      right: 2%;
      top: inherit;
      bottom: 0;
      margin-top: 0;
    }
`;

const AreaTitle = styled.span`
    font-size: 30px;

    @media screen and (min-width: 800px){
      font-size: 150%;
    }

    @media screen and (min-width: 1300px){
      font-size: 215%;
    }
`;

const AreaPersons = styled.ul`
    font-size: 17px;
    margin-top: 10px;

    @media screen and (min-width: 800px){
      font-size: 100%;
    }

    @media screen and (min-width: 1300px){
      font-size: 120%;
    }
`;

const Template: FC<AppUserProps> = ({ userData, isLoged, children }) => {
  const { createNotification } = useNotificaions();

    useEffect(() => {
      socket.on("giftRecive", ({ steamId, name, itemName }) => {
        steamId === userData.steamId &&
          createNotification("Otrzymałeś prezent!", `Otrzymałeś: ${itemName}, Od: ${name}`);
      });
    }, [ ]);

  return(
    <GlobalContext.Provider value={{
        userData,
        isLoged
    }}>
        {children}
        <VerticalNav/>
        <HorizontalNav/>
        <HamburgerMenu/>
        <InfoAreas>
          <ServerArea 
              host={process.env.NEXT_PUBLIC_SERVER_HOST || ""}
              port={process.env.NEXT_PUBLIC_SERVER_PORT || ""}
              serverShortName={process.env.NEXT_PUBLIC_SERVER_SHORT_NAME || ""}
          />
          <Area
              width="100%"
              height="32%"
              icon={faInfoCircle}
              iconColor={blue}
              center
          >
              <AreaTitle>Właściciele</AreaTitle>
              <AreaPersons>
                  <li>Ezik</li>
                  <li>Punisher</li>
                  <li>Black</li>
              </AreaPersons>
          </Area>
        </InfoAreas>
    </GlobalContext.Provider>
  )
}


export default Template;