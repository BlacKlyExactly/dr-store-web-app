import React, { FC, useEffect, useRef } from "react";
import { NextRouter, useRouter } from 'next/router';
import gsap from "gsap";
import Link from 'next/link'
import useRouterPush from "../../hooks/useRouterPush";

import { 
    Wrapper,
    Select,
    Selects,
    UserInfo
} from "./style";

import UserBar from "../UserBar";
import { Logo } from "utils/templates";

export type HorizontalNavSelect = {
    displayName: string;
    path: string
}

export const horizontalSelects: HorizontalNavSelect[] = [
    { displayName: "Strona Główna", path: "/" },
    { displayName: "Bogaci", path: "/rich" },
    { displayName: "Gambling", path: "/gambling" },
    { displayName: "Daily", path: "/daily" },
];

const HorizontalNav: FC = () => {
    const router: NextRouter = useRouter();
    const { push } = useRouterPush();

    const selects = useRef<HTMLUListElement>(null);

    useEffect(() => {
        gsap.from(
            selects.current.children,
            {
                x: -10,
                opacity: 0,
                delay: 1.2,
                stagger: 0.2,
                duration: 0.8,
                ease: "power4.out"
            }
        )
    }, [])

    return(
        <Wrapper>
            <Link href="https://csowicze.pl/">
                <Logo/>
            </Link>
            <Selects ref={selects}>
                {horizontalSelects.map(({ displayName, path }: HorizontalNavSelect, index: number ) =>(
                    <Select 
                        isSameSite={router.pathname === path}
                        key={index}
                        onClick={() => push(path)}
                    >
                        {displayName}
                    </Select>
                ))}
            </Selects>
            <UserInfo>
                <UserBar />
            </UserInfo>
        </Wrapper>
    )
}

export default HorizontalNav;