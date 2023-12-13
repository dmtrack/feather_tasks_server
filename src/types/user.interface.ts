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
        avatarUrl: string;
        accessToken: string;
    };
    refreshToken: string;
    accessToken: string;
}
