export interface IGame {
    readonly title: string
    readonly password: string
    readonly players: string[]
    readonly status: string
    readonly owner: string
}

export type GameStatus = 'created' | 'progress' | 'completed'
