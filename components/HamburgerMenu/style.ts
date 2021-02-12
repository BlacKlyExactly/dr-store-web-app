import styled, { css } from "styled-components";
import { blue, darker, darkest, main, red } from "../../utils/colors";

export const MenuToggler = styled.button`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 70px;
    height: 70px;
    bottom: 4%;
    right: 8%;
    background: ${blue};
    z-index: 49;
    border: none;
    border-radius: 50vw;
    opacity: 0.5;

    @media screen and (min-width: 800px){
        display: none;
    }
`;

export const MenuTogglerLine = styled.span`
    width: 31px;
    height: 3px;
    margin: 2.9px 0;
    background: ${darkest};
`;

export const MenuBox = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    z-index: 50;
    background: ${darker};
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    flex-direction: column;

    @media screen and (min-width: 800px){
        display: none;
    }
`;

export const MenuBoxSelects = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
`;

type MenuBoxSelectProps = {
    isSameSite: boolean
}

export const MenuBoxSelect = styled.li<MenuBoxSelectProps>`
    cursor: pointer;
    font-size: 20px;
    margin: 10px 0;
    color: ${blue};

    ${({ isSameSite }) => isSameSite && css`
        color: ${red};
        pointer-events: none;
        cursor: default;
    `}
`;

export const MenuBoxButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
`;

export const MenuBoxButton = styled.button`
    height: 60px;
    width: 60px;
    background: ${main};
    color: ${blue};
    border-radius: 50vw;
    border: none;
    margin: 0 10px;
    font-size: 20px;
    border: 2px solid ${blue};
`;