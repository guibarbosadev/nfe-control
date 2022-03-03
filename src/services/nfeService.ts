import { Nfe } from "../store/nfe/nfeTypes";

const dbKeys = {
  nfes: "nfes",
};

type NfesMap = { [email: string]: Nfe[] };

function getNfesMap() {
  const nfesMap = (JSON.parse(localStorage.getItem(dbKeys.nfes) ?? "") ||
    {}) as NfesMap;

  return nfesMap;
}

export async function fetchNfes(email: string) {
  const nfesMap = getNfesMap();
  const nfes = nfesMap[email] || [];

  return nfes;
}

export async function registerNfe(email: string, nfe: Nfe) {
  const nfes = await fetchNfes(email);
  const updatedNfes = nfes.concat(nfe);
  const nfesMap = { ...getNfesMap(), [email]: [...updatedNfes] };
  const stringifiedNfesMap = JSON.stringify(nfesMap);

  localStorage.setItem(dbKeys.nfes, stringifiedNfesMap);

  return await fetchNfes(email);
}
