
/** COMMON */
export interface IPagination{
    page: number,
    page_size: number,
    num_of_page: number,
}

/** LEADER BOARD */
export interface ILeaderBoardModel{
    rank:number,
    address: string,
    point: number
}

export interface ILeaderBoardArrayModel{
    items: ILeaderBoardModel[],
    pagination:IPagination,
    loading: boolean,
    num_of_page:number
}

/** WALLET */
export interface IWalletModel{
    address: string,
    chainId: number,
    balance: string,
    easyWeb3:any | void,
}