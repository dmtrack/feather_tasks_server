export interface IUserDTO {
    _id: number;
    name: string;
    login: string;
    avatar: string;
}

export interface IUserAfterSignIn {
    user: {
        _id: number;
        name: string;
        login: string;
        avatarUrl: string;
        accessToken: string;
    };
    refreshToken: string;
    accessToken: string;
}
