export interface ICreateTask {
    title: string;
    description: string;
    userId: number;
    columnId: number;
    order: number;
}

export interface IUpdateTask extends ICreateTask {
    id: number;
}

export interface ITaskDTO {
    _id: number;
    title: string;
    description: string;
    userId: number;
    columnId: number;
}
