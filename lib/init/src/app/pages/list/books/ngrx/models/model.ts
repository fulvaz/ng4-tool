export interface BooksSuccessModel {
    readonly id: number | string;
    readonly name: string;
    readonly list: any[];
}

export interface BooksStartModel {
  readonly id: number;
}

export interface BooksErrorModel {
  readonly code: number;
}