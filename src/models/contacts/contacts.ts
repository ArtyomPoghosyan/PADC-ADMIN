export interface IContact {
    data: {
        address: string,
        comment: null | string,
        email: string,
        id: undefined | number,
        mediaFiles: {
            createdAt: string,
            id: number,
            path: string,
            updatedAt: string,
            name: string,
            phone: string
        }
    },
    success: boolean
}

export interface IContactRecord {
    address: string,
    comment: null | string,
    email: string,
    id: undefined | number,
    index: number,
    mediaFiles: { 
        props: {
            src:string
        }
     },
    name: string,
    phone: string,
    role: undefined | string
}