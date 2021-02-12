import { useEffect } from "react";
import { RpsMark, RpsPlayer } from "../rps";
import { UserData } from "./useUser";
import socket from "utils/socket";

export type SocketData = {
    queue: RpsPlayer[],
    currentGame: RpsPlayer[]
}

export type SocketTimeData = {
    game: RpsPlayer[],
    timeGame: number
}

const useRps = ( 
    userData: UserData, 
    onQueueChange: ( data: SocketData ) => void,
    onMarkSelect: ( data: SocketData ) => void,
    onGameRemove: ( data: SocketData ) => void,
    onTimeChange: ( data: SocketTimeData ) => void,
    onTimeEnd: ( currentGame: RpsPlayer[] ) => void
) => {
    useEffect(() => {
        socket.on("rpsHookQueueChange", ({ queue, currentGame }: SocketData ) => onQueueChange({ queue, currentGame }));
        socket.on("rpsHookMarkSelect",  ({ queue, currentGame }: SocketData ) => onMarkSelect({ queue, currentGame }));
        socket.on("rpsHookGameRemove",  ({ queue, currentGame }: SocketData ) => onGameRemove({ queue, currentGame }));
        socket.on("rpsTimeChange",  ({ time, game }) => onTimeChange({ timeGame: time, game }));
        socket.on("rpsTimeEnd", ({ game }) => onTimeEnd(game))

        return () => socket.disconnect();
    }, [ ])

    const addToQueue = () => socket.emit("rpsAddToQueue", {
        id: userData.steamId,
        name: userData.name,
        avatar: userData.avatar
    })
    
    const removeFromQueue = () => socket.emit("rpsRemoveFromQueue", {
        id: userData.steamId,
    })

    const removeGame = ( player: RpsPlayer ) => socket.emit("rpsRemoveGame", player);

    const setMark = ( mark: RpsMark ) => socket.emit("rpsSetMark", {
        id: userData.steamId,
        mark
    })
    
    return { addToQueue, removeFromQueue, setMark, removeGame, socket };
}

export default useRps;