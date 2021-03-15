import React, { FC, useEffect, useRef } from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import { faBell, faBox, faGift, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Logo, VerticalSelect } from "utils/templates";
import Gifts from "../Gifts/";
import gsap from "gsap";
import useNotificaions from "hooks/useNotifications";
import useRouterPush from "hooks/useRouterPush";

import { 
    Wrapper,
    Selects
} from "./style";

const VerticalNav: FC = () => {
    const selects = useRef<HTMLUListElement>(null);

    useEffect(() => {
        gsap.from(
            selects.current.children, 
            {
                y: 10,
                opacity: 0,
                delay: 1.2,
                stagger: 0.15,
                duration: 0.5,
                ease: "power4.out"
            }
        )
    }, [ ])

    return(
        <Wrapper>
            <Link href="https://csowicze.pl/">
                <Logo/>
            </Link>
            <Selects ref={selects}>
                <VerticalNavItems />
            </Selects>
        </Wrapper>
    )
}

export const VerticalNavItems: FC = () => {
    const { requestPermission } = useNotificaions();
    const { push } = useRouterPush();

    return(
        <>
            <Gifts icon={faGift}/>
            <VerticalSelect onClick={() => requestPermission(true)}>
                <FontAwesomeIcon icon={faBell}/>
            </VerticalSelect>
            <VerticalSelect onClick={() => push("/shop")}>
                <FontAwesomeIcon icon={faShoppingBag}/>
            </VerticalSelect>
            <VerticalSelect onClick={() => push("/equipment")}>
                <FontAwesomeIcon icon={faBox}/>
            </VerticalSelect>
        </>
    )
}

export type VerticalNavSelect = {
    icon: FontAwesomeIconProps['icon'],
    action: Function,
}

export type VerticalComponentProps = {
    icon: FontAwesomeIconProps['icon'],
}

export default VerticalNav;