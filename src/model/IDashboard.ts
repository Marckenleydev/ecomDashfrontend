import { dailyData, monthlyData } from "./IProductStat"
import { SalesByCategory } from "./ISalesByCategory"
import { Transaction } from "./ITransaction"


export interface Dashboard {
    totalCustomer: number
    yearlyTotalSoldUnits: number
    yearlySalesTotal: number
    monthlyData: monthlyData[]
    salesByCategory: SalesByCategory
    thisMonthlyData: monthlyData
    thisDailyData: dailyData
    transactions: Transaction[]
  }