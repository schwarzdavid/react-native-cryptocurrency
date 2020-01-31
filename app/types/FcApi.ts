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

export {IListResponse, IProfileResponse}
