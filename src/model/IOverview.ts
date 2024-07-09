import { dailyData, monthlyData } from "./IProductStat";

export interface IOverview {
  id: string;
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: monthlyData[];
  dailyData: dailyData[];
  salesByCategory: { [key: string]: number }; 
}

export type Overview = IOverview[];
