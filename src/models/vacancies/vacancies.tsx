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