import React, { FC, useContext } from "react";
import styled from "styled-components";
import { main, red } from "../../../utils/colors";
import { RouletteContext, RouletteColor } from "..";

const Wrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 2px;
`;

const Text = styled.label`
    cursor: pointer;
    margin-left: 15px;
    font-size: 17px;

    @media screen and (min-width: 800px){
        font-size: 1vw;

        span{
            font-size: 90%;
        }
    }
`;

const Multipler = styled.sup`
    color: ${red};
`;

const RadioButton = styled.input`
    cursor: pointer;
    width: 30px;
    height: 30px;
    border: none;
    background-color: ${main};

    @media screen and (min-width: 800px){
        width: 1.5vw;
        height: 1.5vw;
    }
`;

const getMultipler = ( color: RouletteColor ): number => color === RouletteColor.Green ? 15 : 2;

const RouletteColorSelect: FC<ColorSelectProps> = ({ selectColor, colorText }) => {
    const { setRouletteColor } = useContext(RouletteContext);

    const handleInputChange = () => setRouletteColor(selectColor);

    return(
        <Wrapper>
            <RadioButton
                type="radio"
                name="color"
                onChange={handleInputChange}
                id={colorText}
            />
            <Text htmlFor={colorText}>
                {colorText} <Multipler>x{getMultipler(selectColor)}</Multipler>
            </Text>
        </Wrapper>
    )
}

type ColorSelectProps = {
    selectColor: RouletteColor,
    colorText: string,
}

export default RouletteColorSelect;