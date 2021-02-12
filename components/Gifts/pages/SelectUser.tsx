import axios, { AxiosResponse } from "axios";
import React, { ChangeEvent, FC, Reducer, useReducer, useRef, useContext } from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import { blue, darker, red } from "utils/colors";
import encoding from "encoding";
import { TextInput, TextLabel } from "utils/templates";
import { GiftPage, GiftsContext, Input, Inputs } from "..";
import { DatabaseUser } from "pages/api/users/[steamId]";
import encode from "utils/encode";
import { GlobalContext } from "../../../utils/globalContext";

const UsersContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 40%;
    width: 100%;
    margin-top: 10%;
    padding: 2%;

    @media screen and (min-width: 800px){
        width: 50%;
        margin-top: 5%;
    }
`;

type UserProps = {
    isSelected: boolean
}

const User = styled.div<UserProps>`
    cursor: pointer;
    margin: 20px 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    align-items: center;
    width: 100%;
    padding: 2px;
    transition: 0.2s background;

    @media screen and (min-width: 800px){
        width: 85%;
        margin: 30px 0;
        padding: 2%;
    }

    &:hover{
        background: ${darker};
    }

    ${({ isSelected }) => isSelected && css`
        background: ${darker};
        border: .12vw solid ${red};
    `}
`;

type InfoProps = {
    direction: "left" | "right"
    color: string
}

const Info = styled.div<InfoProps>`
    font-size: 15px;
    color: ${({ color }) => color};
    text-transform: uppercase;
    text-align: ${({ direction }) => direction};
    width: 45%;

    @media screen and (min-width: 800px){
        font-size: 1vw;
    }
`;

type InputsReducer = {
    name?: string,
    sid?: string
}

const SelectUser: FC<GiftPage> = ({ index }) => {
    const [ inputs, setInputValue ] = useReducer<Reducer<InputsReducer, InputsReducer>>(
        ( state, newState ) => ({ ...state, ...newState }), {
            name: "",
            sid: ""
        }
    )

    const { page, changePage, setGiftUser, giftUser } = useContext(GiftsContext);
    const { userData } = useContext(GlobalContext);
    
    const { data, error } = useQuery<DatabaseUser[]>('gifts', () =>
        axios.get(
            "/api/users/all",
            { headers: { Authorization: `${process.env.NEXT_PUBLIC_API_AUTH_TYPE} ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}` }}
        ).then(( response: AxiosResponse ) => response.data)
    )

    const nameInput = useRef<HTMLInputElement>(null);
    const sidInput = useRef<HTMLInputElement>(null);
    
    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        event.preventDefault();
        setInputValue({
            [ event.target.name ]: event.target.value,
        })
    }

    const filterUsers = () => {
        return data?.filter(({ name, steamID }) => 
                encode(name).
                toLowerCase().
                includes(inputs.name.toLowerCase()) && 
                steamID.toLowerCase().includes(inputs.sid.toLowerCase()) &&
                steamID !== "BOT" &&
                steamID !== userData?.steamId
        )
    }

    const handleUserClick = ( user: DatabaseUser ) => {
        changePage(page + 1);
        setGiftUser(user);
    }

    if(index !== page) return null;

    return(
        <>
            <Inputs>
                <Input>
                    <TextLabel>Nick</TextLabel>
                    <TextInput 
                        type="text" 
                        ref={nameInput}
                        value={inputs.name}
                        name="name"
                        onChange={e => handleInputChange(e)}
                    />
                </Input>
                <Input>
                    <TextLabel>Steam ID</TextLabel>
                    <TextInput 
                        type="text" 
                        ref={sidInput}
                        value={inputs.sid}
                        name="sid"
                        onChange={e => handleInputChange(e)}
                    />
                </Input>
            </Inputs>
            <UsersContainer>
                {error && <p>Wystąpił błąd podczas pobierania użytkowników</p>}
                {filterUsers()?.map(( user: DatabaseUser ) => (
                    <User 
                        isSelected={giftUser === user}
                        key={user.steamID}
                        onClick={() => handleUserClick(user)}
                    >
                        <Info 
                            direction="left"
                            color={blue}
                        >
                            {encoding.convert(user.name, "Windows 1252").toString()}
                        </Info>
                        <Info 
                            direction="right"
                            color={red}
                        >
                            {user.steamID}
                        </Info>
                    </User>
                ))}
            </UsersContainer>
        </>
    )
}

export default SelectUser;