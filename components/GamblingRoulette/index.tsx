import React, { FC, createContext, ReactNode, useState } from "react";
import RouletteRangeSlider from "./elements/RouletteRangeSlider";
import RouletteRateCount from "./elements/RouletteRateCount";
import RouletteColorSelect from "./elements/RouletteColorSelect";
import RoulettePlayWindow from "./elements/RoulettePlayWindow";

export enum RouletteColor {
    Red = 1,
    Green,
    Black,
    None
}

export const RouletteContext = createContext<RouletteContextProps>({
    color: RouletteColor.None,
    setRouletteColor: () => {},
    rate: 0,
    setRouletteRate: () => {}
})

type RouletteContextProps = {
    color: RouletteColor,
    setRouletteColor: ( color: RouletteColor ) => void,
    rate: number,
    setRouletteRate: ( rate: number ) => void,
}

const GamblingRoulette: FC<GamblingRouletteProps> = ({ children }) => {
    const [ color, setColor ] = useState<RouletteColor>(RouletteColor.None);
    const [ rate, setRate ] = useState<number>(0);

    const setRouletteColor = ( selectedColor: RouletteColor ) => setColor(selectedColor);
    const setRouletteRate = ( selectedRate: number ) => setRate(selectedRate);

    return(
        <RouletteContext.Provider 
            value={{
                color,
                setRouletteColor,
                rate,
                setRouletteRate
            }}
        >
            {children}
        </RouletteContext.Provider>
    )
}

type GamblingRouletteProps = {
    children: ReactNode
}

export {
    RouletteRangeSlider,
    RouletteRateCount,
    RouletteColorSelect,
    RoulettePlayWindow
}

export default GamblingRoulette;