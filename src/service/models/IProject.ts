import { IDbEntity } from '../dataSource/base/IDbEntity'

export interface IProject extends IDbEntity {
    name: string
    client_id: any
}

export const IProjectInitialValues: IProject = {
    name: '',
    client_id: ''
}