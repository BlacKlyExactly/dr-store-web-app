import React, { FC, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Button, PageWrapper } from "../utils/templates";
import { AppUserProps } from "./_app";
import Template from "../components/Template";
import serverSideProps from "../utils/serverSideProps";
import LogInToUseBox from "../components/LogInToUseBox";
import gsap from "gsap";
import { blue, red } from "utils/colors";
import { getItemById } from "items";
import useCoins from "hooks/useCoins";
import useEquipment from "hooks/useEquipment";
import Swal from "sweetalert2";

const PageContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 50px 20px;
    margin-top: 150px;
    
    @media screen and (min-width: 800px){
        width: 100%;
        margin-top: 0;
    }
`;

const ItemsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    align-items: center;

    @media screen and (min-width: 800px){
        display: flex;
        flex-wrap: wrap;
    }
`;

type ItemProps = {
    name: string
}

const Item = styled.div<ItemProps>`
    display: flex;
    height: 200px;
    width: 500px;
    position: relative;
    margin: 20px;
    transition: 0.15s transform;

    @media screen and (min-width: 800px){
        height: 210px;
        width: 330px;
    }
`;

const ItemImage = styled.img`
    height: 100%;
    width: 180px;
    margin: 20px;
`;

const ItemActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

enum ItemManage {
    Sell = 1,
    Buy
};

const Equipment: FC<AppUserProps> = ({ userData, isLoged }) => {
    const coins = useCoins(userData);
    const eq = useEquipment(userData);

    const itemsWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.from(
            [ itemsWrapper.current, ...itemsWrapper.current.children ],
            {
                opacity: 0,
                stagger: 0.1,
                y: 2,
                ease: "power4.inOut",
                delay: 1.2
            }
        )
    }, [ eq.isLoading ])

    const manageItem = ( name: string, price: number, id: string, actionType: ItemManage ) => {
        if(price > coins.data && actionType === ItemManage.Buy){
            Swal.fire({
                title: "Nie masz wystarczająco monet!",
                text: "R.I.P",
                icon: "error"
            });
            
            return;
        }

        const titleType = actionType === ItemManage.Buy ? "kupić" : "sprzedać";

        Swal.fire({
            title: `Czy napewno chcesz ${titleType} ${name} za ${price} fajek ?`,
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Tak",
            cancelButtonText: "Nie",
            confirmButtonColor: blue,
            cancelButtonColor: red
        }).then(( result ) => {
            if(result.value){
                const mutatedCoins: number = actionType === ItemManage.Buy ? coins.data - price : coins.data + price;
                coins.mutate({
                    coins: mutatedCoins
                });

                actionType === ItemManage.Buy ?  
                    eq.addItem.mutate({
                        steamId: userData.steamId,
                        item: id
                    }) :
                    eq.removeItem.mutate({
                        steamId: userData.steamId,
                        item: id
                    });
                
                const finalTitleType = actionType === ItemManage.Buy ? "Zakupiłeś" : "Sprzedałeś";
                Swal.fire({
                    title: `Brawo! ${finalTitleType} ${name} za ${price} fajek.`,
                    text: "Szacun na dzielni 😎",
                    icon: "success"
                })
            }
        })
    }

    return(
        <Template userData={userData} isLoged={isLoged}>
            <PageWrapper>
                <Helmet>
                    <title>{process.env.NEXT_PUBLIC_SITE_NAME || "Panel"} | Sklep</title>
                    <meta 
                        name="description" 
                        content="
                            Tutaj kupujesz przedmioty, które możesz zakładać na serwerze!
                            Znajdziesz tu takie rzeczy jak: tagi, aury, traile, modele do postaci i noży.
                            Na co czekasz ? Idź na zakupy.
                        "
                    />
                </Helmet>
                <PageContent>
                   <LogInToUseBox/>
                   <ItemsWrapper ref={itemsWrapper}>
                        {
                            eq.data && 
                            eq.data.split(";")
                                .filter(( itemId: string ) => itemId !== "")
                                .map(( itemId: string ) => (
                                    <Item name={getItemById(itemId)?.name} key={itemId}>
                                        <ItemImage src={getItemById(itemId)?.image}/>
                                        <ItemActions>
                                            <Button 
                                                background={red}
                                                onClick={() => manageItem(
                                                    getItemById(itemId)?.name,
                                                    Math.floor(getItemById(itemId)?.price / 1.5),
                                                    getItemById(itemId)?.id,
                                                    ItemManage.Sell
                                                )}
                                            >
                                                Sprzedaj ({Math.floor(getItemById(itemId)?.price / 1.5)})
                                            </Button>
                                            <Button 
                                                background={blue}
                                                onClick={() => manageItem(
                                                    getItemById(itemId)?.name,
                                                    getItemById(itemId)?.price,
                                                    getItemById(itemId)?.id,
                                                    ItemManage.Buy
                                                )}
                                            >
                                                Kup ({getItemById(itemId)?.price})
                                            </Button>
                                        </ItemActions>
                                    </Item>
                                )
                            )
                        }
                   </ItemsWrapper>
                </PageContent>
            </PageWrapper>
        </Template>
    )
};

export const getServerSideProps = serverSideProps;

export default Equipment;