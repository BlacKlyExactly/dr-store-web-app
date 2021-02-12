import React, { FC, createContext, useState, ReactNode } from "react";
import RpsRangeSlider from "./elements/RpsRangeSlider";
import RpsRateCount from "./elements/RpsRateCount";
import RpsPlayWindow from "./elements/RpsPlayWindow";

export const RpsContext = createContext<RpsContextProps>({
    rate: 0,
    setRpsRate: () => {},
})

type RpsContextProps = {
    rate: number,
    setRpsRate: ( rate: number ) => void,
}

const GamblingRps: FC<GamblingRpsProps> = ({ children }) => {
    const [ rate, setRate ] = useState<number>(0);

    const setRpsRate = ( selectedRate: number ) => setRate(selectedRate);

    return(
        <RpsContext.Provider value={{
            rate,
            setRpsRate,
        }}>
            {children}
        </RpsContext.Provider>
    )
}

type GamblingRpsProps = {
    children: ReactNode
}

export default GamblingRps;

export {
    RpsRateCount,
    RpsRangeSlider,
    RpsPlayWindow
}