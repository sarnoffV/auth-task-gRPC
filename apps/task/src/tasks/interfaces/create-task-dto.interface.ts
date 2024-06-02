export interface CreateTaskDto {
    title : string;
    description : string;
    status : boolean;
    userId : number;
    token: string;
}