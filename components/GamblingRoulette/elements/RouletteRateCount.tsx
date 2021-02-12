import React, { FC, useContext } from "react";
import RangeValue from "../../RangeValue";
import { RouletteContext } from "..";

const RouletteRateCount: FC<RateCountProps> = ({ text }) => {
    const { rate } = useContext(RouletteContext);

    return(
        <RangeValue 
            rate={rate} 
            text={text}
        />
    )
}

type RateCountProps = {
    text: string
}

export default RouletteRateCount;