export interface IToken {
    id: number;
    refreshToken: string;
    userId: number;
}

export interface ITokenCouple {
    accessToken: string;
    refreshToken: string;
}
