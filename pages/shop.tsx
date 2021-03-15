import React, { FC, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { PageWrapper } from "../utils/templates";
import { AppUserProps } from "./_app";
import Template from "../components/Template";
import serverSideProps from "../utils/serverSideProps";
import LogInToUseBox from "../components/LogInToUseBox";
import gsap from "gsap";
import { blue, darker, red } from "utils/colors";
import items, { StoreItem } from "items";
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

    @media screen and (min-width: 800px){
        display: inline-block;
    }
`;

type ItemProps = {
    name: string
}

const Item = styled.div<ItemProps>`
    cursor: pointer;
    flex-shrink: 0;
    flex-grow: 0;
    height: 338px;
    width: 220px;
    position: relative;
    margin: 20px;
    transition: 0.15s transform;
    
    &::after{
        content: "${({ name }) => name.toUpperCase()}";
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: black;
        transition: 0.15s opacity;
        color: white;
        font-size: 20px;
        text-align: center;
    }

    &:hover{
        transform: scale(1.03);

        &::after{
            opacity: 0.5;
        }
    }

    @media screen and (min-width: 800px){
        display: inline-block;
        height: 280px;
        width: 185px;
    }
`;

const ItemImage = styled.img`
    height: 76%;
    width: 100%;
`;

const ItemPriceBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24%;
    width: 100%;
    background: ${darker};
    font-size: 25px;

    span{
        color: ${red};
        margin-left: 0.3vw;
    }

    @media screen and (min-width: 800px){
        font-size: 20px;
    }
`;

const Shop: FC<AppUserProps> = ({ userData, isLoged }) => {
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
    }, [ ])

    const buy = ( name: string, price: number, id: string ) => {
        if(price > coins.data){
            Swal.fire({
                title: "Nie masz wystarczająco monet!",
                text: "R.I.P",
                icon: "error"
            });
            
            return;
        }

        Swal.fire({
            title: `Czy napewno chcesz kupić ${name} za ${price} fajek ?`,
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Tak",
            cancelButtonText: "Nie",
            confirmButtonColor: blue,
            cancelButtonColor: red
        }).then(( result ) => {
            if(result.value){
                coins.mutate({
                    coins: coins.data - price,
                });

                eq.addItem.mutate({
                    steamId: userData.steamId,
                    item: id
                })

                Swal.fire({
                    title: `Brawo! Zakupiłeś ${name} za ${price} fajek.`,
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
                       {items.map(({ image, name, price, id }: StoreItem ) => (
                            <Item 
                                name={name}
                                key={id} 
                                onClick={() => buy(name, price, id)}
                            >
                                <ItemImage src={image}/>
                                <ItemPriceBox>{price}<span>fajek</span></ItemPriceBox>
                            </Item>
                       ))}
                   </ItemsWrapper>
                </PageContent>
            </PageWrapper>
        </Template>
    )
};

export const getServerSideProps = serverSideProps;

export default Shop;