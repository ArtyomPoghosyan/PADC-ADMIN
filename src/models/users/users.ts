export interface IUserReducer {
    trainingReducer: {
        isLoading: boolean,
        isSuccess: boolean,
        userData: {
            data?: []
        },
        userError: string
    }
}

export interface IuserData {
    createdAt: string,
    date: string,
    description: string,
    id: number,
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