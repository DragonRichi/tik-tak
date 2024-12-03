export type PlayerEntity = {
    id: string;
    login: string;
    rating: number;
};

export type GameIdleEntity = {
    id: string;
    players: PlayerEntity[];
    status: "idle";
};

export type GameinProgressEntity = {
    id: string;
    players: PlayerEntity[];
    field: Field[];
    status: "inProgress";
};
export type GameOverEntity = {
    id: string;
    players: PlayerEntity[];
    field: Field[];
    status: "gameOver";
    winner: PlayerEntity;
};
export type GameOverDrawEntity = {
    id: string;
    players: PlayerEntity[];
    field: Field[];
    status: "gameOverDraw";
};

export type GameEntity = GameIdleEntity | GameinProgressEntity | GameOverEntity | GameOverDrawEntity;

export type Field = Cell[];

export type Cell = string | null;

export type GameSymbol = string;
