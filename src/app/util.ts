import { CustomDate, Nfe, NfeTotalByMonth } from "../store/nfe/nfeTypes";

export const NFE_TOTAL_BY_YEAR = 81_000;

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
  nfesTotalByMonth = nfesTotalByMonth.map((_nfeTotalByMonth, index) => {
    const month = index + 1;
    const monthNfes = filteredNfes.filter((nfe) => nfe.date.month === month);
    const total = monthNfes.reduce((previousTotal, currentNfe) => {
      return previousTotal + currentNfe.value;
    }, 0);

    return {
      total,
      month,
      name: monthNamesMap[month],
    };
  });

  return nfesTotalByMonth;
}

export function filterNfeByYear(year: number, nfes: Nfe[]) {
  const filteredNfes = nfes.filter((nfe) => {
    const isSameYear = nfe.date.year === year;

    return isSameYear;
  });

  return filteredNfes;
}

export function calcRemainingTotal(
  year: number,
  totalsByMonth: NfeTotalByMonth[]
) {
  const currentValue = totalsByMonth.reduce((total, nfeTotalByMonth) => {
    return total + nfeTotalByMonth.total;
  }, 0);
  const remainingTotal = NFE_TOTAL_BY_YEAR - currentValue;

  return remainingTotal;
}
