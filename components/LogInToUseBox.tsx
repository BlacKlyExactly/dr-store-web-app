import React, { FC, useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../utils/globalContext";
import { darkest } from "../utils/colors";
import { AuthButton } from "../components/UserBar";
import useCoins from "../hooks/useCoins";

const LogInToUsePanel = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(28, 34, 55, 0.5);  
    z-index: 9;

    @media screen and (min-width: 800px){
        justify-content: center;
    }
`;

const LogInToUseText = styled.h1`
    font-size: 20px;
    margin-top: 200px;
    margin-bottom: 20px;
    text-shadow: 0 0 10px ${darkest};

    @media screen and (min-width: 800px){
        font-size: 125%;
        margin-top: 0;
        margin-bottom: 2vw;
    }

    @media screen and (min-width: 1300px){
        font-size: 200%;
    }
`;

const LogInToUseBox: FC = () => {
    const { userData } = useContext(GlobalContext);
    const { data } = useCoins(userData);
    
    if(data !== undefined) return null;

    return(
        <LogInToUsePanel>
            <LogInToUseText>Zaloguj się, aby skorzystać z tej części aplikacji!</LogInToUseText>
            <AuthButton/>
        </LogInToUsePanel>
    )
}


export default LogInToUseBox;

