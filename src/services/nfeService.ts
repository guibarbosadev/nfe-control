import { Nfe } from "../store/nfe/nfeTypes";

const dbKeys = {
  nfes: "nfes",
};

type NfesMap = { [email: string]: Nfe[] };

export async function fetchNfes(email: string) {
  const nfesMap = (JSON.parse(localStorage.getItem(dbKeys.nfes) ?? "") ||
    {}) as NfesMap;
  const nfes = nfesMap[email] || [];

  return nfes;
}
