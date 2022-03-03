import { CustomDate, Nfe, NfeTotalByMonth } from "../store/nfe/nfeTypes";

const monthNamesMap: { [key: number]: string } = {
  1: "Jan",
  2: "Fev",
  3: "Mar",
  4: "Abr",
  5: "Mai",
  6: "Jun",
  7: "Jul",
  8: "Ago",
  9: "Set",
  10: "Out",
  11: "Nov",
  12: "Dez",
};

export function transformDate(date: string) {
  const parsedDate = new Date(date);
  const customDate: CustomDate = {
    day: parsedDate.getDate(),
    month: parsedDate.getMonth() + 1,
    year: parsedDate.getFullYear(),
  };

  return customDate;
}

export function formatMoney(value: number) {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "BRL",
  };
  const formattedValue = new Intl.NumberFormat("pt-BR", options).format(value);

  return formattedValue;
}

export function getNfesTotalByMonth(year: number, nfes: Nfe[]) {
  let biggestMonth = 0;
  const filteredNfes = nfes.filter((nfe) => {
    const isSameYear = nfe.date.year === year;
    const isBiggestMonth = nfe.date.month > biggestMonth;

    if (isSameYear && isBiggestMonth) {
      biggestMonth = nfe.date.month;
    }
    return isSameYear;
  });
  let nfesTotalByMonth: NfeTotalByMonth[] = Array.from({
    length: biggestMonth,
  });
  nfesTotalByMonth = nfesTotalByMonth.map((nfeTotalByMonth, index) => {
    const monthNfes = filteredNfes.filter(
      (nfe) => nfe.date.month === index + 1
    );
    const total = monthNfes.reduce((previousTotal, currentNfe) => {
      return previousTotal + currentNfe.value;
    }, 0);

    return {
      total,
      month: index + 1,
      name: monthNamesMap[index + 1],
    };
  });

  return nfesTotalByMonth;
}
