import React, { FC, useContext } from "react";
import { RouletteContext } from "..";
import RangeInput from "../../RangeInput";

const RouletteRangeSider: FC = () => {
    const { setRouletteRate, rate } = useContext(RouletteContext);
   
    return(
        <RangeInput
           setRate={setRouletteRate}
           rate={rate}
        />
    )
}

export default RouletteRangeSider;