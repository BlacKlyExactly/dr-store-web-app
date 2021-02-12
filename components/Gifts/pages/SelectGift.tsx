import React, { ChangeEvent, FC, useContext, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { GiftPage, GiftsContext, Input, Inputs } from "..";
import items, { StoreItem } from "../../../items";
import { TextInput, TextLabel } from "utils/templates";
import { blue, darker, red } from "utils/colors";

const ItemsContainer = styled.div`
    overflow-x: scroll;
    display: flex;
    width: 100%;
    margin: 20px 0;

    @media screen and ( min-width: 800px ){
        overflow-y: scroll;
        overflow-x: hidden;
        height: 50%;
        width: 70%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
        align-items: center;
        margin: 3%;
    }
`;

type ItemProps = {
    isSelected: boolean
}

const Item = styled.div<ItemProps>`
    cursor: pointer;
    display: grid;
    grid-template-rows: 1fr 0.2fr 0.1fr;
    grid-template-columns: 1fr;
    justify-items: center;
    margin: 5%;
    width: 200px;
    padding: 5%;
    text-align: center;
    transition: 0.2s background;

    &:hover{
        background: ${darker};
    }

    ${({ isSelected }) => isSelected && css`
        background: ${darker};
        border: .12vw solid ${blue};
    `}
`;

const ItemImage = styled.img`
    width: 150px;
    height: 150px;
`;

const ItemName = styled.span`
    color: ${blue};
    margin: 10px 0;
`;

const ItemPrice = styled.span`
    color: ${red};
`;

const SelectGift: FC<GiftPage> = ({ index }) => {
    const [ itemName, setItemName ] = useState<string>("");

    const { page, setGiftItem, changePage, giftItem } = useContext(GiftsContext);

    const itemInput = useRef<HTMLInputElement>(null);

    const filterItems = (): StoreItem[] => items.filter(({ name }: StoreItem ) => 
        name.toLowerCase().includes(itemName.toLowerCase()));

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        event.preventDefault();
        setItemName(event.target.value);
    }
    
    const handleGiftClick = ( item: StoreItem ) => {
        changePage(page + 1);
        setGiftItem(item);
    }

    if(page !== index) return null;

    return(
        <>
            <Inputs>
                <Input>
                    <TextLabel>Nazwa przedmiotu</TextLabel>
                    <TextInput 
                        type="text" 
                        ref={itemInput}
                        value={itemName}
                        onChange={e => handleInputChange(e)}
                    />
                </Input>
            </Inputs>
            <ItemsContainer>
                {filterItems()?.map(( item: StoreItem ) => (
                    <Item
                        isSelected={item === giftItem}
                        key={item.id} 
                        onClick={() => handleGiftClick(item)}
                    >
                        <ItemImage src={item.image}/>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>{item.price} fajek</ItemPrice>
                    </Item>
                ))}
            </ItemsContainer>
        </>
    )
}

export default SelectGift;