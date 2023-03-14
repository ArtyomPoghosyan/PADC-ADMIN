import { addTrainingApi } from './../../basic-api/trainingApi/currentTrainingApi';
import { UploadFile } from 'antd';
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












