export interface IUser  {
    readonly username: string
    readonly email: string
}

export interface IUserCredentials {
    readonly password: string
}

export interface IUserWithCredentials extends IUser, IUserCredentials {}
