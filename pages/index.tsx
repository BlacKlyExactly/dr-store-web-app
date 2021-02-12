import React, { FC, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { PageWrapper } from "../utils/templates";
import { red } from "../utils/colors";
import { AppUserProps } from "../pages/_app";
import Template from "../components/Template";
import serverSideProps from "../utils/serverSideProps";
import gsap from "gsap";

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
        padding: 4vw;
        width: 90%;
        justify-content: center;
        margin-left: 4.5vw;
        margin-top: 0;
    }
`;

const Title = styled.h1`
    font-size: 27px;
    text-align: left;

    @media screen and (min-width: 800px){
        font-size: max(3vw, 36px);
    }
`;

const Description = styled.h1`
    font-size: 15px;
    line-height: 35px;
    font-weight: 600;
    margin-top: 25px;

    span{
        color: ${red};
    }

    @media screen and (min-width: 800px){
        font-size: max(1vw, 12px);
        line-height: 2vw;
        width: 68%;
    }
`;

const Index: FC<AppUserProps> = ({ userData, isLoged }) => {
    const content = useRef<HTMLDivElement>();

    useEffect(() => {
        gsap.from(
            content.current.children,
            {
                x: -10,
                opacity: 0,
                duration: 1,
                delay: 1.2,
                ease: "power4.out",
                stagger: 0.2,
            }
        )
    }, [])

    return(
        <Template userData={userData} isLoged={isLoged}>
            <PageWrapper>
                <Helmet>
                    <title>{process.env.NEXT_PUBLIC_SITE_NAME || "Panel"} | Strona Główna</title>
                    <meta 
                        name="description" 
                        content="
                            Możesz tu spróbować zarobić trochę fajek
                            przez: codzienne odbieranie fajek, 
                            gambling. Możesz także: zobaczyć najbogatsze osoby, 
                            kupować przedmioty. Pamiętaj o włączeniu powiadomień. 
                            Będą ci one przypominały o daily i prezentach 
                            jakie otrzymujesz.
                        "
                    />
                </Helmet>
                <PageContent ref={content}>
                    <Title>
                        Witaj w Web Panelu<br/>
                        Sklepu z fajkami
                    </Title>
                    <Description>
                        <span>Możesz tu spróbować zarobić trochę fajek
                        przez:</span> codzienne odbieranie fajek, 
                        gambling. <span>Możesz także:</span> zobaczyć najbogatsze osoby, 
                        kupować przedmioty. Pamiętaj o <span>włączeniu powiadomień.</span> 
                        Będą ci one <span>przypominały</span> o 
                        daily i prezentach jakie otrzymujesz.
                    </Description>
                </PageContent>
            </PageWrapper>
        </Template>
    )
};

export const getServerSideProps = serverSideProps;


export default Index;