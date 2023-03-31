import { htmlToDraft } from 'html-to-draftjs';

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
    description: {},
    id: string,
    index: number,
    mediaFiles: {},
    role: undefined | string,
    title: string
}

export interface IProject {
    id: undefined | string,
    data: {
        title: string,
        description: undefined | htmlToDraft | HTMLAreaElement
    }
}

export interface IProjectDatas {
    title: string,
    description: undefined | htmlToDraft | HTMLAreaElement
}