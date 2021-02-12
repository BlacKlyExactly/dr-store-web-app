import styled, { css } from "styled-components";
import { blue, darker, orange, red } from "utils/colors";

type WrapperProps = {
    isSpecial?: boolean,
    isLegendary?: boolean,
    isActive: boolean,
    isEnded: boolean
    isRedemed: boolean
    index: number
}

export const Wrapper = styled.div<WrapperProps>`
    cursor: not-allowed;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100px;
    height: 100px;
    margin: 10px;
    background: ${darker};
    border-radius: 16px;

    &::before{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        content: "${({ index }) => index}";
        width: 30px;
        height: 30px;
        border-radius: 25vw;
        background: ${red};
        color: white;
        text-align: center;
        top: -4%;
        left: -4%;
        z-index: 2;
    }

    ${({ isSpecial, isLegendary }) => ( isSpecial || isLegendary ) && css`
        border: .15vw solid ${isSpecial ? blue : orange};
    `}

    ${({ isActive, isRedemed }) => isActive && css`
        cursor: pointer;

        &::after{
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: .15vw solid ${isRedemed ? "green" : "white"};
            z-index: 1;
            border-radius: 16px;
        }
    `}

    ${({ isEnded }) => isEnded && css`
        opacity: 0.5;
    `};

    @media screen and (min-width: 800px){
        width: 7vw;
        height: 7vw;
        border-radius: 1vw;
        margin: 0;

        &::after{
            border-radius: 1vw;
        }

        &::before{
            width: 2vw;
            height: 2vw;
            top: -5%;
            left: -5%;
        }
    }
`;

export const ItemImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 14px;

    @media screen and (min-width: 800px){
        border-radius: 0.8vw;
    }
`;

export const ItemCoins = styled.span`
    text-transform: uppercase;
    color: white;
    font-size: 15px;

    @media screen and (min-width: 800px){
        font-size: 1vw;
    }
`;

export const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    color: white;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    font-size: 4 0px;

    @media screen and (min-width: 800px){
        font-size: 3vw;
    }
`;