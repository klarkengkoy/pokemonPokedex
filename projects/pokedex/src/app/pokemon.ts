export class Pokemon {
    id: number;
    name: string;
    sprites: any;
    species: any;
    flavor_text_entries: any;
    evolution_chain: any;
    chain: Chain;
    results: {};
}

export interface Chain {
    species: Species;
    evolves_to: string;
}
export interface Species {
    name: string;
    url: string;
}


export class PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: [string];
    imageUrl: string;
    speed: number;
    specialDefense: number;
    specialAttack: number;
    defense: number;
    attack: number;
    hp: number;
    type: [string];
    species: Pokemon;
    pokemon: {};
}

