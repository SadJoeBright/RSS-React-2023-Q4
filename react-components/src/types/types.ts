export interface IData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IItem[];
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
export interface IInputState {
  searchValue: string;
  isLoading: boolean;
}
