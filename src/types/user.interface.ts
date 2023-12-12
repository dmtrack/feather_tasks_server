export interface IUserDto {
    id: number;
    name: string;
    login: string;
    avatar: string;
}

export interface IUserAfterSignIn {
    user: {
        id: number;
        name: string;
        login: string;
        avatar: string;
        accessToken: string;
    };
    refreshToken: string;
}
