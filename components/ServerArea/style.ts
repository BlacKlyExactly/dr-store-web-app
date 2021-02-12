import { red, main, blue } from "../../utils/colors";
import styled from "styled-components";

export const ServerName = styled.span`
    color: white;
    font-size: 20px;
    text-align: center;

    @media screen and (min-width: 800px){
        font-size: 115%;
    }

    @media screen and (min-width: 1300px){
        font-size: 135%;
    }
`;

type ServerPlayersBarProps = {
    percentage: number
}

export const ServerPlayersBar = styled.div<ServerPlayersBarProps>`
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    border-radius: 50vw;
    background: ${main};
    width: 240px;
    height: 45px;
    margin-top: 30px;
    overflow: hidden;

    &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: ${red};
        width: ${({ percentage }) => `${percentage}%`};
        z-index: 1;
    }

    @media screen and (min-width: 800px){
        height: 3.2vw;
        width: 17vw;
    }

    @media screen and (min-width: 1300px){
        height: 2.5vw;
        width: 15vw;
    }
`;

export const ServerPlayersBarState = styled.span`
    position: relative;
    color: white;
    font-size: 15px;
    z-index: 2;

    @media screen and (min-width: 800px){
        font-size: 80%;
    }

    @media screen and (min-width: 1300px){
        font-size: 105%;
    }
`;

export const ServerActionButtons = styled.div`
    position: relative;
    display: flex;
    margin-top: 40px;

    @media screen and (min-width: 800px){
        margin-top: 2vw;
    }
`;

export const ServerActionButton = styled.button`
    display: flex;
    align-items: center;
    color: white;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 15px;
    background: ${red};
    border-radius: 50vw;
    border: none;
    margin: 0 5px;
    cursor: pointer;
    transition:
        .2s color,
        .2s background;
    
    &:hover{
        background: ${main};
        color: ${blue};
    }

    @media screen and (min-width: 800px){
        width: 2.2vw;
        height: 2.2vw;
        font-size: 0.9vw;
    }
`;

export const ServerAdress = styled.span`
    font-size: 20px;
    color: ${red};
    margin-top: 30px;

    @media screen and (min-width: 800px){
        font-size: 110%;
        margin-top: 2.2vw;
    }

    @media screen and (min-width: 1300px){
        font-size: 135%;
        margin-top: 2.2vw;
    }

    span{
        color: ${blue};
    }
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;