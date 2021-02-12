import styled, { css } from "styled-components";

import { blue, darker, red } from "../../utils/colors";

export const Wrapper = styled.nav`
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    background: ${darker};
    z-index: 10;
    width: 100vw;
    height: 109px;

    @media screen and (min-width: 800px){
        position: absolute;
        width: 100vw;
        height: 7.5vw;
    }
`;

export const Selects = styled.ul`
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    align-items: center;
    justify-content: center;
    list-style: none;

    @media screen and (min-width: 800px){
        display: flex;
    }
`;

type SelectProps = {
    isSameSite?: boolean;
}

export const Select = styled.li<SelectProps>`
    position: relative;
    font-size: 60%;
    color: ${blue};
    margin: 0 1.5vw;
    cursor: pointer;
    transition: .15s color;

    &:hover{
        color: ${red};
    }

    ${({ isSameSite }) => isSameSite && css`
        color: ${red};
        pointer-events: none;
        cursor: default;

        &::after{
            content: "";
            position: absolute;
            top: 120%;
            left: 0;
            width: 100%;
            height: 0.2vw;
            background: ${red};
        }
    `}

    @media screen and (min-width: 800px){
        font-size: min(2vw, 20px);
    }
`;

export const UserInfo = styled.div`
    position: absolute;
    right: 0%;
    margin-right: 5%;

    @media screen and (min-width: 1300px){
        margin-right: 5%;
    }
`;