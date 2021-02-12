import SocketIO from "socket.io";

export enum RpsGameState {
    Win = 1,
    Lose,
    Draw,
    None
}

export enum RpsMark {
    Rock = 1,
    Paper,
    Scissors,
    None
}

export type RpsPlayer = {
    name: string,
    id: string,
    mark: RpsMark,
    state: RpsGameState,
    avatar: string,
}

class Rps {
    private queue: RpsPlayer[] = [];
    private games: RpsPlayer[][] = [];
    private times: number[] = [];
    private intervals: NodeJS.Timeout[] = [];
    private io: SocketIO.Server;

    constructor(io: SocketIO.Server){
        this.io = io;
    }
 
    public addToQueue = ( name: string, id: string, avatar: string ) => {
        this.removeFromQueue(id);
        this.queue = [ ...this.queue, { name, id, mark: RpsMark.None, state: RpsGameState.None, avatar }];
        this.onAddToQueue();
    }

    public removeFromQueue = ( id: string ) => {
        this.queue = this.queue.filter(( foundPlayer: RpsPlayer ) => foundPlayer.id !== id);
    }

    public getQueue = (): RpsPlayer[] => this.queue;
    public getGames = (): RpsPlayer[][] => this.games;

    public getGameTime = ( game: RpsPlayer[] ): number => {
        const gameIndex: number = this.games.indexOf(game);
        return this.times[gameIndex];
    }

    public setGameTime = ( game: RpsPlayer[], newTime: number ) => {
        const gameIndex: number = this.games.indexOf(game);
        this.times[gameIndex] = newTime;
    }

    public getPlayer = ( id: string ): RpsPlayer | undefined => {
        const game: RpsPlayer[] | undefined = this.getPlayerGame(id);

        if(!game) return;

        const [ p1, p2 ] = game;

        return p1.id === id ? p1 : p2
    }

    public getPlayerGame = ( id: string ): RpsPlayer[] | undefined => {
        return this.games.find(( foundGame: RpsPlayer[] ) => {
            const [ p1, p2 ] = foundGame;            
            if(p1.id === id || p2.id === id) return foundGame;
        })
    }

    public setMark = ( player: RpsPlayer, mark: RpsMark ) => {
        const game: RpsPlayer[] | undefined = this.getPlayerGame(player.id);

        const playerIndex: number = game?.indexOf(player);
        const gameIndex: number = this.games.indexOf(game);

        if(playerIndex === -1 && gameIndex === -1) return;

        this.games[gameIndex][playerIndex].mark = mark;

        this.onMarkSelect(player);
    }

    public removeGame = ( player: RpsPlayer ) => {
        const game: RpsPlayer[] | undefined = this.getPlayerGame(player.id);
        this.games = this.games.filter(( ) => !this.games.includes(game));
    }
    
    private setWinningState = ( player: RpsPlayer, state: RpsGameState ) => {
        const game: RpsPlayer[] | undefined = this.getPlayerGame(player.id);

        const playerIndex: number = game?.indexOf(player);
        const gameIndex: number = this.games.indexOf(game);

        if(playerIndex === -1 && gameIndex === -1) return;
        
        clearInterval(this.intervals[gameIndex]);

        this.games[gameIndex][playerIndex].state = state;
        this.intervals.slice(gameIndex, 1);
        this.times.slice(gameIndex, 1);
    }

    private onMarkSelect = ( player: RpsPlayer ) => {
        const game: RpsPlayer[] | undefined = this.getPlayerGame(player.id);

        if(!game) return;
        const [ p1, p2 ] = game;
        
        ( p1.mark !== RpsMark.None && p2.mark !== RpsMark.None ) && this.checkMarks(p1, p2);
    }

    private checkMarks = ( p1: RpsPlayer, p2: RpsPlayer ) => {
        if(
            (p1.mark === RpsMark.Rock && p2.mark === RpsMark.Rock) ||
            (p1.mark === RpsMark.Paper && p2.mark === RpsMark.Paper) ||
            (p1.mark === RpsMark.Scissors && p2.mark === RpsMark.Scissors)
        ){
            this.setWinningState(p1, RpsGameState.Draw);
            this.setWinningState(p2, RpsGameState.Draw);
        }

        if(
            (p1.mark === RpsMark.Rock && p2.mark === RpsMark.Scissors) ||
            (p1.mark === RpsMark.Paper && p2.mark === RpsMark.Rock) ||
            (p1.mark === RpsMark.Scissors && p2.mark === RpsMark.Paper)
        ){
            this.setWinningState(p1, RpsGameState.Win);
            this.setWinningState(p2, RpsGameState.Lose);
        }

        if(
            (p2.mark === RpsMark.Rock && p1.mark === RpsMark.Scissors) ||
            (p2.mark === RpsMark.Paper && p1.mark === RpsMark.Rock) ||
            (p2.mark === RpsMark.Scissors && p1.mark === RpsMark.Paper)
        ){
            this.setWinningState(p1, RpsGameState.Lose);
            this.setWinningState(p2, RpsGameState.Win);
        }
    }

    private onAddToQueue = () => {
        const [ p1, p2 ] = this.queue;

        if(p1 && p2){
            const game1: RpsPlayer[] | undefined = this.getPlayerGame(p1.id);
            const game2: RpsPlayer[] | undefined = this.getPlayerGame(p2.id);
    
            game1 && this.removeGame(p1);
            game2 && this.removeGame(p2);
            
            this.games = [ ...this.games, [ p1, p2 ]];
            this.times = [ ...this.times, 30 ];

            const game: RpsPlayer[] = this.getPlayerGame(p1.id);

            this.setGameTime(game, 30);
            this.io.emit("rpsTimeChange", { time: 30, game });

            this.intervals = [ ...this.intervals,  
                setInterval(() => {
                    const time = this.getGameTime(game);
                    
                    if(!(game instanceof Array)) return;
                    const [ player1, player2 ] = game;
                    
                    this.setGameTime(game, time - 1);
                    
                    this.io.emit("rpsTimeChange", { time, game });

                    if(time <= 0){
                        if(player1.mark !== RpsMark.None && player2.mark === RpsMark.None){
                            this.setWinningState(player1, RpsGameState.Win);
                            this.setWinningState(player2, RpsGameState.Lose);
                        }


                        if(player2.mark !== RpsMark.None && player1.mark === RpsMark.None){
                            this.setWinningState(player2, RpsGameState.Win);
                            this.setWinningState(player1, RpsGameState.Lose);
                        }

                        if(player1.mark === RpsMark.None && player2.mark === RpsMark.None){
                            this.setWinningState(player2, RpsGameState.Draw);
                            this.setWinningState(player1, RpsGameState.Draw);
                        }

                        this.io.emit("rpsTimeEnd", { game });
                    }
                }, 1000)
            ]

            this.queue = this.queue.slice(2);
        }
    }
}

export default Rps;
