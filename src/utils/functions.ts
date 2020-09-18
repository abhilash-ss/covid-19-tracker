import { CovidInfo } from "./interfaces";

const sortData = (data: CovidInfo[]): CovidInfo[] => {
  const sortedData: CovidInfo[] = [...data];
  sortedData.sort((a: CovidInfo, b: CovidInfo) => (a.cases > b.cases ? -1 : 1));
  return sortedData;
};

export default sortData;
