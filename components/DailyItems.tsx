import React, { FC, useContext, useEffect, useRef } from "react";
import daily, { DailyDay } from "daily";
import styled from "styled-components";
import DailyItem from "./DailyItem";
import useDaily from "hooks/useDaily";
import { GlobalContext } from "utils/globalContext";
import useEquipment from "hooks/useEquipment";
import useCoins from "hooks/useCoins";
import gsap from "gsap";

const DailyItemsWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    min-height: 100%;
    margin-top: 30px;

    @media screen and (min-width: 800px){
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        justify-items: center;
        align-items: center;
        width: 90%;
        height: 100%;
        margin-top: 0;
    }
`;

const DailyItems: FC = () => {
    const { userData } = useContext(GlobalContext);
    const dailyItems = useDaily(userData);
    const eq = useEquipment(userData);
    const coins = useCoins(userData);

    const wrapper = useRef<HTMLDivElement>();

    useEffect(() => {
        dailyItems.data && gsap.from(
            wrapper.current.children,
            {
                y: 10,
                stagger: 0.1,
                delay: 1.2,
                opacity: 0,
                ease: "power4.out"
            }
        )
    }, [ dailyItems.data ])
    
    return(
        <DailyItemsWrapper ref={wrapper}>
            {dailyItems.data && 
                daily.days.map(( day: DailyDay, index: number ) => (
                    <DailyItem
                        day={day} 
                        dailyItem={dailyItems}
                        steamId={userData.steamId}
                        eq={eq}
                        coins={coins}
                        key={index}
                        index={index + 1}
                    />
                ))
            }
        </DailyItemsWrapper>
    )
}

export default DailyItems;