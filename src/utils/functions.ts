import numeral from "numeral";
import { CovidInfo } from "./interfaces";

const sortData = (data: CovidInfo[]): CovidInfo[] => {
  const sortedData: CovidInfo[] = [...data];
  sortedData.sort((a: CovidInfo, b: CovidInfo) => (a.cases > b.cases ? -1 : 1));
  return sortedData;
};

const prettyPrintStat = (stat: number) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export { sortData, prettyPrintStat };
