export interface IColumnCreate {
    userId: number;
    title: string;
    order: number;
}

export type ColumnUpdateType = Pick<IColumnCreate, 'title' | 'order'> & {
    columnId: number;
};

export interface IColumnDTO {
    _id: number;
    userId: number;
    title: string;
    order: number;
}
