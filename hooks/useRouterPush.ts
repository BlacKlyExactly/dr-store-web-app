import { useEffect } from "react";
import { NextRouter, useRouter } from 'next/router';
import gsap from "gsap";
import styled from "styled-elements";
import { darker } from "utils/colors";

const PageChangePanel = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background: ${darker};
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    transform: translateX(-100%);
`;

const useRouterPush = () => {
    const router: NextRouter = useRouter();
    const id = "pageChangePanel";

    router.events?.on('routeChangeComplete', () => {
        gsap.set(`#${id}`, { x: "0%" });
        gsap.to(`#${id}`, { x: "100%", duration: 1, delay: 0.5, ease: "power4.inOut" });
    })

    useEffect(() => {
        const element: HTMLDivElement = document.querySelector(`#${id}`);
        if(!element) document.body.append(PageChangePanel({ id }));
    }, [ ])

    const push = ( url: string ) => {
        if(router.pathname === url) return;

        gsap.set(`#${id}`, { x: "-100%" });
        gsap.to(`#${id}`, { x: "0%", duration: 1, ease: "power4.inOut" }).then(() => {
            router.push(url, undefined, { shallow: true });
        })
    }

    return { push }
}

export default useRouterPush;