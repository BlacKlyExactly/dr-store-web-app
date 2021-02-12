import React, { FC } from "react";
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";
import { UserData } from "../hooks/useUser";
import { blue, main } from "../utils/colors";
import PageLoader from "components/PageLoader";

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${main};

    @media screen and (min-width: 800px){
      height: 100vh;
      overflow: hidden;
    }
`;

const Global = createGlobalStyle`
  *,
  *::before,
  *::after
  {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body,
  html{
    margin: 0;
    color: ${blue};
    background: ${main};
    overflow-x: hidden;
  }

  a,
  a:hover,
  a:active{
    color: inherit;
    text-decoration: inherit;
  }

  p{
    text-align: center;
  }
`;

const client = new QueryClient({ 
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    return (
      <QueryClientProvider client={client}>
        <Wrapper>
          <Global />
          <PageLoader/>
          <Component {...pageProps}/>
          <Helmet>
            <link 
                rel="preconnect" 
                href="https://fonts.gstatic.com"
            />
            <link 
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;700;800&display=swap" 
                rel="stylesheet"
            />
          </Helmet>
        </Wrapper>
      </QueryClientProvider>
    )
}

export type AppUserProps = {
  userData: UserData,
  isLoged: boolean,
}

export default MyApp;
