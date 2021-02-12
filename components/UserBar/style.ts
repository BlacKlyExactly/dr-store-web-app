import styled from "styled-components";
import { blue, main, red } from "../../utils/colors";

export const LoginButton = styled.button`
    cursor: pointer;
    width: 109px;
    height: 66px;
    background: url('/images/button.png');
    border: none;

    @media screen and (min-width: 800px) {
        width: 5.8vw;
        height: 3.5vw;
        background-size: cover;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    width: 400px;
    justify-content: flex-end;
    align-items: center;

    @media screen and (min-width: 800px){
        width: 20vw;
    }
`;

type AvatarProps = {
    url: string
}

export const Avatar = styled.span<AvatarProps>`
    width: 50px;
    height: 50px;
    background: url(${({ url }) => url});
    background-size: cover;
    margin-right: 15px;

    @media screen and (min-width: 800px){
        min-width: 50px;
        min-height: 50px;
    }

    @media screen and (min-width: 1200px){
        width: 5vmax;
        height: 5vmax;
    }
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1vw;
`;

export const Name = styled.span`
    @media screen and (min-width: 800px){
       font-size: 90%;
    }

    @media screen and (min-width: 1200px){
        font-size: 130%;
    }

    margin-bottom: 4%;
`;

export const Coins = styled.span`
    @media screen and (min-width: 800px){
       font-size: 80%;
    }

    @media screen and (min-width: 1200px){
        font-size: 120%;
    }

    span{
        color: ${red};
    }
`;

export const LogOut = styled.button`
    cursor: pointer;
    background: ${red};
    color: white;
    border: none;
    font-size: 15px;
    border-radius: 100%;
    width: 38px;
    height: 38px;
    margin-left: 7%;
    transition:
        .2s color,
        .2s background;
    
    svg{
        transition: .1s transform;
    }

    &:hover{
        background: ${blue};
        color: ${main};

        svg{
            transform: scale(0.8);
        }
    }

    @media screen and (min-width: 800px){
       width: 2.5vw;
       height: 2.5vw;
       font-size: 1.1vw;
    }

    @media screen and (min-width: 1200px){
       width: 2.5vw;
       height: 2.5vw;
       font-size: 1.1vw;
    }
`;
