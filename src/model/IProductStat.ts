
export interface IProductStat {
    _id: string
    productId: string
    yearlySalesTotal: number
    yearlyTotalSoldUnits: number
    year: number
    monthlyData:monthlyData
    dailyData:dailyData
       createdAt: string
    updatedAt: string
  }

  export interface dailyData {
    date: string
    totalSales: number
    totalUnits: number
  }
  export interface monthlyData {
    month: string
    totalSales: number
    totalUnits: number
  }

  