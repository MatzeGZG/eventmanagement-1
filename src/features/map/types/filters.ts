export interface MapFilters {
  searchTerm: string;
  maxDistance: number;
  categories: string[];
}

export interface FilterUpdate extends Partial<MapFilters> {}