interface IFcResponse {
    status: boolean,
    msg: string,
    info: {
        server_time: string
    }
}

interface IListResponse extends IFcResponse {
    response: [
        {
            id: string,
            name: string,
            decimal: string,
            symbol: string
        }
    ]
}

interface IProfileResponse extends IFcResponse {
    response: [
        {
            short_name: string,
            name: string,
            country: string,
            code_n: string,
            subunit: string,
            website: string,
            symbol: string,
            bank: string,
            banknotes: string,
            coins: string,
            icon: string,
            type: string,
            symbol1: string,
            banknotes2: string,
            coins2: string
        }
    ]
}

interface ILatestResponse extends IFcResponse {
    response: [
        {
            symbol: string,
            price: string,
            change: string,
            change_per: string,
            last_changed: string
        }
    ]
}

interface IHistoryResponse {
    status: boolean,
    msg: string,
    response: [
        {
            o: string,
            h: string,
            l: string,
            c: string,
            t: number,
            tm: string
        }
    ],
    info: {
        id: string,
        symbol: string,
        decimal: string,
        period: string,
        server_time: string
    }
}

export {IListResponse, IProfileResponse, ILatestResponse, IHistoryResponse}
