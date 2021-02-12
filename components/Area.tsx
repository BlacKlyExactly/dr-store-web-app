import React, { FC, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { darker } from "../utils/colors";
import gsap from "gsap";

type WrapperProps = {
    boxWidth?: string,
    boxHeight?: string,
    borderColor?: string
    center?: boolean
}

const Wrapper = styled.div<WrapperProps>`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: ${({ boxHeight }) => boxHeight};
    background: ${darker};
    width: 90%;
    border-radius: 2vw;
    margin: 10px 0;
    padding: 20px;

    ${({ center }) => center && css`
        align-items: center;
    `}

    ${({ borderColor }) => borderColor && css`
        border: .1vw solid ${borderColor};
    `}

    @media screen and (min-width: 800px){
        width: ${({ boxWidth }) => boxWidth};
        padding: 2.5vw;
        margin: 0.7vw 0.7vw;
    }
`;

type IconProps = {
    iconColor: string
}

const Icon = styled.span<IconProps>`
    position: absolute;
    color: ${({ iconColor }) => iconColor};
    font-size: 55px;
    top: -4%;
    left: -4%;

    @media screen and (min-width: 800px){
        font-size: 4vw;
        top: -5%;
        left: -5%;
    }
`;

const Area: FC<AreaProps> = ({ width, height, icon, iconColor, center, borderColor, children }) => {
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.from(
            wrapper.current,
            {
                delay: 1.2,
                duration: 0.55,
                opacity: 0,
            }
        )
        .from(
            wrapper.current.children,
            {
                duration: 0.8,
                stagger: 0.2,
                ease: "power4.out",
                opacity: 0,
            }
        )
    }, [ ])

    return (
        <Wrapper 
            boxWidth={width}
            boxHeight={height}
            center={center}
            borderColor={borderColor}
            ref={wrapper}
        >   
            <Icon iconColor={iconColor}>
                {icon && <FontAwesomeIcon icon={icon}/>}
            </Icon>
            {children}
        </Wrapper>
    )
}

type AreaProps = {
    width: string,
    height: string,
    icon?: FontAwesomeIconProps['icon'],
    iconColor?: string
    center?: boolean,
    borderColor?: string
}

export default Area;
