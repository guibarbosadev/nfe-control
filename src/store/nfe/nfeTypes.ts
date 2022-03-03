export interface CustomDate {
  month: number;
  year: number;
  day: number;
}

export interface Nfe {
  cnpj: string;
  companyName: string;
  businessName: string; // razao social
  value: number;
  id: string;
  description: string;
  date: CustomDate;
  compensationDate: CustomDate;
}

export type NfeStatus = "idle" | "loading" | "error" | "success";

export interface NfeState {
  nfes: Nfe[];
  filteredNfes: Nfe[];
  status: NfeStatus;
}
