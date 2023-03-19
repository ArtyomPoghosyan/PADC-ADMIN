import { descriptors } from 'chart.js/dist/core/core.defaults';
export interface IDataReducer {
    isLoading: boolean,
    isSuccess: boolean,
    trainingData: {
        data: ItrainingData[]
    },
    trainingError: null

}

export interface ItrainingData {
    createdAt: string,
    date: string,
    description: string,
    id: number,
    isAvailable?: boolean,
    mediaFiles: {
        createdAt: string,
        id: number,
        path: string,
        updatedAt: string,
    },
    name: string,
    type: string,
    updatedAt: string
}

export interface IAddTraining {
    name: string,
    description: string | {},
    type: string,
    date: string,
    image?: File | string | {}

}


