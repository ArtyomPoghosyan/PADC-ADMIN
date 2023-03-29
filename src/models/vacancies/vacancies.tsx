export interface IVacancie {
    id: number,
    createdAt: string,
    description: string,
    shortDescription: string,
    title: string,
    updatedAt: string

}

export interface IAddVacancieData {
    title: string
    shortDescription: string,
    description: string
}

export interface IDeteleVacancie {
    createdAt: string,
    description: string,
    id: undefined | number,
    index: number,
    mediaFiles: {},
    role: undefined | string,
    shortDescription: string,
    title: string,
    updatedAt: string
}