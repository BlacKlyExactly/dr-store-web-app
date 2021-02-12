import React, { useEffect, useRef, FC } from 'react';
import styled, { keyframes } from "styled-components";
import { blue, darkest, main } from "../utils/colors";
import gsap from "gsap";

const Wrapper = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 200;
    overflow: hidden;
    background: ${main};
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    border: 1vw solid ${darkest};
    border-top: 1vw solid ${blue};
    border-radius: 50%;
    z-index: 160;
    animation: ${spin} 0.6s linear infinite;

    @media screen and (min-width: 800px){
        width: 5vw;
        height: 5vw;
    }
`;

const Loader: FC = () => {
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const load = () => {
            const tl = gsap.timeline({ delay: 0.5 });
            const loader: ChildNode | null= wrapper.current && wrapper.current.childNodes[0];
            const blur: HTMLDivElement | null = wrapper.current;
            
            ( loader && blur ) && tl.to(loader, { duration: 0.1, y: +10, opacity: 0, "display": "none" })
              .to(blur, { duration: 0.1, y: +10, opacity: 0, "z-index": -1, "display": "none" })
              .then(() => document.body.style.overflow = 'visible');
        }

        document.readyState === "complete" ? load() : window.addEventListener('load', load);

        return () =>  {
            load();
            window.removeEventListener('load', load);
        }

    }, [])

    return(
        <Wrapper ref={wrapper}>
            <Spinner />
        </Wrapper>
    )
}

export default Loader;