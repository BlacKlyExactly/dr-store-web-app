import styled from "styled-components";
import { darker } from "../../utils/colors";

export const Wrapper = styled.nav`
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 7.5vw;
    background: ${darker};
    z-index: 11;

    @media screen and (min-width: 800px){
        display: inherit;
    }
`;

export const Selects = styled.ul`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    list-style: none;
`;