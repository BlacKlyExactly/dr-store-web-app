import React, { FC } from "react";
import styled from "styled-components";
import { red } from "../utils/colors";

const Text = styled.p`
    font-size: 25px;
    margin-bottom: 30px;

    span{
        color: ${red};
    }

    @media screen and (min-width: 800px){
        font-size: 1.5vw;
        margin-bottom: 2vw;
    }
`;

const RangeValue: FC<RangeValueProps> = ({ text, rate }) => <Text>{text}: <span>{rate}</span></Text>

type RangeValueProps = {
    text: string,
    rate: number
}

export default RangeValue;