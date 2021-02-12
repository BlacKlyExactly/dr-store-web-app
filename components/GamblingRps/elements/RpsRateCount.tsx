import React, { FC, useContext } from "react";
import RangeValue from "../../RangeValue";
import { RpsContext } from "..";

const RpsRateCount: FC<RateCountProps> = ({ text }) => {
    const { rate } = useContext(RpsContext);

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

export default RpsRateCount;