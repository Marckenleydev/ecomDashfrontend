export interface IAffiliateStat {
    id: string
    username: string
    affiliateSales: string[]
    createdAt: string
    updatedAt: string
  }

  export type AffiliateStat ={affiliateStat: IAffiliateStat[]};