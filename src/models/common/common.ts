import { IAddTraining } from '@models/trainings';
import { AnyAction } from 'redux';

export interface Iaction {
    meta: {
        arg: void;
        requestId: string;
        requestStatus: "fulfilled" | "pending" | "rejected";
    }
    type: string,
    payload: any[],
    error?: {
        message: any,
        code: any,
        name: any,
        stack: any
    }
}

export interface IState {
    login: AnyAction,
    user: AnyAction,
    project: AnyAction,
    vacancie: AnyAction,
    training: AnyAction,
    currentTraining:AnyAction,
    addTraining:AnyAction,
    editCurrentTraining:AnyAction
    addVacancie:AnyAction,
    currentVacancie:AnyAction,
    editcurrentVacnacie:AnyAction,
    currentProject:AnyAction,
    editCurrentProject:AnyAction,
    addProject:AnyAction,
    currentUser:AnyAction,
    deleteTraining:AnyAction,
    deleteProject:AnyAction,
    deleteVacancie:AnyAction,
    contactRequest:AnyAction,
    currentContact:AnyAction

}


export interface IInitialstate {
    isLoading: boolean,
    isSuccess: boolean,
}

export interface IModel {
    isLoading: boolean,
    isSuccess: boolean,
}

export type BaseResponse<T, ModelName extends string> = {
    [key in ModelName]: T

}
export type ErrorResponse<V, ErrorName extends string> = {
    [key in ErrorName]: V
}

export interface IactionError {
    error: {
        code: string,
        message: string,
        name: string,
        stack: string,
    },
    meta: {},
    payload: undefined | string,
    type: string
}

export interface IMainIndex {
    domEvent: any,
    key: string,
    keyPath: string[]
}

export interface ITableProps {
    columns:Function,
    dataSource:undefined | [] ,
    loading:boolean,
    pageSize:number,
    navigationPath:string
}

export interface ITrainingEdit {
    date:{
        $d:Date
    },
    name:string,
    description:any,
    type:string,
    image:any
}

export  type ITrainingEditDate = Omit<ITrainingEdit, 'date'> & Record<'date', string>

export interface IEditData{
    id:string |undefined,
    data:{}
 }

 export interface IToken<K extends string> {
    config: {
        [P in K]: string
        // [key: string]: string
    },
    data: {
        success: boolean,
        data: {
            accessToken: string
        }
    },
    headers: {
        [P in K]: string
    },
    request: any,
    status: number

}

export interface IRecord {
    description:{},
    id:string,
    index:number,
    mediaFiles:{},
    role:undefined | string,
    title:string
}












