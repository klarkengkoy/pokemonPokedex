export class Pokemon {
    id: number;
    name: string;
    sprites: any;
}

export class PokemonDetails {
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