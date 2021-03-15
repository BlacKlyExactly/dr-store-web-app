import React, { FC, useEffect, useRef, useReducer, Reducer } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import { horizontalSelects, HorizontalNavSelect } from "../HorizontalNav";
import useRouterPush from "hooks/useRouterPush";
import { VerticalSelect } from "utils/templates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VerticalNavItems } from "components/VerticalNav";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import {
    MenuToggler,
    MenuTogglerLine,
    MenuBox,
    MenuBoxSelects,
    MenuBoxSelect,
    MenuBoxButtons,
} from "./style";

type TimelinesReducer = {
    togglerTl: GSAPTimeline,
    menuTl: GSAPTimeline,
}

const HamburgerMenu: FC = () => {    
    const router = useRouter();
    const { push } = useRouterPush();

    const [ timelines ] = 
        useReducer<Reducer<TimelinesReducer, TimelinesReducer>>(
            ( state, newState ) => ({...state, ...newState}), {
                togglerTl: gsap.timeline({ paused: true, ease: "expo.inOut" }),
                menuTl: gsap.timeline({ paused: true, ease: "expo.inOut" })
            }
        )

    const { togglerTl, menuTl } = timelines;

    const toggler = useRef<HTMLButtonElement>(null);
    const box = useRef<HTMLDivElement>(null);
    const selects = useRef<HTMLUListElement>(null);
    const buttons1 = useRef<HTMLDivElement>(null);
    const buttons2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const [ line1, line2, line3 ] = toggler.current?.children;

        toggler.current && togglerTl.to(toggler.current.children, { duration: 0.32, stagger: 0.1, opacity: 0, y: -20 })
            .to(line1, { rotation: -45, y: 9, duration: 0.1 })
            .to(line3, { rotation: 45, y: -9, duration: 0.1 })
            .to(line2, { opacity: 0, duration: 0.15 })
            .to([ line1, line3 ], { duration: 0.15, opacity: 1 })
            .reverse();
        
            selects.current && buttons1.current && menuTl.from(box.current, { x: "100%", duration: 0.2 })       
            .from(selects.current.children, { y: 10, opacity: 0, duration: 0.3, stagger: 0.1 })           
            .from([...buttons1.current.children, ...buttons2.current.children], { x: 10, opacity: 0, duration: 0.3, stagger: 0.1 })           
            .reverse();
    }, [ timelines ])

    const handleTogglerClick = () => {
        togglerTl.reversed(!togglerTl.reversed());
        setTimeout(() => menuTl.reversed(!menuTl.reversed()), 200);
    }

    return(
        <>
            <MenuToggler 
                ref={toggler}
                onClick={handleTogglerClick}
            >
                <MenuTogglerLine/>
                <MenuTogglerLine/>
                <MenuTogglerLine/>
            </MenuToggler>
            <MenuBox ref={box}>
                <MenuBoxSelects ref={selects}>
                    {horizontalSelects.map(({ path, displayName }: HorizontalNavSelect) => (
                        <MenuBoxSelect 
                            key={path}
                            isSameSite={router.pathname === path}
                            onClick={() => push(path)}
                        >
                            {displayName}
                        </MenuBoxSelect>
                    ))}
                </MenuBoxSelects>
                <MenuBoxButtons ref={buttons1}>
                    <VerticalNavItems/>
                </MenuBoxButtons>
                <MenuBoxButtons ref={buttons2}>
                    <VerticalSelect onClick={handleTogglerClick}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </VerticalSelect>
                </MenuBoxButtons>
            </MenuBox>
        </>
    )
}

export default HamburgerMenu;