export interface IGame {
    readonly title: string
    readonly password: string
    readonly players: string[]
    readonly status: string
    readonly owner: string
}

export interface IGameState {
    readonly progress: number
    readonly cards: string[]
    readonly discardStack: string[]
    readonly players: IGameStatePlayer[]
}

export interface IGameStatePlayer {
    readonly id: string
    readonly level: number
    readonly race: string
    readonly class: string
    readonly cardsInHand: string[]
    readonly equipment: IGameStateEquipment
}

export interface IGameStateEquipment {
    readonly leftHand: string
    readonly rightHand: string
    readonly helm: string
    readonly chest: string
    readonly legs: string
}
