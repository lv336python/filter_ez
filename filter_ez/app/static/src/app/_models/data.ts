export class UserData {
  constructor(
    public userFiles: Array<object>,
    public userDataSets: Array<object>,
    public userFilters: Array<object>
  ) {
  }
}


export class File {
  constructor(
    public id: number,
    public name: string,
    public size: number,
    public uploadDate: number,
    public nRows: number,
    public datasetId: number
  ) {
  }
}

export class Filter {
  constructor(
    public id: number,
    public name: string,
    public fileId: number
  ) {}
}

export class DataSet {
  constructor(
    public id: number,
    public userId: number,
    public filterId: number,
    public name: string,
    public createDate: Date,
    public nItems: number
  ) {
  }
}

export class StatInfo {
  constructor(
    public datasetId: number,
    public name: string
  ) {
  }
}

