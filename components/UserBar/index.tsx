import React, { FC, useContext, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../../utils/globalContext";
import useCoins from "../../hooks/useCoins";
import gsap from "gsap";

import {
    LoginButton,
    Avatar,
    Wrapper,
    Info,
    Name,
    Coins,
    LogOut
} from "./style";

const UserBar: FC = () => {
    const { userData, isLoged } = useContext(GlobalContext);
    const { data, error, isLoading } = useCoins(userData);
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        wrapper.current && gsap.from(
            wrapper.current.children,
            {
                y: 10,
                duration: 1.0,
                delay: 1.2,
                stagger: 0.2,
                opacity: 0,
                ease: "power4.out",
            }
        )
    }, [ isLoading ])
    
    if(!isLoged || error || isLoading) return <AuthButton />

    return(
        <Wrapper ref={wrapper}>
            <Avatar url={userData?.avatar}/>
            <Info>
                <Name>{userData?.name}</Name>
                <Coins>{data} <span>fajek</span></Coins>
            </Info>
            <LogOut onClick={() => window.location.replace("/api/logout")}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </LogOut>
        </Wrapper>
    )
}

export const AuthButton = () => <LoginButton onClick={() => window.location.replace("/api/authenticate")}/>

export default UserBar;