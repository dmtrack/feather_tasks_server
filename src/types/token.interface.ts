export interface IToken {
    _id: number;
    refreshToken: string;
    userId: number;
}

export interface ITokenCouple {
    accessToken: string;
    refreshToken: string;
}
