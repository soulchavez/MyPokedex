export interface Pokemon {
  abilities: string[];
  name: string;
  height: number; //decímetros
  weight: number; //hectogramos
  id: number;
  types: string[];
  images: string[];
}

export interface CondensedPokemon {
  name: string;
  url: string;
  id: number;
}
