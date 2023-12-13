export interface IColumnCreate {
    userId: number;
    title: string;
    order: number;
}

export type IColumnUpdate = Pick<IColumnCreate, 'title' | 'order'> & {
    id: number;
};
