import React, { FC, useEffect, useRef } from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import { faBell, faGift } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Logo, VerticalSelect } from "utils/templates";
import Gifts from "../Gifts/";
import gsap from "gsap";
import useNotificaions from "hooks/useNotifications";

import { 
    Wrapper,
    Selects
} from "./style";

const VerticalNav: FC = () => {
    const { requestPermission } = useNotificaions();
    
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
                <Gifts icon={faGift}/>
                <VerticalSelect onClick={() => requestPermission(true)}>
                    <FontAwesomeIcon icon={faBell}/>
                </VerticalSelect>
            </Selects>
        </Wrapper>
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