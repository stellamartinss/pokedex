export type FiltersProps = {
  selectedPokeFilters: PokemonFilter;
  initialFilters: any;
  prepareFilter: (filter: Filter) => void;
  clearFilter: () => void;
};

export type PokemonFilter = {
  ability: string;
  type: string;
};

export type Filter = {
  field: string;
  value: string | { name: string; url: string };
};
