import { IDbEntity } from '../dataSource/base/IDbEntity'

export interface IClient extends IDbEntity {
    name: string
}

export const IClientInitialValues: IClient = {
    name: ''
}