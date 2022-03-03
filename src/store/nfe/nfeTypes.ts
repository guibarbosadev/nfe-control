export interface Nfe {
  cnpj: string;
  companyName: string;
  businessName: string; // razao social
  value: number;
  id: string;
  description: string;
  date: string;
  compensationDate: string;
}

export type NfeStatus = "idle" | "loading" | "error" | "success";

export interface NfeState {
  nfes: Nfe[];
  filteredNfes: Nfe[];
  status: NfeStatus;
}
