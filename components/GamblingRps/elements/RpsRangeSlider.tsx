import React, { FC, useContext } from "react";
import { RpsContext } from "../";
import RangeInput from "../../RangeInput";

const RpsRangeSider: FC = () => {
    const { setRpsRate, rate } = useContext(RpsContext);
   
    return(
        <RangeInput
           setRate={setRpsRate}
           rate={rate}
        />
    )
}

export default RpsRangeSider;