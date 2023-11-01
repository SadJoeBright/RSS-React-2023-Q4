export interface IData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IResults;
}

export interface IItem {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  length: string;
  cost_in_credits: string;
}

export interface IResults {
  results: IItem[];
}

export interface ISearchProps {
  updateResults: (results: IResults) => void;
}

export interface IInputState {
  searchValue: string;
  isLoading: boolean;
}
