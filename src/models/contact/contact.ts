export interface IContact {
    data: {
        address: string,
        comment: null | string,
        email:string,
        id:undefined| number ,
        mediaFiles:{
            createdAt:string,
            id:number,
            path:string,
            updatedAt:string,
            name:string,
            phone:string
        }
    },
    success: boolean
}