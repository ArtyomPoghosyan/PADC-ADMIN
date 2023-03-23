export interface IProjectData {
    id: number,
    description: string,
    title: string,
    button: any
}

export interface IAddProject {
    title: string,
    description: string,
}

export interface IRecord {
    description:{},
    id:string,
    index:number,
    mediaFiles:{},
    role:undefined | string,
    title:string
}