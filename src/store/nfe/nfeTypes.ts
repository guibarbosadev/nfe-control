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

export interface NfeTotalByMonth {
  month: number;
  total: number;
  name: string;
}

export type NfeStatus = "idle" | "loading" | "error" | "success";

export interface NfeState {
  nfes: Nfe[];
  status: NfeStatus;
  filter: NfeFilter;
  totalsByMonth: NfeTotalByMonth[];
  remainingTotal: number;
}

export enum NfeGraphModes {
  TotalByMonth = "total_by_month",
  RemainingTotal = "remaining_total",
}

export interface NfeFilter {
  year: number;
  graph: NfeGraphModes;
}
