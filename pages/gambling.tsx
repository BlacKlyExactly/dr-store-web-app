import React, { FC } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Area from "../components/Area";
import { PageWrapper } from "../utils/templates";
import LogInToUseBox from "../components/LogInToUseBox";
import Template from "../components/Template";
import { AppUserProps } from "./_app";
import serverSideProps from "utils/serverSideProps";

import GamblingRoulette, { 
    RouletteRangeSlider, 
    RouletteRateCount,
    RouletteColorSelect,
    RouletteColor,
    RoulettePlayWindow
} from "../components/GamblingRoulette";

import GamblingRps, {
    RpsRateCount,
    RpsRangeSlider,
    RpsPlayWindow
} from "../components/GamblingRps";

const PageContent = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100%;
    overflow: hidden;

    @media screen and (min-width: 800px){
        height: 100%;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 1vw;
    }
`;

const ColorSelects = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;   
    margin-top: 20px; 

    @media screen and (min-width: 800px){
        flex-direction: column;
        justify-content: space-between;
        margin-top: 2vw;
    }
    
    @media screen and (min-width: 1200px){
        flex-direction: row;
    }
`;

const Gambling: FC<AppUserProps> = ({ userData, isLoged }) => {
    return(
        <Template userData={userData} isLoged={isLoged}>
            <PageWrapper>
                <Helmet>
                    <title>{process.env.NEXT_PUBLIC_SITE_NAME || "Panel"} | Gambling</title>
                    <meta 
                        name="description"
                        content="
                            Zajrzyj tutaj, jeśli chcesz
                            zarobić trochę fajek. Możesz zagrać
                            tu w różne gry takie jak papier, kamień, nożyce
                            czy ruletkę.
                        "
                    />
                </Helmet>
                <PageContent>
                    <LogInToUseBox />
                    <Area
                        width="50%"
                        height="51%"
                        center={false}
                    >
                        <GamblingRoulette>
                            <RouletteRateCount text="Ruletka | Stawka"/>
                            <RouletteRangeSlider/>
                            <ColorSelects>
                                <RouletteColorSelect
                                    selectColor={RouletteColor.Black}
                                    colorText="Czarny"
                                />
                                <RouletteColorSelect
                                    selectColor={RouletteColor.Green}
                                    colorText="Zielony"
                                />
                                <RouletteColorSelect
                                    selectColor={RouletteColor.Red}
                                    colorText="Czerwony"
                                />
                            </ColorSelects>
                            <RoulettePlayWindow/>
                        </GamblingRoulette>
                    </Area>
                    <Area 
                        width="45%"
                        height="51%"
                        center={false}
                    >
                        <GamblingRps>
                            <RpsRateCount text="RPS | Stawka"/>
                            <RpsRangeSlider/>
                            <RpsPlayWindow/>
                        </GamblingRps>
                    </Area>
                </PageContent>
            </PageWrapper>
        </Template>
    )
};

export const getServerSideProps = serverSideProps;

export default Gambling;