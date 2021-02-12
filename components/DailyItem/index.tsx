import React, { FC } from "react";
import dailyConfig, { DailyDay } from "daily";
import { useQuery } from "react-query";
import axios from "axios";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faCheck, faLock, faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { CoinsHook } from "hooks/useCoins";
import { DailyHook } from "hooks/useDaily";
import { EqHook } from "hooks/useEquipment";

import {
    ItemImg,
    Wrapper,
    ItemCoins,
    Icon
} from "./style";

const DailyItem: FC<DailyItemProps> = ({ day, index, dailyItem, coins, eq, steamId }) => {
    const time = useQuery<string>("date", () => 
        axios.get(
            `/api/date`,
        ).then(( response ) => response.data),
    );

    const itemDay: number = dailyConfig.days.indexOf(day) + 1;
    const startDate = new Date(dailyConfig.starts);
    
    const isRedemed: boolean = dailyItem.data[index - 1] === "1";

    const isActiveDay = (): boolean => {
        if(!time.data || time.error) return false;
        const date = new Date(time.data);

        if(itemDay === date.getDate() - startDate.getDate() && date.getTime() > startDate.getTime()){
            return true;
        }
    }

    const isEnded = (): boolean => {
        if(!time.data || time.error) return false;
        const date = new Date(time.data);

        if(itemDay < date.getDate() - startDate.getDate()) return true;
    }

    const redem = () => {
        if(isEnded() || !isActiveDay()) return;

        if(isRedemed){
            Swal.fire({
                title: "Odebrałeś już ten przedmiot!",
                icon: "error"
            })

            return;
        } 

        dailyItem.mutate({
           day: itemDay - 1,
           value: 1 
        })

        const itemName: string = day.coins ? `${day.coins} fajek` : day.item.name;
        Swal.fire({
            title: `Gratulacje! Odebrałeś: ${itemName}`,
            icon: "success"
        })

        day.coins && coins.mutate({ coins: coins.data + day.coins });
        day.item && eq.addItem.mutate({ item: day.item.id, steamId });
    }

    const getStateIcon = (): FontAwesomeIconProps['icon'] => {
        if(isRedemed) return faCheck;
        else if(isEnded()) return faTimes;
        else return faLock;
    }

    if(time.isLoading || time.error) return null;

    return(
        <Wrapper 
            isLegendary={day.isLegendaryDay} 
            isSpecial={day.isSpecialDay}
            isActive={isActiveDay()}
            isEnded={isEnded()}
            isRedemed={isRedemed}
            index={index}
            onClick={redem}
        >   
            {(!isActiveDay() || isRedemed) && (
                <Icon>
                    <FontAwesomeIcon icon={getStateIcon()}/>
                </Icon>
            )}
            {day.coins ? (
                <ItemCoins>{day.coins} fajek</ItemCoins>
            ) : (
                <ItemImg src={day.item.image}/>
            )}
        </Wrapper>
    );
}

type DailyItemProps = {
    day: DailyDay,
    index: number,
    dailyItem: DailyHook,
    coins: CoinsHook,
    eq: EqHook,
    steamId: string
}

export default DailyItem;