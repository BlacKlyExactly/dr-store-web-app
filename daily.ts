import { StoreItem, getItemById } from "items";

export type DailyDay = {
    item?: StoreItem,
    coins?: number
    isSpecialDay?: boolean,
    isLegendaryDay?: boolean
}

export type DailyConfig = {
    starts: string,
    ends: string,
    days: DailyDay[]
}

const daily: DailyConfig = {
    //Format Daty: mm/dd/yy
    starts: "02/08/2021",
    ends: "03/08/2021",

    days: [
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { 
            item: getItemById("ct4"), 
            isSpecialDay: true 
        },

        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { 
            item: getItemById("ct4"), 
            isSpecialDay: true 
        },

        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { 
            item: getItemById("ct4"), 
            isSpecialDay: true 
        },
        
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { coins: 30 },
        { 
            item: getItemById("ct4"), 
            isSpecialDay: true 
        },

        { coins: 30 },
        { coins: 30 },
        { 
            item: getItemById("t12"), 
            isLegendaryDay: true 
        },
    ]
}

export default daily;