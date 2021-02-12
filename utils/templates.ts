import styled, { css } from "styled-components";
import { blue, darkest, main, red } from "./colors";

type PageWrapperProps = {
    center?: boolean
}

export const PageWrapper = styled.div<PageWrapperProps>`
    position: relative;
    height: 100%;
    width: 100vw;
    margin-top: 109px;
    left: 0;

    @media screen and (min-width: 800px){
        position: relative;
        width: 64%;
        height: 85%;
        margin-top: 7.5%;
        left: 7.5vw;
    }

    ${({ center }) => center && css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `}
`;

export const Window = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 500;

    &::before{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: ${darkest};
        opacity: 0.68;
    }
`;

export const MainPanel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 800px;
    border: .15vw solid ${blue};
    background: ${main};
    z-index: 100;

    @media screen and (min-width: 800px){
        width: 82%;
        height: 80%;
    }
`;

type ButtonProps = {
    background: string
    locked?: boolean
}

export const Button = styled.button<ButtonProps>`
    display: none;
    cursor: pointer;
    width: 130px;
    height: 50px;
    border: none;
    border-radius: 50vw;
    background: ${({ background }) => background};
    color: white;
    font-size: 13px;
    margin-right: 20px;
    margin-top: 40px;
    transition:
        color 0.15s,
        background 0.15s; 

    ${({ locked, background }) => !locked && css`
        display: inherit;
        justify-content: center;
        align-items: center;

        &:hover{
            color: ${background};
            background: ${main};
            border: .1vw solid ${background};
        }
    `}
`;

export const Logo = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 109px;
    height: 109px;
    z-index: 20;
    cursor: pointer;

    &:after {
        content: "";
        position: absolute;
        background: url("/images/logo.png");
        background-size: cover;
        width: 85%;
        height: 85%;
        top: 10%;
        left: 10%;
    }

    @media screen and (min-width: 800px){
        background: ${darkest};
        width: 7.5vw;
        height: 7.5vw;

        &:after {
            width: 6vw;
            height: 6vw;
            top: 10%;
            left: 10%;
        }
    }
`;

export const VerticalSelect = styled.li`
    height: 60px;
    width: 60px;
    background: ${main};
    color: ${blue};
    border-radius: 50vw;
    border: none;
    margin: 0 10px;
    font-size: 20px;
    border: 2px solid ${blue};
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 800px){
        cursor: pointer;
        border: none;
        background: ${darkest};
        width: 3vw;
        height: 3vw;
        margin: 0.5vw 0;
        font-size: 1.9vw;
        color: ${blue};
        transition:
            .1s color ease-in-out,
            .1s background ease-in-out;
    }

    @media screen and (min-width: 1200px){
        width: 4vw;
        height: 4vw;
    }
    
    svg{
        transition: .1s transform ease-in-out;
    }

    &:hover{
        background: ${red};
        color: white;

        svg{
            transform: scale(0.8);
        }                                               
    }
`;

export const TextInput = styled.input`
    color: ${blue};
    border: none;
    border-bottom: .2vw solid ${blue};
    background: transparent;
    width: 100%;
    height: 50px;
    font-size: 20px;

    @media screen and (min-width: 800px){
        width: 100%;
        height: 4vw;
        font-size: 100%;
    }
`;

export const TextLabel = styled.label`
    color: ${red};
    @media screen and (min-width: 800px){
        font-size: 110%;
    }
`