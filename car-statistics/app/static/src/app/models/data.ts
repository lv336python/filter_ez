export class UserData {
    constructor(public user_files: any,
                public user_datasets: any,
                public user_filters: any
                ) {}
}


export class File {
    constructor(public id: number,
                public name: string,
                public size: number,
                public date: number,
                public rows: number
                ) {}
}

export class Filter {
    constructor(public id: number,
                public name: string
                ) {}
}

export class DataSet {
    constructor(public id: number,
                public user_id: number,
                public filter_id: number,
                public name: string,
                public date: number,
                public items: number
                ) {}
}
