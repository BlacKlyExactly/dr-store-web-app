import React, { ChangeEvent, FC, useContext } from "react";
import styled from "styled-components";
import useCoins from "../hooks/useCoins"; 
import { GlobalContext } from "../utils/globalContext";
import { blue, main } from "../utils/colors";

const Range = styled.input`
    outline: none;
    appearance: none;
    background: ${main};
    border-radius: 50vw;
    border: .1vw solid ${blue};

    &::-webkit-slider-thumb{
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        background: ${blue};
        border-radius: 50vw;
    }

    &::-webkit-slider-runnable-track{
        -webkit-appearance: none;
    }
`;

const RangeInput: FC<RangeInputProps> = ({ rate, setRate }) => {
    const { userData } = useContext(GlobalContext);

    const { data, isLoading, error } = useCoins(userData);

    const handleRangeChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        event.preventDefault();

        if(!data){
            setRate(0);
            return;
        }

        if(data === 0){
            setRate(0)
            return;
        }

        if(parseInt(event.target.value) > data){
            setRate(data)
            return;
        }
        
        setRate(parseInt(event.target.value));
    }

    if(!data || isLoading || error) return (
        <Range
            onChange={e => handleRangeChange(e)}
            value={rate}
            type="range" 
            min="0" 
            max="0"
        />
    );

    return(
        <Range
            onChange={e => handleRangeChange(e)}
            value={rate}
            type="range" 
            min="0" 
            max={data}
        />
    )
}

type RangeInputProps = {
    rate: number,
    setRate: ( rate: number ) => void
}

export default RangeInput;