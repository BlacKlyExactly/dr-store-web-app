import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { PageWrapper } from "../utils/templates";
import { AppUserProps } from "../pages/_app";
import Template from "../components/Template";
import LogInToUseBox from "components/LogInToUseBox";
import serverSideProps from "utils/serverSideProps";
import DailyItems from "components/DailyItems";

const Daily: FC<AppUserProps> = ({ userData, isLoged }) => {
    return(
        <Template userData={userData} isLoged={isLoged}>
            <PageWrapper center>
                <LogInToUseBox />
                <Helmet>
                    <title>{process.env.NEXT_PUBLIC_SITE_NAME || "Panel"} | Daily</title>
                    <meta 
                        name="description"
                        content="
                            Codziennie odbieraj swoją nagrodę,
                            która co 7 dni będzie nagrodą specjalną,
                            ale pamiętaj, że nagroda z danego dnia
                            przepada jak jej nie odbierzesz!
                        "
                    />
                </Helmet>
                <DailyItems/>
            </PageWrapper>
        </Template>
    )
};

export const getServerSideProps = serverSideProps;

export default Daily;