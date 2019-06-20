export interface Pokemon {
    id: number;
    name: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities : [string];
    imageUrl: string;
    speed: number;
    specialDefense: number;
    specialAttack: number;
    defense: number;
    attack: number;
    hp: number;
    type: [string];
}