import React, { FC, useContext, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { blue, red } from "utils/colors";
import encode from "utils/encode";
import { Button } from "utils/templates";
import { GiftPage, GiftsContext } from "..";
import useCoins from "hooks/useCoins";
import useEquipment from "hooks/useEquipment";
import { GlobalContext } from "utils/globalContext";
import socket from "utils/socket";

const Item = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ItemImage = styled.img`
    width: 150px;
    height: 150px;
    margin: 10px;
`;

const ItemInfo = styled.span`
    color: ${blue};
    margin: 5px 10px;
    font-size: min(1.2vw, 20px);

    span{
        color: ${red}
    }
`;

const Infos = styled.div`
    margin: 10px 0;
    display: flex;
    flex-direction: column;
`;

const GiftSummary: FC<GiftPage> = ({ index }) => {
    const { giftUser, giftItem, page, changePage, setGiftItem, setGiftUser } = useContext(GiftsContext);
    const { userData } = useContext(GlobalContext);

    const coins = useCoins(userData);
    const eq = useEquipment(userData);

    useEffect(() => {
        if((!giftUser || !giftItem) && page === index){

            Swal.fire({
                title: "Uzupełnij resztę informacji!",
                text: `Brakuje: Użytkownika lub prezentu`,
                icon: "error"
            })

            changePage(0);
        }
    }, [ page ])

    const sendItem = () => {
        if(page !== index || !giftUser || !giftItem) return;

        if(giftItem.price > coins.data){
            Swal.fire({
                title: "Nie stać cię na to!",
                icon: "error"
            })

            return;
        }

        Swal.fire({
            title: "Na pewno chcesz wysłać ten prezent ?",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Tak",
            cancelButtonText: "Nie",
            confirmButtonColor: blue,
            cancelButtonColor: red
        })
        .then(( result ) => {
            if(result.value){
                eq.addItem.mutate({ 
                    item: giftItem.id,
                    steamId: giftUser.steamID
                });
                
                coins.mutate({ coins: coins.data - giftItem.price });
        
                Swal.fire({
                    title: "Prezent został wysłany!",
                    icon: "success"
                })
                .then(( result ) => {
                    if(result.value){
                        socket.emit("giftSend", {
                            steamId: giftUser.steamID,
                            name: userData.name,
                            itemName: giftItem.name
                        })

                        setGiftUser(undefined);
                        setGiftItem(undefined);
                        changePage(0);
                    }
                })
            }
        })
    }

    if(page !== index || !giftUser || !giftItem) return null;

    return(
        <Item>
            <ItemImage src={giftItem.image}/>
            <Infos>
                <ItemInfo>Wysyłasz: <span>{giftItem.name}</span></ItemInfo>
                <ItemInfo>Dla: <span>{encode(giftUser.name)}</span></ItemInfo>
                <ItemInfo>Za: <span>{giftItem.price} fajek</span></ItemInfo>
            </Infos>
            <Button 
                background={blue}
                onClick={sendItem}
            >
                Wyślij
            </Button>
        </Item>
    )
}

export default GiftSummary
