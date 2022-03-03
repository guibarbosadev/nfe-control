import { CustomDate } from "../store/nfe/nfeTypes";

export function transformDate(date: string) {
  const parsedDate = new Date(date);
  const customDate: CustomDate = {
    day: parsedDate.getDate(),
    month: parsedDate.getMonth() + 1,
    year: parsedDate.getFullYear(),
  };

  return customDate;
}
