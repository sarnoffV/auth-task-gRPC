export interface UpdateTaskDto {
    id : number;
    title : string;
    description : string;
    status : boolean;
    userId : number;
    token: string;
}