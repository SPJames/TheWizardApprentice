export interface iResource {
  amount: number;
  name: string;
  spend(amount: number): void;
  add(amount: number): void;
}
